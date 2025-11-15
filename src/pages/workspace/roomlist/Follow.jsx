import React from 'react';
import theme from '../../../styles/theme';
import S from './style'

const Follow = ({ follow = [] }) => {
  const getStatusColor = (status) => {
    if (status === '게임중') return theme.PALETTE.primary.blue.main;
    if (status === '자리비움') return theme.PALETTE.primary.red.main;
    if (status === '접속중') return theme.PALETTE.primary.green.main;
    return theme.PALETTE.neutral.gray.main;
  };

  const getLevelColor = (level) => {
    const lv = level || 1;
    if (lv <= 2) return theme.PALETTE.primary.red.main;
    if (lv <= 4) return theme.PALETTE.primary.yellow.main;
    if (lv <= 6) return theme.PALETTE.primary.green.main;
    if (lv <= 8) return theme.PALETTE.primary.blue.main;
    return theme.PALETTE.primary.purple.main; // 9-10
  };

  const getLevelIcon = (level) => {
    const lv = level || 1;
    if (lv > 10) return '/assets/images/level/10.svg';
    return `/assets/images/level/${lv}.svg`;
  };

  return (
    <S.FollowWrap>
      {follow.map((item) => {
        const { userId, userNickname, presenceStatus, userLevel, userThumbnailUrl, profileUrl } = item || {};
        const profileImg = userThumbnailUrl || profileUrl || '/assets/images/chicken.png';
        return (
          <S.Followlist key={userId}>
            <S.FollowLeftWrap>
              <S.FollowImg src={profileImg} alt={userNickname || 'user'} />
                <S.FollowNameWrap>
                  <S.LevelWrap>
                    <S.LevelImg src={getLevelIcon(userLevel || 1)} alt={`Lv${userLevel || 1}`} />
                    <S.LevelText $levelColor={getLevelColor(userLevel || 1)}>
                      {userLevel === 10 ? 'X' : (userLevel || 1)}
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
    </S.FollowWrap>
  );
};

export default Follow;