import S from "../style";

const ExplanatoryContainer = ({ word, color }) => {
  const definition =
    "일정한 시설을 갖추고 주로 남자의 머리털을 깎아 다듬어 주는 곳.";
  return <S.ExplanatoryBox color={color}>{definition}</S.ExplanatoryBox>;
};

export default ExplanatoryContainer;
