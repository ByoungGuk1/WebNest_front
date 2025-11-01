import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import S from "./style";
import useDropDown from "../../hooks/useDropDown";

const QuizContainer = () => {

  const [langOpen, langRef, langHandler] = useDropDown();
  const [levelOpen, levelRef, levelHandler] = useDropDown();
  const [isClearOpen, isClearRef, isClearHandler] = useDropDown();
  const [quizIsOpen, quizRef, quizHandler] = useDropDown();
  const [quizs, setQuizs] = useState([]);
  const [bookMarkId, setBookMarkId] = useState([]);

  const clickBookmark = (id) => {
    setBookMarkId((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item != id)
        : [...prev, id]
    )
  }


  useEffect(() => {
    const getQuiz = async () => {
      const response = await fetch("/json_server/db.json")
      if (!response.ok) throw new Error("에러")
      const quizs = await response.json();
      return quizs;
    }
    getQuiz()
      .then((quiz) => {
        setQuizs(quiz.quizs)
      })

  }, [])

  const quizList = quizs.map(({ quizId, quizDefficult, quizLanguage, quizTitle, quizCategory }, i) => {
    return (<li key={i}>
      <Link to={`/workspace/quiz/${quizId}`}>
        <p>{quizId}</p>
        <p>{quizDefficult || "난이도없음"}</p>
        <p>{quizLanguage}</p>
        <p>{quizTitle}</p>
        <p>{quizCategory}</p>
      </Link>
    </li>)
  })
  return (
    <div>
      {/* 드롭다운버튼 */}
      <S.DropConatiner ref={quizRef}>
        <S.ButtonWrap ref={langRef}>
          <S.DropDownButton onClick={langHandler}>언어</S.DropDownButton>
          <S.Menu isDropped={langOpen}>
            <ul><li>JAVA</li></ul>
            <ul><li>ORACLE</li></ul>
            <ul><li>JS</li></ul>
          </S.Menu>
        </S.ButtonWrap>

        <S.ButtonWrap ref={levelRef}>
          <S.DropDownButton onClick={levelHandler}>난이도</S.DropDownButton>
          <S.Menu isDropped={levelOpen}>
            <ul><li>초급</li></ul>
            <ul><li>중급</li></ul>
            <ul><li>중상급</li></ul>
            <ul><li>상급</li></ul>
            <ul><li>최상급</li></ul>
          </S.Menu>
        </S.ButtonWrap>

        <S.ButtonWrap ref={isClearRef}>
          <S.DropDownButton onClick={isClearHandler}>해결여부</S.DropDownButton>
          <S.Menu isDropped={isClearOpen}>
            <ul><li>미해결</li></ul>
            <ul><li>해결</li></ul>
          </S.Menu>
        </S.ButtonWrap>

{/* 문제 리스트 */}
      </S.DropConatiner>
      <S.Container>
        <S.Header>
          <S.Cell flex={1}>#문제</S.Cell>
          <S.Cell flex={1}>난이도</S.Cell>
          <S.Cell flex={1}>언어</S.Cell>
          <S.Cell flex={3}>제목</S.Cell>
          <S.Cell flex={2}>유형</S.Cell>
          <S.Cell flex={1}>해결 여부</S.Cell>
        </S.Header>

        {quizs.map((quiz) => (

          <S.Row key={quiz.quizId}>
            <S.BookMark onClick={() => clickBookmark(quiz.quizId)}>
              <S.BookMarkIcon active={bookMarkId.includes(quiz.quizId)} />
            </S.BookMark>
            <S.Cell flex={1}>{quiz.quizId}</S.Cell>
            <S.Cell flex={1}>
              <S.Difficulty level={quiz.quizDefficult}>
                {quiz.quizDefficult || "L1"}
              </S.Difficulty>
            </S.Cell>
            <S.Cell flex={1}>{quiz.language}</S.Cell>
            <S.Cell flex={3}>
              <S.TitleLink to={`/workspace/quiz/${quiz.quizId}`}>
                {quiz.quizTitle}
              </S.TitleLink>
            </S.Cell>
            <S.Cell flex={2}>{quiz.quizCategory}</S.Cell>
            <S.Cell flex={1}>
              <S.Status isClear={quiz.isClear}>
                {quiz.isClear ? "해결됨" : "미해결"}
              </S.Status>
            </S.Cell>
          </S.Row>
        ))}
      </S.Container>


    </div>
  );
};

export default QuizContainer;
