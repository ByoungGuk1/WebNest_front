// src/pages/cardflip/CardFlipContainer.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import S from "./style";

const IMAGE_BASE_PATH = "/assets/images/level";

// 카드 뒷면(공통) 이미지
const FRONT_IMAGE = `${IMAGE_BASE_PATH}/1.svg`;

// 8쌍(16장) 카드 — 2.svg ~ 9.svg 예시
const BACK_IMAGES = [
  "2.svg",
  "3.svg",
  "4.svg",
  "5.svg",
  "6.svg",
  "7.svg",
  "8.svg",
  "9.svg",
  "2.svg",
  "3.svg",
  "4.svg",
  "5.svg",
  "6.svg",
  "7.svg",
  "8.svg",
  "9.svg",
];

const createInitialCards = () =>
  BACK_IMAGES.map((name, index) => ({
    id: index,
    frontImg: FRONT_IMAGE,
    backImg: `${IMAGE_BASE_PATH}/${name}`, // 👉 /assets/images/level/?.svg
    isFlipped: false,
    isMatched: false,
    isShaking: false,
  }));

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

    // 카드 뒤집기
    setCards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );

    // 첫 번째 카드 선택
    if (firstIndex === null) {
      setFirstIndex(index);
      return;
    }

    // 두 번째 카드 선택
    setSecondIndex(index);
    setDisableDeck(true);

    const firstCard = cards[firstIndex];
    const secondCard = cards[index];

    // 이미지 비교
    if (firstCard.backImg === secondCard.backImg) {
      // 같은 카드면 매칭 처리
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card, i) => {
            if (i === firstIndex || i === index) {
              return { ...card, isMatched: true }; // 뒤집힌 상태 유지
            }
            return card;
          })
        );
        resetSelection();
      }, 300);
    } else {
      // 다른 카드면 흔들린 다음 다시 뒤집기
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
      <S.Title>Game Card Flip Container</S.Title>

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
              >
                <S.View className="front">
                  <img src={card.frontImg} alt="card-front" />
                </S.View>
                <S.View className="back">
                  <img src={card.backImg} alt={`card-${index}`} />
                </S.View>
              </S.CardItem>
            );
          })}
        </S.Cards>
      </S.CardInner>

      <Outlet />
    </S.PageWrap>
  );
};

export default CardFlipContainer;
