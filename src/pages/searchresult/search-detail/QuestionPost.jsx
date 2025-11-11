import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import S from "./style";
import { SearchResultContext } from "context/SearchResultContext";

const QuestionPost = () => {

  const navigate = useNavigate();
  const {state, actions} = useContext(SearchResultContext) 
  const {search, questionPosts} = state;
  const {setSearch, setIsSearchUpdate} = actions;

  return (
    <S.Container>
      <S.HeaderRow>
        <div>
          문제둥지 <span className="blue">{questionPosts.length}</span>
        </div>
      </S.HeaderRow>

      <S.List>
        {questionPosts.map(({
          postId, quizLanguage, postTitle, postContent
        }) => (
          <S.Item
            key={postId}
            onClick={() => navigate(`/question/${postId}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(`/question/${postId}`)}
          >
            {/* <S.BadgeCol>{badge(quizLanguage)}</S.BadgeCol> */}

            <S.TextCol>
              <S.TitleRow>
                <S.Title title={postTitle}>{postTitle}</S.Title>
              </S.TitleRow>

              <S.Body>
                {postContent}
              </S.Body>
            </S.TextCol>
          </S.Item>
        ))}
      </S.List>
    </S.Container>
  );
};

export default QuestionPost;
