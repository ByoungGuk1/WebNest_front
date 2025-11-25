import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import S from "./style";
import HeaderToggle from "./headertoggle/HeaderToggle";
import LeftUserInterface from "./leftuserinterface/LeftUserInterface";
import RoomList from "./RoomList";
import Follow from "./Follow";
import { Link } from "react-router-dom";


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
          console.error("게임방 목록 조회 실패:", {
            status: response.status,
            statusText: response.statusText,
            error: errorText
          });
          setIsLoading(false);
          return;
        }

      const datas = await response.json();
      const responseData = datas?.data || datas;
      const following = responseData?.following || responseData?.myFollowings || responseData?.myFollowing || [];
      const myInfos = responseData?.myInfos || responseData?.myInfo || {};
      const winningCount = responseData?.winningCount || responseData?.winCount || responseData?.winingCount || 0;
      const roomList = responseData?.roomList || responseData?.rooms || (Array.isArray(responseData) ? responseData : []);
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

  const filteredAndSortedRooms = useMemo(() => {
    let filtered = [...rooms];

    if (searchQuery.trim()) {
      filtered = filtered.filter(room => {
        const title = (room.gameRoomTitle || room.title || '').toLowerCase();
        const roomId = String(room.id || '');
        const query = searchQuery.toLowerCase().trim();
        return title.includes(query) || roomId.includes(query);
      });
    }

    if (teamMode !== null) {
      filtered = filtered.filter(room => {
        const isTeam = room.gameRoomIsTeam === true || room.gameRoomIsTeam === 1;
        return isTeam === teamMode;
      });
    }

    const isEnterable = (room) => {
      const isFull = (room.gameRoomCurrentPlayer || 0) >= (room.gameRoomMaxPlayer || 0);
      return room.gameRoomIsOpen && !isFull;
    };

    filtered.sort((a, b) => {
      const aEnterable = isEnterable(a);
      const bEnterable = isEnterable(b);
      
      if (aEnterable !== bEnterable) {
        return aEnterable ? -1 : 1;
      }

      if (searchQuery.trim()) {
        const titleA = (a.gameRoomTitle || a.title || '').toLowerCase();
        const titleB = (b.gameRoomTitle || b.title || '').toLowerCase();
        return titleA.localeCompare(titleB);
      } else {
        const dateA = new Date(a.gameRoomCreateAt || a.createAt || 0);
        const dateB = new Date(b.gameRoomCreateAt || b.createAt || 0);
        if (sortOrder === 'latest') {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      }
    });

    return filtered;
  }, [rooms, selectedLanguage, sortOrder, searchQuery, teamMode]);

  const handleLanguageClick = (lang) => {
    if (lang === 'ALL') {
      setSelectedLanguage(null);
    } else if (selectedLanguage === lang) {
      setSelectedLanguage(null);
    } else {
      setSelectedLanguage(lang);
    }
  };

  const handleSortClick = () => {
    setSortOrder(prev => prev === 'latest' ? 'oldest' : 'latest');
  };

  return (
    <S.GameRoomBackGround>
      <div>
        <HeaderToggle teamMode={teamMode} onTeamModeChange={setTeamMode} rooms={rooms}/>
        <S.LayoutWrapper>
          <S.ListWrapper >
            <S.LeftSection>
              <S.LeftWrap>
                  <S.LeftInput placeholder="친구 찾기">
                  </S.LeftInput>
                  <img src="/assets/icons/search.png" />
              </S.LeftWrap>
              <Follow follow={myFollowing}></Follow>
              <LeftUserInterface myInfos={myInfos} myWinCount={myWinCount} />
            </S.LeftSection>
            <div>
              <S.RightWrap>
                <S.FilterWrap>
                  <S.RightArrayWrap onClick={handleSortClick} style={{ cursor: 'pointer' }}>
                      <span>{sortOrder === 'latest' ? '최신순' : '오래된순'}</span><S.IconBox><img src="/assets/icons/Symbol.svg" /></S.IconBox>
                  </S.RightArrayWrap>
                  <S.RightRefreshWrap>
                      <span>목록 새로고침</span><S.IconBox><img src="/assets/icons/Refresh.svg" /></S.IconBox>
                  </S.RightRefreshWrap>
                  <S.RightInputWrap $focused={isSearchFocused}>
                   <S.RightInput  
                      placeholder="게임방 검색" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}></S.RightInput>
                    <button></button>
                  </S.RightInputWrap>
                </S.FilterWrap>
                
              </S.RightWrap>
              <S.RoomListWrapper>
                <RoomList rooms={filteredAndSortedRooms} isLoading={isLoading}/>
                <Link to={"/workspace/rooms/typing"}>
                  <S.MoveToTyping>
                    <p>타자연습</p>
                    <p>바로가기</p>
                  </S.MoveToTyping>
                </Link>
              </S.RoomListWrapper>
            </div>
          </S.ListWrapper>
        </S.LayoutWrapper>
      </div>
    </S.GameRoomBackGround>
  );
};

export default RoomListContainer;
