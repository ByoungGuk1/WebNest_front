// src/pages/mypage/mypost/MyPostContainer.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostListContainer from "../../community/post/postlist/PostListContainer";
import QuestionListContainer from "../../community/question/questionlist/QuestionListContainer";

import S from "./style";

/** 🔧 백엔드 연동용 상수 */
const API_BASE = (process.env.REACT_APP_BACKEND_URL || "http://localhost:10000").replace(
  /\/+$/,
  ""
);

const MyPostContainer = () => {
  // ✅ 4번. 로그인 정보 꺼내기
  // ⚠️ state 구조는 실제 프로젝트에 맞게 살짝 바꿔줘야 할 수도 있음
  const userState = useSelector((state) => state.user); // 예: state.auth.user 인 경우 여기를 수정

  const userId =
    userState?.id ??
    userState?.userId ??
    userState?.user?.id ??
    userState?.user?.userId ??
    null;

  const accessToken =
    userState?.accessToken ??
    userState?.token ??
    userState?.user?.accessToken ??
    userState?.user?.token ??
    null;

  // 열린둥지 / 문제둥지 토글 상태
  const [board, setBoard] = useState("open");

  // ✅ 로그인 안 된 상태 처리 (선택 사항)
  if (!userId) {
    return <div>로그인 후 이용 가능한 메뉴입니다.</div>;
  }

  // ✅ 5번. 마이페이지용 URL 생성
  const myOpenUrl = `${API_BASE}/private/my-page/users/${userId}/open`;
  const myQuestionUrl = `${API_BASE}/private/my-page/users/${userId}/question`;

  return (
    <div>
      {/* 열린둥지 / 문제둥지 토글 버튼 */}
      <S.BoardToggleRow>
        <S.BoardToggle aria-label="게시판 선택">
          <S.BoardButton
            type="button"
            aria-pressed={board === "open"}
            $active={board === "open"}
            onClick={() => setBoard("open")}
            $w="108px"
            $h="36px"
          >
            열린둥지
          </S.BoardButton>

          <S.BoardButton
            type="button"
            aria-pressed={board === "question"}
            $active={board === "question"}
            onClick={() => setBoard("question")}
            $w="108px"
            $h="36px"
          >
            문제둥지
          </S.BoardButton>
        </S.BoardToggle>
      </S.BoardToggleRow>

      {/* ✅ 6번. 내 글만 보여주는 리스트 컨테이너 */}
      <S.StripHeader>
        {board === "open" ? (
          <PostListContainer
            /** 마이페이지 - 내가 쓴 열린둥지 글 */
            customUrl={myOpenUrl}
            authToken={accessToken}
            isMyPage={true}
          />
        ) : (
          <QuestionListContainer
            /** 마이페이지 - 내가 쓴 문제둥지 글 */
            customUrl={myQuestionUrl}
            authToken={accessToken}
            isMyPage={true}
          />
        )}
      </S.StripHeader>
    </div>
  );
};

export default MyPostContainer;
