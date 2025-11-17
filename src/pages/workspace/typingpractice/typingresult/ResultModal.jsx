import React, { useContext } from "react";
import S from "./resultStyle";
import { TypingContext } from "context/TypingContext";
import { useNavigate } from "react-router-dom";

const ResultModal = () => {

  const {state, actions } = useContext(TypingContext)
  const { runningTime, wordCount } = state;
  const {minutes, seconds, millisecond} = runningTime
  const navigate = useNavigate()

  const finishTime = `${minutes}.${seconds}.${millisecond}`
  const finishTyping = Number(wordCount) / (Number(minutes) || 1);

  return (
    <S.ModalOverlay>
      <S.ModalBox>
        <S.ModalImage src="/assets/images/chicken.png" alt="캐릭터" />


        <S.Title>타자 결과</S.Title>

        <S.Row>
          <span>타수(타/분)</span>
          <span>{finishTyping} 타/분</span>
        </S.Row>

        <S.Row>
          <span>정확도(%)</span>
          <span>{0}%</span>
        </S.Row>

        <S.Row>
          <span>소요시간</span>
          <span>{finishTime}</span>
        </S.Row>

        <S.ButtonWrapper>
          <button>다시하기</button>
          <button onClick={() => navigate("/workspace/rooms/", { replace: true })}>그만하기</button>
        </S.ButtonWrapper>
      </S.ModalBox>
    </S.ModalOverlay>
  );
};

export default ResultModal;
