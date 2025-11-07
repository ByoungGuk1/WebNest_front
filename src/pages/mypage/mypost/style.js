// src/pages/mypage/mypost/style.js
import styled from "styled-components";
import theme from "../../../styles/theme";
import {
  flexCenter,
  h3Bold,
  h9Bold,
  h6Bold,
  h6Light,
  h6Medium,
  h7Bold,
  h7Light,
  h7Medium,
  h8Bold,
  h8Medium,
} from "../../../styles/common";
const S = {};

/* 드롭다운 영역: 우측 정렬 + 1160 그리드 중앙정렬 */
S.QuizDropDown = styled.div`
  max-width: 1160px;
  width: 100%;
  margin:-70px 0 0 0;
  display: flex;
  justify-content: flex-end;
`;

/* 보드 토글: 1160 그리드 중앙 + 좌측 정렬 */
S.BoardToggleRow = styled.div`
  max-width: 1160px;
  width: 100%;
  margin: 0 auto 8px;
  display: flex;
  justify-content: center;
  padding: 40px 0 50px 0;
`;

/* 토글 버튼 묶음 */
S.BoardToggle = styled.div`
  display: inline-flex;
  gap: 8px;
`;

/* 토글 버튼 (가로/세로로 크기 제어) */
S.BoardButton = styled.button`
  appearance: none;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? (theme.PALETTE.primary.blue.main) :(theme.PALETTE.primary.green.lightGray)};
  background: ${({ theme, $active }) =>
    $active ? (theme.PALETTE.primary.blue.main) : "#ffffff"};
  color: ${({ theme, $active }) =>
    $active ? "#ffffff" : (theme?.PALETTE?.neutral?.black?.primary || "#111")};

  /* [MOD] 패딩 기반 → width/height 기반으로 변경 */
  width: 86px;                              // [ADD]
  height: 40px;                             // [ADD]
  box-sizing: border-box;                       // [ADD]
  border-radius: 12px;            // [ADD] 항상 알약 형태

  display: flex;                          // [ADD]
  align-items: center;                           // [ADD]
  justify-content: center;                       // [ADD]
  white-space: nowrap;                           // [ADD]

  ${h7Medium}
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme?.PALETTE?.primary?.blue?.main || "#1e90ff"};
  }
  &:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 3px
      ${({ theme }) => (theme?.PALETTE?.primary?.blue?.main || "#1e90ff") + "33"};
  }
`;

/* PostListContainer 내부 상단 헤더/스트립류 숨김 + 안전한 구조적 처리 */
S.StripHeader = styled.div`
  & [data-strip="header"],
  & .strip-header,
  & .blue-strip,
  & .header {
    display: none !important;
  }

  & > *:nth-child(-n + 3) {
    display: none !important;
  }
  & > *:nth-child(n + 4) {
    margin-top: 16px;
  }
`;

S.BoardToggle = styled.div`
  display: flex;
  gap: 8px;
`;

/* [ADD] 토글 버튼: width/height로 크기 제어 */
S.BoardButton = styled.button`
  width: ${({ $w }) => $w || "108px"};
  height: ${({ $h }) => $h || "36px"};
  border-radius: 8px;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? (theme?.PALETTE?.primary?.blue?.main || "#2F6BFF") : (theme?.PALETTE?.neutral?.gray?.[300] || "#E5E7EB")};
  background:
    ${({ theme, $active }) =>
      $active ? (theme?.PALETTE?.primary?.blue?.tinted || "#EAF2FF") : (theme?.PALETTE?.neutral?.white || "#FFFFFF")};
  color:
    ${({ theme, $active }) =>
      $active ? (theme?.PALETTE?.primary?.blue?.main || "#2F6BFF") : (theme?.PALETTE?.neutral?.black?.primary || "#111827")};
  font-weight: 600;
  padding: 0;                /* 크기 고정을 위해 내부 패딩 제거 */
  cursor: pointer;
  line-height: 1;
`;


export default S;
