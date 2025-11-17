// boardStyle.js
import styled, { keyframes } from "styled-components";
import { h6Bold, h8Bold } from "styles/common";

const S = {};

S.Section = styled.div`
  display: flex;
  width: 1040px;
  align-items: flex-start;
  justify-content: space-between;
`;

S.BoardWrap = styled.div`
  width: 800px;               /* 컨테이너 폭 */
`;

S.Board = styled.div`
  display: flex;
  flex-wrap: wrap;            /* Flex 기반 10x10 */
  width: 800px;
  height: 700px;
  border-radius: 10px;
  overflow: hidden;           /* 모서리 라운드 깔끔 */
  background: #fff;
  border: 2px solid #dadce0;
  position: relative;
  transform: translateZ(0);
  will-change: auto;
`;

S.Dice3DContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  
  & > div {
    width: 100% !important;
    height: 100% !important;
  }
`;

S.GameImage = styled.img`
  position: absolute;
  left: ${({ $left }) => `${$left}%`};
  top: ${({ $top }) => `${$top}%`};
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: ${({ $higherZIndex }) => ($higherZIndex ? 5 : 1)};
  
  /* letter_13_46.png 불필요한 부분 제거 */
  ${({ $needsClipping }) => $needsClipping && `
    clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 0% 85%);
    object-position: center top;
  `}
`;

S.Cell = styled.div`
  position: relative;
  width: calc(100% / 10);
  height: calc(100% / 10);
  border-radius: 10px;
  box-sizing: border-box;
  border: 2px solid #dadce0;
  background: ${({ $even }) => ($even ? "#F2EEFF" : "#FBF9FF")};
  z-index: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;

S.Number = styled.span`
  position: absolute;
  top: 1px;
  left: 6px;
  ${h8Bold}
  color: #222;
  user-select: none;
  z-index: 2;
`;

S.StartLabel = styled.span`
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  ${h8Bold}
  color: #4DD998;
  user-select: none;
  z-index: 2;
`;

S.FinishLabel = styled.span`
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  ${h8Bold}
  color: #E53E3E;
  user-select: none;
  z-index: 2;
`;

/* ====== 주사위 스타일/컴포넌트 추가 (같은 파일에) ====== */
S.DiceArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 700px;
  width: 200px;
`;

S.BoardDice = styled.div`
  position: absolute;
  top: ${({ $top }) => `${$top}%`};
  left: ${({ $left }) => `${$left}%`};
  transform: translate(-50%, -50%) scale(${({ $rolling }) => ($rolling ? 1.08 : 1)});
  width: 70px;
  height: 70px;
  border-radius: 10px;
  border: 2px solid #dadce0;
  background: #FBF9FF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 30px;
  color: #454a82;
  box-shadow: none;
  transition: transform 220ms ease, opacity 220ms ease;
  opacity: ${({ $rolling }) => ($rolling ? 0.85 : 1)};
  z-index: 3;
`;

const fillPulse = keyframes`
  0% {
    transform: scaleX(0);
  }
  50% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
`;

S.RollBtn = styled.button`
  position: relative;
  overflow: hidden;
  padding: 16px 28px;
  border-radius: 18px;
  border: 2px solid rgba(123, 134, 255, 0.6);
  background: #ffffff;
  cursor: pointer;
  ${h6Bold}
  color: #444b8f;
  transition: transform 160ms ease, box-shadow 160ms ease;
  box-shadow: 0 12px 18px rgba(129, 136, 255, 0.24);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, rgba(123, 134, 255, 0.15), rgba(143, 94, 255, 0.35));
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 300ms ease;
  }

  &[data-pressing="true"]::after {
    animation: ${fillPulse} 1.1s ease-in-out infinite;
  }

  &[data-pressing="true"] {
    transform: translateY(2px) scale(0.99);
    box-shadow: 0 10px 20px rgba(129, 136, 255, 0.28);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
    transform: none;
    box-shadow: none;
  }
`;

S.PlayerMarker = styled.div`
  position: absolute;
  left: ${({ $left }) => `${$left}%`};
  top: ${({ $top }) => `${$top}%`};
  transform: translate(-50%, -50%);
  width: ${({ $isCurrentUser }) => $isCurrentUser ? '28px' : '24px'};
  height: ${({ $isCurrentUser }) => $isCurrentUser ? '28px' : '24px'};
  border-radius: 50%;
  background: ${({ $isCurrentUser }) => $isCurrentUser ? '#E53E3E' : '#4A90E2'};
  border: ${({ $isCurrentUser }) => $isCurrentUser ? '3px solid #ffffff' : '2px solid #ffffff'};
  box-shadow: ${({ $isCurrentUser }) => $isCurrentUser 
    ? '0 2px 8px rgba(229, 62, 62, 0.4)' 
    : '0 2px 6px rgba(74, 144, 226, 0.3)'};
  z-index: ${({ $isCurrentUser }) => $isCurrentUser ? 16 : 15};
  pointer-events: none;
  transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1), top 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

export default S;
