import React from "react";
import S from "../style";

const ExplanatoryContainer = ({
  partOfSpeech = "「명사」",
  definition = "일정한 시설을 갖추고 주로 남자의 머리털을 깎아 다듬어 주는 곳.",
  relatedTerms = "≒이발관, 이용소, 이용원",
  color = "purple",
}) => {
  return (
    <S.ExplanatoryBox color={color}>
      {partOfSpeech} {definition} {relatedTerms}
    </S.ExplanatoryBox>
  );
};

export default ExplanatoryContainer;
