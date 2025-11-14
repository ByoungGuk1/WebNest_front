import React from 'react';
import S from "../../quiz/style"
import QiuzDropDown from 'pages/quiz/quizdropdown/QiuzDropDown';
import QuizPage from 'pages/quiz/quizpage/QuizPage';

const QuestionBookmarkContainer = () => {
  return (
    <div>
      <S.AllContainer>
        <S.InnerContainer>
          {/* 드롭다운버튼 */}
          <QiuzDropDown />
          {/* 문제 리스트*/}
          <QuizPage />
        </S.InnerContainer>
      </S.AllContainer>
    </div>
  );
};

export default QuestionBookmarkContainer;