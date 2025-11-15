// BoardOnly.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import S from "./style";
import DiceContainer from "./dice/DiceContainer";

const SnakePuzzleContainer = () => {
  const { roomId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?.id;
  
  // 게임 상태 관리
  const [gameState, setGameState] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  // 10x10 뷰 순서(지그재그)로 정렬된 숫자 배열 생성
  // 말판 부분 - 1이 왼쪽 하단, 100이 오른쪽 상단
  const cells = useMemo(() => {
    const gather = [];
    // row 9부터 0까지 역순으로 (화면상 아래에서 위로)
  for (let row = 9; row >= 0; row--) {
    const start = row * 10 + 1;
    const end = row * 10 + 10;
    const rowNums =
        (row % 2 === 0) // 짝수 행(0,2,4,6,8)은 왼→오
        ? Array.from({ length: 10 }, (_, i) => start + i)
          : Array.from({ length: 10 }, (_, i) => end - i); // 홀수 행(1,3,5,7,9)은 오→왼
      gather.push(...rowNums);
    }
    return gather;
  }, []);

  const [diceFaces, setDiceFaces] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [diceResult, setDiceResult] = useState(null);
  const [diceA, setDiceA] = useState(null);
  const [diceB, setDiceB] = useState(null);
  const rollTimerRef = useRef(null);
  const hideTimerRef = useRef(null);
  const [userLocation, setUserLocation] = useState(0);
  const lastProcessedRef = useRef(null);
  const hasProcessedLocationRef = useRef(false);
  const gameStompClientRef = useRef(null);
  
  useEffect(() => {
    return () => {
      if (rollTimerRef.current) window.clearTimeout(rollTimerRef.current);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      if (gameStompClientRef.current && gameStompClientRef.current.connected) {
        gameStompClientRef.current.deactivate();
      }
    };
  }, []);

  // 게임방 상태 조회
  useEffect(() => {
    if (!roomId) return;

    const fetchGameRoomStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/game-room/${roomId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          // gameRoomIsStart 필드 확인
          if (data.gameRoomIsStart !== undefined) {
            setIsGameStarted(data.gameRoomIsStart === true || data.gameRoomIsStart === 1);
          }
          console.log('🎮 게임방 상태 조회:', data);
        } else {
          // 500 에러 등 실패 시 로그 출력
          const errorText = await response.text().catch(() => '');
          console.error(`❌ 게임방 상태 조회 실패 (${response.status}):`, errorText);
        }
      } catch (error) {
        console.error('❌ 게임방 상태 조회 중 오류:', error);
      }
    };

    fetchGameRoomStatus();
  }, [roomId]);

  // STOMP 연결 및 게임 상태 구독
  useEffect(() => {
    if (!roomId || !userId) return;

    // 게임용 STOMP 클라이언트 생성 (채팅과 별도)
    const socket = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('🎮 게임 WebSocket 연결 성공');

        // 게임 상태 조회 요청
        const getGameStateMessage = {
          gameRoomId: parseInt(roomId),
        };
        client.publish({
          destination: '/pub/game/snake/state',
          body: JSON.stringify(getGameStateMessage),
        });

        // 게임 상태 구독
        client.subscribe(`/sub/game/snake/room/${roomId}`, (message) => {
          const body = JSON.parse(message.body);
          console.log('🎮 게임 상태 수신:', body);

          if (body.type === 'GAME_STARTED') {
            setIsGameStarted(true);
          }

          if (body.type === 'GAME_STARTED' || body.type === 'DICE_ROLLED' || body.type === 'GAME_STATE') {
            if (body.gameState && Array.isArray(body.gameState)) {
              setGameState(body);
              setPlayers(body.gameState);
              
              // 현재 유저의 플레이어 정보 찾기
              const currentPlayer = body.gameState.find(p => String(p.userId) === String(userId));
              if (currentPlayer) {
                // 방장 여부 확인 (첫 번째 플레이어가 방장 또는 isHost 필드 확인)
                const hostPlayer = body.gameState.find(p => p.isHost === true || p.isHost === 1) || body.gameState[0];
                setIsHost(String(hostPlayer.userId) === String(userId));
                
                // 내 턴 여부 확인 (gameJoinMyturn 필드 사용)
                const myTurn = currentPlayer.gameJoinMyturn === true || currentPlayer.gameJoinMyturn === 1 || 
                               currentPlayer.isTurn === true || currentPlayer.isTurn === 1;
                console.log('🎲 현재 플레이어 턴 정보:', {
                  userId: currentPlayer.userId,
                  gameJoinMyturn: currentPlayer.gameJoinMyturn,
                  isTurn: currentPlayer.isTurn,
                  myTurn: myTurn
                });
                setIsMyTurn(myTurn);
                
                // 준비 상태 확인 (필드명은 백엔드에 따라 다를 수 있음)
                if (currentPlayer.isReady !== undefined) {
                  setIsReady(currentPlayer.isReady === true || currentPlayer.isReady === 1);
                }
                
                // 내 위치 업데이트
                if (currentPlayer.gameJoinPosition !== undefined && currentPlayer.gameJoinPosition !== null) {
                  setUserLocation(currentPlayer.gameJoinPosition);
                }
              }
            }

            // 주사위 결과가 있으면 표시
            if (body.dice1 && body.dice2) {
              setDiceA(body.dice1);
              setDiceB(body.dice2);
            }

            // 함정/사다리 알림
            if (body.boardType === 'TRAP') {
              alert("함정발동!! 뒤로 내려갑니다.");
            } else if (body.boardType === 'LADDER') {
              alert("사다리 발견! 앞으로 갑니다.");
            }

            // 게임 종료 알림
            if (body.gameEnded) {
              alert("승리하셨습니다!");
            }
          }
        });
      },
    });

    client.activate();
    gameStompClientRef.current = client;

    return () => {
      if (gameStompClientRef.current && gameStompClientRef.current.connected) {
        gameStompClientRef.current.deactivate();
      }
    };
  }, [roomId, userId]);

  // 주의: 서버에서 뱀/사다리 처리 및 위치 계산을 수행하므로, 
  // 클라이언트에서는 서버 응답을 기반으로 위치만 업데이트
  // 아래 코드는 서버 응답을 받기 전까지의 임시 로직이거나 비활성화됨
  
  // userLocation이 변경될 때 뱀과 사다리 처리 (서버에서 처리하므로 비활성화)
  /*
  useEffect(() => {
    if (hasProcessedLocationRef.current) return;
    
    let newLocation = userLocation;
    let shouldUpdate = false;

    // 승리 체크
    if (userLocation >= 100) {
      alert("승리하셨습니다!");
      setUserLocation(0);
      hasProcessedLocationRef.current = true;
      return;
    }

    // 뱀과 사다리 처리
    switch (userLocation) {
      // 뱀 (Snakes) - 아래로 내려감
      case 99:
        newLocation = 65;
        shouldUpdate = true;
        alert("함정발동!! 뒤로 내려갑니다.")
        break;
      case 95:
        alert("함정발동!! 뒤로 내려갑니다.")
        newLocation = 75;
        shouldUpdate = true;
        break;
      case 87:
        alert("함정발동!! 뒤로 내려갑니다.")
        newLocation = 24;
        shouldUpdate = true;
        break;
      case 64:
        alert("함정발동!! 뒤로 내려갑니다.")
        newLocation = 43;
        shouldUpdate = true;
        break;
      case 59:
        alert("함정발동!! 뒤로 내려갑니다.")
        newLocation = 2;
        shouldUpdate = true;
        break;
      case 36:
        alert("함정발동!! 뒤로 내려갑니다.")
        newLocation = 6;
        shouldUpdate = true;
        break;
      case 28:
        alert("함정발동!! 뒤로 내려갑니다.")
        newLocation = 10;
        shouldUpdate = true;
        break;
      case 16:
        alert("함정발동!! 뒤로 내려갑니다.")
        newLocation = 3;
        shouldUpdate = true;
        break;
      
      // 사다리 (Ladders) - 위로 올라감
      case 4:
        alert("사다리 발견! 앞으로 갑니다.")
        newLocation = 25;
        shouldUpdate = true;
        break;
      case 27:
        alert("사다리 발견! 앞으로 갑니다.")
        newLocation = 48;
        shouldUpdate = true;
        break;
      case 33:
        alert("사다리 발견! 앞으로 갑니다.")
        newLocation = 63;
        shouldUpdate = true;
        break;
      case 42:
        alert("사다리 발견! 앞으로 갑니다.")
        newLocation = 60;
        shouldUpdate = true;
        break;
      case 50:
        alert("사다리 발견! 앞으로 갑니다.")
        newLocation = 69;
        shouldUpdate = true;
        break;
      case 62:
        alert("사다리 발견! 앞으로 갑니다.")
        newLocation = 81;
        shouldUpdate = true;
        break;
      case 74:
        alert("사다리 발견! 앞으로 갑니다.")
        newLocation = 92;
        shouldUpdate = true;
        break;
    }

    if (shouldUpdate) {
      setUserLocation(newLocation);
    }
    hasProcessedLocationRef.current = true;
  }, [userLocation]);
  */

  console.log(userLocation)
  
  useEffect(() => {
    console.log(diceA)
    console.log(diceB)
  }, [diceA, diceB])

  // 게임 시작 핸들러
  const handleStartGame = () => {
    if (!isHost) return;
    if (!gameStompClientRef.current || !gameStompClientRef.current.connected) {
      alert("게임 서버에 연결되지 않았습니다.");
      return;
    }

    const startGameMessage = {
      gameRoomId: parseInt(roomId),
      userId: userId,
    };

    try {
      gameStompClientRef.current.publish({
        destination: '/pub/game/snake/start',
        body: JSON.stringify(startGameMessage),
      });
      console.log('🎮 게임 시작 요청 전송:', startGameMessage);
    } catch (err) {
      console.error('게임 시작 요청 전송 실패:', err);
      alert('게임 시작에 실패했습니다.');
    }
  };

  // 준비하기 핸들러 (필요시 백엔드 API 추가 필요)
  const handleReady = () => {
    // TODO: 준비하기 API가 있으면 추가
    setIsReady(true);
    alert('준비 완료!');
  };

  const handleRollDice = () => {
    if (isRolling || !isMyTurn) return;
    if (!gameStompClientRef.current || !gameStompClientRef.current.connected) {
      alert("게임 서버에 연결되지 않았습니다.");
      return;
    }

    setIsPressing(false);
    setIsRolling(true);
    if (rollTimerRef.current) window.clearTimeout(rollTimerRef.current);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);

    // 주사위 결과 초기화 (새로운 주사위 굴리기 시작)
    setDiceA(null);
    setDiceB(null);
    lastProcessedRef.current = null;
    hasProcessedLocationRef.current = false;

    // 백엔드로 주사위 굴리기 요청 전송
    const rollDiceMessage = {
      gameRoomId: parseInt(roomId),
      userId: userId,
    };

    try {
      gameStompClientRef.current.publish({
        destination: '/pub/game/snake/roll-dice',
        body: JSON.stringify(rollDiceMessage),
      });
      console.log('🎲 주사위 굴리기 요청 전송:', rollDiceMessage);
    } catch (err) {
      console.error('주사위 굴리기 요청 전송 실패:', err);
      setIsRolling(false);
      return;
    }

    // 3D 주사위 굴리기
    setTimeout(() => {
      if (window.throwDice3D) {
        console.log('🎲 Calling throwDice3D from handleRollDice');
        window.throwDice3D();
      } else {
        console.warn('🎲 throwDice3D not found');
      }
    }, 100);

    // 간단한 연출을 위해 약간 지연 후 값 반영
    rollTimerRef.current = window.setTimeout(() => {
      setIsRolling(false);
      rollTimerRef.current = null;
    }, 450);

    hideTimerRef.current = window.setTimeout(() => {
      setDiceFaces([]);
      hideTimerRef.current = null;
    }, 2200);
  };

  const handlePressStart = () => setIsPressing(true);
  const handlePressEnd = () => setIsPressing(false);

  // 셀 번호를 퍼센트 좌표로 변환 (중심점)
  const getCellPosition = (cellNum) => {
    const row = Math.floor((cellNum - 1) / 10);
    const colInRow = (cellNum - 1) % 10;
    const isEvenRow = row % 2 === 0;
    const col = isEvenRow ? colInRow : 9 - colInRow;
    
    // 화면상 y 좌표는 아래에서 위로 (row 0이 아래, row 9가 위)
    const screenRow = 9 - row;
    
    return {
      x: (col + 0.5) * 10, // 셀 중심 x (퍼센트)
      y: (screenRow + 0.5) * 10, // 셀 중심 y (퍼센트)
    };
  };

  // 뱀과 사다리 이미지 정의 (실제 폴더에 있는 파일명에 맞게 수정)
  const snakes = [
    { from: 16, to: 3, image: 'snake_16_3.png' },
    { from: 28, to: 10, image: 'snake_28_10.png' },
    { from: 36, to: 6, image: 'snake_36_6.png' },
    { from: 59, to: 2, image: 'snake_59_2.png' },
    { from: 64, to: 43, image: 'snake_64_43.png' },
    { from: 87, to: 24, image: 'snake_87_24.png' },
    { from: 95, to: 75, image: 'snake_95_75.png' },
    { from: 99, to: 65, image: 'snake_99_65.png' },
  ];

  const ladders = [
    { from: 4, to: 25, image: 'letter_4_25.png' },
    { from: 28, to: 49, image: 'letter_28_49.png' },
    { from: 33, to: 63, image: 'letter_33_63.png' },
    { from: 42, to: 60, image: 'letter_42_60.png' },
    { from: 50, to: 69, image: 'letter_50_69.png' },
    { from: 62, to: 81, image: 'letter_62_81.png' },
    { from: 74, to: 92, image: 'letter_74_92.png' },
  ];

  return (
    <S.Section>
      <S.DiceArea>
        {!isGameStarted ? (
          // 게임 시작 전
          isHost ? (
            // 방장: 게임 시작 버튼
            <S.RollBtn
              type="button"
              onClick={handleStartGame}
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              onTouchCancel={handlePressEnd}
              disabled={isRolling}
              data-pressing={isPressing}
            >
              게임 시작
            </S.RollBtn>
          ) : (
            // 일반 유저: 준비하기 버튼
            <S.RollBtn
              type="button"
              onClick={handleReady}
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              onTouchCancel={handlePressEnd}
              disabled={isReady || isRolling}
              data-pressing={isPressing}
            >
              {isReady ? "준비 완료" : "준비하기"}
            </S.RollBtn>
          )
        ) : (
          // 게임 시작 후: 주사위 굴리기 버튼
          <S.RollBtn
            type="button"
            onClick={handleRollDice}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            onTouchCancel={handlePressEnd}
            disabled={isRolling || !isMyTurn}
            data-pressing={isPressing}
          >
            {isRolling ? "Rolling..." : !isMyTurn ? "다른 플레이어의 턴입니다" : "주사위 굴리기"}
          </S.RollBtn>
        )}
      </S.DiceArea>

    <S.BoardWrap>
      <S.Board>
          <S.Dice3DContainer>
            <DiceContainer onDiceResult={(results) => {
              console.log('🎲 3D 주사위 결과:', results);
              setDiceResult(results);
              if (results && results.length === 2) {
                setDiceA(results[0]);
                setDiceB(results[1]);
              }
            }} />
          </S.Dice3DContainer>
          {/* 뱀 이미지들 */}
          {snakes.map((snake, idx) => {
            const fromPos = getCellPosition(snake.from);
            const toPos = getCellPosition(snake.to);
            // 시작점과 끝점의 중간 위치 계산
            let centerX = (fromPos.x + toPos.x) / 2;
            const centerY = (fromPos.y + toPos.y) / 2;
            
            // 99번 스네이크는 오른쪽으로 조금 이동
            if (snake.from === 99) {
              centerX += 2;
            }
            
            return (
              <S.GameImage
                key={`snake-${idx}`}
                $left={centerX}
                $top={centerY}
                src={`/assets/gameroom/snake_letter/${snake.image}`}
                alt={`뱀 ${snake.from}→${snake.to}`}
              />
            );
          })}

          {/* 사다리 이미지들 */}
          {ladders.map((ladder, idx) => {
            const fromPos = getCellPosition(ladder.from);
            const toPos = getCellPosition(ladder.to);
            // 시작점과 끝점의 중간 위치 계산
            let centerX = (fromPos.x + toPos.x) / 2;
            const centerY = (fromPos.y + toPos.y) / 2;
            // 사다리 28-49만 왼쪽으로 한 칸 이동
            if (ladder.from === 28) {
              centerX -= 10;
            }
            // 특별한 처리가 필요한 사다리 없음
            const needsClipping = false;
            const higherZIndex = false;
            
            return (
              <S.GameImage
                key={`ladder-${idx}`}
                $left={centerX}
                $top={centerY}
                $needsClipping={needsClipping}
                $higherZIndex={higherZIndex}
                src={`/assets/gameroom/snake_letter/${ladder.image}`}
                alt={`사다리 ${ladder.from}→${ladder.to}`}
              />
            );
          })}

        {cells.map((n) => (
          <S.Cell key={n} $even={n % 2 === 0}>
            <S.Number>{n}</S.Number>
              {n === 1 && <S.StartLabel>START</S.StartLabel>}
              {n === 100 && <S.FinishLabel>FINISH</S.FinishLabel>}
          </S.Cell>
        ))}
          {diceFaces.map(({ id, value, top, left }) => (
            <S.BoardDice key={id} $top={top} $left={left} $rolling={isRolling}>
              {value}
            </S.BoardDice>
          ))}
          {/* 모든 플레이어 위치 마커 */}
          {players.map((player) => {
            const playerPosition = player.gameJoinPosition || 0;
            if (playerPosition <= 0 || playerPosition > 100) return null;
            
            const position = getCellPosition(playerPosition);
            const isCurrentUser = String(player.userId) === String(userId);
            
            return (
              <S.PlayerMarker
                key={`player-${player.userId}-${playerPosition}`}
                $left={position.x}
                $top={position.y}
                $isCurrentUser={isCurrentUser}
              />
            );
          })}
      </S.Board>
    </S.BoardWrap>
    </S.Section>
  );
};

export default SnakePuzzleContainer;
