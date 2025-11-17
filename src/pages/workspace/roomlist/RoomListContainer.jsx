import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import theme from "../../../styles/theme";
import S from "./style";
import HeaderToggle from "./headertoggle/HeaderToggle";
import MiddleSearchBar from "./middlesearchbar/MiddleSearchBar";
import LeftUserInterface from "./leftuserinterface/LeftUserInterface";
import RoomList from "./RoomList";
import { h9Bold, h9Medium } from "../../../styles/common";
import Follow from "./Follow";


const RoomListContainer = () => {

  const [rooms, setRooms] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [myFollowing, setMyFollowing] = useState([]);
  const [myInfos, setMyInfos] = useState({});
  const [myWinCount, setMyWinCount] = useState(0);
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?.id;
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [sortOrder, setSortOrder] = useState('latest'); // 'latest' | 'oldest'
  const [searchQuery, setSearchQuery] = useState('');
  const [teamMode, setTeamMode] = useState(null); // null: 전체, false: 개인전, true: 팀전
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  

  useEffect(() => {
    const getRooms = async () => {
      if (!userId) {
        console.warn("유저 ID가 없습니다.");
        setIsLoading(false);
        return;
      }

      try {
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          "Content-Type": "application/json",
        };
        
        // 토큰이 있으면 Authorization 헤더 추가
        if (accessToken) {
          headers["Authorization"] = `Bearer ${accessToken}`;
        }

        // privateapi 패키지이므로 /private prefix 필요
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/game-rooms?userId=${userId}`, {
          method: "GET",
          headers: headers
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ 게임방 목록 조회 실패:", {
            status: response.status,
            statusText: response.statusText,
            error: errorText
          });
          setIsLoading(false);
          return;
        }

        const datas = await response.json();
        console.log('📦 전체 응답 데이터:', datas);
      
      // 응답 구조 확인: ApiResponseDTO 형태 { message, data } 또는 직접 data일 수 있음
      const responseData = datas?.data || datas;
      console.log('📋 responseData:', responseData);
      
      // data가 Map 형태일 수 있음 (Java의 Map을 JSON으로 변환하면 객체)
      // 가능한 키 이름들 확인
      const following = responseData?.following || responseData?.myFollowings || responseData?.myFollowing || [];
      const myInfos = responseData?.myInfos || responseData?.myInfo || {};
      const winningCount = responseData?.winningCount || responseData?.winCount || responseData?.winingCount || 0;
      const roomList = responseData?.roomList || responseData?.rooms || (Array.isArray(responseData) ? responseData : []);
      
      console.log('👥 following:', following);
      console.log('👤 myInfos:', myInfos);
      console.log('🎯 winningCount:', winningCount);
      console.log('🏠 roomList:', roomList);
      
      // rooms가 배열이 아닌 경우 빈 배열로 설정
      const validRoomList = Array.isArray(roomList) ? roomList : [];
      
      setRooms(validRoomList);
      setIsLoading(false);
        setMyFollowing(Array.isArray(following) ? following : []);
        setMyWinCount(winningCount);
        setMyInfos(typeof myInfos === 'object' && myInfos !== null ? myInfos : {});
      } catch (error) {
        console.error("게임방 목록 불러오는 중 에러 발생:", error);
        setIsLoading(false);
      }
    };
    
    getRooms();
  }, [userId])

  // 필터링 및 정렬된 rooms
  const filteredAndSortedRooms = useMemo(() => {
    let filtered = [...rooms];

    // 검색어 필터링 (title 또는 방 번호)
    if (searchQuery.trim()) {
      filtered = filtered.filter(room => {
        const title = (room.gameRoomTitle || room.title || '').toLowerCase();
        const roomId = String(room.id || '');
        const query = searchQuery.toLowerCase().trim();
        return title.includes(query) || roomId.includes(query);
      });
    }

    // 언어 필터링
    if (selectedLanguage) {
      filtered = filtered.filter(room => {
        const roomLang = (room.gameRoomLanguage || '').toUpperCase();
        return roomLang === selectedLanguage.toUpperCase();
      });
    }

    // 팀전/개인전 필터링
    if (teamMode !== null) {
      filtered = filtered.filter(room => {
        const isTeam = room.gameRoomIsTeam === true || room.gameRoomIsTeam === 1;
        return isTeam === teamMode;
      });
    }

    // 입장 가능 여부 계산 함수
    const isEnterable = (room) => {
      const isFull = (room.gameRoomCurrentPlayer || 0) >= (room.gameRoomMaxPlayer || 0);
      return room.gameRoomIsOpen && !isFull;
    };

    // 정렬: 입장 가능한 방이 최상위로, 그 다음 검색어면 title 정렬, 아니면 날짜 정렬
    filtered.sort((a, b) => {
      const aEnterable = isEnterable(a);
      const bEnterable = isEnterable(b);
      
      // 입장 가능 여부 우선 비교
      if (aEnterable !== bEnterable) {
        return aEnterable ? -1 : 1; // 입장 가능한 방이 위로 (aEnterable이 true면 a가 위로)
      }

      // 입장 가능 여부가 같으면 기존 정렬 기준 적용
      if (searchQuery.trim()) {
        // 검색 시 title로 정렬
        const titleA = (a.gameRoomTitle || a.title || '').toLowerCase();
        const titleB = (b.gameRoomTitle || b.title || '').toLowerCase();
        return titleA.localeCompare(titleB);
      } else {
        // 최신순/오래된순 정렬 (createAt 기준)
        const dateA = new Date(a.gameRoomCreateAt || a.createAt || 0);
        const dateB = new Date(b.gameRoomCreateAt || b.createAt || 0);
        
        if (sortOrder === 'latest') {
          return dateB - dateA; // 최신순 (내림차순)
        } else {
          return dateA - dateB; // 오래된순 (오름차순)
        }
      }
    });

    return filtered;
  }, [rooms, selectedLanguage, sortOrder, searchQuery, teamMode]);

  const handleLanguageClick = (lang) => {
    if (lang === 'ALL') {
      setSelectedLanguage(null); // ALL 선택 시 필터 해제
    } else if (selectedLanguage === lang) {
      setSelectedLanguage(null); // 같은 언어 다시 클릭하면 필터 해제
    } else {
      setSelectedLanguage(lang);
    }
  };

  const handleSortClick = () => {
    setSortOrder(prev => prev === 'latest' ? 'oldest' : 'latest');
  };

  return (
    // 백그라운드 이미지지
    <S.GameRoomBackGround>
      <div>
        {/* 게임방 상단 토글 */}
          <HeaderToggle teamMode={teamMode} onTeamModeChange={setTeamMode} rooms={rooms}/>
          
        <S.LayoutWrapper>
          {/* 게임방리스트 왼쪽 유저 인터페이스(친구창, 유저카드) */}
          <S.ListWrapper >
            {/* 중앙에  왼쪽 친구찾기검색바, 오른쪽 방 검색, 정렬버튼 */}
            <S.LeftSection>
              <S.LeftWrap>
                  <S.LeftInput placeholder="친구 찾기">
                  </S.LeftInput>
                  <img src="/assets/icons/search.png" />
              </S.LeftWrap>

              <Follow follow={myFollowing}></Follow>
              <LeftUserInterface myInfos={myInfos} myWinCount={myWinCount} />
            </S.LeftSection>
            {/* 채팅방 목록 */}
            <div>
              <S.RightWrap>
                <S.SelectBoxWrap>
                <S.SelectBox $isSelected={selectedLanguage === null || selectedLanguage === 'ALL'} onClick={() => handleLanguageClick('ALL')}> ALL </S.SelectBox>
                <S.SelectBox $isSelected={selectedLanguage === 'JAVA'} onClick={() => handleLanguageClick('JAVA')}> JAVA </S.SelectBox>
                <S.SelectBox $isSelected={selectedLanguage === 'JS'} onClick={() => handleLanguageClick('JS')}> JS</S.SelectBox>
                <S.SelectBox $isSelected={selectedLanguage === 'ORACLE'} onClick={() => handleLanguageClick('ORACLE')}> ORACLE </S.SelectBox>
              </S.SelectBoxWrap>
                <S.FilterWrap>
                  <S.RightArrayWrap onClick={handleSortClick} style={{ cursor: 'pointer' }}>
                      <span>{sortOrder === 'latest' ? '최신순' : '오래된순'}</span><S.IconBox><img src="/assets/icons/Symbol.svg" /></S.IconBox>
                  </S.RightArrayWrap>
                  <S.RightRefreshWrap>
                      <span>목록 새로고침</span><S.IconBox><img src="/assets/icons/Refresh.svg" /></S.IconBox>
                  </S.RightRefreshWrap>
                  <S.RightInputWrap $focused={isSearchFocused}>
                   <S.RightInput  
                      placeholder="방 번호 또는 제목을 입력하세요" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}></S.RightInput>
                    <button></button>
                  </S.RightInputWrap>
                  {/* <S.RightInputWrap>
                      <S.RightInput 
                        placeholder="방 번호 또는 제목을 입력하세요" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <img className="lastImg" src="/assets/icons/search.png" />
                  </S.RightInputWrap> */}
                </S.FilterWrap>
              </S.RightWrap>
              <S.RoomListWrapper>
                <RoomList rooms={filteredAndSortedRooms} isLoading={isLoading}/>
              </S.RoomListWrapper>
            </div>
          </S.ListWrapper>
        </S.LayoutWrapper>
      </div>
    </S.GameRoomBackGround>
  );
};

export default RoomListContainer;
