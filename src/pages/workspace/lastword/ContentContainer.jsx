import React from "react";
import S from "./style";

const ContentContainer = ({ wordVO }) => {
  return (
    <S.ContentContainer>
      <S.WordContainer color={wordVO?.color} recentword={wordVO?.recentword}>
        {wordVO?.word}
      </S.WordContainer>
      <S.ExplanationContainer
        color={wordVO?.color}
        recentword={wordVO?.recentword}>
        <p>{wordVO?.explanation}</p>
      </S.ExplanationContainer>
    </S.ContentContainer>
  );
};

export default ContentContainer;
