import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import S from './friendListStyle';

const FriendListContainer = ({ onCancel }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [sortBy, setSortBy] = useState('등급순'); // 등급순, 이름순 등
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserId = currentUser?.id;

  // 컴포넌트 마운트 확인
  useEffect(() => {
    console.log("🎯 FriendListContainer 컴포넌트 마운트됨");
    console.log("👤 currentUser:", currentUser);
    console.log("🆔 currentUserId:", currentUserId);
  }, []);

  // 팔로워 정보 불러오기
  useEffect(() => {
    console.log("🔍 FriendListContainer 마운트됨, currentUserId:", currentUserId);
    
    const fetchFollowers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.warn("❌ 로그인이 필요합니다. accessToken 없음");
          return;
        }

        if (!currentUserId) {
          console.warn("❌ 사용자 ID가 없습니다. currentUserId:", currentUserId);
          return;
        }

        const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/private/follows/${currentUserId}/followers`;
        console.log("📡 팔로워 정보 요청 시작:", apiUrl);

        // GET /private/follows/{userId}/followers
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });

        console.log("📥 응답 받음:", response.status, response.statusText);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ 응답 에러:", response.status, errorText);
          throw new Error(`팔로워 정보 불러오기 실패: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ 응답 데이터:", result);
        
        // ApiResponseDTO 구조: { message: "...", data: List<FollowDTO> }
        const followerList = result?.data || [];
        console.log("👥 팔로워 리스트:", followerList);
        
        // FollowDTO를 친구 목록 형식으로 변환
        const friendsList = followerList.map((follow) => {
          // FollowDTO 구조에 따라 필드명 조정 필요
          // 일반적으로 follower 정보가 들어있을 것
          return {
            id: follow?.followerId || follow?.id || follow?.userId,
            userId: follow?.followerId || follow?.id || follow?.userId,
            userNickname: follow?.followerNickname || follow?.userNickname || follow?.nickname || "익명",
            userThumbnailUrl: follow?.followerThumbnailUrl || follow?.userThumbnailUrl || follow?.profileUrl || "/assets/avatar.png",
            userLevel: follow?.followerLevel || follow?.userLevel || follow?.level || 1,
            followerCount: follow?.followerCount || 0,
          };
        });
        
        console.log("✨ 변환된 친구 목록:", friendsList);
        setFriends(friendsList);
      } catch (error) {
        console.error("❌ 팔로워 정보 불러오기 중 오류:", error);
        // 에러 발생 시 빈 배열로 설정
        setFriends([]);
      }
    };

    // currentUserId가 없어도 컴포넌트가 마운트되었는지 확인하기 위해 항상 실행
    console.log("🚀 fetchFollowers 호출 여부 체크, currentUserId:", currentUserId);
    if (currentUserId) {
      fetchFollowers();
    } else {
      console.warn("⏸️ currentUserId가 없어서 요청을 보내지 않음");
    }
  }, [currentUserId]);

  // 친구 선택/해제
  const toggleFriendSelection = (friendId) => {
    setSelectedFriends((prev) => {
      if (prev.includes(friendId)) {
        return prev.filter((id) => id !== friendId);
      } else {
        return [...prev, friendId];
      }
    });
  };

  // 초대하기 버튼 클릭
  const handleInvite = () => {
    if (selectedFriends.length === 0) {
      alert("초대할 친구를 선택해주세요.");
      return;
    }
    // TODO: 초대 로직 구현
    console.log("초대할 친구들:", selectedFriends);
    alert(`${selectedFriends.length}명의 친구를 초대했습니다.`);
    setSelectedFriends([]);
  };

  // 취소하기 버튼 클릭
  const handleCancel = () => {
    setSelectedFriends([]);
    if (onCancel) {
      onCancel();
    }
  };

  // 정렬된 친구 목록
  const sortedFriends = [...friends].sort((a, b) => {
    if (sortBy === '등급순') {
      return (b.userLevel || 0) - (a.userLevel || 0);
    } else if (sortBy === '이름순') {
      return (a.userNickname || '').localeCompare(b.userNickname || '');
    }
    return 0;
  });

  return (
    <S.FriendListWrap>
      <S.FriendListHeader>
        <h2>친구 목록</h2>
      </S.FriendListHeader>

      <S.FriendListContent>
        {sortedFriends.map((friend) => {
          const isSelected = selectedFriends.includes(friend.id || friend.userId);
          const level = friend.userLevel || friend.level || 1;
          const levelImageUrl = `/assets/images/test-grade/grade${level}.png`;

          return (
            <S.FriendItem
              key={friend.id || friend.userId}
              onClick={() => toggleFriendSelection(friend.id || friend.userId)}
            >
              <S.Checkbox selected={isSelected}>
                {isSelected && <S.Checkmark>✓</S.Checkmark>}
              </S.Checkbox>
              <S.FriendAvatar
                src={friend.userThumbnailUrl || friend.userProfile || "/assets/avatar.png"}
                alt={friend.userNickname || "친구"}
              />
              <S.FriendInfo>
                <S.LevelBadge>
                  <img src={levelImageUrl} alt={`Level ${level}`} />
                  <span>Lv{level === 10 ? "X" : level}</span>
                </S.LevelBadge>
                <S.FriendName>{friend.userNickname || "익명"}</S.FriendName>
              </S.FriendInfo>
            </S.FriendItem>
          );
        })}
      </S.FriendListContent>

      <S.FriendListFooter>
        <S.InviteButton onClick={handleInvite}>초대하기</S.InviteButton>
        <S.FooterStatus>
          <span>≡</span>
          <span>친구 목록[{friends.length}명]</span>
          <S.SortButton onClick={() => setSortBy(sortBy === '등급순' ? '이름순' : '등급순')}>
            ↓↑ {sortBy}
          </S.SortButton>
        </S.FooterStatus>
        <S.CancelButton onClick={handleCancel}>취소하기</S.CancelButton>
      </S.FriendListFooter>
    </S.FriendListWrap>
  );
};

export default FriendListContainer;

