import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { h2Bold } from "styles/common";

const S = {};

// 아래에서 위로 튀어오르는 애니메이션
const bounceUp = keyframes`
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  60% {
    transform: translateY(-10px);
    opacity: 1;
  }
  80% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

S.Div = styled.div`
  width: 100px;
  height: 100px;
  border: solid 1px black;
`;
S.BannerWrap = styled.div`
  width: 100%;
  height:(900 + 120)px ;
  gap: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & {
    white-space: nowrap;
  }
`
S.Banner = styled.div`
  width: 100%;
  height: 900px;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    width: 100%;
  }

  & span {
    font-family: 'pretendard';
    font-size: 90px;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    letter-spacing: -2.5px;
    color: #fff;
  }
  & .purple {
    ${h2Bold}
    color: #fff;
  }
  & .textWrap .purple {
    color: #37ffa9;
  }
  & .green {
    color: #37ffa9;
  }
  & .blue {
    color: #37ffa9;
  }
  & .logo-web {
    font-family: 'RomanticGumi';
    font-size: 44px;
    letter-spacing: 3%;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
  :hover {
    cursor: pointer;
  }
`
S.fstLing = styled.div`
  width: 100%;
  height: 128px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.PALETTE.primary.purple.dark};
  animation: ${bounceUp} 0.8s ease-out;
  animation-delay: 0s;
`
S.textWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 22px;
  animation: ${bounceUp} 0.8s ease-out;
  animation-delay: 0s;
  & .every{
    color: #37ffa9;
  }
`

S.vectorWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`
S.secLine = styled.div`
  width: 100%;
  height: 128px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 26px;
  border-bottom: 2px solid ${({ theme }) => theme.PALETTE.primary.purple.dark};
  animation: ${bounceUp} 0.8s ease-out;
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
  & .vector {
    width: 87px;
    height: 64px;
  }
  & > .console {
    width: 118px;
    height: 94px;
  }
`
S.trdLine = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.PALETTE.primary.purple.dark};
  animation: ${bounceUp} 0.8s ease-out;
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
  & .trophy{
    width: 117px;
    height: 114px;
  }
  & .charactor {
    width: 120px;
    height: 134px;
  }
`
S.KeepGoing = styled.div`
  :hover {
    cursor: pointer;
  }
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.dark};
  margin-top: 0;
  & span{
    font-size: ${({ theme }) => theme.FONT_SIZE.h3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    color: #fff;
  }
`
// ---------------------------------------------
// Intro Style
S.IntroFullWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 130px 0;
  position: relative;

  & * {
    white-space: nowrap;
    text-decoration: none;
  }
  & * a{
    :visited {
      text-decoration: none;
    };
  }
  & .puzzle{
    width: 161px;
    height: 154px;
    margin-top: 120px;
  }
`

S.IntroStepWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0 100px 0;
`

S.LevelBg = styled.img`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
`

S.IntroTextWrap = styled.div`
  margin: 0 0 60px 0;
  
`
S.IntroText = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.FONT_SIZE.h1};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  flex-direction: column;
  align-items: center;
  gap: 12px;

  & div{
    display: flex;
    margin: 20px 0px 12px 0;
  }

  & .purple{
    color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  }

  & .light {
    font-size: ${({ theme }) => theme.FONT_SIZE.h4};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  }

`

S.SubP = styled.p`
  padding: 0 10px 0 0;
