import UserProfile from "./userprofile/UserProfile";
import UserProfileBehind from "./userprofile/UserProfileBehind";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

const CardLayoutContainer = () => {
  const [users, setUsers] = useState([]);
  const params = useParams();

  const getPlayers = useCallback(async () => {
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

      setUsers((prevUsers) => {
        const userdatas = players.map((user) => {
          const existingUser = prevUsers.find((u) => u.userId === user.userId);
          return {
            ...user,
            profileFlip: existingUser?.profileFlip || false,
            gameJoinProfileText: user.gameJoinProfileText || "로딩 중",
          };
        });
        return userdatas;
      });
    } catch (error) {
      console.error("getPlayers error:", error);
    }
  }, [params.roomId]);

  useEffect(() => {
    if (!params.roomId) return;

    getPlayers();

    const interval = setInterval(() => {
      getPlayers();
    }, 3000);

    return () => clearInterval(interval);
  }, [params.roomId, getPlayers]);

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
