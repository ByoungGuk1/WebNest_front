import styled from "styled-components";
import { h3Light, h3Medium, h4Light, h6Light, h9Light } from "styles/common";
import theme from "styles/theme";

const S = {};

/* 전체 래퍼: 좌측 메시지 315×700, 우측 바둑판 700×700 */
S.Wrap = styled.div`
  display: flex;
  gap: 29px;
  align-items: flex-start;
  width: 1045px; /* 315 + 700 + gap(20) */
`;

/* 왼쪽 패널 (메세지 입출력창) */
S.LeftPanel = styled.aside`
  width: 315px;
  height: 700px;
  background: #ffffff;
  border-radius: 8px;
  padding: 18px;
  box-shadow: inset 0 6px 18px rgba(0,0,0,0.06);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

S.Logo = styled.div`
  ${theme.FONT_WEIGHT.light}
  color: #333;
  margin-bottom: 8px;
`;

S.Timer = styled.div`
  display: flex;
  justify-content: center;
  ${h3Medium}
  color: ${theme.PALETTE.primary.red.main};
  margin-bottom: 6px;
`;

S.Day = styled.div`
  color: #666;
  margin-bottom: 12px;
`;

S.HelpBlock = styled.div`
  background: #f7f7f8;
  padding: 10px;
  border-radius: 6px;
  color: #444;
  ${h6Light}
  margin-bottom: 12px;
`;

S.HelpTitle = styled.div`
  ${theme.FONT_WEIGHT.light}
  margin-bottom: 6px;
`;

S.HelpText = styled.div`
  margin-bottom: 4px;
`;

S.Form = styled.form`
  margin-top: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

S.Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  font-size: 14px;
  box-sizing: border-box;
`;

S.Submit = styled.button`
  padding: 8px 12px;
  background: #7b5e3b;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

S.MessageBox = styled.div`
  margin-top: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #eee;
`;

S.MsgHeader = styled.div`
  padding: 8px 10px;
  background: #fafafa;
  border-bottom: 1px solid #eee;
  font-weight: 700;
  color: #333;
`;

S.MsgBody = styled.div`
  padding: 12px;
  color: #444;
  font-size: 14px;
  overflow: auto;
`;

/* 오른쪽 보드 영역 (700x700) */
S.BoardPanel = styled.div`
  width: 700px;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

S.BoardWrap = styled.div`
  position: relative;
`

S.BoardImg = styled.img`
    width: 700px;
    height: 700px;
  top: 26.8%;
    left: 30;
  position: absolute;
  z-index: 900;
    box-shadow: 0px 0px 20px 13px rgba(0,0,0,0.06)
`

S.BoardOuter = styled.div`
  width: 700px;
  height: 700px;
  background: #D9D9D9;
  border: 2px solid #7b5e3b;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  overflow: hidden;

`;

/* 실제 교차점 그리드 */
S.Board = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p.gridSize}, 1fr)`};
  grid-template-rows: ${(p) => `repeat(${p.gridSize}, 1fr)`};
  gap: 0;
  box-sizing: border-box;
`;

/* 각 셀 */
S.Cell = styled.div`
  position: relative;
  border-right: 1px solid #000;
  border-bottom: 1px solid rgba(160,122,74,0.5);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* 중앙 작은 점 */
S.Intersection = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #000;
`;

/* 돌 */
S.Stone = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: inset -3px -3px 8px rgba(0,0,0,0.3);
  z-index: 1000;
    background: ${(p) =>
    p.color === "black"
      ? `radial-gradient(circle at 20% 25%,
          rgba(255,255,255,0.08) 0%,
          rgba(255,255,255,0.03) 8%,
          rgba(0,0,0,0.9) 45%,
          rgba(0,0,0,0.75) 70%,
          rgba(18,18,18,1) 100%)`
      : `radial-gradient(circle at 30% 25%,
          rgba(255,255,255,0.95) 0%,
          rgba(235,255,255,0.9) 40%,
          rgba(120,120,120,0.12) 80%,
          rgba(120,120,120,0.16) 100%)`};

  /* 내부 하이라이트/음영 느낌을 위한 inset 그림자 */
  box-shadow: ${(p) =>
    p.color === "black"
      ? `inset -4px -4px 10px rgba(0,0,0,0.7), inset 3px 3px 8px rgba(255,255,255,0.03), 0 3px 8px rgba(0,0,0,0.35)`
      : `inset -3px -3px 8px rgba(255,255,255,0.85), inset 3px 3px 8px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.12)`};

  /* 테두리(이미지에서처럼 내부에 선이 있는 것처럼 보이게) */
  border: ${(p) => (p.color === "black" ? "1px solid rgba(70,77,74,0.85)" : "1px solid rgba(70,77,74,0.35)")};
`;


/* 마지막 착수 표시 */
S.LastMark = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: red;
  right: 8px;
  bottom: 8px;
  z-index: 3;
`;

export default S;
