import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RoomList = () => {

  const [rooms, setRooms] = useState([])
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const getRooms = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/game-rooms/`)
      if(!response.ok) throw new Error('채팅방 불러오는 중 에러 발생')
      const datas = await response.json()
      const {message, data} = await datas;
      setRooms(data)
      setIsLoading(false)
    }

    getRooms()  
      .catch((error) => {
        setIsLoading(true)
      })
  }, [])

  if(isLoading){
    return <div>게임방 목록을 불러오는 중...😅</div>
  }

  if(!rooms.length){
    return <div>게임방 목록이 없습니다.😥</div>
  }

  console.log(rooms)

  const roomList = rooms.map(({gameRoomCreateAt, gameRoomCurrentPlayer, gameRoomIsOpen, gameRoomIsStart, gameRoomIsTeam, gameRoomMaxPlayer, gameRoomPassKey, gameRoomTitle, gameRoomType, id, }, i) => (
    <li key={i}>
      <Link to={`/workspace/rooms/${id}/${gameRoomType}`}>
        {gameRoomTitle} ({gameRoomCurrentPlayer}/{gameRoomMaxPlayer})
      </Link>
    </li>
  ))

  return (
    <div>
      <ul>
        {roomList}
      </ul>
    </div>
  );
};

export default RoomList;