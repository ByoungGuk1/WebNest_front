import React from "react";
import S from "./style";

const ContentContainer = ({ wordVO }) => {
  return (
    <S.ContentContainer>
      <S.WordContainer color={wordVO.color} isFocus={wordVO.isFocus}>
        {wordVO.word}
      </S.WordContainer>
      <S.ExplanationContainer color={wordVO.color} isFocus={wordVO.isFocus}>
        {wordVO.explanation}
      </S.ExplanationContainer>
    </S.ContentContainer>
  );
};

export default ContentContainer;
