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
  width: 100%;
  background: #7345fd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

S.CardInner = styled.div`
  width: 800px;
  height: 700px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 30px;
`;

S.Cards = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
  height: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
`;

S.CardItem = styled.li`
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
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  &.front {
    z-index: 10;
    transform: rotateY(0deg);
  }

  &.back {
    transform: rotateY(180deg);
    background: ${({ $cardType }) => {
      if ($cardType === 'problem') return '#E3F2FD';
      if ($cardType === 'answer') return '#E8F5E9';
      return '#ffffff';
    }};
    border: 2px solid ${({ $cardType }) => {
      if ($cardType === 'problem') return '#2196F3';
      if ($cardType === 'answer') return '#4CAF50';
      return '#ccc';
    }};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    vertical-align: top;
  }
`;

S.ContentText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-align: center;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.4;
  padding: 8px;
  box-sizing: border-box;
`;

export default S;
