import React, { useState } from "react";
import S from "./style";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const WriteContainer = () => {
  const [category1, setCategory1] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  const {currentUser, isLogin } = user;
  const { id } = currentUser

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    // const postData = {
    //   postType: "QUESTION", // 문제둥지 구분 (필요시 OPEN 등)
    //   postTitle: title,
    //   postContent: content,
    //   userId: id, // 로그인 기능 붙으면 실제 userId로 교체
    //   postCreateAt: new Date().toISOString(),
    // };
    const postData = {
      postType: category1.toUpperCase() || "OPEN",  // ✅ DB에서 허용하는 값 사용
      postTitle: title,
      postContent: content,
      userId: id,
      postCreateAt: new Date().toISOString(),
    };


    try {
      const response = await fetch("http://localhost:10000/post/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new Error("서버 응답 실패");

      alert("글이 성공적으로 등록되었습니다!");
      navigate("/question");
    } catch (error) {
      console.error("글 등록 실패:", error);
      alert("글 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <>

      {/* 상단 배너 */}
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
        {/* 카테고리 선택 */}
        <S.CategoryWrap>
          <S.Select>
            <select value={category1} onChange={(e) => setCategory1(e.target.value)}>
              <option value="">주제 선택</option>
              <option value="JS">JS</option>
              <option value="JAVA">JAVA</option>
              {/* <option value="OPEN">HTML</option> */}
              <option value="ORACLE">Oracle</option>

            </select>
          </S.Select>
        </S.CategoryWrap>

        {/* 제목 입력 */}
        <S.InputTitle
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 내용 입력 */}
        <S.InputContent
          placeholder="내용을 입력하세요 (코드나 에러 로그를 포함해도 좋아요)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* 버튼 */}
        <S.ButtonWrap>
          <S.CancelBtn onClick={() => navigate("/question")}>취소</S.CancelBtn>
          <S.SubmitBtn onClick={handleSubmit}>등록</S.SubmitBtn>
        </S.ButtonWrap>
      </S.Container>
    </>
  );
};

export default WriteContainer;
