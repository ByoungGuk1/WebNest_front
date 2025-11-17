// src/pages/cardflip/CardFlipContainer.jsx
import React, { useState, useEffect, useRef } from "react";
import S from "./style";

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

const CardFlipContainer = () => {
  const [cards, setCards] = useState(createInitialCards);
  const [firstIndex, setFirstIndex] = useState(null);
  const [secondIndex, setSecondIndex] = useState(null);
  const [disableDeck, setDisableDeck] = useState(false);
  
  // 게임 상태
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [finishTime, setFinishTime] = useState(null);
  
  const timerIntervalRef = useRef(null);

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

  const resetSelection = () => {
    setFirstIndex(null);
    setSecondIndex(null);
    setDisableDeck(false);
  };

  const handleCardClick = (index) => {
    if (disableDeck) return;
    if (isGameFinished) return;

    // 게임 시작 (첫 카드 클릭 시)
    if (!isGameStarted) {
      handleGameStart();
    }

    const clicked = cards[index];
    if (clicked.isFlipped || clicked.isMatched) return;

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
        setCards((prev) =>
          prev.map((card, i) =>
            i === firstIndex || i === index
              ? { ...card, isMatched: true }
              : card
          )
        );
        
        // 매칭된 쌍 수 증가
        const newMatchedPairs = matchedPairs + 1;
        setMatchedPairs(newMatchedPairs);

        // 게임 완료 체크
        if (newMatchedPairs >= TOTAL_PAIRS) {
          setTimeout(() => {
            handleGameFinish();
          }, 100);
        }

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

  // 시간 포맷팅 (초를 mm:ss로)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <S.PageWrap>
      <S.GameHeader>
        <S.GameInfo>
          <S.TimerDisplay>
            ⏱️ {formatTime(elapsedTime)}
          </S.TimerDisplay>
          <S.ProgressDisplay>
            매칭: {matchedPairs} / {TOTAL_PAIRS}
          </S.ProgressDisplay>
        </S.GameInfo>
        {isGameFinished && finishTime !== null && (
          <S.WinnerDisplay $isMe>
            🎉 완료! 기록: {formatTime(finishTime)}
          </S.WinnerDisplay>
        )}
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
    </S.PageWrap>
  );
};

export default CardFlipContainer;
