// src/pages/cardflip/style.js
import styled, { keyframes } from "styled-components";

const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-13px); }
  40% { transform: translateX(13px); }
  60% { transform: translateX(-8px); }
  80% { transform: translateX(8px); }
  100% { transform: translateX(0); }
`;

const S = {};

S.PageWrap = styled.div`
  min-height: 100vh;
  background: #7345fd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

S.Title = styled.h1`
  color: #ffffff;
  margin-bottom: 24px;
  font-size: 28px;
  font-weight: 700;
`;

S.CardInner = styled.div`
  width: 700px;
  height: 700px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 30px;
`;

S.Cards = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  width: 100%;
  height: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
`;

S.CardItem = styled.li`
  width: calc(100% / 4 - 20px);
  height: calc(100% / 4 - 20px);
  border: 1px solid #ccc;
  perspective: 1000px;
  transform-style: preserve-3d;
  position: relative;
  cursor: pointer;

  &.flip .front {
    transform: rotateY(-180deg);
  }

  &.flip .back {
    transform: rotateY(0deg);
  }

  &.shake {
    animation: ${shake} 0.35s ease-in-out;
  }
`;

S.View = styled.div`
  position: absolute;
  background: rgba(0, 0, 255, 0.2);
  padding: 10%;
  transition: transform 0.5s linear;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;

  &.front {
    z-index: 10;
    transform: rotateY(0deg);
  }

  &.back {
    transform: rotateY(180deg);
  }

  img {
    width: 100%;
    vertical-align: top;
  }
`;

export default S;