`

S.StepBox = styled.div`
  width: 58px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFC600;
  border-radius: 10px;
  & * {
    font-size: ${({ theme }) => theme.FONT_SIZE.h7};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
`
S.TextArea = styled.div`
  margin: 16px 0 24px 0;
  display: flex;
  flex-direction: column;

  & span {
    font-size: ${({ theme }) => theme.FONT_SIZE.h2};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    margin : 0 0 10px 0;
  }
  & p {
    margin-top: 6px;
    font-size: ${({ theme }) => theme.FONT_SIZE.h6};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  }
`
S.TextWrap = styled.div`
  display: flex;
  align-items: center;
  width: 440px;
  height: 330px;
  box-shadow: 0px 1px 20px 0px #9A9A9A1F; 

  & > div {
    padding: 0 0 0 40px;
  }
`

S.StepWrap = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  width: 1160px;
  align-items: center;
  justify-content: center;
  /* box-shadow: 0px 1px 20px 0px #9A9A9A1F;  */
  background-color: #fff;
  & * {
    border-radius: 10px;
    
  }
  
`
S.ButtonBox = styled.div`
  border: 1px solid #E3E6E4;
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  & {
    font-size: ${({ theme }) => theme.FONT_SIZE.h7};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    color: #000;
  }
`
// ------------------------- 레벨 레이아웃 -----------
S.LevelImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  & img.level-2,
  & img.level-4,
  & img.level-5,
  & img.level-6 {
    width: 61px;
    height: 74px;
    object-fit: contain;
  }
`

S.lvWrap =styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & .position {
    position: relative;
    width: 100%;
    & {
    }
    & .lv8 {
      position: absolute;
      top: -86px;
      left: 23px;
      width: 73.2px;
      height: 88.8px;
      object-fit: contain;
    }
    & .lv9 {
      position: absolute;
      left: 26px;
      top : -68px;
      width: 109.8px;
      height: 133.2px;
      object-fit: contain;
    }
    & .lv10 {
      position: absolute;
      top: -72px;
      left: 18px;
      width: 109.8px;
      height: 133.2px;
      object-fit: contain;
    }

  }
`

S.Lv1Box =styled.div`
  width: 115px;
  height: 90px;
  background-color: ${({ theme }) => theme.PALETTE.primary.red.main};
  display: flex;
  justify-content: center;
  & span {
    margin-top: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.h3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    color: #fff;
  }
`

S.Lv2Box =styled.div`
  width: 115px;
  height: 105px;
  background-color: ${({ theme }) => theme.PALETTE.primary.red.main};
  display: flex;
  justify-content: center;
  & span {
    margin-top: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.h3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    color: #fff;
  }
`
S.Lv3Box =styled.div`
  width: 115px;
  height: 134px;
  background-color: ${({ theme }) => theme.PALETTE.primary.yellow.main};
  display: flex;
  justify-content: center;
  & span {
    margin-top: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.h3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    color: #fff;
  }
`
S.Lv4Box =styled.div`
  width: 115px;
  height: 149px;
  background-color: ${({ theme }) => theme.PALETTE.primary.yellow.main};
  display: flex;
  justify-content: center;
  & span {
    margin-top: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.h3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    color: #fff;
  }
`
S.Lv5Box =styled.div`
  width: 115px;
  height: 178px;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  display: flex;
  justify-content: center;
  & span {
    margin-top: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.h3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    color: #fff;
  }
`
S.Lv6Box =styled.div`
  width: 115px;
  height: 193px;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  display: flex;
  justify-content: center;
  & span {
    margin-top: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.h3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    color: #fff;
  }
`

S.Lv7Box =styled.div`
  width: 115px;
  height: 224px;
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  display: flex;
  justify-content: center;
  & span {
    margin-top: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.h3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    color: #fff;
  }
`

S.Lv8Box =styled.div`
  width: 115px;
  height: 239px;
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  display: flex;
  justify-content: center;
  & span {
    margin-top: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.h3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    color: #fff;
  }
`

S.Lv9Box =styled.div`
  width: 115px;
  height: 268px;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  display: flex;
  justify-content: center;
  & span {
    margin-top: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.h3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    color: #fff;
  }
`

S.Lv10Box =styled.div`
  width: 115px;
  height: 283px;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  display: flex;
  justify-content: center;
  & span {
    margin-top: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.h3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    color: #fff;
  }
`
S.LvRowWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1px;
  height: 400px;
  align-items: end;
`
S.LvText = styled.div`
  font-family: 'pretendard';
  display: flex;
  justify-content: center;
  margin: 0 0 40px 0;
  font-size: ${({ theme }) => theme.FONT_SIZE.h1};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  & .blue {
    font-family: 'RomanticGumi';
    color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  }
  & .green {
    font-family: 'RomanticGumi';
    color: ${({ theme }) => theme.PALETTE.primary.green.main};
  }
`
// -------------background------------------

S.BackWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    width: 100%;
  }

`
S.CardWrap = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  gap: 20px;
  /* left: 120px; */
`

S.SelfCard =styled.div`
  width: 580px;
  height: 625px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  & * {
    font-family: 'pretendard';
    font-size: ${({ theme }) => theme.FONT_SIZE.h7};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
  & a {
    text-decoration: none;
    color: #000;
  }
  & .title {
    font-family: 'pretendard';
    font-size: ${({ theme }) => theme.FONT_SIZE.h3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
`
S.TogetherCard =styled.div`
 background-color: #FFC600;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 gap: 40px;
    & p {
      color : #fff
    }
  width: 580px;
  height: 625px;
  border-radius: 10px;
  & * {
    font-family: 'pretendard';
    font-size: ${({ theme }) => theme.FONT_SIZE.h7};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
  & .title {
    font-family: 'pretendard';
    font-size: ${({ theme }) => theme.FONT_SIZE.h3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
`
S.CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`
S.CardThumSelf = styled.div`
  width: 220px;
  height: 220px;
  border: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: #E8E3E3;
  display: flex;
  justify-content: center;
  align-items: center;
  & .cardImage{
    width: 80%;
    height: 80%;
  }
`
S.CardThumTogether = styled.div`
  width: 220px;
  height: 220px;
  border: 100%;
  border-radius: 100%;
  background-color: #F8F4E3;
  display: flex;
  justify-content: center;
  align-items: center;
  & .cardImage{
    width: 80%;
    height: 80%;
  }
`
S.CardButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  & * > a {
    text-decoration: none;
    color: #000;
  }
`
S.CardButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #CC9E00;
  border-radius: 10px;
  width: 150px;
  height: 50px;
  font-size: ${({ theme }) => theme.FONT_SIZE.h7};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
`
S.SelfButton = styled.div`
  width: 310px;
  height: 50px;
  border: 1px solid #E3E6E4;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.h7};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: black;
`

export default S;
