import React from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import S from "../../style";

const resignPlayerButton = () => {
  const { currentUser, isLogin } = useGetUserData();

  const resignPlayerFetch = async (userId) => {
    // await fetch(``);
    // db에서 해당 유저 제외
    return userId;
  };

  const resignPlayer = (user) => {
    if (user.gameJoinIsHost || user.userId === currentUser.userId) {
      return (
        <S.ResignButton
          type="button"
          onClick={() => resignPlayerFetch(user.userId)}>
          <FontAwesomeIcon
            icon={faX}
            size="2xs"
            style={{
              cursor: "pointer",
            }}
          />
        </S.ResignButton>
      );
    }
    return null;
  };

  return { resignPlayer };
};

export default resignPlayerButton;
