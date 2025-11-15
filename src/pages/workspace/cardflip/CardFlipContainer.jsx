// src/pages/cardflip/CardFlipContainer.jsx
import React, { useState } from "react";
// 🔥 Outlet 제거
// import { Outlet } from "react-router-dom";
import S from "./style";

const IMAGE_BASE_PATH = "/assets/images/level";

// 카드 앞면 이미지
const FRONT_IMAGE = `${IMAGE_BASE_PATH}/1.svg`;

// 8쌍(16장) 카드
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
    </S.PageWrap>
  );
};

export default CardFlipContainer;
