import React, { useEffect, useState, useRef, useMemo } from "react";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import S from "./style";
import ChattingContainer from "./chatting/ChattingContainer";
import CardLayoutContainer from "./cardlayout/CardLayoutContainer";
import { useSelector } from "react-redux";
import HeaderToggle from "../roomlist/headertoggle/HeaderToggle";
import InviteRoomModal from "./invite/InviteRoomModal";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { getGameChannelFromPath } from "../../../utils/gameChannel";
import GameContext from "context/GameContext";

const MultiWorkspaceRoomContainer = () => {
  const roomStatus = 1;
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userSenderId = currentUser?.id;
  const userNickname = currentUser?.userNickname;
  const gameChannel = getGameChannelFromPath(location.pathname);

  // 게임 상태 관리
  const [isHost, setIsHost] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const gameStompClientRef = useRef(null);
  const [showInviteModal, setShowInviteModal] = useState(false);


  // 게임방 상태 조회
  useEffect(() => {
    if (!roomId || !userSenderId) return;

    const fetchGameRoomStatus = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        // 게임 상태 API 사용 (더 정확한 정보) - 게임 타입별 경로
        const gameStateUrl = `${process.env.REACT_APP_BACKEND_URL}/private/game-rooms/${roomId}/game-state?gameType=${gameChannel}`;
        const gameStateResponse = await fetch(
          gameStateUrl,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            },
          }
        );

        if (gameStateResponse.ok) {
          const gameStateData = await gameStateResponse.json();
          const gameState = gameStateData?.data || gameStateData;

          if (Array.isArray(gameState)) {
            const currentPlayer = gameState.find(p => {
              const playerId = p.userId;
              return String(playerId) === String(userSenderId);
            });

            if (currentPlayer) {
              const isHostPlayer = currentPlayer.gameJoinIsHost === true ||
                currentPlayer.gameJoinIsHost === 1 ||
                currentPlayer.isHost === true ||
                currentPlayer.isHost === 1;
              setIsHost(isHostPlayer);
            }
          }
        }

        // 게임방 정보 조회 (게임 시작 여부 확인) - private API 사용
        const roomUrl = `${process.env.REACT_APP_BACKEND_URL}/private/game-rooms/${roomId}`;
        const roomResponse = await fetch(
          roomUrl,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            },
          }
        );

        if (roomResponse.ok) {
          const roomData = await roomResponse.json();
          const roomInfo = roomData?.data || roomData;

          // 게임 시작 여부 확인
          if (roomInfo.gameRoomIsStart !== undefined) {
            setIsGameStarted(roomInfo.gameRoomIsStart === true || roomInfo.gameRoomIsStart === 1);
          }
        } else {
          const errorText = await roomResponse.text().catch(() => '');
        }
      } catch (error) {
        console.error('게임방 상태 조회 중 오류:', error);
      }
    };

    fetchGameRoomStatus();

    // 게임 상태 구독을 위한 STOMP 연결 (게임 타입에 따라 다름)
    const socket = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        const subscribePath = `/sub/game/${gameChannel}/room/${roomId}`;
        client.subscribe(subscribePath, (message) => {
          const body = JSON.parse(message.body);
          if (body.type === 'GAME_STARTED') {
            setIsGameStarted(true);
          } else if (body.type === 'GAME_ENDED') {
            setIsGameStarted(false);
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
  }, [roomId, userSenderId, gameChannel]);

  // 게임 시작 핸들러
  const handleStartGame = () => {
    if (!isHost) return;
    if (!gameStompClientRef.current || !gameStompClientRef.current.connected) {
      alert("게임 서버에 연결되지 않았습니다.");
      return;
    }

    const startGameMessage = {
      gameRoomId: parseInt(roomId),
      userId: userSenderId,
    };

    try {
      const startDestination = `/pub/game/${gameChannel}/start`;
      gameStompClientRef.current.publish({
        destination: startDestination,
        body: JSON.stringify(startGameMessage),
      });
    } catch (err) {
      alert('게임 시작에 실패했습니다.');
    }
  };

  // 준비하기 핸들러
  const handleReady = () => {
    if (!gameStompClientRef.current || !gameStompClientRef.current.connected) {
      alert("게임 서버에 연결되지 않았습니다.");
      return;
    }

    const readyMessage = {
      gameRoomId: parseInt(roomId),
      userId: userSenderId,
      gameJoinIsReady: 1,
    };
    try {
      const readyDestination = `/pub/game/${gameChannel}/ready`;
      gameStompClientRef.current.publish({
        destination: readyDestination,
        body: JSON.stringify(readyMessage),
      });
    } catch (err) {
      console.error('준비하기 요청 전송 실패:', err);
      alert('준비하기에 실패했습니다.');
    }
  };

  // 초대하기 핸들러
  const handleInvite = () => {
    setShowInviteModal(true);
  };

  // 친구 초대 처리
  const handleInviteRooms = (selectedFollowerIds) => {
    alert(`${selectedFollowerIds.length}명의 친구에게 초대되었습니다.`);
  };

  const handleExitClick = () => {
    // 채팅 STOMP 클라이언트 가져오기
    const stompClient = window.stompClientRef?.current;

    if (stompClient && stompClient.connected) {
      // LEAVE 메시지 전송
      const leaveMessage = {
        gameRoomId: roomId,
        userSenderId: userSenderId,
        userReceiverId: null,
        chatMessageContent: `${userNickname}님이 퇴장하셨습니다.`,
        chatMessageType: "LEAVE",
      };

      try {
        stompClient.publish({
          destination: "/pub/chats/send",
          body: JSON.stringify(leaveMessage),
        });
        console.log("퇴장 메시지 전송:", leaveMessage);
      } catch (err) {
        console.log("퇴장 메시지 전송 실패", err);
      }

      // 메시지 전송 후 약간의 지연을 두고 연결 해제 및 이동
      setTimeout(() => {
        if (stompClient.connected) {
          stompClient.deactivate();
        }
        navigate("/workspace/rooms");
      }, 1000);
    } else {
      // STOMP 클라이언트가 없으면 바로 이동
      navigate("/workspace/rooms");
    }
  };
  const contextValue = useMemo(
    () => ({
      isHost,
      isGameStarted,
      onStartGame: handleStartGame,
      onReady: handleReady,
      onInvite: handleInvite,
      showInviteModal,
      setShowInviteModal,
      gameStompClientRef,
      roomId,
      userSenderId,
    }),
    [isHost, isGameStarted, showInviteModal, roomId, userSenderId]
  );


  return (
    <>
      <S.Background />
      <S.Wrapper>
        <GameContext.Provider value={contextValue}>
          <S.HeaderContainer>
            <HeaderToggle
              isInGameRoom={true}
              isHost={isHost}
              isGameStarted={isGameStarted}
              onStartGame={handleStartGame}
              onReady={handleReady}
              onInvite={handleInvite}
            />
            <S.HelperWwrap>
              <S.GameRoomToggle data-type="exit" onClick={handleExitClick}>
                <S.ExitIconWrap>
                  <S.IconCircle><img src="/assets/gameroom/exit.png" alt="아이콘"></img></S.IconCircle>
                </S.ExitIconWrap>
                  <S.GameRoomToggleInnerText>나가기</S.GameRoomToggleInnerText>
              </S.GameRoomToggle>
            </S.HelperWwrap>
          </S.HeaderContainer>
          <S.MainWrapper>
            <S.Content>
              <Outlet />

            </S.Content>
            <S.ChattingLayout>
              <ChattingContainer />
            </S.ChattingLayout>
          </S.MainWrapper>
          <S.CardLayout>
            <CardLayoutContainer roomStatus={roomStatus} />
          </S.CardLayout>
        </GameContext.Provider>
      </S.Wrapper>
      {showInviteModal && (
        <InviteRoomModal
          onClose={() => setShowInviteModal(false)}
          onInvite={handleInviteRooms}
        />
      )}

    </>

  );
};

export default MultiWorkspaceRoomContainer;
