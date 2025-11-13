import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ChattingContainer = () => {
  const [message, setMessage] = useState('');       // 입력 중인 메시지
  const [chatList, setChatList] = useState([]);     // 받은 메시지 목록
  const stompClientRef = useRef(null);

  // 리덕스에서 로그인한 유저 정보 조회
  const currentUser = useSelector((state) => state.user.currentUser);
  const userSenderId = currentUser?.id;
  const userNickname = currentUser?.userNickname;

  // 클릭한 채팅방 ID
  const { roomId } = useParams();

  useEffect(() => {
    // 1. 채팅 메시지 초기 불러오기
    const getMessages = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/chats/get-messages/${roomId}?userSenderId=${userSenderId}&userReceiverId=`
      );
      if (!response.ok) return;
      const datas = await response.json();
      setChatList(datas);
    };

    getMessages();

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
        };

        client.publish({
          destination: '/pub/chats/send',
          body: JSON.stringify(joinMessage),
        });

        // 3. 채팅방 구독 처리
        client.subscribe(`/sub/chats/room/${roomId}`, (message) => {
          const body = JSON.parse(message.body);
          setChatList((prev) => [...prev, body]);
        });
      },
    });

    client.activate();
    stompClientRef.current = client;

    // 4. 퇴장 메시지 안전하게 처리
    const handleBeforeUnload = () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        const leaveMessage = {
          gameRoomId: roomId,
          userSenderId: userSenderId,
          userReceiverId: null,
          chatMessageContent: `${userNickname}님이 퇴장하셨습니다.`,
          chatMessageType: 'LEAVE',
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
  }, [roomId, userSenderId, userNickname]);

  // 엔터키 입력 시 메시지 전송
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && message.trim() !== '') {
      if (stompClientRef.current && stompClientRef.current.connected) {
        const chatData = {
          gameRoomId: roomId,
          userSenderId: userSenderId,
          userReceiverId: null,
          chatMessageContent: message,
          chatMessageType: 'MESSAGE',
        };

        stompClientRef.current.publish({
          destination: '/pub/chats/send',
          body: JSON.stringify(chatData),
        });
        setMessage('');
      } else {
        console.log('연결이 되어 있지 않아 메시지를 보낼 수 없습니다.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', width: '400px', margin: '0 auto' }}>
      <h2>채팅</h2>

      <div
        style={{
          minHeight: '300px',
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '10px',
          overflowY: 'auto',
        }}
      >
        {chatList.map((chat, idx) => (
          <div key={idx}>
            <strong>{chat?.senderNickname}</strong>: {chat.chatMessageContent}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="메시지를 입력하고 엔터를 누르세요..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ width: '100%', padding: '8px' }}
      />
    </div>
  );
};

export default ChattingContainer;
