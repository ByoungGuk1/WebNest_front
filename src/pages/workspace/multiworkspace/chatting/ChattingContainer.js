import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import S from './style'

const ChattingContainer = () => {
  const [message, setMessage] = useState('');       // 입력 중인 메시지
  const [chatList, setChatList] = useState([]);     // 받은 메시지 목록
  const stompClientRef = useRef(null);
  // 리덕스에서 로그인한 유저 정보 조회
  const currentUser = useSelector((state) => state.user.currentUser);
  const userSenderId = currentUser?.id;
  const userNickname = currentUser?.userNickname;
  // 클릭한 채팅방 ID
  console.log(chatList.userSenderId)
  const { roomId } = useParams();
  useEffect(() => {
    // 최초 한 번: 채팅방 메시지 불러오기
    const getMessages = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/chats/get-messages/${roomId}?userSenderId=${userSenderId}&userReceiverId=`
      );
      if (!response.ok) return;
      const datas = await response.json();
      setChatList(datas);
    };

    getMessages();

    // SockJS + STOMP 클라이언트 생성
    const socket = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ WebSocket 연결 성공');

        // 1. 입장 메시지
        const joinMessage = {
          gameRoomId: roomId,
          userSenderId: userSenderId,
          userReceiverId: null,
          chatMessageContent: `${userNickname}님이 입장하셨습니다.`,
          chatMessageType: 'JOIN',
        };

        client.publish({
          destination: '/pub/chats/send',
          body: JSON.stringify(joinMessage),
        });

        // 2. 채팅방 구독
        client.subscribe(`/sub/chats/room/${roomId}`, (message) => {
          const body = JSON.parse(message.body);
          console.log('받은 메시지:', body);
          setChatList((prev) => [...prev, body]);
        });
      },
      onDisconnect: () => {
        // 3. 퇴장 메시지
        const leaveMessage = {
          gameRoomId: roomId,
          userSenderId: userSenderId,
          userReceiverId: null,
          chatMessageContent: `${userNickname}님이 퇴장하셨습니다.`,
          chatMessageType: 'LEAVE',
        };
        client.publish({
          destination: '/pub/chats/send',
          body: JSON.stringify(leaveMessage),
        });
      },
    });

    client.activate();
    stompClientRef.current = client;

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [roomId, userSenderId, userNickname]);

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
      userSenderId,
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
  console.log(chatList)

  return (
    <S.ChatWrap>
      <S.ChatHeader>
        <h2>채팅</h2>
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
                  <S.OthersChatLyaout>{chat?.chatMessageContent}</S.OthersChatLyaout>
                </S.OnlyCol>
              </S.OthersChatWrap>
            )
          ))}
        </S.ChatList>
      </S.ChatListWrap>
      <S.RowWrap>
        <img src='/assets/images/chat/arrow_right.png' alt='초대용' className='arrow'></img>
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
