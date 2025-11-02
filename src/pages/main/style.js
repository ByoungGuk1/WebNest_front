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
S.IntroWrap = styled.div`
  width: 100vm;
  height: 2600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & {
    white-space: nowrap;
  }
`
S.IntroTitle = styled.div`
  display: flex;
  flex-direction: row;
  & {
    font-size: ${({ theme }) => theme.FONT_SIZE.h1};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
  & .purple{
    color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  }
`
S.TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 16px;
  & p {
    font-size: ${({ theme }) => theme.FONT_SIZE.h3};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.light}; 
  }
`
S.StepWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  & img {
    border-radius: 10px;
  }
`
S.Textwrap = styled.div`
  /* align-items: center; */
  position: relative;
  width: 440px;
  height: 330px;
  display: flex;
  flex-direction: column;
  font-family: 'pretendard';
  font-size: ${({ theme }) => theme.FONT_SIZE.h2};
  background-color: #fff;
  box-shadow: 0px 1px 20px 0px #9A9A9A1F;
  border-radius: 10px;

  & button {
    width: 150px;
    height: 50px;
    border : 1px solid #E3E6E4;
    border-radius: 10px;
    font-size: ${({ theme }) => theme.FONT_SIZE.h7};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    position: absolute;
    bottom: 40px;
    left: calc(40px + 12px);
    background-color: #fff;
  }
`
S.TextIcon = styled.div`
  position: absolute;
  top: 40px;
  left: calc(40px + 15px);
  width: 68px;
  height: 36px;
  background-color: #FFC600;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  &{
    font-size: ${({ theme }) => theme.FONT_SIZE.h7};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold}; 
  }
`

S.TextArial = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  left: 55px;
  & p {
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold}; 
    margin-top: 108px;
  }
  & strong {
    font-size: ${({ theme }) => theme.FONT_SIZE.h7};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold}; 
  }
`
S.StepColWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 150px;
  margin: 120px auto;
`

export default S;
