import React, { useEffect, useState } from "react";
import S from "./style";
import UserGrade from "./common/components/UserGrade";
import ResignPlayer from "./common/components/ResignPlayer";
import { useParams } from "react-router-dom";
import useGetUserData from "hooks/useGetUserData";

const UserProfile = ({ userData, onClick, setUsers, users, getPlayers }) => {
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

  const [user, setUser] = useState(userData);
  const [teamColor, setTeamColor] = useState(
    teamColorUrl[userData?.gameJoinTeamcolor] || teamColorUrl["black"]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  const updateUserStatus = async (profileText, isReady = null) => {
    const userId = user?.userId || user?.id;
    if (!userId) {
      return;
    }

    const normalizedText = profileText.replace(/\s+/g, "");
    const shouldBeReady = normalizedText === "준비완료";

    let readyValue;
    if (isReady !== null) {
      readyValue = isReady ? 1 : 0;
    } else {
      readyValue = shouldBeReady ? 1 : 0;
    }

    const updateData = {
      userId: userId,
      gameRoomId: roomId,
      gameJoinIsHost: user.gameJoinIsHost || false,
      gameJoinTeamcolor: user.gameJoinTeamcolor,
      gameJoinMyturn: user.gameJoinMyturn || false,
      gameJoinProfileText: profileText,
      gameJoinIsReady: readyValue,
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
        setUsers((prev) => {
          return prev.map((u) =>
            u.userId === userId
              ? {
                  ...u,
                  gameJoinProfileText: profileText,
                  gameJoinIsReady: readyValue,
                }
              : u
          );
        });
      }

      setUser((prev) => ({
        ...prev,
        gameJoinProfileText: profileText,
        gameJoinIsReady: readyValue,
      }));

      if (getPlayers) {
        setTimeout(() => {
          getPlayers();
        }, 500);
      }
    } catch (error) {
      console.error("updateUserStatus error:", error);
    }
  };

  useEffect(() => {
    if (userData && userData.userId) {
      setUser(userData);
      setTeamColor(
        teamColorUrl[userData.gameJoinTeamcolor] || teamColorUrl["black"]
      );

      if (!hasInitialized) {
        setHasInitialized(true);
        const currentProfileText = userData.gameJoinProfileText?.trim() || "";
        const normalizedProfileText = currentProfileText.replace(/\s+/g, "");

        if (normalizedProfileText === "로딩중" || !currentProfileText) {
          updateUserStatus("준비중", false);
        }
      }
    }
  }, [userData, hasInitialized]);

  const handleTextClick = (e) => {
    e.stopPropagation();

    const currentUserId = currentUser?.id || currentUser?.userId;
    const userId = user?.userId || user?.id;

    const isCurrentUser = String(currentUserId) === String(userId);

    if (!isCurrentUser) {
      return;
    }

    const profileText = user.gameJoinProfileText?.trim() || "";
    const normalizedText = profileText.replace(/\s+/g, "");

    if (normalizedText === "준비중") {
      updateUserStatus("준비 완료", true);
    } else if (normalizedText === "준비완료") {
      updateUserStatus("준비중", false);
    }
  };

  const hostCrown = () =>
    user.gameJoinIsHost ? (
      <S.CrownIcon src="/assets/icons/crown.png" alt="" />
    ) : null;

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

        <S.ProfileImageWrap>
          {hostCrown()}
          <img src={user.userThumbnailURL} alt={user.userThumbnailName} />
        </S.ProfileImageWrap>

        <S.UserNameWrap>{user.userNickname}</S.UserNameWrap>
        <UserGrade level={user.userLevel} />
        <S.UserTextWrap
          onClick={handleTextClick}
          style={{
            cursor:
              (currentUser?.userId === user.userId ||
                currentUser?.id === user.userId) &&
              (() => {
                const text = user.gameJoinProfileText?.trim() || "";
                const normalized = text.replace(/\s+/g, "");
                return normalized === "준비중" || normalized === "준비완료";
              })()
                ? "pointer"
                : "default",
          }}>
          {user.gameJoinProfileText?.trim() || "준비중"}
        </S.UserTextWrap>
      </S.UserProfileWrapper>
    </div>
  );
};

export default UserProfile;
