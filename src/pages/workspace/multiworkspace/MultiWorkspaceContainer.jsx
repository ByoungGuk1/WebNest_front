import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import S from "./style";
import ChattingContainer from "./chatting/ChattingContainer";
import UserProfile from "../userprofile/UserProfile";

const MultiWorkspaceRoomContainer = () => {
  const [user, setUser] = useState([
    {
      userName: "홍길동",
      userImage: "",
      userLevel: 1,
      userColor: "red",
      isHost: true,
      innerText: "방장",
    },
    {
      userName: "22222",
      userImage: "",
      userLevel: 3,
      userColor: "blue",
      isHost: false,
      innerText: "준비 완료",
    },
  ]);

  return (
    <S.Wrapper>
      <S.MenuLayout>
        <div>
          <span>도움말</span>
          <span>설정</span>
          <span>나가기</span>
        </div>
      </S.MenuLayout>
      <S.MainWrapper>
        <S.Content>
          <Outlet />
        </S.Content>
        <S.ChattingLayout>
          <ChattingContainer />
        </S.ChattingLayout>
      </S.MainWrapper>
      <S.CardLayout>
        <UserProfile userData={user[0]} inputText="text" />
        <UserProfile userData={user[1]} inputText="text" />
        <UserProfile userData={user[0]} inputText="text" />
        <UserProfile userData={user[1]} inputText="text" />
        <UserProfile userData={user[0]} inputText="text" />
        <UserProfile userData={user[1]} inputText="text" />
        <UserProfile userData={user[0]} inputText="text" />
        <UserProfile userData={user[1]} inputText="text" />
      </S.CardLayout>
    </S.Wrapper>
  );
};

export default MultiWorkspaceRoomContainer;
