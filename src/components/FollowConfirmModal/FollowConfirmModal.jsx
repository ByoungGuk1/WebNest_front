import React from 'react';
import S from './style';

const FollowConfirmModal = ({ isOpen, onClose, onConfirm, nickname }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <S.ModalOverlay onClick={handleOverlayClick}>
      <S.ModalBox>
        <S.ModalTitle>팔로우</S.ModalTitle>
        <S.ModalDesc>
          {nickname || '이 사용자'}님을 팔로우하시겠습니까?
        </S.ModalDesc>
        <S.ModalButtons>
          <S.CancelBtn onClick={onClose}>취소</S.CancelBtn>
          <S.ConfirmBtn onClick={onConfirm}>확인</S.ConfirmBtn>
        </S.ModalButtons>
      </S.ModalBox>
    </S.ModalOverlay>
  );
};

export default FollowConfirmModal;



















