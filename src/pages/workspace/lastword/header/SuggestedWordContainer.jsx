import S from "../style";

const SuggestedWordContainer = ({ startWord }) => {
  return (
    <S.SuggestedWordBanner>
      <span>제시어 :</span>
      <span>{startWord || "준비중..."}</span>
    </S.SuggestedWordBanner>
  );
};

export default SuggestedWordContainer;
