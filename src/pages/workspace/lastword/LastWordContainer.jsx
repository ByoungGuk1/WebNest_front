import ContentsContainer from "./contents/ContentsContainer";
import MainContainer from "./header/MainContainer";
import S from "./style";

const LastWordContainer = () => {
  return (
    <S.MainWrapper>
      <MainContainer />
      <ContentsContainer />
    </S.MainWrapper>
  );
};

export default LastWordContainer;
