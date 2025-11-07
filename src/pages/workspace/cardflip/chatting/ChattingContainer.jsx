import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import S from "./style";

const ChattingContainer = () => {
  const [rooms, setRooms] = useState([]);


  // 채팅방 개설 모달
  const [isModal, setIsModal] = useState(false);
  const handleModal = () => setIsModal(!isModal);

  // 채팅방 전체 목록 불러오기
  const getRooms = async () => {
      const response = await fetch("http://localhost:10000/chat-rooms/get-rooms");
      const rooms = await response.json();
      const { data } = rooms;
      setRooms(data);
  };

  // 컴포넌트 마운트 시 최초 한 번 조회
  useEffect(() => {
    getRooms();
  }, []);

  // 채팅방 클릭 시 입장 (roomId 전달)
  return (
    <div style={{ padding: "20px" }}>
      <div>
        <button onClick={handleModal}>채팅방 개설</button>
        {isModal && (
          <>
            <Modal handleModal={handleModal} />
            <S.ModalBG />
          </>
        )}
      </div>
      <h2>채팅방 목록</h2>
      <ul>
        {rooms.map((room) => (
          <S.Li
            key={room.id}
          >
            <Link to={`/chat/${room.id}`}>
              {room.myChatRoomName}
            </Link>
          </S.Li>
        ))}
      </ul>
    </div>
  );
};

export default ChattingContainer;
