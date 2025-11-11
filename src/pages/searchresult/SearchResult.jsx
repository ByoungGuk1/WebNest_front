import { SearchResultContext } from 'context/SearchResultContext';
import React, { useContext } from 'react';
import S from './style';
import NoResult from './Components/NoResult';

const SearchResult = () => {

  const {state, actions} = useContext(SearchResultContext) 
  const {search, isSearchUpdate, openPosts, questionPosts, quizzes, users } = state;
  const totalCount = openPosts.length + questionPosts.length + quizzes.length + users.length

  console.log(openPosts)
  return (
    <>
      <h1>검색 결과 페이지😎</h1>
      {totalCount ? (
        <S.ResultWrap>
          {questionPosts.length ? (
            <ul>
              {questionPosts.slice(0, 3).map(({postTitle}, i) => (
                <li key={i}>{postTitle}</li>
              ))}
            </ul>
          ) : <></>}
          
          {quizzes.length ? (
            <>3개씩만</>
          ) : <></>}

          {openPosts.length ? (
            <>3개씩만</>
          ) : <></>}

          {users.length ? (
            <>3개씩만</>
          ) : <></>}
        </S.ResultWrap>
      ): <NoResult /> }
    </>
  );
};

export default SearchResult;