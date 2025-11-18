import React from "react";
import { useNavigate } from "react-router-dom";
import S from "./style";
import { getFileDisplayUrl } from "../../../utils/fileUtils";

const GameEndModal = ({
  isOpen,
  onClose,
  gameResult,
  results = [],
  currentUserId,
  formatTime,
  getExpGain,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/workspace/rooms");
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>🎉 게임 완료! 🎉</S.ModalTitle>
          <S.CloseButton onClick={handleClose}>✕</S.CloseButton>
        </S.ModalHeader>

        {gameResult && (
          <S.MyResult>
            <S.ResultTitle>내 결과</S.ResultTitle>
            <S.ResultInfo>
              <S.ResultItem>
                <S.ResultLabel>완료 시간:</S.ResultLabel>
                <S.ResultValue>{formatTime(gameResult.finishTime)}</S.ResultValue>
              </S.ResultItem>
              <S.ResultItem>
                <S.ResultLabel>순위:</S.ResultLabel>
                <S.ResultValue>{gameResult.rankInRoom || "계산 중..."}위</S.ResultValue>
              </S.ResultItem>
              <S.ResultItem>
                <S.ResultLabel>획득 경험치:</S.ResultLabel>
                <S.ResultValue>
                  +{getExpGain(gameResult.rankInRoom)} EXP
                </S.ResultValue>
              </S.ResultItem>
            </S.ResultInfo>
          </S.MyResult>
        )}

        {results && results.length > 0 && (
          <S.ResultsList>
            <S.ResultsTitle>순위표</S.ResultsTitle>
            {results.map((result, index) => (
              <S.ResultRow key={result.id} $isMe={result.userId === currentUserId}>
                <S.Rank>{result.rankInRoom || index + 1}</S.Rank>
                <S.UserInfo>
                  <S.UserThumbnail
                    src={result.userThumbnailUrl ? getFileDisplayUrl(result.userThumbnailUrl) : "/assets/images/defalutpro.svg"}
                    alt={result.userNickname}
                    onError={(e) => {
                      e.target.src = "/assets/images/defalutpro.svg";
                    }}
                  />
                  <S.UserName>{result.userNickname}</S.UserName>
                  {result.userLevel && (
                    <S.UserLevel>Lv.{result.userLevel}</S.UserLevel>
                  )}
                </S.UserInfo>
                <S.ResultTime>{formatTime(result.finishTime)}</S.ResultTime>
                <S.ResultExp>+{getExpGain(result.rankInRoom)} EXP</S.ResultExp>
              </S.ResultRow>
            ))}
          </S.ResultsList>
        )}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default GameEndModal;

