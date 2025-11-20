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
          // gameJoinIsReady 값에 따라 gameJoinProfileText 설정 (가져온 데이터 최우선)
          let profileText = user.gameJoinProfileText || "로딩 중";
          if (user.gameJoinIsReady === true || user.gameJoinIsReady === 1) {
            profileText = "준비 완료";
          } else if (
            user.gameJoinIsReady === false ||
            user.gameJoinIsReady === 0
          ) {
            profileText = user.gameJoinProfileText || "준비중";
          }
          return {
            ...user,
            profileFlip: existingUser?.profileFlip || false,
            gameJoinProfileText: profileText,
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
