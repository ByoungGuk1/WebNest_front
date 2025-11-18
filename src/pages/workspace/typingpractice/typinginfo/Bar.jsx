import React from "react";
import S from "../style";

const Bar = ({ percent, color = "blue" }) => {
  return <S.Bar $width={percent} className={color} />;
};

export default Bar;
