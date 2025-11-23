import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import S from "./style";
import { getFileDisplayUrl, getFileDisplayUrlFromPathAndName } from "../../../utils/fileUtils";

const DEFAULT_PROFILE_IMAGE = "/assets/images/defalutpro.svg";
const API_BASE = (process.env.REACT_APP_BACKEND_URL || "http://localhost:10000").replace(/\/+$/, "");

const GameEndModal = ({
  isOpen,
  onClose,
  finishTime,
  matchedPairs = 10,
  formatTime,
  getExpGain,
}) => {
  const navigate = useNavigate();
  const { roomId: gameRoomId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?.id;

  const [gameResult, setGameResult] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 게임 완료 처리 및 결과 조회
  useEffect(() => {
    if (isOpen && finishTime && userId && gameRoomId) {
      const handleGameFinish = async () => {
        setIsLoading(true);
        try {
          const accessToken = localStorage.getItem("accessToken");
          if (!accessToken) {
            alert("로그인이 필요합니다.");
            return;
          }

          // 결과 저장 API 호출
          const response = await fetch(`${API_BASE}/private/game-rooms/${gameRoomId}/cardflip/finish`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              userId: userId,
              finishTime: finishTime,
              matchedPairs: matchedPairs,
              score: Math.max(0, 1000 - finishTime * 10), // 점수 계산 (시간이 짧을수록 높은 점수)
            }),
          });

          if (!response.ok) {
            throw new Error(`결과 저장 실패: ${response.status}`);
          }

          const result = await response.json();
          setGameResult(result.data);

          // 결과 조회 API 호출 (순위 확인)
          const resultsResponse = await fetch(`${API_BASE}/private/game-rooms/${gameRoomId}/cardflip/results`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            },
          });

          if (resultsResponse.ok) {
            const resultsData = await resultsResponse.json();
            setResults(resultsData.data || []);
          }

        } catch (error) {
          console.error("게임 완료 처리 중 오류:", error);
          alert("게임 완료 처리 중 오류가 발생했습니다.");
        } finally {
          setIsLoading(false);
        }
      };

      handleGameFinish();
    }
  }, [isOpen, finishTime, matchedPairs, userId, gameRoomId]);

  const handleClose = () => {
    onClose();
    navigate("/workspace/rooms");
  };

  // 프로필 이미지 URL 변환 함수
  const getProfileImageUrl = (result) => {
    const thumbnailUrl = result?.userThumbnailUrl;
    const thumbnailName = result?.userThumbnailName;
    
    // path/name 둘 다 없으면 기본 이미지
    if ((!thumbnailUrl || thumbnailUrl === '' || thumbnailUrl === '/default' || thumbnailUrl === 'null' || thumbnailUrl === 'undefined') && !thumbnailName) {
      return DEFAULT_PROFILE_IMAGE;
    }
    
    // path + name 둘 다 있으면 getFileDisplayUrlFromPathAndName 사용
    if (thumbnailUrl && thumbnailName) {
      return getFileDisplayUrlFromPathAndName(thumbnailUrl, thumbnailName) || DEFAULT_PROFILE_IMAGE;
    }
    
    // 외부 URL이거나 assets 경로인 경우 그대로 사용
    if (thumbnailUrl && (thumbnailUrl.startsWith('http') || thumbnailUrl.startsWith('/assets'))) {
      return thumbnailUrl;
    }
    
    // 기존 형식 호환성 유지 (thumbnailUrl만 있는 경우)
    if (thumbnailUrl) {
      return getFileDisplayUrl(thumbnailUrl) || DEFAULT_PROFILE_IMAGE;
    }
    
    return DEFAULT_PROFILE_IMAGE;
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>🎉 게임 완료! 🎉</S.ModalTitle>
          <S.CloseButton onClick={handleClose}>✕</S.CloseButton>
        </S.ModalHeader>

        {isLoading ? (
          <S.LoadingMessage>결과를 불러오는 중...</S.LoadingMessage>
        ) : (
          <>
            {gameResult && (
              <S.MyResult>
                <S.MyResultHeader>
                  <S.MyResultThumbnail
                    src={getProfileImageUrl(gameResult)}
                    alt={gameResult.userNickname || "내 프로필"}
                    onError={(e) => {
                      e.target.src = DEFAULT_PROFILE_IMAGE;
                    }}
                  />
                  <S.ResultTitle>내 결과</S.ResultTitle>
                </S.MyResultHeader>
                <S.ResultInfo>
                  <S.ResultItem>
                    <S.ResultLabel>완료 시간:</S.ResultLabel>
                    <S.ResultValue>{formatTime(gameResult.cardFlipResultFinishTime || finishTime)}</S.ResultValue>
                  </S.ResultItem>
                  <S.ResultItem>
                    <S.ResultLabel>순위:</S.ResultLabel>
                    <S.ResultValue>
                      {gameResult.gameRoomMaxPlayer && gameResult.cardFlipResultRankInRoom
                        ? `전체 ${gameResult.gameRoomMaxPlayer}명 중 ${gameResult.cardFlipResultRankInRoom}위`
                        : gameResult.cardFlipResultRankInRoom
                        ? `${gameResult.cardFlipResultRankInRoom}위`
                        : "계산 중..."}
                    </S.ResultValue>
                  </S.ResultItem>
                  <S.ResultItem>
                    <S.ResultLabel>획득 경험치:</S.ResultLabel>
                    <S.ResultValue>
                      +{getExpGain(gameResult.cardFlipResultRankInRoom)} EXP
                    </S.ResultValue>
                  </S.ResultItem>
                </S.ResultInfo>
              </S.MyResult>
            )}

            {results && results.length > 0 && (
              <S.ResultsList>
                <S.ResultsTitle>
                  순위표
                  {results[0]?.gameRoomMaxPlayer && (
                    <S.TotalPlayersInfo> (전체 {results[0].gameRoomMaxPlayer}명)</S.TotalPlayersInfo>
                  )}
                </S.ResultsTitle>
                {results.map((result, index) => (
                  <S.ResultRow key={result.id} $isMe={result.userId === userId}>
                    <S.Rank>
                      {result.gameRoomMaxPlayer && result.cardFlipResultRankInRoom
                        ? `${result.cardFlipResultRankInRoom}/${result.gameRoomMaxPlayer}`
                        : result.cardFlipResultRankInRoom || index + 1}
                    </S.Rank>
                    <S.UserInfo>
                      <S.UserThumbnail
                        src={getProfileImageUrl(result)}
                        alt={result.userNickname}
                        onError={(e) => {
                          e.target.src = DEFAULT_PROFILE_IMAGE;
                        }}
                      />
                      <S.UserName>{result.userNickname}</S.UserName>
                      {result.userLevel && (
                        <S.UserLevel>Lv.{result.userLevel}</S.UserLevel>
                      )}
                    </S.UserInfo>
                    <S.ResultTime>{formatTime(result.cardFlipResultFinishTime)}</S.ResultTime>
                    <S.ResultExp>+{getExpGain(result.cardFlipResultRankInRoom)} EXP</S.ResultExp>
                  </S.ResultRow>
                ))}
              </S.ResultsList>
            )}
          </>
        )}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default GameEndModal;

