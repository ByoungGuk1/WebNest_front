import InputTextContainer from "./InputTextContainer";
import ExplanatoryContainer from "./ExplanatoryContainer";
import S from "../style";

const ContentContainer = ({ word, userSenderTeamcolor }) => {
  return (
    <S.ContentWrapper>
      <InputTextContainer word={word} color={userSenderTeamcolor} />
      <ExplanatoryContainer word={word} color={userSenderTeamcolor} />
    </S.ContentWrapper>
  );
};

export default ContentContainer;
