import React from "react";
import { Outlet } from "react-router-dom";
import S from "./style";
import ChattingContainer from "./chatting/ChattingContainer";

const MultiWorkspaceRoomContainer = () => {
  return (
    <S.Wrapper>
        <S.HelperWwrap>
          <S.HelperItems>
            <span>도움말</span>
          </S.HelperItems>
          <S.HelperItems>
            <span>설정</span>
          </S.HelperItems>
          <S.HelperItems>
            <span>나가기</span>
          </S.HelperItems>
        </S.HelperWwrap>
      <S.MainWrapper>
        <S.Content>
          <Outlet />
        </S.Content>
        <S.ChattingLayout>
          <ChattingContainer />
        </S.ChattingLayout>
      </S.MainWrapper>
      <S.CardLayout>
        카드 부분
      </S.CardLayout>
    </S.Wrapper>
  );
};

export default MultiWorkspaceRoomContainer;
