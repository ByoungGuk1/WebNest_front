import UserProfile from "pages/workspace/userprofile/UserProfile";
import React, { useEffect, useState } from "react";

const CardLayoutContainer = (roomStatus) => {
  const [users, setUsers] = useState([
    {
      userName: "홍길동",
      userImage: "",
      userLevel: 1,
      userColor: "red",
      isHost: true,
      innerText: "방장",
    },
    {
      userName: "22222",
      userImage: "",
      userLevel: 3,
      userColor: "blue",
      isHost: false,
      innerText: "준비 완료",
    },
  ]);

  const roomNumber = 1;

  useEffect(() => {
    getPlayers;
  }, [user]);

  const getPlayers = async () => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/game-room/${roomNumber}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        body: JSON.stringify(players),
      }
    )
      .then((res) => res.json())
      .then((datas) => datas.players)
      .then((players) => {
        setUsers(players);
      });
  };

  return (
    <>
      <UserProfile userData={users[0]} inputText="text" />
      <UserProfile userData={users[1]} inputText="text" />
      <UserProfile userData={users[0]} inputText="text" />
      <UserProfile userData={users[1]} inputText="text" />
    </>
  );
};

export default CardLayoutContainer;
