import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import S from './style'
import { SearchResultContext } from "context/SearchResultContext";

const SearchResultContainer = () => {

  const {state, actions} = useContext(SearchResultContext) 
  const {search, isSearchUpdate, openPosts, questionPosts, quizzes, users } = state;
  const {setSearch, setIsSearchUpdate} = actions;
  
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search")
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()
  const totalCount = openPosts.length + questionPosts.length + quizzes.length + users.length

  const handleSearch = (e) => setKeyword(e.target.value)
  const handelSearchUpdate = (e) => {
    if(e.key === 'Enter'){
      const trimmedKeyword = keyword.trim();
      if (!trimmedKeyword || trimmedKeyword.length < 2) {
        alert("검색어는 두 글자 이상부터 입력가능합니다.");
        return;
      }
      navigate(`/search?search=${encodeURIComponent(trimmedKeyword)}`)
    }
  }
  
  useEffect(() => {
    // searchKeyword가 null이거나 빈 문자열이면 빈 문자열로 설정
    setSearch(searchKeyword || "")
  }, [searchKeyword])

  return (
    <S.ResultWrap>
      <S.InputWrap>
        <input placeholder={search} onChange={handleSearch} onKeyDown={handelSearchUpdate} />
        <img src="/assets/images/header/search.png" alt="" />
      </S.InputWrap>
      <S.TextWrap>
        <NavLink className={"border-bottom"} to={`/search?search=${searchKeyword}`}>
          <S.Text 
            className="select" 
            id="1"
          >
              전체 &nbsp;<span>{totalCount}</span>
          </S.Text>
        </NavLink>
        <NavLink className={"border-bottom"} to={`/search/question-post?search=${searchKeyword}`}>
          <S.Text 
            className="select" 
            id="2" 
          >문제둥지<span>{questionPosts.length}</span> </S.Text>
        </NavLink>
        <NavLink className={"border-bottom"} to={`/search/quiz?search=${searchKeyword}`}>
          <S.Text 
            className="select" 
            id="3"
          >훈련장 &nbsp;<span>{quizzes.length}</span></S.Text>
        </NavLink>
        <NavLink className={"border-bottom"} to={`/search/open-post?search=${searchKeyword}`}>
          <S.Text 
            className="select"
            id="4"
          >열린둥지&nbsp;<span>{openPosts.length}</span> </S.Text>
        </NavLink>
        <NavLink className={"border-bottom"} to={`/search/follow?search=${searchKeyword}`}>
          <S.Text 
            className="select"
            id="5"
          >친구 &nbsp;<span>{users.length}</span></S.Text>
        </NavLink>
      </S.TextWrap>
      <Outlet />
    </S.ResultWrap>
  );
};

export default SearchResultContainer;
