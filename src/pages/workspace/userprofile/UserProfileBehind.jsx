import React from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import S from "./style";
import { useEffect, useState } from "react";
import UserGrade from "./UserGrade";

const UserProfileBehind = ({ userData, setUsers, onClick }) => {
  const user = userData;

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

  const selectColorButtons = () => (
    <S.SelectColorWrap>
      <S.ColorButton name="aqua"></S.ColorButton>
      <S.ColorButton name="black"></S.ColorButton>
      <S.ColorButton name="blue"></S.ColorButton>
      <S.ColorButton name="green"></S.ColorButton>
      <S.ColorButton name="orange"></S.ColorButton>
      <S.ColorButton name="purple"></S.ColorButton>
      <S.ColorButton name="red"></S.ColorButton>
      <S.ColorButton name="yellow"></S.ColorButton>
    </S.SelectColorWrap>
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
        <S.ResignButton type="button">
          <FontAwesomeIcon
            icon={faX}
            size="2xs"
            style={{
              cursor: "pointer",
            }}
          />
        </S.ResignButton>
        <S.UserNameWrap>
          {hostCrown()}
          {user.userNickname}
        </S.UserNameWrap>
        <UserGrade level={user.userLevel} />
        {selectColorButtons()}
        <S.UserExpBar value={user.userExp} min="0" max="100" />
      </S.UserProfileWrapper>
    </div>
  );
};

export default UserProfileBehind;
