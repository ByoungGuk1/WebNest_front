import React from "react";
import InputTextContainer from "./InputTextContainer";
import ExplanatoryContainer from "./ExplanatoryContainer";
import S from "../style";

const ContentContainer = ({
  word = "이발소",
  partOfSpeech = "「명사」",
  definition = "일정한 시설을 갖추고 주로 남자의 머리털을 깎아 다듬어 주는 곳.",
  relatedTerms = "≒이발관, 이용소, 이용원",
  color = "purple",
}) => {
  return (
    <S.ContentWrapper>
      <InputTextContainer
        word={word}
        color={color}
      />
      <ExplanatoryContainer
        partOfSpeech={partOfSpeech}
        definition={definition}
        relatedTerms={relatedTerms}
        color={color}
      />
    </S.ContentWrapper>
  );
};

export default ContentContainer;
