import React from 'react';
import theme from '../../../styles/theme';
import S from './style'

const RoomList = ({ rooms = [], isLoading = false }) => {
  
  if(isLoading){
    return <div>게임방 목록을 불러오는 중...😅</div>
  }

  if(!rooms || !rooms.length){
    return <div>게임방 목록이 없습니다.😥</div>
  }
  
  console.log('🏠 RoomList - rooms:', rooms);
  
  const getLevelColor = (level) => {
    const lv = level || 1;
    if (lv <= 2) return theme.PALETTE.primary.red.main;
    if (lv <= 4) return theme.PALETTE.primary.yellow.main;
    if (lv <= 6) return theme.PALETTE.primary.green.main;
    if (lv <= 8) return theme.PALETTE.primary.blue.main;
    return theme.PALETTE.primary.purple.main; // 9-10
  };

  const calculateAverageLevel = (players) => {
    if (!players || !Array.isArray(players) || players.length === 0) return 0;
    const totalLevel = players.reduce((sum, user) => {
      const level = user.userLevel || user.level || 1;
      return sum + level;
    }, 0);
    return Math.round(totalLevel / players.length);
  };

  const roomList = rooms.map(({gameRoomCreateAt, gameRoomCurrentPlayer, gameRoomIsOpen, gameRoomIsStart, gameRoomIsTeam, gameRoomMaxPlayer, gameRoomPassKey, gameRoomTitle, gameRoomType, gameRoomLanguage, id, players}, i) => {
    const isFull = gameRoomCurrentPlayer >= gameRoomMaxPlayer;
    const isDisabled = !gameRoomIsOpen || isFull;
    const averageLevel = calculateAverageLevel(players);
    const levelColor = getLevelColor(averageLevel);
    
    return (
      <S.RoomListLink to={isDisabled ? '#' : `/workspace/rooms/${id}/${gameRoomType}`} key={i}>
        <S.RoomList $isDisabled={isDisabled}>
        <S.RoomLeft>
          <img src='/assets/images/game-room/flag.png' alt='flag' className='flag'></img>
          <S.RoomTitleWrapper>
            {gameRoomTitle}
            {gameRoomLanguage && <S.RoomLanguage>{gameRoomLanguage}</S.RoomLanguage>}
          </S.RoomTitleWrapper>
        </S.RoomLeft>

        {gameRoomIsOpen ? <img src='/assets/images/game-room/unlock.png' alt='오픈이미지' className='locker'></img> : <img src='/assets/images/game-room/unlock.png' alt='오픈이미지'  className='locker'></img>}
        
        <S.RoomRight>
          <S.ProfileWrapper>
            <S.ProfileWrap>
              {players.map((user) => {
                const isHost = user.isHost === true || user.isHost === 1 || user.gameJoinIsHost === true || user.gameJoinIsHost === 1;
                return (
                  <S.ProfileImgWrap key={user.id || user.userId}>
                    {isHost && <S.CrownIcon src="/assets/icons/crown.png" alt="host" />}
                    <S.ProfileImg src={user.userThumbnailURL || user.userThumbnailUrl} alt='userProfile'></S.ProfileImg>
                  </S.ProfileImgWrap>
                )
              })}
            </S.ProfileWrap>
            {averageLevel > 0 && <S.AverageLevelText $levelColor={levelColor}>Lv.{averageLevel}</S.AverageLevelText>}
          </S.ProfileWrapper>
          <S.TeamWrap>
            {gameRoomCurrentPlayer}/{gameRoomMaxPlayer}
            {gameRoomIsTeam ? <p>팀전</p> : <p>개인전</p>}
          </S.TeamWrap>
        </S.RoomRight>
      </S.RoomList>
    </S.RoomListLink>
    );
  })

  return (
    <S.RoomListWrap>
      <S.RoomListContainer>
        {roomList}
      </S.RoomListContainer>
    </S.RoomListWrap>
  );
};

export default RoomList;