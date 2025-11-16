// src/pages/mypage/friend/style.js
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import theme from "../../../styles/theme";
import { h4Bold, h7Bold, h7Light, h7Medium, h9Bold } from "../../../styles/common";

const S = {};

/** 마이페이지 최상위 컨테이너 (레이아웃이 따로 잡혀 있으면 width:100% 유지) */
S.Page = styled.div`
  width: 100%;
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
  width: 86px;
  height: 40px;
  box-sizing: border-box;
  border-radius: 12px; /* 항상 알약 형태 */

  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

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

/* NavLink를 위한 토글 버튼 스타일 */
S.BoardNavLink = styled(NavLink)`
  appearance: none;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? (theme.PALETTE.primary.blue.main) :(theme.PALETTE.primary.green.lightGray)};
  background: ${({ theme, $active }) =>
    $active ? (theme.PALETTE.primary.blue.main) : "#ffffff"};
  color: ${({ theme, $active }) =>
    $active ? "#ffffff" : (theme?.PALETTE?.neutral?.black?.primary || "#111")};

  /* [MOD] 패딩 기반 → width/height 기반으로 변경 */
  width: 86px;
  height: 40px;
  box-sizing: border-box;
  border-radius: 12px; /* 항상 알약 형태 */

  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  text-decoration: none;

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

/** 탭 네비게이션 (기존 스타일 유지 - 필요시 사용) */
S.TabNav = styled.nav`
  display: flex;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  
  & > a {
    display: inline-block;
    padding: 8px 16px;
    text-decoration: none;
    color: #666;
    font-weight: 500;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
    margin-bottom: -1px;
    
    &:hover {
      color: #2F96FD;
    }
    
    &.active {
      color: #2F96FD;
      border-bottom-color: #2F96FD;
    }
  }
`;

/** UserResult 묶음을 쌓아 올리는 섹션 */
S.Section = styled.section`
  padding-top: 20px;
  /* 화면 크기에 따라 자연스러운 상/하 여백 */
  margin: clamp(16px, 2vw, 28px) 0 clamp(20px, 3vw, 40px);
`;

/**
 * ✅ 검색 컴포넌트(UserResult)를 감싸는 래퍼
 *  - UserResult 내부의 "상단 파란 줄 영역(헤더)"을 숨김
 *  - 내부에서 첫 섹션이 헤더인 케이스와, 클래스/데이터 속성으로 구분한 케이스 모두 대응
 */
S.StripHeader = styled.div`
  /* 1) 명시적 헤더 패턴 숨김 (여러 구현 대응) */
  & [data-strip="header"],
  & .strip-header,
  & .blue-strip,
  & .header {
    display: none !important;
  }

  /* 2) 구조적(첫 섹션이 헤더)인 경우도 안전망으로 숨김 */
  & > *:first-child > *:first-child {
    display: none !important;
  }

  /* 헤더 제거 후 위쪽 들뜸 방지 */
  & > *:first-child {
    margin-top: 0 !important;
    padding-top: 0 !important;
    border-top: 0 !important;
  }

  /* 여러 묶음이 연달아 렌더될 때 간격 */
  & + & {
    margin-top: 16px;
  }
`;

/** 하단 페이지네이션 바 (FriendContainer에서 사용) */
S.PaginationBar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

/** 가드 메시지용 간단한 에러 박스 (import 실패 시 표시) */
S.ErrorBox = styled.div`
  border: 1px dashed #ccc;
  border-radius: 12px;
  padding: 20px;
  background: #fafafa;
  line-height: 1.6;

  code {
    display: block;
    background: #f3f3f3;
    padding: 8px 12px;
    border-radius: 8px;
    margin: 8px 0 4px;
    overflow-x: auto;
  }
`;

/* ====================== Follower 컴포넌트 스타일 ====================== */
S.FollowerContainer = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 20px 0;
`;

S.FollowerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

S.FollowerItem = styled.div`
  width: 1160px;
  height: 153px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

S.FollowerLeft = styled.div`
  width: 320px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & .lv {
    ${h9Bold}
    color: #2F96FD;
  }
  & img {
    width: 66px;
    height: 66px;
    border-radius: 100%;
    background-color: gray;
  }
  & p{
    ${h4Bold}
  }
  & .follower {
    ${h7Light}
    color: #555;
  }
  & .count {
    color: #4d4d4d;
    ${h7Medium}
  }
`;

S.FollowerAvatar = styled.div` 
  position: relative;
`;

S.LevelBadge = styled.div`
  width: 35px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #fff;
  position: absolute;
  bottom: 0px;
  right: -8px;
  & span {
    ${h9Bold}
    color: #2F96FD;
  }
  & .lv {
    ${h9Bold}
    color: #2F96FD;
  }
  & .lvImg {
    width: calc(61px * 0.1);
    height: calc(74px * 0.1);
    background-color: #fff;
    margin-right: 3px;
  }
`;


S.FollowButton = styled.div`
  width: 86px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2F96FD;
  & span{
    ${h7Bold}
    color: #fff;
  }
`;

S.FollowingButton = styled.div`
  width: 86px;
  height: 34px;
  background-color: #00D674;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  & span{
    ${h7Bold}
    color : #fff;
  }
`;

S.EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${theme.PALETTE.neutral.gray.main};
  ${h7Medium}
`;

S.Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  padding: 20px 0;
`;

S.PaginationButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: #f5f5f5;
    border-color: #2F96FD;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

S.PaginationNumber = styled.button`
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  background-color: ${({ $active }) => ($active ? "#FFD700" : "#fff")};
  border-radius: 50%;
  cursor: pointer;
  color: #333;
  ${h7Medium}
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ $active }) => ($active ? "#FFD700" : "#f5f5f5")};
    border-color: #2F96FD;
  }
`;

export default S;
