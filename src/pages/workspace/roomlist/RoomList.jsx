import React from 'react';
import theme from '../../../styles/theme';
import S from './style'
import { useNavigate } from 'react-router-dom';

const RoomList = ({ rooms = [], isLoading = false }) => {
  const navigate = useNavigate();
  
  if(isLoading){
    return <div>게임방 목록을 불러오는 중...😅</div>
  }

  if(!rooms || !rooms.length){
    return <div>게임방 목록이 없습니다.😥</div>
  }
  
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

  // 안전한 ID 문자열 변환 (중첩 객체 방어)
  const normalizeId = (raw) => {
    if (raw == null) return '';
    if (typeof raw === 'object') {
      if (raw.id != null) return String(raw.id);
      if (raw.value != null) return String(raw.value);
      if (raw.$numberLong != null) return String(raw.$numberLong);
      return '';
    }
    return String(raw);
  };

  // 백엔드 타입을 라우터 경로로 매핑 (중첩 객체 방어)
  const mapTypeToRoute = (type) => {
    let t = type;
    if (t && typeof t === 'object') {
      if (t.value != null) t = t.value;
      else if (t.type != null) t = t.type;
      else if (t.name != null) t = t.name;
      else t = String(t);
    }
    const upper = (t || '').toString().toUpperCase();
    if (upper === 'SNAKE') return 'snakepuzzle';
    if (upper === 'OMOK') return 'concave';
    if (upper === 'WORD') return 'lastword';
    return (t || '').toString().toLowerCase();
  };

  const roomList = rooms.map(({gameRoomCreateAt, gameRoomCurrentPlayer, gameRoomIsOpen, gameRoomIsStart, gameRoomIsTeam, gameRoomMaxPlayer, gameRoomPassKey, gameRoomTitle, gameRoomType, gameRoomLanguage, id, players}, i) => {
    const isFull = gameRoomCurrentPlayer >= gameRoomMaxPlayer;
    const isDisabled = !gameRoomIsOpen || isFull;
    const averageLevel = calculateAverageLevel(players);
    const levelColor = getLevelColor(averageLevel);
    const routePath = mapTypeToRoute(gameRoomType);
    
    const handleEnter = () => {
      if (isDisabled) return;
      const hasPassword = gameRoomPassKey != null && String(gameRoomPassKey).trim() !== '';
      if (hasPassword) {
        const input = window.prompt('비밀번호를 입력하세요.');
        if (input == null) return; // 취소
        if (String(input).trim() !== String(gameRoomPassKey).trim()) {
          alert('비밀번호가 올바르지 않습니다.');
          return;
        }
      }
      const roomIdStr = encodeURIComponent(normalizeId(id));
      const typeStr = encodeURIComponent(String(routePath || ''));
      if (!roomIdStr || !typeStr) {
        alert('방 정보가 올바르지 않습니다.');
        return;
      }
      navigate(`/workspace/rooms/${roomIdStr}/${typeStr}`);
    };

    // 아이콘: 비밀번호 있거나 비공개면 잠금, 그 외에는 열림
    const isLocked = (gameRoomPassKey != null && String(gameRoomPassKey).trim() !== '') || !gameRoomIsOpen;
    const lockIconSrc = isLocked ? '/assets/gameroom/common/locker.png' : '/assets/gameroom/common/check.png';
    
    return (
      <div onClick={handleEnter} key={i}>
        <S.RoomList $isDisabled={isDisabled}>
        <S.RoomLeft>
          <img src='/assets/gameroom/common/play.png' alt='flag' className='flag'></img>
          <S.RoomTitleWrapper>
            <p>{gameRoomTitle}</p>
            <span> ｢ {gameRoomLanguage && <S.RoomLanguage>{gameRoomLanguage} ｣</S.RoomLanguage>} 
              {gameRoomType.toLowerCase === "lastword" ? "끝말 잇기" : gameRoomType.toLowerCase === "cardflip" ? "카드 뒤집기" : gameRoomType.toLowerCase === "concave" ? "오목" : gameRoomType.toLowerCase === "lastword" ? "끝말잇기" : "뱀 주사위 놀이"}</span>
          </S.RoomTitleWrapper>
        </S.RoomLeft>
        <img src={lockIconSrc} alt={isLocked ? '잠금' : '오픈'} className='locker' />
        <S.RoomRight>
          <S.ProfileWrapper>
            <S.ProfileWrap>
              {players.map((user) => {
                console.log(user)
                const isHost = user.isHost === true || user.isHost === 1 || user.gameJoinIsHost === true || user.gameJoinIsHost === 1;
                return (
                  <S.ProfileImgWrap key={user.id || user.userId}>
                    {isHost && <S.CrownIcon src="/assets/gameroom/common/crown.png" alt="host" />}
                    <S.ProfileImg src={user.userThumbnailURL || user.userThumbnailUrl} alt='userProfile'></S.ProfileImg>
                  </S.ProfileImgWrap>
                )
              })}
            </S.ProfileWrap>
            {averageLevel > 0 && <S.AverageLevelText $levelColor={getLevelColor(averageLevel)}>Lv.{averageLevel}</S.AverageLevelText>}
          </S.ProfileWrapper>
          <S.TeamWrap>
            {gameRoomCurrentPlayer}/{gameRoomMaxPlayer}
            {gameRoomIsTeam ? <p>팀전</p> : <p>개인전</p>}
          </S.TeamWrap>
        </S.RoomRight>
      </S.RoomList>
      <S.PasswordHidden className='password'>{gameRoomPassKey}</S.PasswordHidden>
      </div>
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