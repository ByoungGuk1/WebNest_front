// src/pages/community/post/postlist/style.js
// ./style.js
import styled, { createGlobalStyle } from "styled-components";
import {
  flexCenter,
  h3Bold,
  h9Bold,
  h6Bold,
  h6Light,
  h6Medium,
  h7Bold,
  h7Medium,
  h8Bold,
  h8Medium,
} from "../../../../styles/common";
import { Link } from "react-router-dom";
import theme from "../../../../styles/theme";
const S = {};

/* ✅ 헤더 알람 팝오버를 항상 최상단으로 */
export const HeaderAlarmLayerFix = createGlobalStyle`
  #header-alarm-popover,
  .header-alarm-popover,
  [data-layer="alarm-popover"] {
    position: fixed !important;
    z-index: 2147483646 !important; /* 최상위 */
    top: var(--header-height, 64px);
    right: max(16px, calc(50% - 580px)); /* 1160 컨테이너 우측 정렬 */
    pointer-events: auto;
  }
`;

/* ===================== 상단 배너 ===================== */
S.BannerWrap = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

S.Banner = styled.div`
  width: 100%;
  height: 188px;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  ${flexCenter}
`;

S.BannerInner = styled.div`
  width: 1160px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.PageTitle = styled.div`
  ${h3Bold}
`;

S.PageDesc = styled.div`
  ${h6Medium}
`;

S.Illust = styled.img`
  width: 180px;
  height: auto;
`;

/* ===================== 인기 질문 Swiper 영역 ===================== */
S.Container = styled.div`
  position: relative;
  width: 1160px;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

S.ArrowBtn = styled.button`
  position: absolute;
  top: calc(50% + 23px);
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform .2s ease, background-color .2s ease;
  z-index: 4; /* 카드/그라데이션 위로 */

  &:hover { transform: translateY(-55%); }

  img {
    width: 11px; height: 18px; display: block;
  }

  &.left { left: -75px; }
  &.right { right: -75px; }
`;

S.PopularWrap = styled.div`
  position: relative;
  display: flex;
  margin-top: 46px;
  gap: 12px;
  flex-wrap: nowrap;
  width: 1160px;
  overflow: hidden;
  z-index: 1;

  .swiper { width: 100%; overflow: visible; }
  .swiper-wrapper {
    display: flex !important;
    flex-direction: row !important;
    align-items: stretch;
  }
  .swiper-slide {
    height: auto !important;
    display: flex;
    justify-content: center;
  }
  .swiper-button-prev,
  .swiper-button-next {
    display: none !important; /* 커스텀 화살표 사용 */
  }
`;

S.PopularCard = styled.div`
  width: 308px;
  height: 198px;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.secondary};
  border: 1px solid ${({ theme }) => `${theme.PALETTE.neutral.black.main}14`};
  border-radius: 12px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

S.PopularTitle = styled.div`
  ${h6Bold}
  width: 266px;
  height: 38px;
  margin: 21px 21px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 42px);
`;

S.PopularPreview = styled.div`
  ${h6Light}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  width: 266px;
  height: 96px;
  margin: 0 21px 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

S.Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 21px 12px;
`;

S.MetaWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  ${h8Medium}

  b {
    font-weight: normal;
    color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
  }
`;

S.ProfileImg = styled.img`
  width: 18px; 
  height: 18px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #f5f5f5;
`;

S.Response = styled.div`
  display: flex; align-items: center; gap: 5px;
  ${h8Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};

  img { width: 13px; height: 13px; }
`;

/* 오른쪽 페이드 */
S.GradientRight = styled.div`
  position: absolute;
  right: 0; top: 0;
  width: 120px; height: 100%;
  pointer-events: none;
  background: linear-gradient(
    to left,
    white 20%,
    rgba(255,255,255,0.8) 50%,
    rgba(255,255,255,0) 100%
  );
  z-index: 3;
`;

