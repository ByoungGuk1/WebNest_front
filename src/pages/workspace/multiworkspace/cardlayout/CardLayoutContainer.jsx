import UserProfile from "pages/workspace/userprofile/UserProfile";
import UserProfileBehind from "pages/workspace/userprofile/UserProfileBehind";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CardLayoutContainer = () => {
  const [users, setUsers] = useState([]);
  const params = useParams();

  const getPlayers = async () => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/game-room/${params.roomId}`,
      {
        // headers: {
        //   "Content-Type": "application/json",
        // },
        method: "GET",
        // body: JSON.stringify(players),
      }
    ).then(console.log);

    // const datas = await res.json();
    const datas = {
      players: [
        {
          id: 2,
          userId: 2,
          gameRoomId: 2,
          gameJoinIsHost: true,
          gameJoinCreateAt: "2025-11-12T20:49:29.983Z",
          userName: "testUser1",
          userBirthday: "20250115",
          userEmail: "test@test.com",
          userPhone: "01012341234",
          userThumbnailName: "default",
          userThumbnailURL: "/default",
          userNickname: "닉네임",
          userLevel: 5,
          userExp: 60,
        },
        {
          id: 9007199254740991,
          userId: 9007199254740991,
          gameRoomId: 9007199254740991,
          gameJoinIsHost: true,
          gameJoinCreateAt: "2025-11-12T20:49:29.983Z",
          userName: "string",
          userBirthday: "string",
          userEmail: "string",
          userPhone: "string",
          userThumbnailName: "string",
          userThumbnailURL: "string",
          userNickname: "string",
          userLevel: 2,
          userExp: 30,
        },
      ],
    };
    const players = datas?.players;

    const userdatas = players.map(
      (user) =>
        (user = {
          ...user,
          profileFlip: false,
          innerText: "준비 중",
          userColor: "red",
        })
    );

    setUsers(userdatas);
  };

  useEffect(() => {
    getPlayers();
  }, []);

  const flipCard = (userId, flipTo) => {
    setUsers((prev) =>
      prev.map((u) => (u.userId === userId ? { ...u, profileFlip: flipTo } : u))
    );
  };

  return (
    <>
      {users.map((user, index) =>
        !user.profileFlip ? (
          <UserProfile
            key={index}
            userData={user}
            inputText={user.innerText}
            onClick={() => flipCard(user.userId, true)}
          />
        ) : (
          <UserProfileBehind
            key={index}
            userData={user}
            setUsers={setUsers}
            onClick={() => flipCard(user.userId, false)}
          />
        )
      )}
    </>
  );
};

export default CardLayoutContainer;
