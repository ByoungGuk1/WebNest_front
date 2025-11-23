import React from "react";
import S from "./style";
import { useGameResult } from "context/GameResultContext";

const QuizEndModal = () => {

    const { isModalOpen, quizTitle, quizExp, closeModal} = useGameResult();

    if (!isModalOpen) return null;
    return (
        <>
            <S.ModalOverlay onClick={closeModal}>
                <S.ModalContent onClick={(e) => e.stopPropagation()}>
                    <S.ModalHeader>
                        <S.ModalTitle>🎉 풀이 성공 🎉</S.ModalTitle>
                        <S.CloseButton onClick={closeModal}>✕</S.CloseButton>
                    </S.ModalHeader>

                    <S.MyResult>
                        <S.ResultTitle>결과</S.ResultTitle>
                        <S.ResultInfo>
                            <S.ResultItem>
                                <S.ResultLabel>문제:</S.ResultLabel>
                                <S.ResultValue>{quizTitle}</S.ResultValue>
                            </S.ResultItem>
                            <S.ResultItem>
                                <S.ResultLabel>흭득 경험치:</S.ResultLabel>
                                <S.ResultValue>+ {quizExp} EXP</S.ResultValue>
                            </S.ResultItem>
                        </S.ResultInfo>
                    </S.MyResult>
                </S.ModalContent>
            </S.ModalOverlay>,
        </>
    );
};

export default QuizEndModal;
