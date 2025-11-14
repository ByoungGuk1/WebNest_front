import React from "react";
import { Outlet } from "react-router-dom";
import S from "./style";
import ChattingContainer from "./chatting/ChattingContainer";
import CardLayoutContainer from "./cardlayout/CardLayoutContainer";

const MultiWorkspaceRoomContainer = () => {
  const roomStatus = 1;
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
        <CardLayoutContainer roomStatus={roomStatus} />
      </S.CardLayout>
    </S.Wrapper>
  );
};

export default MultiWorkspaceRoomContainer;
