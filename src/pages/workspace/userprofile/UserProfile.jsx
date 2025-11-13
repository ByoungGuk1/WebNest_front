import React, { useEffect, useState } from "react";
import S from "./style";
import UserGrade from "./UserGrade";
import ResignPlayer from "./common/components/ResignPlayer";

const UserProfile = ({ userData, onClick, setUsers, users }) => {
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
  const [teamColor, setTeamColor] = useState(teamColorUrl[userData.gameJoinTeamcolor]);

  useEffect(() => {
    setUser(userData);
    setTeamColor(teamColorUrl[userData.gameJoinTeamcolor]);
  }, [userData]);

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
        <S.UserTextWrap>{user.innerText}</S.UserTextWrap>
      </S.UserProfileWrapper>
    </div>
  );
};

export default UserProfile;
