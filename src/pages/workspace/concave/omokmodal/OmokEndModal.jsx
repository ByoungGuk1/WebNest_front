import React from "react";
import S from "./style";
import ReactDOM from "react-dom"

const OmokEndModal = ({ isOpen, onClose, winner, finishTime, formatTime }) => {
    if (!isOpen) return null;
    return ReactDOM.createPortal (
        <S.ModalOverlay onClick={onClose}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
                <S.ModalHeader>
                    <S.ModalTitle>🎉 게임 종료 🎉</S.ModalTitle>
                    <S.CloseButton onClick={onClose}>✕</S.CloseButton>
                </S.ModalHeader>

                <S.MyResult>
                    <S.ResultTitle>결과</S.ResultTitle>
                    <S.ResultInfo>
                        <S.ResultItem>
                            <S.ResultLabel>승리자:</S.ResultLabel>
                            <S.ResultValue>{winner === 1 ? "흑돌" : "백돌"}</S.ResultValue>
                        </S.ResultItem>
                        <S.ResultItem>
                            <S.ResultLabel>완료 시간:</S.ResultLabel>
                            <S.ResultValue>+ 50 EXP</S.ResultValue>
                        </S.ResultItem>
                    </S.ResultInfo>
                </S.MyResult>
            </S.ModalContent>
        </S.ModalOverlay>,
        document.body
    );
};

export default OmokEndModal;
