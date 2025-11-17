import S from "../style";

const UserInputContainer = ({ inputWord }) => {
  return (
    <S.UserInputSection>
      {inputWord || "\u00A0"}
    </S.UserInputSection>
  );
};

export default UserInputContainer;
