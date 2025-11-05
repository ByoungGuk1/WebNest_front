import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NoResult from "./Components/NoResult";
import QuestionPostResult from "./Components/QuestionPostResult";
import QuizResult from "./Components/QuizResult";
import UserResult from "./Components/UserResult";
import OpenPostResult from "./Components/OpenPostResult";
import S from './style'

const SearchResultContainer = () => {
  const BACKURL = "qwer"
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // 검색 결과의 쿼리스트링 밸류 값
  let search = queryParams.get('search');

  const [ searchLi, setSearchLi ] = useState([]);
  const [ newQuery, setNewQuery ] = useState("");
  const [ targetId , setTargetId ] = useState(1);
  // console.log(search)
    // 1. 백엔드에 검색 총 결과 리절트를 받는다.
    // 2. 결과 리절트에 예상 값 : 검색데이터, responseDTO
    // 3. 검색 결과 총 카운트
    // 4. responseDTO 에 있는 데이터 예상
    // 4.1 토론 게시판 : List<토론> - 토론.size 하면 토론의 카운트
    // 4.2 해당하는 List를 기본 순서롤 받아져 있음.
    // 4.3 화면에 보여줄 최대 개수는 3개
    // 4.4 List를 반복 돌아서 최신순으로 정렬 시킨 후 3개가 넘을 경우 3개만 보여준다.
    // 5. 원하는 탭(토론) 을 눌렀을 때 기본 정렬로 10개만 보여주고 페이지 네이션 처리
    // 6. 
  const onSubmit = ((e) => {
    search = newQuery;
  })

  const changeBorder = ((e) => {
    // console.log(e.target.id)
    // console.log(e.target)
    setTargetId(e.target.id)
    // setTarget()
  })

  const onChange = ((e) => {
    setNewQuery(e.target.value)
  })
  //   const data = await resp.json();
  //   setPosts(data)
  // }
  // fetchList()
  useEffect(() => {

    const getSearchLists = async () => {
      const resp = await fetch("json_server/searchResponse/searchResponse.json")
      //   , {
      //   headers: {
      //   "Content-Type" : "application/json"
      //   },
      //   method: "POST",
      //   body: JSON.stringify(search)
      // })
      if(!resp.ok){ throw new Error("에러")}
      const searchResults = await resp.json();
      return searchResults
      // .then((res) => res.json())
      // .then((res) => setSearchLi(res))
    }
    getSearchLists()
      .then((resp) => setSearchLi(resp))
    // searchList().then((res) => res.json())
    // .then(console.log)
  },[])
  // console.log("JSON 파싱값" +searchLi)

  //  널 병합 연산자로 안전하게 처리 렝쓰나 이런 거 계산 삽가능
  const {
    total = 0,
    users = [],
    openPost = [],
    questionPost = [],
    quiz = [],
  } = searchLi ?? {};
  
// 퀘스쳔포스트 응답 예시
// questionPost[ {postTitle : "제목", postContent : "내용", postLang : "언어" ,좋아요 수: "123", 조회 수 : "123", [{작성자 이름 : "이름", 프사 : "프사경로" }], [ { 답변한 사용자 이름 : "사용자", 사용자 레벨 : 1~10, 팔로워 수 : 123, 선호 언어 : "자바", 작성 날짜 : "2022-02-02", 좋아요 수 : 123,  }, ... }        {} ... ]

// 오픈포스트 응답 예시
// [{제목 : "", 내용 : "", 작성일자 : "", 조회 수 : "", 댓글 갯수 : "", 마지막 댓글 : {작성자 : [{이름 : "", 프사경로 : ""}], 댓글 내용 : ""}, 작성자 정보 : {이름 : "", 프사경로 : "" } }, {...}, ... ]
// 제목, 내용,작성일자, 조회 수, 댓글 갯수, 마지막 댓글 , 작성자 정보


// 문제 응답 예시 : << 얘 때문에 값 넘길 때 토큰까지 넘겨서 해당 유저가 풀었나 안 풀었나도 검사해서 보내줘야할듯 ? 백에서 필터로 거르면 이거 비로그인 사용자는 이용 못 하는데 흠흠 ...
// [{id : "", difficult : "", lang : "", title : "", type : "", isPass : T/F }, {}, ...]
// 번호 , 난이도, 언어, 제목, 유형, 해결 여부

// 유저리스트 응답 예시 : 
// [{profileUrl : "", level : "", name : "", followerCount : "", isPermitAlarm : T/F, isFollowing : T/F}, {}, ...]
// 프사, 레벨, 이름, 팔로워 수 , 알람 여부, 팔로우 여부

// {
//     total = 알아서 넘겨줌,
//     members = [{profileUrl : "", level : "", name : "", followerCount : "", isPermitAlarm : T/F, isFollowing : T/F}, {}, ...],
//     openPost = [{제목 : "", 내용 : "", 작성일자 : "", 조회 수 : "", 댓글 갯수 : "", 마지막 댓글 : {작성자 : [{이름 : "", 프사경로 : ""}], 댓글 내용 : ""}, 작성자 정보 : {이름 : "", 프사경로 : "" } }, {...}, ...],
//     questionPost = [{postTitle : {제목}, postContent : {내용}, postLang : {언어}}, {} ... ],
//     quiz = [{id : "", difficult : "", lang : "", title : "", type : "", isPass : T/F }, {}, ...],
//   }

  const totalCount = total;

  const members = users;
  const membersCount = members.length;

  const openPosts = openPost;
  const openPostCount = openPosts.length;

  const questionPosts = questionPost;
  const questionPostCount = questionPosts.length;

  const quizs = quiz;
  const quizCount = quizs.length;


    return (
    <S.ResultWrap>
      <S.InputWrap>
        <input placeholder={search} onChange={onChange} onSubmit={""}></input>
        <img src="/assets/images/header/search.png" alt="" />
      </S.InputWrap>
      <S.TextWrap>
        <S.Text 
          className="select" 
          id="1"
          onClick={changeBorder}
          $active={targetId === 1}
        >
            전체 &nbsp; <span>{total === 0 ? "" : total}</span>
        </S.Text>
        <S.Text 
          className="select" 
          id="2" 
          onClick={changeBorder}
          $active={targetId === 2}
        >문제둥지<span>{questionPostCount === 0 ? "" : questionPostCount}</span> </S.Text>
        <S.Text 
          className="select" 
          id="3"
          onClick={changeBorder}
          $active={targetId === 3}
        >훈련장 <span>{quizCount === 0 ? "" : quizCount}</span></S.Text>
        <S.Text 
          className="select"
          id="4"
          onClick={changeBorder}
          $active={targetId === 4}
        >열린둥지<span>{openPostCount === 0 ? "" : openPostCount}</span> </S.Text>
        <S.Text 
          className="select"
          id="5"
          onClick={changeBorder}
          $active={targetId === 5}
        >친구 <span>{membersCount === 0 ? "" : membersCount}</span></S.Text>
      </S.TextWrap>
      <h1>검색 결과 페이지😎</h1>
      {/* 삼항으로 검색한 전체 결과 없을 때만 결과없음 페이지 검색결과가 하나라도 존재하면 내부 컴포넌트에서 처리 */}
      {totalCount === 0 ? <NoResult></NoResult> : (
        // question -> quiz -> open -> member
        <S.ResultWrap>
          {questionPostCount === 0 ? <></> : (
            <QuestionPostResult
              datas = {questionPosts}
              count = {questionPostCount}
              search = {search}
          ></QuestionPostResult>
          )}
          
          {quizCount === 0 ? <></> : (
            <QuizResult
              datas = {quizs}
              count = {quizCount}
              search = {search}
            ></QuizResult>
          )}

          {openPostCount === 0 ? <></> : (
            <OpenPostResult
              datas = {openPosts}
              count = {openPostCount}
              search = {search}
            ></OpenPostResult>
          )}

          {membersCount === 0 ? <></> : (
            <UserResult
              datas = {members}
              count = {membersCount}
              search = {search}
            ></UserResult>
          )}
        </S.ResultWrap>
      )}
    </S.ResultWrap>
  );
};

export default SearchResultContainer;
