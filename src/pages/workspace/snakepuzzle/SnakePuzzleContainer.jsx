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
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [winner, setWinner] = useState(null);
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
  const previousPositionsRef = useRef({}); // 각 플레이어의 이전 위치 저장
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
          
          // 방장 여부 확인 (초기 로드 시)
          if (data.players && Array.isArray(data.players)) {
            const currentPlayer = data.players.find(p => String(p.userId) === String(userId));
            if (currentPlayer) {
              // gameJoinIsHost 필드 우선 확인
              const isHostPlayer = currentPlayer.gameJoinIsHost === true || 
                                   currentPlayer.gameJoinIsHost === 1 ||
                                   currentPlayer.isHost === true || 
                                   currentPlayer.isHost === 1;
              setIsHost(isHostPlayer);
              console.log('🎮 초기 방장 여부:', { userId, isHostPlayer, gameJoinIsHost: currentPlayer.gameJoinIsHost, isHost: currentPlayer.isHost });
            }
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
  }, [roomId, userId]); // userId 추가 - 방장 여부 확인에 필요

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
            setIsGameEnded(false);
            setWinner(null);
          }
          
          // 게임 종료 이벤트 확인
          if (body.type === 'GAME_ENDED' || body.gameEnded === true || body.gameEnded === 1) {
            setIsGameEnded(true);
            setIsGameStarted(false); // 게임 시작 상태를 false로 변경
            setIsMyTurn(false);
            setIsReady(false); // 준비 상태 초기화
            
            // 승자 찾기 (위치가 100인 플레이어)
            if (body.gameState && Array.isArray(body.gameState)) {
              const winnerPlayer = body.gameState.find(p => (p.gameJoinPosition || 0) >= 100);
              if (winnerPlayer) {
                const winnerName = winnerPlayer.userNickname || winnerPlayer.nickname || '플레이어';
                setWinner(winnerName);
                alert(`${winnerName}님이 승리하셨습니다! 게임이 종료되었습니다.`);
              } else {
                alert("게임이 종료되었습니다!");
              }
            }
            
            // 게임 종료 후 초기화: 플레이어 위치 리셋 등
            setUserLocation(0);
            setDiceA(null);
            setDiceB(null);
          }

          if (body.type === 'GAME_STARTED' || body.type === 'DICE_ROLLED' || body.type === 'GAME_STATE') {
            if (body.gameState && Array.isArray(body.gameState)) {
              // 주사위 결과가 있으면 먼저 alert 표시
              if (body.type === 'DICE_ROLLED' && body.dice1 && body.dice2) {
                // 주사위를 굴린 플레이어 찾기 (현재 턴이었던 플레이어 또는 body에 포함된 정보)
                const rollingPlayer = body.gameState.find(p => 
                  (p.gameJoinMyturn === true || p.gameJoinMyturn === 1) ||
                  (p.isTurn === true || p.isTurn === 1)
                ) || body.rollingPlayer || body.gameState[0];
                
                const userNickname = rollingPlayer?.userNickname || rollingPlayer?.nickname || '플레이어';
                const dice1 = body.dice1;
                const dice2 = body.dice2;
                const moveCount = dice1 + dice2;
                
                alert(`${userNickname}님이 ${dice1} ${dice2}가 나와 앞으로 ${moveCount}칸 이동합니다.`);
              }

              setGameState(body);
              setPlayers(body.gameState);
              
              // 현재 유저의 플레이어 정보 찾기
              const currentPlayer = body.gameState.find(p => String(p.userId) === String(userId));
              if (currentPlayer) {
                // 방장 여부 확인 (gameJoinIsHost 필드 우선 확인)
                const isHostPlayer = currentPlayer.gameJoinIsHost === true || 
                                     currentPlayer.gameJoinIsHost === 1 ||
                                     currentPlayer.isHost === true || 
                                     currentPlayer.isHost === 1;
                setIsHost(isHostPlayer);
                console.log('🎮 방장 여부 업데이트:', { userId, isHostPlayer, gameJoinIsHost: currentPlayer.gameJoinIsHost, isHost: currentPlayer.isHost });
                
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
                
                // 위치 변경 감지 및 이벤트 알림
                const previousPosition = previousPositionsRef.current[currentPlayer.userId] || currentPlayer.gameJoinPosition || 0;
                const currentPosition = currentPlayer.gameJoinPosition || 0;
                
                if (previousPosition !== currentPosition && currentPosition > 0) {
                  // 이동 후 이벤트 체크
                  if (body.boardType === 'TRAP') {
                    const trapPlayer = body.gameState.find(p => 
                      p.gameJoinPosition === currentPosition && 
                      (previousPosition < currentPosition || currentPosition < previousPosition)
                    );
                    if (trapPlayer) {
                      const trapNickname = trapPlayer.userNickname || trapPlayer.nickname || '플레이어';
                      const movedBack = previousPosition - currentPosition;
                      alert(`${trapNickname}님이 함정에 빠져 ${movedBack > 0 ? movedBack + '칸 뒤로' : Math.abs(movedBack) + '칸 앞으로'} 이동합니다.`);
                    } else {
                      alert("함정발동!! 뒤로 내려갑니다.");
                    }
                  } else if (body.boardType === 'LADDER') {
                    const ladderPlayer = body.gameState.find(p => 
                      p.gameJoinPosition === currentPosition && 
                      currentPosition > previousPosition
                    );
                    if (ladderPlayer) {
                      const ladderNickname = ladderPlayer.userNickname || ladderPlayer.nickname || '플레이어';
                      const movedForward = currentPosition - previousPosition;
                      alert(`${ladderNickname}님이 사다리를 발견해 ${movedForward}칸 앞으로 이동합니다.`);
                    } else {
                      alert("사다리 발견! 앞으로 갑니다.");
                    }
                  }
                  
                  // 이전 위치 업데이트
                  previousPositionsRef.current[currentPlayer.userId] = currentPosition;
                } else if (currentPosition > 0) {
                  // 위치가 처음 설정되는 경우
                  previousPositionsRef.current[currentPlayer.userId] = currentPosition;
                }
                
                // 내 위치 업데이트
                if (currentPlayer.gameJoinPosition !== undefined && currentPlayer.gameJoinPosition !== null) {
                  setUserLocation(currentPlayer.gameJoinPosition);
                }
              }
              
              // 모든 플레이어의 위치 업데이트
              body.gameState.forEach((player) => {
                if (player.gameJoinPosition !== undefined && player.gameJoinPosition !== null) {
                  if (!previousPositionsRef.current[player.userId]) {
                    previousPositionsRef.current[player.userId] = player.gameJoinPosition;
                  }
                }
              });
            }

            // 주사위 결과가 있으면 표시
            if (body.dice1 && body.dice2) {
              setDiceA(body.dice1);
              setDiceB(body.dice2);
            }

            // 게임 종료는 위에서 이미 처리됨
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
    if (isRolling || !isMyTurn || isGameEnded) return;
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
            disabled={isRolling || !isMyTurn || isGameEnded}
            data-pressing={isPressing}
          >
            {isGameEnded 
              ? (winner ? `게임 종료 - ${winner}님이 승리!` : "게임 종료") 
              : isRolling 
                ? "Rolling..." 
                : !isMyTurn 
                  ? "다른 플레이어의 턴입니다" 
                  : "주사위 굴리기"}
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
                key={`player-${player.userId}`}
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
