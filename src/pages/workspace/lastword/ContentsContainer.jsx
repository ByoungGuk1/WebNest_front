import React from "react";
import ContentContainer from "./ContentContainer";
import S from "./style";

const ContentsContainer = ({ listWordVO }) => {
  return (
    <S.ContentsWrap>
      {listWordVO.map((wordVO, index) => (
        <ContentContainer key={index} wordVO={wordVO} />
      ))}
    </S.ContentsWrap>
  );
};

export default ContentsContainer;
