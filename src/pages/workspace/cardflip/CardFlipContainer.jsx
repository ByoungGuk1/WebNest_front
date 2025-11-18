// src/pages/cardflip/CardFlipContainer.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import S from "./style";
import { getFileDisplayUrl } from "../../../utils/fileUtils";

const IMAGE_BASE_PATH = "/assets/images/level";

// 문제와 정답 데이터 (4쌍)
const PROBLEM_DATA = [
  {
    id: 1,
    problem: 'int n = 5;\nif (n > 3) System.out.println("A");\nelse System.out.println("B");',
    answer: "A",
  },
  {
    id: 2,
    problem: "int[] a = {10, 20, 30};\nSystem.out.println(a[a.length-1]);",
    answer: "30",
  },
  {
    id: 3,
    problem: "int a = 10;\nint b = 20;\nSystem.out.println(a>b? 'A': 'B');",
    answer: "B",
  },
  {
    id: 4,
    problem: 'String str = "Hello";\nSystem.out.println(str.length());',
    answer: "5",
  },
];

// 카드 앞면 이미지
const FRONT_IMAGE = `${IMAGE_BASE_PATH}/1.svg`;

// 홀수 레벨 이미지 (6쌍 = 12개)
const IMAGE_PAIRS = [
  { id: 1, image: "3.svg" },
  { id: 2, image: "5.svg" },
  { id: 3, image: "7.svg" },
  { id: 4, image: "9.svg" },
  { id: 5, image: "X.svg" },
  { id: 6, image: "1.svg" },
];

// 총 카드 쌍 수 (문제 4쌍 + 그림 6쌍 = 10쌍)
const TOTAL_PAIRS = 10;

// 카드 생성 함수
const createInitialCards = () => {
  const cards = [];

  // 문제 카드 4개
  PROBLEM_DATA.forEach((data) => {
    cards.push({
      id: `problem-${data.id}`,
      type: "problem",
      problemId: data.id,
      frontImg: FRONT_IMAGE,
      content: data.problem,
      isFlipped: false,
      isMatched: false,
      isShaking: false,
    });
  });

  // 정답 카드 4개
  PROBLEM_DATA.forEach((data) => {
    cards.push({
      id: `answer-${data.id}`,
      type: "answer",
      problemId: data.id,
      frontImg: FRONT_IMAGE,
      content: data.answer,
      isFlipped: false,
      isMatched: false,
      isShaking: false,
    });
  });

  // 그림 카드 12개 (6쌍)
  IMAGE_PAIRS.forEach((pair) => {
    cards.push({
      id: `image-${pair.id}-1`,
      type: "image",
      imageId: pair.id,
      frontImg: FRONT_IMAGE,
      backImg: `${IMAGE_BASE_PATH}/${pair.image}`,
      isFlipped: false,
      isMatched: false,
      isShaking: false,
    });
    cards.push({
      id: `image-${pair.id}-2`,
      type: "image",
      imageId: pair.id,
      frontImg: FRONT_IMAGE,
      backImg: `${IMAGE_BASE_PATH}/${pair.image}`,
      isFlipped: false,
      isMatched: false,
      isShaking: false,
    });
  });

  // 카드 섞기
  return cards.sort(() => Math.random() - 0.5);
};

const API_BASE = (process.env.REACT_APP_BACKEND_URL || "http://localhost:10000").replace(/\/+$/, "");

