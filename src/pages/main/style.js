import { Link } from "react-router-dom";
import styled from "styled-components";

const S = {};

S.Div = styled.div`
  width: 100px;
  height: 100px;
  border: solid 1px black;
`;
S.BannerWrap = styled.div`
  width: 100%;
  height:(900 + 120 + 3)px ;
  gap: 3px;
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
  background-color: #FFC600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & span {
    font-family: 'pretendard';
    font-size: 90px;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    letter-spacing: -2.5px;
    color: #fff;
  }
  & .purple {
    font-size: ${({ theme }) => theme.FONT_SIZE.h2};
    color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  }
  & .green {
    color: ${({ theme }) => theme.PALETTE.primary.green.main};
  }
  & .blue {
    color: ${({ theme }) => theme.PALETTE.primary.blue.main};
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
  width: 100vw;
  height: 128px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #D7AF24;
`
S.textWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 22px;
  & a {
    text-decoration: none;
    color: blue;
    & div {
      color: red;
    }
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
  border-bottom: 2px solid #D7AF24;
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
  border-bottom: 2px solid #D7AF24;
  & #trophy{
    width: 117px;
    height: 114px;
  }
  & #charactor {
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
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
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
  height: 2600px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
S.IntroTextWrap = styled.div`
  
`
S.IntroText = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.FONT_SIZE.h1};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  flex-direction: column;
  align-items: center;
  & div{
    display: flex;
    margin: 12px 0px;
  }
  & .purple{
    color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  }
  & .light {
  margin-bottom: 24px;
  margin-top: 12px;
  font-size: ${({ theme }) => theme.FONT_SIZE.h3};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
  }
`

S.StepBox = styled.div`
  width: 68px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFC600;
  border-radius: 10px;
  position: absolute;
  top: 40px;
  left: 40px;
  & * {
    font-size: ${({ theme }) => theme.FONT_SIZE.h7};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
`
S.TextArea = styled.div`
  position: absolute;
  top: 80px;
  left: 25px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  & span {
    font-size: ${({ theme }) => theme.FONT_SIZE.h2};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
  & p {
    margin-top: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.h7};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
`
S.TextWrap = styled.div`
  position: relative;
  width: 440px;
  height: 330px;
  box-shadow: 0px 1px 20px 0px #9A9A9A1F; 
`

S.StepWrap = styled.div`
  margin-top: 16px;
  margin-bottom: calc(150px - 16px);
  height: 330px;
  display: flex;
  flex-direction: row;
  width: 1160px;
  align-items: center;
  justify-content: center;
  gap: 40px;
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
  position: absolute;
  bottom: 40px;
  left: 40px;
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
    }
    & .lv9 {
      position: absolute;
      left: 26px;
      top : -68px;
    }
    & .lv10 {
      position: absolute;
      top: -72px;
      left: 18px;
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
  margin-top: 42px;
  margin-bottom: 150px;
  font-family: 'pretendard';
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
  position: relative;
`
S.CardWrap = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
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
