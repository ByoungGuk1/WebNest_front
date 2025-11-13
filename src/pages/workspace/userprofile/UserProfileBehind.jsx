import React, { useEffect, useState } from "react";
import S from "./style";
import UserGrade from "./UserGrade";
import useGetUserData from "hooks/useGetUserData";
import ResignPlayer from "./common/components/ResignPlayer";

const UserProfileBehind = ({ userData, setUsers, onClick, users }) => {
  const user = userData;
  const { currentUser } = useGetUserData();

  const teamColorUrl = {
    yellow: "/assets/background/yellow.png",
    aqua: "/assets/background/aqua.png",
    black: "/assets/background/black.png",
    blue: "/assets/background/blue.png",
    green: "/assets/background/green.png",
    orange: "/assets/background/orange.png",
    purple: "/assets/background/purple.png",
    red: "/assets/background/red.png",
  };

  const [teamColor, setTeamColor] = useState(teamColorUrl[user.gameJoinTeamcolor]);

  useEffect(() => {
    setTeamColor(teamColorUrl[user.gameJoinTeamcolor]);
  }, [userData]);

  const hostCrown = () =>
    user.gameJoinIsHost ? (
      <S.CrownIcon src="/assets/icons/crown.png" alt="" />
    ) : null;

  const changeColor = (userId, color) => {
    setUsers((prev) =>
      prev.map((u) => (u.userId === userId ? { ...u, gameJoinTeamcolor: color } : u))
    );
  };

  const selectColorButton = (color) => (
    <S.ColorButton
      key={color}
      name={color}
      onClick={(e) => {
        if (
          currentUser?.userId === user.userId ||
          currentUser?.id === user.userId
        ) {
          changeColor(user.userId, color);
        }
      }}
      style={{
        backgroundImage: `url(${teamColorUrl[color]})`,
        backgroundSize: "contain",
      }}
    />
  );

  return (
    <div>
      <S.UserProfileWrapper
        onClick={onClick}
        style={{
          backgroundImage: `url(${teamColor})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <ResignPlayer user={user} setUsers={setUsers} users={users} />

        <S.UserNameWrap>
          {hostCrown()}
          {user.userNickname}
        </S.UserNameWrap>

        <UserGrade level={user.userLevel} />

        <S.SelectColorWrap>
          {selectColorButton("aqua")}
          {selectColorButton("black")}
          {selectColorButton("blue")}
          {selectColorButton("green")}
          {selectColorButton("orange")}
          {selectColorButton("purple")}
          {selectColorButton("red")}
          {selectColorButton("yellow")}
        </S.SelectColorWrap>

        <S.UserExpBar value={user.userExp} min="0" max="100" />
      </S.UserProfileWrapper>
    </div>
  );
};

export default UserProfileBehind;
