// ./style.js
import styled from "styled-components";
import { Link } from "react-router-dom";
import { h5Medium } from "../../../styles/common";

const S = {};

/* ===== 레이아웃 ===== */
S.Container = styled.div`
  width: 1160px;
  margin: 0 auto;
`;

S.HeaderRow = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1.5px solid #2F96FD;
  ${h5Medium}
  .blue { color:#2F96FD; }
`;

S.CleanLinkPlus = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  &:hover { opacity:.8; }
  img { width:12px; height:12px; margin-right:6px; }
`;

S.List = styled.div`
  display: flex;
  flex-direction: column;
`;

/* ===== 카드(아이템) 한 장: 192px 고정, 여러 장 세로 스택 ===== */
S.Item = styled.div`
  width: 100%;
  height: 192px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;   /* 배지 한 줄 + 텍스트 세로 */
  justify-content: center;  /* 카드 세로 중앙 */
`;

/* 카드 전체 클릭 가능하게 */
S.CleanLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: column;   /* 배지 → 타이틀 → 본문 */
  justify-content: center;
  gap: 12px;                /* 배지/타이틀/본문 간 간격 */
  width: 100%;
  height: 100%;
  padding: 0 8px;
  &:hover { background:#FAFAFA; }
`;

/* ===== 상단 배지 줄 (배지만 위로 올림) ===== */
S.BadgeCol = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 20px;        /* 배지 높이 고정 */
  margin-bottom: 12px; /* 배지와 타이틀 간격 */
`;

/* ===== 텍스트 영역 ===== */
S.TextCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;        /* ellipsis 동작 위해 */
`;

S.TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

S.Title = styled.h3`
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

S.Body = styled.p`
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;    /* 2줄 말줄임 */
  overflow: hidden;

  .target {
    color: #00D674;
    font-weight: 600;
  }
`;

/* ===== 언어 배지 3종 (건들지 말자!) ===== */
S.javaBox = styled.div`
  width: 43px; height: 20px; border-radius: 3px;
  display:flex; align-items:center; justify-content:center;
  background:#00D674; color:#fff; font-weight:700; font-size:12px;
`;

S.jsBox = styled.div`
  width: 24px; height: 20px; border-radius: 3px;
  display:flex; align-items:center; justify-content:center;
  background:#FFC600; color:#fff; font-weight:700; font-size:12px;
`;

S.oracleBox = styled.div`
  width: 58px; height: 20px; border-radius: 3px;
  display:flex; align-items:center; justify-content:center;
  background:#7255EE; color:#fff; font-weight:700; font-size:12px;
`;

export default S;
