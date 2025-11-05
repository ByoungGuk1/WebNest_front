// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const QuestionListContainer = () => {
//   return (
//     <div>
//       <h1>QuestionListContainer</h1>
//       <Link to={`/question/${1}`}>문제 질문 게시글1</Link>
//       <Link to={`/question/${2}`}>문제 질문 게시글2</Link>
//       <Link to={`/question/${3}`}>문제 질문 게시글3</Link>
//       <Link to={`/question/${4}`}>문제 질문 게시글4</Link>
//       <Link to={`/question/${5}`}>문제 질문 게시글5</Link>
//     </div>
//   );
// };

// export default QuestionListContainer;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import S from "./style";

const QuestionListContainer = () => {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const response = await fetch("/json_server/question/post.json");
  //     if (!response.ok) throw new Error("문제둥지에러");
  //     const post = await response.json();
  //     return post;
  //   };
  //   getPosts().then((data) => {
  //     setPosts(data.posts);
  //   });
  // }, []);

  // console.log(posts);
  // const postList = posts.map(({ postId, postTitle, postContent }, i) => {
  //   <li key={i}>
  //     <span>게시글 번호 : {postId}</span>
  //     <span>제목 : {postTitle}</span>
  //     <span>내용 : {postContent}</span>
  //   </li>;
  // });
  const [posts, setPosts] = useState([]);

  // 🟣 JSON 데이터 불러오기
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/json_server/question/post.json");
      if (!response.ok) throw new Error("문제둥지에러");
      const post = await response.json();
      return post;
    };

    getPosts().then((data) => {
      setPosts(data.posts);
    });
  }, []);

  // 🟣 데이터 확인용 콘솔
  console.log(posts);


  return (
    <>
      {/* 🟣 상단 배너 */}
      <S.BannerWrap>
        <S.Banner>
          <S.BannerInner>
            <div>
              <S.PageTitle>문제 둥지</S.PageTitle>
              <S.PageDesc>
                모르는 문제를 함께 올리고 답변을 받아보세요.
              </S.PageDesc>
            </div>
            <S.Illust
              src="/assets/images/chickens.png"
              alt="문제둥지 일러스트"
            />
          </S.BannerInner>
        </S.Banner>
      </S.BannerWrap>

      {/* ⚪ 전체 컨테이너 */}
      <S.Container>
        {/* 인기 질문 카드 */}
        <S.ArrowBtn className="left">
          <img src="/assets/icons/leftarrow.svg" />
        </S.ArrowBtn>
        <S.PopularWrap>
          <S.PopularCard>
            <S.PopularTitle>이 코드 어떻게 짜나요!!</S.PopularTitle>
            <S.PopularPreview>내일3123 123123 123</S.PopularPreview>
            <S.Info>
              <S.MetaWrap>
                <img src="/assets/images/imgimg.svg" />
                코린이1<b>·</b>조회 117
              </S.MetaWrap>
              <S.Response>
                <img src="/assets/icons/talktalk.svg" />1
              </S.Response>
            </S.Info>
          </S.PopularCard>

          <S.PopularCard>
            <S.PopularTitle>도와주세요ㅠㅠ</S.PopularTitle>
            <S.PopularPreview>어제 문제인데 너무 어려워요ㅠ</S.PopularPreview>
            <S.MetaWrap>자바초보 · 조회 69</S.MetaWrap>
          </S.PopularCard>

          <S.PopularCard>
            <S.PopularTitle>제발 도와주세요</S.PopularTitle>
            <S.PopularPreview>오류가 안 잡혀요…</S.PopularPreview>
            <S.MetaWrap>디버거 · 조회 225</S.MetaWrap>
          </S.PopularCard>

          <S.PopularCard>
            <S.PopularTitle>문제 추천해줘요~</S.PopularTitle>
            <S.PopularPreview>쉬운 문제 없을까요?</S.PopularPreview>
            <S.MetaWrap>sky.zip · 조회 188</S.MetaWrap>
          </S.PopularCard>
        </S.PopularWrap>
        <S.ArrowBtn className="right">
          <img src="/assets/icons/rightarrow.svg" />
        </S.ArrowBtn>
      </S.Container>
      {/* 정렬 + 글쓰기 버튼 */}
      <S.SortWrap>
        <S.Select>
          <select>
            <option>최신글</option>
            <option>조회순</option>
            <option>댓글순</option>
          </select>
        </S.Select>
        <S.WriteButton>글쓰기</S.WriteButton>
      </S.SortWrap>

      {/* 🟢 질문 리스트 */}
      <S.ListWrap>
        {posts.length > 0 ? (
          posts.map(({ postId, postTitle, postContent, postLangTag }) => (
            <S.Row key={postId}>
              <S.Tag lang={postLangTag}>{postLangTag}</S.Tag>
              <S.QuestionInfo>
                <S.QuestionTitle>{postTitle}</S.QuestionTitle>
                <S.QuestionPreview>{postContent}</S.QuestionPreview>
              </S.QuestionInfo>
            </S.Row>
          ))
        ) : (
          <p>불러오는 중...</p>
        )}
      </S.ListWrap>
    </>
  );
};

export default QuestionListContainer;
