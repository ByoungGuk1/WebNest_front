import S from "../style";
import SuggestedWordContainer from "./SuggestedWordContainer";
import TimeLimitContainer from "./TimeLimitContainer";
import UserInputContainer from "./UserInputContainer";

const MainContainer = () => {
  return (
    <S.HeaderSection>
      <SuggestedWordContainer />
      <UserInputContainer />
      <TimeLimitContainer />
    </S.HeaderSection>
  );
};

export default MainContainer;
