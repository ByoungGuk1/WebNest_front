// src/pages/mypage/mypost/MyPostContainer.jsx
import React, { useState } from "react";
import PostListContainer from "../../community/post/postlist/PostListContainer";
import MyPostsDropDown from "./MyPostDropDown"; 
import S from "./style";

const MyPostContainer = () => {
  const [filter, setFilter] = useState("latest"); // "latest" | "comment" | "popular"

  // 열린둥지/문제둥지 토글 상태
  const [board, setBoard] = useState("open");

  return (
    <div>
      <S.BoardToggleRow>
        <S.BoardToggle aria-label="게시판 선택">
          <S.BoardButton
            type="button"
            aria-pressed={board === "open"}
            $active={board === "open"}
            onClick={() => setBoard("open")}
            // [ADD] 버튼 크기를 width/height로 제어
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
            // [ADD] 버튼 크기를 width/height로 제어
            $w="108px"
            $h="36px"
          >
            문제둥지
          </S.BoardButton>
        </S.BoardToggle>
      </S.BoardToggleRow>

      {/* <S.QuizDropDown>
        <MyPostsDropDown value={filter} onChange={setFilter} />
      </S.QuizDropDown> */}

      <S.StripHeader>
        <PostListContainer
          key={`postlist-${board}-${filter}`}
          boardType={board}
          order={filter}
        />
      </S.StripHeader>
    </div>
  );
};

export default MyPostContainer;
