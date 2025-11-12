import UserProfile from "pages/workspace/userprofile/UserProfile";
import React, { useEffect, useState } from "react";

const CardLayoutContainer = ({ roomStatus }) => {
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
    getPlayers();
  }, [roomNumber]);

  const getPlayers = async () => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/game-room/${roomNumber}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        // body: JSON.stringify(players),
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
      {Array.isArray(users) &&
        users.map((user, index) => (
          <UserProfile
            key={index}
            userData={user}
            inputText={user?.innerText ? user.innerText : "대기 중"}
          />
        ))}
    </>
  );
};

export default CardLayoutContainer;
