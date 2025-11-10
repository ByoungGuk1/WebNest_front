import S from "./style";
import QiuzDropDown from "./quizdropdown/QiuzDropDown";
import QuizListBanner from "./quizListbanner/QuizListBanner";
import QuizPage from "./quizpage/QuizPage";

const QuizContainer = () => {

  return (
    <>
    {/* 배너 */}
    <QuizListBanner />
    {/* 전체 컨테이너 */}
      <S.AllContainer>
        {/* 내부 컨테이너너 */}
        <S.InnerContainer>
          {/* 드롭다운버튼 */}
          <QiuzDropDown />
          {/* 문제 리스트*/}
          <QuizPage />
        </S.InnerContainer>
      </S.AllContainer>


    </>
  );
};

export default QuizContainer;
