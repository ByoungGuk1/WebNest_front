import React from "react";
import S from "./style";
import Banner from "./Banner"
import Intro from "./Intro";
import BackGround from "./BackGround";

const MainContainer = () => {
  return (
    <div>
      <Banner></Banner>
      <Intro></Intro>
      <BackGround></BackGround>
    </div>
  );
};

export default MainContainer;
