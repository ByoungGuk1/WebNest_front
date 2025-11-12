import { SearchResultContext } from 'context/SearchResultContext';
import React, { useContext } from 'react';
import S from './style';
import NoResult from './Components/NoResult';
import QuizList from 'pages/quiz/quizlist/QuizList';
import { useNavigate } from 'react-router-dom';


const SearchResult = () => {
  const navigate = useNavigate();
const moveToResult = ()=>{
  navigate("/quiz?search="+search)
}
  const {state, actions} = useContext(SearchResultContext) 
  const {search, isSearchUpdate, openPosts, questionPosts, quizzes, users } = state;
  const totalCount = openPosts.length + questionPosts.length + quizzes.length + users.length
  const displayQuizzes = quizzes.slice(0, 10)
  return (
    <>
      <h1>검색 결과 페이지😎</h1>
      {totalCount ? (
        <S.ResultWrap>
          {questionPosts.length ? (
            <S.LayOut>
              <S.SearchCategoryWrap>
                  <S.SearchResultCategoryLeft >
                    <span>문제둥지</span>
                    <span className='blue'>{questionPosts.length}</span>
                  </S.SearchResultCategoryLeft>
                  <S.SearchResultCategoryRight onClick={moveToResult}>
                    <S.CleanLink to={"search/question-post?search="+search}>
                      <span>+</span>
                      <span>더보기</span>
                    </S.CleanLink>
                  </S.SearchResultCategoryRight>
                </S.SearchCategoryWrap>
                {/* 검색 결과 부분 */}
                {questionPosts.slice(0, 3).map(({postTitle}, i) => (
                  <li key={i}>{postTitle}</li>
                ))}
            </S.LayOut>
          ) : <></>}
          
          {quizzes.length ? (
            <S.LayOut>
              <S.SearchCategoryWrap>
                <S.SearchResultCategoryLeft >
                  <span>훈련장</span>
                  <span className='blue'>{quizzes.length}</span>
                </S.SearchResultCategoryLeft>
                <S.SearchResultCategoryRight onClick={moveToResult}>
                  <S.CleanLink to={"search/quiz?search="+search}>
                    <span>+</span>
                    <span>더보기</span>
                  </S.CleanLink>
                </S.SearchResultCategoryRight>
              </S.SearchCategoryWrap>
              <QuizList quizs={displayQuizzes}></QuizList>
            </S.LayOut>
          ) : <></>}

          {openPosts.length ? (
            <S.LayOut>
              <S.SearchCategoryWrap>
                  <S.SearchResultCategoryLeft >
                    <span>열린둥지</span>
                    <span className='blue'>{openPosts.length}</span>
                  </S.SearchResultCategoryLeft>
                  <S.SearchResultCategoryRight onClick={moveToResult}>
                    <S.CleanLink to={"search/open-post?search="+search}>
                      <span>+</span>
                      <span>더보기</span>
                    </S.CleanLink>
                  </S.SearchResultCategoryRight>
                </S.SearchCategoryWrap>

              {/* 검색 결과 부분 */}
            </S.LayOut>
          ) : <></>}

          {users.length ? (
            <S.LayOut>
              <S.SearchCategoryWrap>
                  <S.SearchResultCategoryLeft >
                    <span>열린둥지</span>
                    <span className='blue'>{openPosts.length}</span>
                  </S.SearchResultCategoryLeft>
                  <S.SearchResultCategoryRight onClick={moveToResult}>
                    <S.CleanLink to={"search/follow?search="+search}>
                      <span>+</span>
                      <span>더보기</span>
                    </S.CleanLink>
                  </S.SearchResultCategoryRight>
                </S.SearchCategoryWrap>

              {/* 검색 결과 부분 */}
            </S.LayOut>
          ) : <></>}
        </S.ResultWrap>
      ): <NoResult /> }
    </>
  );
};

export default SearchResult;