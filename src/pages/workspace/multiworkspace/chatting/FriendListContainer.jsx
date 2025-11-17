import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import S from './friendListStyle';

const FriendListContainer = ({ onCancel }) => {
  const [friends, setFriends] = useState([]);
  const [sortBy, setSortBy] = useState('등급순');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserId = currentUser?.id;

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken || !currentUserId) return;
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/private/follows/${currentUserId}/followers`;
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });
        if (!response.ok) throw new Error(`팔로워 정보 불러오기 실패: ${response.status}`);
        const result = await response.json();
        const followerList = result?.data || [];
        const friendsList = followerList.map((follow, idx) => {
          const uid = follow?.followerId || follow?.id || follow?.userId || `tmp-${idx}`;
          return {
            _key: `${uid}-${idx}`,
            userId: uid,
            userNickname: follow?.followerNickname || follow?.userNickname || follow?.nickname || '익명',
            presenceStatus: follow?.presenceStatus || '접속중',
            userLevel: follow?.followerLevel || follow?.userLevel || follow?.level || 1,
            userThumbnailUrl: follow?.followerThumbnailUrl || follow?.userThumbnailUrl || follow?.profileUrl || '/assets/images/chicken.png',
          };
        });
        setFriends(friendsList);
      } catch (e) {
        setFriends([]);
      }
    };
    if (currentUserId) fetchFollowers();
  }, [currentUserId]);

  const sortedFriends = [...friends].sort((a, b) => {
    if (sortBy === '등급순') return (b.userLevel || 0) - (a.userLevel || 0);
    if (sortBy === '이름순') return (a.userNickname || '').localeCompare(b.userNickname || '');
    return 0;
  });

  const getLevelIcon = (level) => {
    const lv = level || 1;
    if (lv === 10) return '/assets/images/level/x.svg';
    if (lv > 10) return '/assets/images/level/x.svg';
    return `/assets/images/level/${lv}.svg`;
  };

  const getLevelColor = (level) => {
    const lv = level || 1;
    if (lv <= 2) return '#FF3B30';
    if (lv <= 4) return '#FFC400';
    if (lv <= 6) return '#34C759';
    if (lv <= 8) return '#007AFF';
    return '#6D2FFD';
  };

  const getStatusColor = (status) => {
    if (status === '게임중') return '#007AFF';
    if (status === '자리비움') return '#FF3B30';
    if (status === '접속중') return '#34C759';
    return '#9CA3AF';
  };

  const handleInvite = () => {
    alert('준비중입니다.');
  };

  const handleCancel = () => {
    onCancel && onCancel();
  };

  const toggleSelect = (userId) => {
    setSelectedFriends((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  return (
    <S.FriendListWrap>
      <S.FriendListHeader>
        <h2>친구 목록</h2>
      </S.FriendListHeader>

      <S.FriendListContent>
        <S.FollowWrap>
          <S.FollowListWarp>
            {sortedFriends.map((item) => {
              const { _key, userId, userNickname, presenceStatus, userLevel, userThumbnailUrl } = item;
              const levelColor = getLevelColor(userLevel);
              const isSelected = selectedFriends.includes(userId);
              return (
                <S.Followlist key={_key} onClick={() => toggleSelect(userId)}>
                  <S.FollowLeftWrap>
                    <S.Checkbox $selected={isSelected}>{isSelected && <S.Checkmark>✓</S.Checkmark>}</S.Checkbox>
                    <S.FollowImg src={userThumbnailUrl} alt={userNickname || 'user'} />
                    <S.FollowNameWrap>
                      <S.LevelWrap>
                        <S.LevelImg src={getLevelIcon(userLevel)} alt={`Lv${userLevel}`} />
                        <S.LevelText $levelColor={levelColor}>
                          Lv {userLevel === 10 ? 'X' : (userLevel || 1)}
                        </S.LevelText>
                      </S.LevelWrap>
                      <p>{userNickname}</p>
                    </S.FollowNameWrap>
                  </S.FollowLeftWrap>
                  <S.StatusWrapper>
                    <S.StatusDot $color={getStatusColor(presenceStatus || '접속중')} />
                    <S.StatusText>{presenceStatus}</S.StatusText>
                  </S.StatusWrapper>
                </S.Followlist>
              );
            })}
          </S.FollowListWarp>
        </S.FollowWrap>
      </S.FriendListContent>

      <S.FriendListFooter>
        <S.InviteButton onClick={handleInvite}>초대하기</S.InviteButton>
        <S.FooterStatus>
          <span>≡</span>
          <span>친구 목록[{friends.length}명]</span>
          <S.SortButton onClick={() => setSortBy(sortBy === '등급순' ? '이름순' : '등급순')}>↓↑ {sortBy}</S.SortButton>
        <S.CancelButton onClick={handleCancel}>취소하기</S.CancelButton>
        </S.FooterStatus>
      </S.FriendListFooter>
    </S.FriendListWrap>
  );
};

export default FriendListContainer;