/* ===================== 정렬/글쓰기 영역 ===================== */
S.SortWrap = styled.div`
  width: 1160px;
  margin: 46px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  /* [ADD] 드롭다운 루트 클래스 높이 강제 */
  & .dd-ctrl {
    margin: -6px 0 6px 0;
  }

`;

S.Select = styled.div`
  position: relative;

  select {
    width: 120px; height: 44px;
    border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
    border-radius: 10px;
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};
    ${h6Medium}
    cursor: pointer;
    padding: 0 40px 0 14px;
    outline: none; appearance: none;
    background-image: url("/assets/icons/downarrow.svg");
    background-repeat: no-repeat;
    background-size: 14px;
    background-position: calc(100% - 14px) center;
    transition: all .2s ease;
  }

  select option {
    font-size: 15px;
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  }
`;

S.WriteButton = styled.div`
  width: 113px; height: 40px;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  ${h6Bold}
  border-radius: 10px;
  display: flex; 
  justify-content: center; 
  align-items: center;
  margin: auto 0;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary.purple.dark};
  }
`;

/* ===================== 리스트 ===================== */
S.ListWrap = styled.div`
  width: 1160px;
  margin: 50px auto 0;
  display: flex;
  flex-direction: column;
  gap: 35px; ///---------------35px---------------------------------------------------
`;

S.Link = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
`;

S.Row = styled.div`
  height: 209px; //--------------------------------------add
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.neutral.white.dark};
`;

S.Tag = styled.div`
  color: white;
  height: 20px;
  border-radius: 4px;
  ${h8Bold}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  width: ${({ lang }) =>
    lang === "JS" ? "24px" :
    lang === "JAVA" ? "40px" :
    lang === "CSS" ? "33px" :
    lang === "HTML" ? "43px" :
    lang === "ORACLE" ? "54px" : "auto"};
  background-color: ${({ lang }) =>
    lang === "JAVA"  ? theme.PALETTE.primary.green.main :
    lang === "JS" ? theme.PALETTE.primary.yellow.main :
    lang === "CSS"  ? theme.PALETTE.primary.red.main :
    lang === "ORACLE"  ? theme.PALETTE.primary.purple.main :
    lang === "HTML" ? theme.PALETTE.primary.blue.main : "#aaa"};
`;

S.QuestionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap:12 px //---------------------add
`;

S.QuestionTitle = styled.div`
  ${h6Bold}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
  margin: 12px 0 12px 0;  ///////--------------none
`;

S.QuestionPreview = styled.div`
  ${h6Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  margin: 0 0 20px 0;
`;

/* 메타 + 인기댓글 래퍼 */
S.MetaBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;      /* 메타줄 ↔ 인기댓글 간격 */
  margin-top: 6px;
`;

S.ListMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

S.TopCommentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 0 30px 20px;
`;

S.TopCmtName = styled.span`
  ${h7Bold}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

S.TopCmtContent = styled.span`
  ${h7Bold}
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  gap: 12px; 
  padding-top: 12px;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

S.BestBadge = styled.span`
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 8px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: #fff;
  ${h9Bold}
`;

/* ===================== 페이지네이션 ===================== */
S.Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin: 100px 0;
  position: relative;
`;

S.PageArrow = styled.button`
  width: 32px; height: 32px;
  border: none; border-radius: 50%;
  background-color: ${({ disabled }) =>
    disabled ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.05)"};
  display: flex; justify-content: center; align-items: center;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: background-color .2s ease;
  
  img { width: 6px; height: 12px; opacity: ${({ disabled }) => (disabled ? 0.3 : 1)}; }

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.1)"};
  }

  &.left { margin-right: 45px; }
  &.right { margin-left: 45px; }
`;

S.PageButton = styled.button`
  width: 32px; height: 32px;
  border: none; border-radius: 50%;
  background-color: ${({ $active }) => ($active ? "#FFC107" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  ${h6Medium}
  cursor: pointer;

  &:hover {
    background-color: ${({ $active }) => (!$active ? "rgba(0,0,0,0.05)" : "#FFC107")};
  }
`;

export default S;
