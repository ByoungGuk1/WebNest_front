import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import S from './style';
import FriendListContainer from './FriendListContainer';

const ChattingContainer = () => {
  const [message, setMessage] = useState('');       // 입력 중인 메시지
  const [chatList, setChatList] = useState([]);     // 받은 메시지 목록
  const [gameRoomTitle, setGameRoomTitle] = useState("");
  const [showFriendList, setShowFriendList] = useState(false); // 친구 목록 표시 여부
  const [userTeamColor, setUserTeamColor] = useState("black"); // 사용자 팀 컬러 (기본값: black)
  const stompClientRef = useRef(null);
  // 리덕스에서 로그인한 유저 정보 조회
  const currentUser = useSelector((state) => state.user.currentUser);
  const userSenderId = currentUser?.id;
  const userNickname = currentUser?.userNickname;
  const { roomId } = useParams();
  
  useEffect(() => {
    // 0. 게임방 정보 조회하여 사용자 팀 컬러 가져오기
    const fetchGameRoomInfo = async () => {
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
          // 플레이어 리스트에서 현재 사용자의 팀 컬러 찾기
          if (data.players && Array.isArray(data.players)) {
            const currentPlayer = data.players.find(p => String(p.userId) === String(userSenderId));
            if (currentPlayer?.gameJoinTeamcolor || currentPlayer?.teamColor || currentPlayer?.userColor) {
              setUserTeamColor(
                currentPlayer.gameJoinTeamcolor || 
                currentPlayer.teamColor || 
                currentPlayer.userColor || 
                "black"
              );
            }
          }
        } else {
          // 500 에러 등 실패 시 기본값 유지
          console.warn(`게임방 정보 조회 실패 (${response.status}): 팀 컬러 기본값 "black" 사용`);
        }
      } catch (error) {
        console.error('게임방 정보 조회 중 오류:', error);
        // 에러 발생 시 기본값 유지 (이미 "black"으로 초기화됨)
      }
    };

    // 1. 채팅 메시지 초기 불러오기
    const getMessages = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/chats/get-messages/${roomId}?userSenderId=${userSenderId}&userReceiverId=`
      );
      if (!response.ok) return;
      const datas = await response.json();
      setChatList(datas);
      // 초기 메시지에서 gameRoomTitle 추출 (모든 메시지에서 확인)
      if (datas && datas.length > 0) {
        const titleFromData = datas.find(item => item?.gameRoomTitle)?.gameRoomTitle;
        if (titleFromData) {
          setGameRoomTitle(titleFromData);
        }
      }
    };

    if (roomId && userSenderId) {
      fetchGameRoomInfo();
      getMessages();
    }

    // 2. SockJS + STOMP 클라이언트 생성
    const socket = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('연결 성공');

        // 입장 메시지
        const joinMessage = {
          gameRoomId: roomId,
          userSenderId: userSenderId,
          userReceiverId: null,
          chatMessageContent: `${userNickname}님이 입장하셨습니다.`,
          chatMessageType: 'JOIN',
          userSenderTeamcolor: userTeamColor || "black", // 팀 컬러 포함
        };

        client.publish({
          destination: '/pub/chats/send',
          body: JSON.stringify(joinMessage),
        });

        // 3. 채팅방 구독 처리
        client.subscribe(`/sub/chats/room/${roomId}`, (message) => {
          const body = JSON.parse(message.body);
          setChatList((prev) => {
            const newList = [...prev, body];
            // gameRoomTitle이 포함되어 있으면 업데이트
            if (body?.gameRoomTitle) {
              setGameRoomTitle(body.gameRoomTitle);
            }
            return newList;
          });
        });
      },
    });

    client.activate();
    stompClientRef.current = client;
    // MultiWorkspaceContainer에서 접근할 수 있도록 window에 저장
    window.stompClientRef = stompClientRef;

    // 4. 퇴장 메시지 안전하게 처리
    const handleBeforeUnload = () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        const leaveMessage = {
          gameRoomId: roomId,
          userSenderId: userSenderId,
          userReceiverId: null,
          chatMessageContent: `${userNickname}님이 퇴장하셨습니다.`,
          chatMessageType: 'LEAVE',
          userSenderTeamcolor: userTeamColor || "black", // 팀 컬러 포함
        };
        try {
          stompClientRef.current.publish({
            destination: '/pub/chats/send',
            body: JSON.stringify(leaveMessage),
          });
        } catch (err) {
          console.log('퇴장 메시지 전송 실패', err);
        }
        stompClientRef.current.deactivate();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      handleBeforeUnload();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [roomId, userSenderId, userNickname, userTeamColor]);

  // 엔터키 입력 시 메시지 전송
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e) => {
    // 한글 입력 조합 중이면 무시
    if (isComposing) return;

    // 일부 브라우저: nativeEvent.isComposing 도 같이 방어
    if (e.nativeEvent?.isComposing) return;

    if (e.key === 'Enter' && message.trim() !== '') {
      const chatData = {
        gameRoomId: roomId,
        userSenderId: userSenderId,
        userReceiverId: null,
        chatMessageContent: message,
        chatMessageType: 'MESSAGE',
      };

      // 연결 체크(가끔 연결 직후 안전장치)
      if (stompClientRef.current?.connected) {
        stompClientRef.current.publish({
          destination: '/pub/chats/send',
          body: JSON.stringify(chatData),
        });
        setMessage('');
      }
    }
  };
  // 화살표 버튼 클릭 핸들러
  const handleArrowClick = () => {
    setShowFriendList(true);
  };

  // 친구 목록 취소 핸들러
  const handleFriendListCancel = () => {
    setShowFriendList(false);
  };

  // 친구 목록이 표시될 때는 친구 목록 컴포넌트를 보여줌
  if (showFriendList) {
    return <FriendListContainer onCancel={handleFriendListCancel} />;
  }

  return (
    <S.ChatWrap>
      <S.ChatHeader>
        <h2>{gameRoomTitle || "채팅"}</h2>
      </S.ChatHeader>
      <S.ChatListWrap>
        <S.ChatList>
          {chatList.map((chat, idx) => (
            String(chat?.userSenderId) === String(userSenderId) ? (
              <S.MyChatWrap key={idx}>
                <S.MyChatLayout>{chat?.chatMessageContent}</S.MyChatLayout>
              </S.MyChatWrap>
            ) : (
              <S.OthersChatWrap key={idx}>
                <S.Avatar src="/assets/avatar.png" alt="프사" />
                <S.OnlyCol>
                  {chat?.senderNickname}
                  <S.OthersChatLyaout>{chat?.chatMessageContent}</S.OthersChatLyaout>
                </S.OnlyCol>
              </S.OthersChatWrap>
            )
          ))}
        </S.ChatList>
      </S.ChatListWrap>
      <S.RowWrap>
        <S.ArrowButton onClick={handleArrowClick}>
          <img src='/assets/images/chat/arrow_right.png' alt='초대용' className='arrow'></img>
        </S.ArrowButton>
        <S.InputBox>
          <S.Input
            type="text"
            placeholder="메시지를 입력하고 엔터를 누르세요..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
        <img src='/assets/images/chat/airplane.png' alt='전송이미지' className='airplane'></img>
        </S.InputBox>
      </S.RowWrap>
    </S.ChatWrap>
  );
};

export default ChattingContainer;
