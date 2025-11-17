import React from "react";
import S from "./style";

const TitleContainer = ({ word, startWord }) => {
  return (
    <S.TitleWarp>
      <S.SuggestedText>
        {word ? (
          <div>{word}</div>
        ) : (
          <>
            <div>제시어 : </div>
            <div>{startWord}</div>
          </>
        )}
      </S.SuggestedText>
    </S.TitleWarp>
  );
};

export default TitleContainer;
