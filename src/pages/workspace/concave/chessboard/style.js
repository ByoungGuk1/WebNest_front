// styles.js
import styled from "styled-components";

const S = {};

/* layout */
S.Container = styled.div`
  max-width: 720px;
  margin: 20px auto;
  font-family: Arial, Helvetica, sans-serif;
`;

/* controls */
S.Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
  justify-content: space-between;
  flex-wrap: wrap;
`;

S.Input = styled.input`
  padding: 6px 8px;
  width: 220px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

S.Button = styled.button`
  margin-left: 8px;
  padding: 6px 10px;
  background: #2d7ef7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover { opacity: 0.95; }
`;

/* info */
S.Info = styled.div`
  display:flex;
  flex-direction: column;
  gap:6px;
  margin-left: 8px;
`;

S.Message = styled.div`
  color: #333;
  margin-top: 6px;
`;

/* board */
S.ChessBoard = styled.div`
  display: grid;
  gap: 2px;
  background: #b88746;
  padding: 8px;
  border-radius: 6px;
  justify-content: center;
`;

S.Cell = styled.div`
  width: 32px;
  height: 32px;
  background: #f0d9a7;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  position:relative;
  box-sizing:border-box;
  border-radius:2px;
  &:hover { outline: 2px solid rgba(0,0,0,0.08); }
`;

/* stone */
S.Stone = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3) inset;
  &.black {
    background: radial-gradient(circle at 30% 30%, #444, #000);
  }
  &.white {
    background: radial-gradient(circle at 30% 30%, #fff, #ddd);
    border: 1px solid #ccc;
  }
`;

/* legend */
S.Legend = styled.div`
  margin-top: 12px;
  display:flex;
  gap:16px;
  align-items:center;
`;

S.LegendItem = styled.span`
  display:flex;
  align-items:center;
  gap:6px;
`;

S.Dot = styled.span`
  width:14px;
  height:14px;
  border-radius:50%;
  display:inline-block;
  &.black { background:#000; }
  &.white { background:#fff; border:1px solid #ccc; }
`;

export default S;
