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

  const [selectLang, setSelectLang] = useState(false);
  const [selectDefficult, setSelectDefficult] = useState(null);
  const [selectIsClear, setSelectIsClear] = useState(null);
  const [selectKeyword, setSelectKeyword] = useState(null);

  const handleSelect = (type, value) => {
    switch (type) {
      case "Lang":
        setSelectLang((prev) => (prev === value ? null : value))
        break;
      case "Defficult":
        setSelectDefficult((prev) => (prev === value ? null : value))
        break;
      case "IsClear":
        setSelectIsClear((prev) => (prev === value ? null : value))
        break;
      case "Keyword":
        setSelectKeyword((prev) => (prev === value ? null : value))
        break;
    }
  }

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
    <>
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

      <S.Containers>
        <S.AllContaner>
          {/* 드롭다운버튼 */}
          <S.DropConatiner ref={quizRef}>
            <S.ButtonWrap ref={langRef}>
              <S.DropDownButton onClick={langHandler} select={!!selectLang}>
                {selectLang || "언어"}
                <S.DropDownIconWrap>
                  <S.DropDownIcon />
                </S.DropDownIconWrap>
              </S.DropDownButton>
              <S.DropDownMenuWrap isDropped={langOpen}>
                <S.DropDownMenu onClick={() => handleSelect("Lang", "JAVA")}>JAVA</S.DropDownMenu>
                <S.DropDownMenu onClick={() => handleSelect("Lang", "JS")}>JS</S.DropDownMenu>
                <S.DropDownMenu onClick={() => handleSelect("Lang", "ORACLE")}>ORACLE</S.DropDownMenu>
              </S.DropDownMenuWrap>
            </S.ButtonWrap>

            <S.ButtonWrap ref={levelRef}>
              <S.DropDownButton onClick={levelHandler} select={!!selectDefficult}>
                {selectDefficult || "난이도"}
                <S.DropDownIconWrap>
                  <S.DropDownIcon />
                </S.DropDownIconWrap>
              </S.DropDownButton>

              <S.DropDownMenuWrap isDropped={levelOpen}>
                <S.DropDownMenu onClick={() => handleSelect("Defficult", "초급")}>초급</S.DropDownMenu>
                <S.DropDownMenu onClick={() => handleSelect("Defficult", "중급")}>중급</S.DropDownMenu>
                <S.DropDownMenu onClick={() => handleSelect("Defficult", "중상급")}>중상급</S.DropDownMenu>
                <S.DropDownMenu onClick={() => handleSelect("Defficult", "상급")}>상급</S.DropDownMenu>
                <S.DropDownMenu onClick={() => handleSelect("Defficult", "최상급")}>최상급</S.DropDownMenu>
              </S.DropDownMenuWrap>
            </S.ButtonWrap>

            <S.ButtonWrap ref={isClearRef}>
              <S.DropDownButton onClick={isClearHandler} select={!!selectIsClear}>
                {selectIsClear || "해결여부"}
                <S.DropDownIconWrap>
                  <S.DropDownIcon />
                </S.DropDownIconWrap>
              </S.DropDownButton>

              <S.DropDownMenuWrap isDropped={isClearOpen}>
                <S.DropDownMenu onClick={() => handleSelect("IsClear", "미해결")}>미해결</S.DropDownMenu>
                <S.DropDownMenu onClick={() => handleSelect("IsClear", "해결")}>해결</S.DropDownMenu>
              </S.DropDownMenuWrap>
            </S.ButtonWrap>

            <S.ButtonWrap ref={wordRef}>
              <S.DropDownButton onClick={wordHandler} select={!!selectKeyword}>
                {selectKeyword || "키워드"}
                <S.DropDownIconWrap>
                  <S.DropDownIcon />
                </S.DropDownIconWrap>
              </S.DropDownButton>

              <S.DropDownMenuWrap isDropped={wordOpen}>
                <S.DropDownMenu onClick={() => handleSelect("Keyword", "반복문")}>반복문</S.DropDownMenu>
                <S.DropDownMenu onClick={() => handleSelect("Keyword", "배열")}>배열</S.DropDownMenu>
                <S.DropDownMenu onClick={() => handleSelect("Keyword", "조건식")}>조건식</S.DropDownMenu>
                <S.DropDownMenu onClick={() => handleSelect("Keyword", "함수")}>함수</S.DropDownMenu>
              </S.DropDownMenuWrap>
            </S.ButtonWrap>

          </S.DropConatiner>



          {/* 문제 리스트 헤더*/}
          <S.Container>
            <S.Header>
              <S.Cell flex={0.6} style={{ textAlign: "left" }}>#문제</S.Cell>
              <S.Cell flex={1} paddingLeft>난이도</S.Cell>
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
                <S.Cell flex={0.6} style={{ textAlign: "left" }}>{quiz.quizId > 0 ? "000" + quiz.quizId : quiz.quizId}</S.Cell>
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
    </>
  );
};

export default QuizContainer;
