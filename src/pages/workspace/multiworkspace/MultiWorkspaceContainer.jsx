import React, { useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import S from "./style";
import ChattingContainer from "./chatting/ChattingContainer";
import CardLayoutContainer from "./cardlayout/CardLayoutContainer";
import { useSelector } from "react-redux";

const MultiWorkspaceRoomContainer = () => {
  const roomStatus = 1;
  const { roomId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userSenderId = currentUser?.id;
  const userNickname = currentUser?.userNickname;

  const handleExitClick = () => {
    // 채팅 STOMP 클라이언트 가져오기
    const stompClient = window.stompClientRef?.current;
    
    if (stompClient && stompClient.connected) {
      // LEAVE 메시지 전송
      const leaveMessage = {
        gameRoomId: roomId,
        userSenderId: userSenderId,
        userReceiverId: null,
        chatMessageContent: `${userNickname}님이 퇴장하셨습니다.`,
        chatMessageType: 'LEAVE',
      };
      
      try {
        stompClient.publish({
          destination: '/pub/chats/send',
          body: JSON.stringify(leaveMessage),
        });
        console.log('퇴장 메시지 전송:', leaveMessage);
      } catch (err) {
        console.log('퇴장 메시지 전송 실패', err);
      }
      
      // 메시지 전송 후 약간의 지연을 두고 연결 해제 및 이동
      setTimeout(() => {
        if (stompClient.connected) {
          stompClient.deactivate();
        }
        navigate('/workspace/rooms');
      }, 1000);
    } else {
      // STOMP 클라이언트가 없으면 바로 이동
      navigate('/workspace/rooms');
    }
  };

  return (
    <S.Wrapper>
        <S.HelperWwrap>
          <S.HelperItems data-type="help">
            <span>도움말</span>
            <img src="/assets/gameroom/info.png" alt="아이콘"></img>
          </S.HelperItems>
          <S.HelperItems data-type="settings">
            <span>설정</span>
            <img src="/assets/gameroom/setting.png" alt="아이콘"></img>
          </S.HelperItems>
          <S.HelperItems data-type="exit" onClick={handleExitClick}>
            <span>나가기</span>
            <img src="/assets/gameroom/exit.png" alt="아이콘"></img>
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
        <CardLayoutContainer roomStatus={roomStatus} />
      </S.CardLayout>
    </S.Wrapper>
  );
};

export default MultiWorkspaceRoomContainer;
