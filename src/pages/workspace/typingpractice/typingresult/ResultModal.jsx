import React from "react";
import S from "./resultStyle";

const ResultModal = ({ wpm, accuracy, time, onClose, onRetry }) => {
  console.log("🔥 ResultModal 렌더링:", { wpm, accuracy, time });
  
  return (
    <S.ModalOverlay>
      <S.ModalBox>
        <S.ModalImage src="/assets/images/chicken.png" alt="캐릭터" />


        <S.Title>타자 결과</S.Title>

        <S.Row>
          <span>타수(타/분)</span>
          <span>{wpm || 0} 타/분</span>
        </S.Row>

        <S.Row>
          <span>정확도(%)</span>
          <span>{accuracy || 0}%</span>
        </S.Row>

        <S.Row>
          <span>소요시간</span>
          <span>{(time || 0).toFixed(1)} 초</span>
        </S.Row>

        <S.ButtonWrapper>
          <button onClick={onRetry}>다시하기</button>
          <button onClick={onClose}>그만하기</button>
        </S.ButtonWrapper>
      </S.ModalBox>
    </S.ModalOverlay>
  );
};

export default ResultModal;
