import React from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import S from "../../style";
import useGetUserData from "hooks/useGetUserData";
import { useParams } from "react-router-dom";

const ResignPlayer = ({ user, setUsers, users }) => {
  const { currentUser } = useGetUserData();

  const params = useParams();
  const roomId = params.roomId;

  const currentUserInRoom = users?.find(
    (u) => u.userId === currentUser?.userId || u.userId === currentUser?.id
  );
  const isHost = currentUserInRoom?.gameJoinIsHost;

  if (!isHost) return null;

  const isCurrentUser =
    user.userId === currentUser?.userId || user.userId === currentUser?.id;
  if (isCurrentUser) return null;

  const handleClick = async (e) => {
    e.stopPropagation();

    const confirmMessage = `${user.userNickname}님을 정말 강퇴하시겠습니까?`;
    if (!window.confirm(confirmMessage)) {
      return;
    }

    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/player/${roomId}/${user.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );

    setUsers((prev) => prev.filter((u) => u.userId !== user.userId));
  };

  return (
    <S.ResignButton type="button" onClick={handleClick}>
      <FontAwesomeIcon icon={faX} size="2xs" />
    </S.ResignButton>
  );
};

export default ResignPlayer;
