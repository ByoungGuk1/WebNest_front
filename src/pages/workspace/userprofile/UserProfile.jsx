import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import S from "./style";
import { useEffect, useState } from "react";
import UserGrade from "./UserGrade";

const UserProfile = ({ userData, inputText }) => {
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

  const [user, setUser] = useState({
    userName: "",
    userImage: "",
    userLevel: 0,
    userColor: "",
    isHost: false,
  });
  const [innerText, setInnerText] = useState("");
  const [teamColor, setTeamColor] = useState(teamColorUrl[user.userColor]);

  useEffect(() => {
    setUser(userData);
    setInnerText(inputText);
    setTeamColor(teamColorUrl[user.userColor]);
  }, [user, innerText]);

  const hostCrown = () => {
    if (user.isHost) {
      return <S.CrownIcon src="/assets/icons/crown.png" alt="" />;
    }
    return null;
  };

  return (
    <div>
      <S.UserProfileWrapper
        style={{
          backgroundImage: `url(${teamColor})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <S.ResignButton type="button">
          <FontAwesomeIcon
            icon={faX}
            size="2xs"
            style={{
              cursor: "pointer",
            }}
          />
        </S.ResignButton>
        <S.ProfileImageWrap>
          {hostCrown()}
          <img src="" alt="." />
        </S.ProfileImageWrap>
        <S.UserNameWrap>{user.userName}</S.UserNameWrap>
        <UserGrade level={user.userLevel} />
        <S.UserTextWrap>{innerText}</S.UserTextWrap>
      </S.UserProfileWrapper>
    </div>
  );
};

export default UserProfile;
