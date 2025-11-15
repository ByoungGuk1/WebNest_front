import UserProfile from "./userprofile/UserProfile";
import UserProfileBehind from "./userprofile/UserProfileBehind";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CardLayoutContainer = () => {
  const [users, setUsers] = useState([]);
  const params = useParams();

  const getPlayers = async () => {
    try {
      const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/player/${params.roomId}`;
      const res = await fetch(fetchUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        return;
      }

      const datas = await res.json();
      const players = datas?.data || [];

      if (!Array.isArray(players)) {
        return;
      }

      const userdatas = players.map((user) => ({
        ...user,
        profileFlip: false,
        gameJoinProfileText: user.gameJoinProfileText || "로딩 중",
      }));

      setUsers(userdatas);
    } catch (error) {}
  };

  useEffect(() => {
    getPlayers();
  }, [params.roomId]);

  const flipCard = (userId, flipTo) => {
    setUsers((prev) =>
      prev.map((u) => (u.userId === userId ? { ...u, profileFlip: flipTo } : u))
    );
  };

  return (
    <>
      {users.map((user, index) => {
        return !user.profileFlip ? (
          <UserProfile
            key={index}
            userData={user}
            setUsers={setUsers}
            users={users}
            getPlayers={getPlayers}
            onClick={() => flipCard(user.userId, true)}
          />
        ) : (
          <UserProfileBehind
            key={index}
            userData={user}
            setUsers={setUsers}
            users={users}
            getPlayers={getPlayers}
            onClick={() => flipCard(user.userId, false)}
          />
        );
      })}
    </>
  );
};

export default CardLayoutContainer;
