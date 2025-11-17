import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import S from './style';

const InviteRoomModal = ({ onClose, onInvite }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?.id;
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFollowers, setSelectedFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/private/follows/${userId}/followers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          console.error("팔로워 정보 불러오기 실패:", response.status);
          setIsLoading(false);
          return;
        }

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
        
        setFollowers(friendsList);
        setIsLoading(false);
      } catch (error) {
        console.error("팔로워 목록 불러오는 중 에러 발생:", error);
        setIsLoading(false);
      }
    };
    
    fetchFollowers();
  }, [userId]);

  const toggleFollowerSelection = (followerId) => {
    setSelectedFollowers(prev => {
      if (prev.includes(followerId)) {
        return prev.filter(id => id !== followerId);
      } else {
        return [...prev, followerId];
      }
    });
  };

  const handleInvite = () => {
    if (selectedFollowers.length === 0) {
      alert('초대할 친구를 선택해주세요.');
      return;
    }
    if (onInvite) {
      onInvite(selectedFollowers);
    }
    onClose();
  };

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

  if (isLoading) {
    return (
      <S.ModalOverlay onClick={onClose}>
        <S.ModalContent onClick={(e) => e.stopPropagation()}>
          <S.ModalHeader>
            <h3>친구 초대</h3>
            <S.CloseButton onClick={onClose}>×</S.CloseButton>
          </S.ModalHeader>
          <S.ModalBody>
            <div>친구 목록을 불러오는 중...</div>
          </S.ModalBody>
        </S.ModalContent>
      </S.ModalOverlay>
    );
  }

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <h3>친구 초대</h3>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>
        <S.ModalBody>
          {followers.length === 0 ? (
            <S.EmptyMessage>팔로워 목록이 없습니다.</S.EmptyMessage>
          ) : (
            <S.FollowerList>
              {followers.map((follower) => {
                const isSelected = selectedFollowers.includes(follower.userId);
                const levelColor = getLevelColor(follower.userLevel);
                const statusColor = getStatusColor(follower.presenceStatus);
                
                return (
                  <S.FollowerItem 
                    key={follower._key} 
                    $isSelected={isSelected}
                    onClick={() => toggleFollowerSelection(follower.userId)}
                  >
                    <S.Checkbox $selected={isSelected}>
                      {isSelected && <S.Checkmark>✓</S.Checkmark>}
                    </S.Checkbox>
                    <S.FollowerImg src={follower.userThumbnailUrl} alt={follower.userNickname || 'user'} />
                    <S.FollowerInfo>
                      <S.FollowerNameWrap>
                        <S.LevelWrap>
                          <S.LevelImg src={getLevelIcon(follower.userLevel)} alt={`Lv${follower.userLevel}`} />
                          <S.LevelText $levelColor={levelColor}>
                            Lv {follower.userLevel === 10 ? 'X' : (follower.userLevel || 1)}
                          </S.LevelText>
                        </S.LevelWrap>
                        <S.FollowerName>{follower.userNickname}</S.FollowerName>
                      </S.FollowerNameWrap>
                    </S.FollowerInfo>
                      <S.StatusWrapper>
                        <S.StatusDot $color={statusColor} />
                        <S.StatusText>{follower.presenceStatus || '접속중'}</S.StatusText>
                      </S.StatusWrapper>
                  </S.FollowerItem>
                );
              })}
            </S.FollowerList>
          )}
        </S.ModalBody>
        <S.ModalFooter>
          <S.CancelButton onClick={onClose}>취소</S.CancelButton>
          <S.InviteButton onClick={handleInvite}>초대하기</S.InviteButton>
        </S.ModalFooter>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default InviteRoomModal;

