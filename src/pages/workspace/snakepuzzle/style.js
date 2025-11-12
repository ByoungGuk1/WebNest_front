// boardStyle.js
import styled, { keyframes } from "styled-components";
import { h6Bold, h8Bold } from "styles/common";

const S = {};

S.Section = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 48px;
  padding: 32px 0;
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
`;

S.Cell = styled.div`
  position: relative;
  width: calc(100% / 10);
  height: calc(100% / 10);
  border-radius: 10px;
  box-sizing: border-box;
  border: 2px solid #dadce0;
  background: ${({ $even }) => ($even ? "#F2EEFF" : "#FBF9FF")};

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
`;

/* ====== 주사위 스타일/컴포넌트 추가 (같은 파일에) ====== */
S.DiceArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 700px;
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

export default S;
