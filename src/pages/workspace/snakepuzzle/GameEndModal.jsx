import React from "react";
import S from "./GameEndModalStyle";

const GameEndModal = ({ isOpen, winnerName, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <S.ModalTitle>🎉 게임 종료! 🎉</S.ModalTitle>
        </S.ModalHeader>
        <S.ModalBody>
          <S.WinnerText>
            {winnerName ? (
              <>
                <S.WinnerName>{winnerName}</S.WinnerName>님이 승리하셨습니다!
              </>
            ) : (
              "게임이 종료되었습니다!"
            )}
          </S.WinnerText>
        </S.ModalBody>
        <S.ModalFooter>
          <S.ConfirmButton onClick={onConfirm}>확인</S.ConfirmButton>
        </S.ModalFooter>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default GameEndModal;

