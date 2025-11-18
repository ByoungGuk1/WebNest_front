import S from "./style";
import QiuzDropDown from "./quizdropdown/QiuzDropDown";
import QuizListBanner from "./quizListbanner/QuizListBanner";
import QuizPage from "./quizfetchlist/QuizPage";

const QuizContainer = () => {

  return (
    <>
    <QuizListBanner />
      <S.AllContainer>
        <S.InnerContainer>
          <QiuzDropDown />
          <QuizPage />
        </S.InnerContainer>
      </S.AllContainer>
    </>
  );
};

export default QuizContainer;
