import React from "react";
import S from "./style";
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  const moveToWorkSpace = () => {
    navigate("/quiz");
  }
  return (
    <S.BannerWrap>
      <S.Banner onClick={moveToWorkSpace}>
        <div>
          <S.textWrap>
            <span class ="purple">모두를 위한 코딩</span>
            <span class="logo-web blue">Web</span>
            <span class="logo-web green">Nest</span>
          </S.textWrap>
        <S.fstLing>
          <span>생각한 대로 만드는&nbsp;&nbsp;세상</span>
        </S.fstLing>
        </div>
        <S.secLine>
          <span>프로그래밍</span>
          <img src="/assets/images/main-page/console.png" class="console"></img>
          <S.vectorWrap>
            <img src="/assets/images/main-page/vector.png" class = "vector"></img>
            <img src="/assets/images/main-page/vector.png" class = "vector"></img>
            <img src="/assets/images/main-page/vector.png" class = "vector last"></img>
          </S.vectorWrap>
        </S.secLine>
        <S.trdLine>
          <img src="/assets/images/main-page/trophy.png" class = "trophy"></img>
          <span>첫 도전도 환영해요</span>
          <img src="/assets/images/main-page/charactor.png" class = "charactor"></img>
        </S.trdLine>
      </S.Banner>
      <S.KeepGoing onClick={moveToWorkSpace}>
        <span>계속 도전 해보세요</span>
      </S.KeepGoing>
    </S.BannerWrap>
  );
};

export default Banner;
