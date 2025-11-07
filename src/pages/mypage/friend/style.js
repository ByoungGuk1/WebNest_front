// src/pages/mypage/friend/style.js
import styled from "styled-components";

const S = {};

/** 마이페이지 최상위 컨테이너 (레이아웃이 따로 잡혀 있으면 width:100% 유지) */
S.Page = styled.div`
  width: 100%;
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

export default S;
