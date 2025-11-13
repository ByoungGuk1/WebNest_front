import React from "react";

import S from "./style";
import { useEffect, useState } from "react";
import UserGrade from "./UserGrade";
import resignPlayerButton from "./common/components/resignPlayerButton";
import useGetUserData from "hooks/useGetUserData";

const UserProfileBehind = ({ userData, setUsers, onClick }) => {
  const user = userData;
  const { currentUser, isLogin } = useGetUserData();

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

  const [teamColor, setTeamColor] = useState(teamColorUrl[user.userColor]);

  useEffect(() => {
    setTeamColor(teamColorUrl[user.userColor]);
  }, [user]);

  const hostCrown = () => {
    if (user.gameJoinIsHost) {
      return <S.CrownIcon src="/assets/icons/crown.png" alt="" />;
    }
    return null;
  };

  const changeColor = (userId, color) => {
    setUsers((prev) =>
      prev.map((u) => (u.userId === userId ? { ...u, userColor: color } : u))
    );
  };

  const selectColorButton = (color) => (
    <S.ColorButton
      key={color}
      name={color}
      onClick={
        currentUser?.userId === user.userId
          ? () => changeColor(user.userId, color)
          : null
      }
      style={{
        backgroundImage: `url(${teamColorUrl[color]})`,
        backgroundSize: "contain",
      }}
    />
  );

  const selectColorButtons = () => (
    <>
      {selectColorButton("aqua")}
      {selectColorButton("black")}
      {selectColorButton("blue")}
      {selectColorButton("green")}
      {selectColorButton("orange")}
      {selectColorButton("purple")}
      {selectColorButton("red")}
      {selectColorButton("yellow")}
    </>
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
        <resignPlayerButton uesr={user} />
        <S.UserNameWrap>
          {hostCrown()}
          {user.userNickname}
        </S.UserNameWrap>
        <UserGrade level={user.userLevel} />
        <S.SelectColorWrap>{selectColorButtons()}</S.SelectColorWrap>
        <S.UserExpBar value={user.userExp} min="0" max="100" />
      </S.UserProfileWrapper>
    </div>
  );
};

export default UserProfileBehind;
