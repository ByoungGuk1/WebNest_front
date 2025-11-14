// src/pages/mypage/style.js
import styled from "styled-components";
import { h3Bold, h5Bold, h6Medium, h7Medium } from "../../styles/common";
import theme from "../../styles/theme";

const S = {};

/* ---------- 페이지/배너 ---------- */
S.Page = styled.div`
  width: 100%;
`;

S.BannerWrap = styled.div`
  width: 100%;
`;

S.Banner = styled.div`
  width: 100%;
  height: 188px;
  /* theme 안전 처리 (ThemeProvider 미적용 시 기본 보라색) */
  background-color: ${({ theme }) => theme?.PALETTE?.primary?.purple?.main || "#7255EE"};
`;

S.BannerInner = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff; /* 배너 위 텍스트는 흰색 */
`;

/* ---------- 본문 공통 컨테이너 ---------- */
S.Wrapper = styled.div`
  width: 1160px;
  margin: 0 auto;
  padding: 24px 16px;
`;

/* ---------- Profile ---------- */
S.ProfileArea = styled.section`
  display: flex;
  flex-direction: column;
  padding: 18px 0;
`;

S.ProfileImg = styled.img`
  width: 118px;
  height: 118px;
  border-radius: 50%;
  background: #e5e7eb;
  z-index: 2;
  margin-top: -101px;
  margin-left: -59px;
`;

S.Nickname = styled.div`
  ${h3Bold}
  display: flex;
  align-items: center;
  padding: 39px 0 0 0;
`;

S.Follow = styled.div`
  display: flex;
  gap: 7px;
  padding-top: 18px;
  color: #666;

  & > span {
    display: inline-flex;
    align-items: center;
  }

  & b {
    padding: 0 2px 0 0;
  }
`;

/* ---------- Tabs (button.tab 기준) ---------- */
S.Tabs = styled.nav`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 662px;
  height: 90px;

  /* 이동형 언더바 */
  & > .active {
    border-bottom: solid 3px ${({ theme }) => theme?.PALETTE?.primary?.blue?.main} !important;
  }

  /* 공통 탭 버튼 */
  & > .tab {
    ${h5Bold}
    background: transparent;
    border: 0;
    color: #000;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
  }


  /* 고정 간격  */
  & > button.tab:nth-of-type(1) {
    margin-left: 0; /* 문제 북마크 */
  }
  & > button.tab:nth-of-type(2) {
    margin-left: 92px; /* 게시글 */
  }
  & > button.tab:nth-of-type(3) {
    margin-left: 79px; /* 좋아요 */
  }
  & > button.tab:nth-of-type(4) {
    margin-left: 79px; /* 친구 */
  }
  & > button.tab:nth-of-type(5) {
    margin-left: 92px; /* 등급 */
  }
  & > button.tab:nth-of-type(6) {
    margin-left: 92px; /* 정보 수정 */
  }
`;

/* ---------- Content ---------- */
S.Content = styled.main`
  min-height: 300px;
`;

export default S;
