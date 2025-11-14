import React from "react";
import S from "../style";

const InputTextContainer = ({
  word = "이발소",
  color = "purple",
}) => {
  return (
    <S.WordBox color={color}>
      {word}
    </S.WordBox>
  );
};

export default InputTextContainer;
