import React, { useContext, useEffect } from "react";
import S from "./resultStyle";
import { TypingContext } from "context/TypingContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ResultModal = () => {
  const { state, actions } = useContext(TypingContext);
  const { finalResult, currentTypingId } = state;

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?.id;

  // 기록 저장
  useEffect(() => {
    if (!finalResult || !userId) return;
    const saveRecord = async () => {
      try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/typing/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            wpm: Number(finalResult.wpm),
            accuracy: Number(finalResult.accuracy),
            time: String(finalResult.time),
            userId,
            typingContentsId: currentTypingId + 1,
          }),
        });
      } catch (err) {
        console.error("타자 기록 저장 실패:", err);
      }
    };
    saveRecord();
  }, [finalResult, userId, currentTypingId]);

  if (!finalResult) return null;

  const { wpm, accuracy, time } = finalResult;

  return (
    <S.ModalOverlay>
      <S.ModalBox>
        <S.ModalImage src="/assets/images/chicken.png" alt="캐릭터" />

        <S.Title>타자 결과</S.Title>

        <S.Row>
          <span>타수(타/분)</span>
          <span>{wpm} 타/분</span>
        </S.Row>

        <S.Row>
          <span>정확도(%)</span>
          <span>{accuracy} %</span>
        </S.Row>

        <S.Row>
          <span>소요시간</span>
          <span>{time} 초</span>
        </S.Row>

        <S.ButtonWrapper>
          <button
            onClick={() => {
              actions.resetTyping();     // 전체 초기화
              actions.setIsShowModal(false);  // 모달 닫기
            }}
          >
            다시하기
          </button>

          <button
            onClick={() => {
              actions.resetTyping();    // 전체 초기화
              navigate("/workspace/rooms/", { replace: true });
            }}
          >
            그만하기
          </button>
        </S.ButtonWrapper>
      </S.ModalBox>
    </S.ModalOverlay>
  );
};

export default ResultModal;
