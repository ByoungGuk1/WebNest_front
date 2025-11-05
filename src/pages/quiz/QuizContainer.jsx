import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import S from "./style";
import useDropDown from "../../hooks/useDropDown";

const QuizContainer = () => {

  const [wordOpen, wordRef, wordHandler] = useDropDown();
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
    <S.Containers>
      <S.AllContaner>
        {/* 드롭다운버튼 */}
        <S.DropConatiner ref={quizRef}>
          <S.ButtonWrap ref={langRef}>
            <S.DropDownButton onClick={langHandler}>
              언어
              <S.DropDownIconWrap>
                <S.DropDownIcon />
              </S.DropDownIconWrap>

            </S.DropDownButton>
            <S.DropDownMenuWrap isDropped={langOpen}>
              <S.DropDownMenu>JAVA</S.DropDownMenu>
              <S.DropDownMenu>JS</S.DropDownMenu>
              <S.DropDownMenu>ORACLE</S.DropDownMenu>
            </S.DropDownMenuWrap>
          </S.ButtonWrap>

          <S.ButtonWrap ref={levelRef}>
            <S.DropDownButton onClick={levelHandler}>
              난이도
              <S.DropDownIconWrap>
                <S.DropDownIcon />
              </S.DropDownIconWrap>
            </S.DropDownButton>

            <S.DropDownMenuWrap isDropped={levelOpen}>
              <S.DropDownMenu>초급</S.DropDownMenu>
              <S.DropDownMenu>중급</S.DropDownMenu>
              <S.DropDownMenu>중상급</S.DropDownMenu>
              <S.DropDownMenu>상급</S.DropDownMenu>
              <S.DropDownMenu>최상급</S.DropDownMenu>
            </S.DropDownMenuWrap>
          </S.ButtonWrap>

          <S.ButtonWrap ref={isClearRef}>
            <S.DropDownButton onClick={isClearHandler}>
              해결여부
              <S.DropDownIconWrap>
                <S.DropDownIcon />
              </S.DropDownIconWrap>
            </S.DropDownButton>

            <S.DropDownMenuWrap isDropped={isClearOpen}>
              <S.DropDownMenu>미해결</S.DropDownMenu>
              <S.DropDownMenu>해결</S.DropDownMenu>
            </S.DropDownMenuWrap>
          </S.ButtonWrap>

          <S.ButtonWrap ref={wordRef}>
            <S.DropDownButton onClick={wordHandler}>
              키워드
              <S.DropDownIconWrap>
                <S.DropDownIcon />
              </S.DropDownIconWrap>
            </S.DropDownButton>

            <S.DropDownMenuWrap isDropped={wordOpen}>
              <S.DropDownMenu>반복문</S.DropDownMenu>
              <S.DropDownMenu>배열</S.DropDownMenu>
              <S.DropDownMenu>조건식</S.DropDownMenu>
              <S.DropDownMenu>함수</S.DropDownMenu>
            </S.DropDownMenuWrap>
          </S.ButtonWrap>

        </S.DropConatiner>



        {/* 문제 리스트 */}
        <S.Container>
          <S.Header>
            <S.Cell flex={0.6}>#문제</S.Cell>
            <S.Cell flex={1}>난이도</S.Cell>
            <S.Cell flex={1}>언어</S.Cell>
            <S.Cell flex={3.5}>제목</S.Cell>
            <S.Cell flex={2}>유형</S.Cell>
            <S.Cell flex={1}>해결 여부</S.Cell>
          </S.Header>

          {quizs.map((quiz) => (

            <S.Row key={quiz.quizId}>
              <S.BookMark onClick={() => clickBookmark(quiz.quizId)}>
                <S.BookMarkIcon active={bookMarkId.includes(quiz.quizId)} />
              </S.BookMark>
              <S.Cell flex={0.6}>{quiz.quizId}</S.Cell>
              <S.Cell flex={1}>
                <S.Difficulty level={quiz.quizDefficult}>
                  {quiz.quizDefficult || "L1"}
                </S.Difficulty>
              </S.Cell>
              <S.Cell flex={1}>{quiz.language}</S.Cell>
              <S.Cell flex={3.5}>
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


      </S.AllContaner>
    </S.Containers>
  );
};

export default QuizContainer;
