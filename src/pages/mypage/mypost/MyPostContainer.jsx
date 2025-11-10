// src/pages/mypage/mypost/MyPostContainer.jsx
import React, { useState } from "react";
import PostListContainer from "../../community/post/postlist/PostListContainer";
// [ADD] 문제둥지용 목록 컨테이너 임포트 (경로는 프로젝트 구조에 맞게 조정)
import QuestionListContainer from "../../community/question/questionlist/QuestionListContainer";

import MyPostDropDown from "./MyPostDropDown";   // 기존 드롭다운 유지
import S from "./style";

const MyPostContainer = () => {
 

  // [ADD] 열린둥지/문제둥지 토글 상태
  //  - 'open'  : PostListContainer (일반 커뮤니티 게시글)
  //  - 'question' : QuestionListContainer (Q&A 게시글)
  const [board, setBoard] = useState("open");

  return (
    <div>
      {/* [ADD] 열린둥지/문제둥지 토글 버튼 */}
      <S.BoardToggleRow>
        <S.BoardToggle aria-label="게시판 선택">
          <S.BoardButton
            type="button"
            aria-pressed={board === "open"}
            $active={board === "open"}
            onClick={() => setBoard("open")}
            // [ADD] 버튼 크기 width/height로 제어
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

      {/* 기존 드롭다운 영역(정렬) 유지 */}


      {/* [ADD] 토글 상태에 따라 목록 컨테이너 교체 렌더링 */}
      <S.StripHeader>
        {board === "open" ? (
          <PostListContainer /* 일반 커뮤니티 게시글 리스트 */ />
        ) : (
          <QuestionListContainer /* Q&A(문제둥지) 게시글 리스트 */ />
        )}
      </S.StripHeader>
    </div>
  );
};

export default MyPostContainer;
