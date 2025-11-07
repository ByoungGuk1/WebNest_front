import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Chatting01 = () => {
  const [message, setMessage] = useState('');       // 입력 중인 메시지
  const [chatList, setChatList] = useState([]);     // 받은 메시지 목록
  const stompClientRef = useRef(null);

  // 리덕스에 로그인한 유저 정보 조회
  const currentUser = useSelector((state) => state.user.currentUser)
  const customerSenderId = currentUser?.id;
  const customerName = currentUser?.customerName;

  // 클릭한 채팅방 아이디 조회
  const { roomId } = useParams()

  useEffect(() => {

    // 최초 한 번 도착했을 때 채팅방에 저장된 리스트를 모두 들고와서 초기값으로 넣는다.
    const getMessages = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/chats/get-messages/${roomId}`)
      const datas = await response.json()
      setChatList(datas)
    }

    getMessages()

    // SockJS + STOMP 클라이언트 생성
    const socket = new SockJS(`${process.env.REACT_APP_BACKEND_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        // 채팅방 연결 시
        console.log('WebSocket 연결 성공!');

        // 1. 입장 메세지
        const joinMessage = {
            myChatRoomId: roomId,
            customerSenderId: customerSenderId,
            customerReceiverId: null,
            myChatContent: `${customerName}님이 입장하셨습니다.`,
            myChatType: 'JOIN',   // 메시지 타입 표시
          };
          client.publish({
            destination: '/pub/chat/send',
            body: JSON.stringify(joinMessage),
          });

        // 2. 채팅방 구독(구독 경로는 sub)
        client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          const body = JSON.parse(message.body);
          console.log('받은 메시지:', body);
          setChatList((prev) => [...prev, body]);
        });
      },
      onDisconnect: () => {
        // 채팅방 종료 시
        // 1. 퇴장 메세지
        const leaveMessage = {
          myChatRoomId: roomId,
          customerSenderId: customerSenderId,
          customerReceiverId: null,
          myChatContent: `${customerName}님이 퇴장하셨습니다.`,
          myChatType: 'LEAVE',
        };
        client.publish({
          destination: '/pub/chat/send',
          body: JSON.stringify(leaveMessage),
        });
      }
    });

    client.activate();
    stompClientRef.current = client;

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, []);

  // 엔터키 입력 시 메시지 전송
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && message.trim() !== '') {
      const chatData = {
        myChatRoomId: roomId, // 채팅방 ID
        customerSenderId: customerSenderId, // 보낸 사람 ID
        customerReceiverId: null, // 받는 사람이 null이라면 전체메세지
        myChatContent: message, // 메시지 내용
        myChatType: 'MESSAGE',
      };

      stompClientRef.current.publish({
        destination: '/pub/chat/send', // 보낼 경로
        body: JSON.stringify(chatData),
      });

      setMessage(''); // 입력창 비우기
    }
  };

  return (
    <div style={{ padding: '20px', width: '400px', margin: '0 auto' }}>
      <h2>채팅</h2>
      <div
        style={{
          border: '1px solid #ccc',
          height: '300px',
          overflowY: 'auto',
          padding: '10px',
          marginBottom: '10px',
        }}
      >
        {chatList.map((chat, idx) => (
          <div key={idx}>
            <strong>{chat.customerSenderId}</strong>: {chat.myChatContent}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="메시지를 입력하고 엔터를 누르세요..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ width: '100%', padding: '10px' }}
      />
    </div>
  );
};

export default Chatting01;
