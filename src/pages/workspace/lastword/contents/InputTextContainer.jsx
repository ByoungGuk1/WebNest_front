import S from "../style";

const InputTextContainer = ({ word, color }) => {
  return <S.WordBox color={color}>{word || "\u00A0"}</S.WordBox>;
};

export default InputTextContainer;
