import React, { useState } from "react";
import S from "./style";
import { useNavigate } from "react-router-dom";

const WriteContainer = () => {
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    console.log({
      category1,
      category2,
      title,
      content,
    });

    alert("글이 등록되었습니다!");
    navigate("/question");
  };

  return (
    <>
      {/* 🟣 상단 배너 */}
      <S.PurpleBannerWrap>
        <S.PurpleBanner>
          <S.PurpleBannerInner>
            <div>
              <S.PurplePageTitle>문제 둥지</S.PurplePageTitle>
              <S.PurplePageDesc>
                모르는 문제를 함께 올리고 답변을 받아보세요.
              </S.PurplePageDesc>
            </div>
            <S.PurpleIllust src="/assets/images/chickens.png" alt="문제둥지 일러스트" />
          </S.PurpleBannerInner>
        </S.PurpleBanner>
      </S.PurpleBannerWrap>


      <S.Container>
        {/* 🟣 상단 제목 */}
        {/* <S.TitleWrap>
          <S.PageTitle>질문 작성</S.PageTitle>
          <S.PageDesc>궁금한 문제를 올리고 함께 해결해보세요.</S.PageDesc>
        </S.TitleWrap> */}

        {/* 🟢 카테고리 선택 */}
        <S.CategoryWrap>
          {/* ✅ 주제 선택 */}
          <S.Select>
            <select value={category1} onChange={(e) => setCategory1(e.target.value)}>
              <option value="">주제 선택</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="oracle">Oracle</option>
              <option value="선택없음">선택없음</option>
            </select>
          </S.Select>
        </S.CategoryWrap>

        {/* 🟢 제목 입력 */}
        <S.InputTitle
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 🟢 내용 입력 */}
        <S.InputContent
          placeholder="내용을 입력하세요 (코드나 에러 로그를 포함해도 좋아요)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* 🔵 버튼 */}
        <S.ButtonWrap>
          <S.CancelBtn onClick={() => navigate("/question")}>취소</S.CancelBtn>
          <S.SubmitBtn onClick={handleSubmit}>등록</S.SubmitBtn>
        </S.ButtonWrap>
      </S.Container>
    </>
    
  );
};

export default WriteContainer;