const CardFlipContainer = () => {
  const { roomId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?.id;

  const [cards, setCards] = useState(createInitialCards);
  const [firstIndex, setFirstIndex] = useState(null);
  const [secondIndex, setSecondIndex] = useState(null);
  const [disableDeck, setDisableDeck] = useState(false);
  
  // 게임 상태
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);

  // 게임 시간 측정
  const [gameStartTime, setGameStartTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [finishTime, setFinishTime] = useState(null);
  
  const timerIntervalRef = useRef(null);
  const intervalRef = useRef(null);

  // 타이머 시작
  useEffect(() => {
    if (isGameStarted && !isGameFinished && startTime) {
      timerIntervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(elapsed);
      }, 100);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isGameStarted, isGameFinished, startTime]);

  // 게임 시작 (첫 카드 클릭 시)
  const handleGameStart = () => {
    if (!isGameStarted && !isGameFinished) {
      setIsGameStarted(true);
      setStartTime(Date.now());
    }
  };

  // 게임 완료 처리
  const handleGameFinish = () => {
    if (isGameFinished) return;

    setIsGameFinished(true);
    const finalTime = elapsedTime;
    setFinishTime(finalTime);
  };

  // 게임 결과
  const [gameResult, setGameResult] = useState(null);
  const [results, setResults] = useState([]);
  const [showResultModal, setShowResultModal] = useState(false);

  const resetSelection = () => {
    setFirstIndex(null);
    setSecondIndex(null);
    setDisableDeck(false);
  };

  // 게임 시작 시간 측정 (첫 카드 클릭 시)
  useEffect(() => {
    if (isGameStarted && gameStartTime && !isGameCompleted) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - gameStartTime) / 1000);
        setElapsedTime(elapsed);
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isGameStarted, gameStartTime, isGameCompleted]);

  // 게임 완료 감지 및 API 호출
  useEffect(() => {
    if (matchedPairs === 10 && !isGameCompleted && userId && roomId && gameStartTime) {
      setIsGameCompleted(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // 완료 시간 계산
      const finishTime = Math.floor((Date.now() - gameStartTime) / 1000);
      setElapsedTime(finishTime);
      
      // 게임 완료 처리
      const finishGame = async () => {
        try {
          const accessToken = localStorage.getItem("accessToken");
          if (!accessToken) {
            console.error("로그인이 필요합니다.");
            return;
          }

          // 결과 저장 API 호출
          const response = await fetch(`${API_BASE}/private/game-rooms/${roomId}/cardflip/finish`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              userId: userId,
              finishTime: finishTime,
              matchedPairs: 10,
              score: Math.max(0, 1000 - finishTime * 10), // 점수 계산 (시간이 짧을수록 높은 점수)
            }),
          });

          if (!response.ok) {
            throw new Error(`결과 저장 실패: ${response.status}`);
          }

          const result = await response.json();
          setGameResult(result.data);

          // 결과 조회 API 호출 (순위 확인)
          const resultsResponse = await fetch(`${API_BASE}/private/game-rooms/${roomId}/cardflip/results`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
            },
          });

          if (resultsResponse.ok) {
            const resultsData = await resultsResponse.json();
            setResults(resultsData.data || []);
            setShowResultModal(true);
          }

        } catch (error) {
          console.error("게임 완료 처리 중 오류:", error);
          alert("게임 완료 처리 중 오류가 발생했습니다.");
        }
      };

      finishGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedPairs, isGameCompleted, userId, roomId, gameStartTime]);

  const handleCardClick = (index) => {
    if (disableDeck || isGameCompleted) return;

    const clicked = cards[index];
    if (clicked.isFlipped || clicked.isMatched) return;

    // 첫 카드 클릭 시 게임 시작
    if (!isGameStarted) {
      setIsGameStarted(true);
      setGameStartTime(Date.now());
      setElapsedTime(0);
    }

    // 클릭한 카드 뒤집기
    setCards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );

    // 첫 번째 선택
    if (firstIndex === null) {
      setFirstIndex(index);
      return;
    }

    // 두 번째 선택
    setSecondIndex(index);
    setDisableDeck(true);

    const firstCard = cards[firstIndex];
    const secondCard = cards[index];

    // 매칭 확인
    let isMatched = false;

    // 문제 & 정답 매칭
    if (
      (firstCard.type === "problem" &&
        secondCard.type === "answer" &&
        firstCard.problemId === secondCard.problemId) ||
      (firstCard.type === "answer" &&
        secondCard.type === "problem" &&
        firstCard.problemId === secondCard.problemId)
    ) {
      isMatched = true;
    }
    // 그림 카드 매칭
    else if (
      firstCard.type === "image" &&
      secondCard.type === "image" &&
      firstCard.imageId === secondCard.imageId &&
      firstCard.id !== secondCard.id
    ) {
      isMatched = true;
    }

    if (isMatched) {
      // 맞으면 매칭 처리
      setTimeout(() => {
        setCards((prev) => {
          const updated = prev.map((card, i) =>
            i === firstIndex || i === index
              ? { ...card, isMatched: true }
              : card
          );
          
          // 매칭된 쌍 수 계산
          const matchedCount = updated.filter((card) => card.isMatched).length / 2;
          setMatchedPairs(matchedCount);
          
          return updated;
        });
        resetSelection();
      }, 300);
    } else {
      // 틀리면 흔들고 다시 뒤집기
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, i) =>
            i === firstIndex || i === index
              ? { ...card, isShaking: true }
              : card
          )
        );
      }, 400);

      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, i) =>
            i === firstIndex || i === index
              ? { ...card, isFlipped: false, isShaking: false }
              : card
          )
        );
        resetSelection();
      }, 1200);
    }
  };


  // 시간 포맷팅 (초를 mm:ss로 변환)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 경험치 계산
  const getExpGain = (rank) => {
    if (rank === 1) return 200;
    if (rank === 2) return 150;
    if (rank === 3) return 100;
    return 50;
  };

  return (
    <S.PageWrap>
      {/* 게임 정보 헤더 */}
      <S.GameHeader>
        <S.GameInfo>
          <S.TimerDisplay>
            ⏱️ {formatTime(elapsedTime)}
          </S.TimerDisplay>
          <S.ProgressDisplay>
            매칭 완료: {matchedPairs} / 10 쌍
          </S.ProgressDisplay>
        </S.GameInfo>
      </S.GameHeader>

      <S.CardInner>
        <S.Cards>
          {cards.map((card, index) => {
            const liClassNames = [
              card.isFlipped || card.isMatched ? "flip" : "",
              card.isShaking ? "shake" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <S.CardItem
                key={card.id}
                className={liClassNames}
                onClick={() => handleCardClick(index)}
                $cardType={card.type}
                $disabled={isGameFinished}
              >
                <S.View className="front">
                  <img src={card.frontImg} alt="card-front" />
                </S.View>
                <S.View className="back" $cardType={card.type}>
                  {card.type === "image" ? (
                    <img src={card.backImg} alt={`image-${card.imageId}`} />
                  ) : (
                    <S.ContentText>{card.content}</S.ContentText>
                  )}
                </S.View>
              </S.CardItem>
            );
          })}
        </S.Cards>
      </S.CardInner>

      {/* 결과 모달 */}
      {showResultModal && (
        <S.ModalOverlay onClick={() => setShowResultModal(false)}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitle>🎉 게임 완료! 🎉</S.ModalTitle>
              <S.CloseButton onClick={() => setShowResultModal(false)}>✕</S.CloseButton>
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
                  <S.ResultRow key={result.id} $isMe={result.userId === userId}>
                    <S.Rank>{result.rankInRoom || index + 1}</S.Rank>
                    <S.UserInfo>
                      {result.userThumbnailUrl && (
                        <S.UserThumbnail
                          src={getFileDisplayUrl(result.userThumbnailUrl)}
                          alt={result.userNickname}
                        />
                      )}
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
      )}
    </S.PageWrap>
  );
};

export default CardFlipContainer;
