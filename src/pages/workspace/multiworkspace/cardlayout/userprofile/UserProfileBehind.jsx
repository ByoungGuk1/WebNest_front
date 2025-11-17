import React, { useEffect, useState } from "react";
import S from "./style";
import UserGrade from "./common/components/UserGrade";
import useGetUserData from "hooks/useGetUserData";
import ResignPlayer from "./common/components/ResignPlayer";
import { useParams } from "react-router-dom";

const UserProfileBehind = ({
  userData,
  setUsers,
  onClick,
  users,
  getPlayers,
}) => {
  const user = userData;
  const { currentUser } = useGetUserData();
  const params = useParams();
  const roomId = params.roomId;

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

  const [teamColor, setTeamColor] = useState(
    teamColorUrl[user.gameJoinTeamcolor]
  );

  useEffect(() => {
    setTeamColor(teamColorUrl[user.gameJoinTeamcolor]);
  }, [userData]);

  const hostCrown = () =>
    user.gameJoinIsHost ? (
      <S.CrownIcon src="/assets/icons/crown.png" alt="" />
    ) : null;

  const changeColor = async (userId, color) => {
    const updateData = {
      userId: userId,
      gameRoomId: roomId,
      gameJoinIsHost: user.gameJoinIsHost || false,
      gameJoinTeamcolor: color,
      gameJoinMyturn: user.gameJoinMyturn || false,
      gameJoinProfileText: user.gameJoinProfileText || "준비중",
      gameJoinIsReady: user.gameJoinIsReady || 0,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/player/${roomId}/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        return;
      }

      await response.json();

      if (setUsers) {
        setUsers((prev) =>
          prev.map((u) =>
            u.userId === userId ? { ...u, gameJoinTeamcolor: color } : u
          )
        );
      }

      if (getPlayers) {
        setTimeout(() => {
          getPlayers();
        }, 500);
      }
    } catch (error) {}
  };

  const selectColorButton = (color) => {
    const profileText = user.gameJoinProfileText?.trim() || "";
    const normalizedText = profileText.replace(/\s+/g, "");
    const isReady =
      user.gameJoinIsReady === true ||
      user.gameJoinIsReady === 1 ||
      normalizedText === "준비완료";

    const isCurrentUser =
      currentUser?.userId === user.userId || currentUser?.id === user.userId;

    return (
      <S.ColorButton
        key={color}
        name={color}
        onClick={(e) => {
          if (!isCurrentUser) return;

          if (isReady) {
            alert("준비완료 상태에서는 색상을 변경할 수 없습니다.");
            return;
          }

          changeColor(user.userId, color);
        }}
        style={{
          backgroundImage: `url(${teamColorUrl[color]})`,
          backgroundSize: "contain",
          opacity: isReady && isCurrentUser ? 0.5 : 1,
          cursor: isReady && isCurrentUser ? "not-allowed" : "pointer",
        }}
      />
    );
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  return (
    <div>
      <S.UserProfileWrapper
        onClick={handleBackgroundClick}
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
