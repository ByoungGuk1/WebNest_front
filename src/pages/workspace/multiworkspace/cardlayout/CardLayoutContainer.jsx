import UserProfile from "pages/workspace/userprofile/UserProfile";
import UserProfileBehind from "pages/workspace/userprofile/UserProfileBehind";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CardLayoutContainer = () => {
  const [users, setUsers] = useState([]);
  const params = useParams();

  const getPlayers = async () => {
    const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/player/${params.roomId}`;
    const res = await fetch(fetchUrl, {
      method: "GET",
    });

    const datas = await res.json();

    const players = datas?.data;
    console.log(players);

    const userdatas = players.map(
      (user) =>
        (user = {
          ...user,
          profileFlip: false,
          innerText: "준비 중",
          gameJoinTeamcolor: user.gameJoinTeamcolor,
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
            setUsers={setUsers}
            users={users}
            onClick={() => flipCard(user.userId, true)}
          />
        ) : (
          <UserProfileBehind
            key={index}
            userData={user}
            setUsers={setUsers}
            users={users}
            onClick={() => flipCard(user.userId, false)}
          />
        )
      )}
    </>
  );
};

export default CardLayoutContainer;
