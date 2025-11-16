// src/pages/cardflip/CardFlipContainer.jsx
import React, { useState } from "react";
// 🔥 Outlet 제거
// import { Outlet } from "react-router-dom";
import S from "./style";

const IMAGE_BASE_PATH = "/assets/images/level";




// 문제와 정답 데이터 (4쌍)
const PROBLEM_DATA = [
  { id: 1, problem: "int n = 5;\nif (n > 3) System.out.println(\"A\");\nelse System.out.println(\"B\");", answer: "A" },
  { id: 2, problem: "int[] a = {10, 20, 30};\nSystem.out.println(a[a.length-1]);", answer: "30" },
  { id: 3, problem: "int a = 10;\nint b = 20;\nSystem.out.println(a>b? 'A': 'B');", answer: "B" },
  { id: 4, problem: "String str = \"Hello\";\nSystem.out.println(str.length());", answer: "5" },
]
// 카드 앞면 이미지
const FRONT_IMAGE = `${IMAGE_BASE_PATH}/1.svg`;


// 홀수 레벨 이미지 (6쌍 = 12개)
const IMAGE_PAIRS = [
  { id: 1, image: "3.svg" },
  { id: 2, image: "5.svg" },
  { id: 3, image: "7.svg" },
  { id: 4, image: "9.svg" },
  { id: 5, image: "11.svg" },
  { id: 6, image: "13.svg" },
];

// 카드 생성 함수
const createInitialCards = () => {
  const cards = [];
  
  // 문제 카드 4개
  PROBLEM_DATA.forEach((data) => {
    cards.push({
      id: `problem-${data.id}`,
      type: 'problem',
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
      type: 'answer',
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
    // 각 쌍마다 2개씩 생성
    cards.push({
      id: `image-${pair.id}-1`,
      type: 'image',
      imageId: pair.id,
      frontImg: FRONT_IMAGE,
      backImg: `${IMAGE_BASE_PATH}/${pair.image}`,
      isFlipped: false,
      isMatched: false,
      isShaking: false,
    });
    cards.push({
      id: `image-${pair.id}-2`,
      type: 'image',
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

  const resetSelection = () => {
    setFirstIndex(null);
    setSecondIndex(null);
    setDisableDeck(false);
  };

  const handleCardClick = (index) => {
    if (disableDeck) return;

    const clicked = cards[index];
    if (clicked.isFlipped || clicked.isMatched) return;

    setCards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );

    if (firstIndex === null) {
      setFirstIndex(index);
      return;
    }

    setSecondIndex(index);
    setDisableDeck(true);

    const firstCard = cards[firstIndex];
    const secondCard = cards[index];

    // 매칭 확인
    let isMatched = false;
    
    // 문제와 정답 매칭
    if ((firstCard.type === 'problem' && secondCard.type === 'answer' && firstCard.problemId === secondCard.problemId) ||
        (firstCard.type === 'answer' && secondCard.type === 'problem' && firstCard.problemId === secondCard.problemId)) {
      isMatched = true;
    }
    // 그림 카드 매칭 (같은 imageId이고 서로 다른 카드)
    else if (firstCard.type === 'image' && secondCard.type === 'image' && 
             firstCard.imageId === secondCard.imageId && 
             firstCard.id !== secondCard.id) {
      isMatched = true;
    }

    if (isMatched) {
      // 문제와 정답이 매칭되면 처리
    if (firstCard.backImg === secondCard.backImg) {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, i) => {
            if (i === firstIndex || i === index) {
              return { ...card, isMatched: true };
            }
            return card;
          })
        );
        resetSelection();
      }, 300);
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, i) => {
            if (i === firstIndex || i === index) {
              return { ...card, isShaking: true };
            }
            return card;
          })
        );
      }, 400);

      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, i) => {
            if (i === firstIndex || i === index) {
              return {
                ...card,
                isFlipped: false,
                isShaking: false,
              };
            }
            return card;
          })
        );
        resetSelection();
      }, 1200);
    }
  };

  return (
    <S.PageWrap>
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
              >
                <S.View className="front">
                  <img src={card.frontImg} alt="card-front" />
                </S.View>
                <S.View className="back" $cardType={card.type}>
                  {card.type === 'image' ? (
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

};
export default CardFlipContainer;
