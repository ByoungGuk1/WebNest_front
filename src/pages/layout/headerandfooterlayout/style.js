import styled from "styled-components";
import {} from '../../../styles/common'

const S = {}
  S.wrap = styled.div`
    width:100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-bottom: 3px solid black;
  `

  S.wrap_left = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 168px;
  `
  S.innerwrap = styled.div`
    width : 1400px;
    white-space: nowrap;
    max-width: 1400px;
    min-width: 1400px;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    & {
      font-size: ${({ theme }) => theme.FONT_SIZE.h6};
      font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    }
    & a {
      text-decoration: none; 
      color : ${({ theme }) => theme.PALETTE.neutral.black.main};
    }
  `

  S.logo = styled.span`
    font-family: 'RomanticGumi';
    text-decoration: none;
    color : ${({ theme }) => theme.PALETTE.neutral.black.main};
  `
  S.category = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 168px;
    gap: 70px;
    :hover{
      color : ${({ theme }) => theme.PALETTE.primary.purple.main};
    }
  `
  S.search = styled.div`
    display: flex;
    width: 185px;
    height: 32px;
    position: relative;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    border-block-end: 2px solid black;
    margin-left: 301px;
    & img {
      width: 16px;
      height: 16px;
    }
    & input {
      border: none;
      width: calc(185-16)px;
      background-color: white;
      outline: none;
      font-family: 'pretendard';
      font-size: ${({ theme }) => theme.FONT_SIZE.h6};
    }
    & button {
      background-image: url('/assets/header/search.png');
      width: 16px;
      height: 16px;
      background-color: #fff;
      position: absolute;
      padding: 0px;
    }
  `
  S.profileLayout = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `
  S.profileImage = styled.div`
    /* margin-left: 49px; */
    display: flex;
    flex-direction: row;
    width: 42px;
    height: 42px;
    border-radius: 100%;
    background-color : ${({ theme }) => theme.PALETTE.neutral.gray.main};
    & img {
      width: 100%;
      height: 100%;
    }
  `
  S.log_out = styled.button`
    background-color: #fff;
    font-family: 'pretendard';
    font-size: ${({ theme }) => theme.FONT_SIZE.h6};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    margin-left: 26px;
    width: 54px;
    height: 34px;
    border-bottom: 1px solid;
  `
  S.right_wrap = styled.div`
    display: flex;
    align-items: center;
    gap: 49px;
    & .alarm {
      width: 16px;
      height: 16px;
    }
  `
  S.notification = styled.button`
    background-color: #fff;
    width: 16px;
    height: 18px;
    background-image: url('assets/header/bell.png');
  `
  S.notification_wrap = styled.div`
    width: 16px;
    height: 18px;
    position: relative;
  `
  S.notification_new = styled.div`
    width: 8px;
    height: 8px;
    position: absolute;
    top: -2px;
    right: -2px;
    border-radius: 100%;
    background-color : ${({ theme }) => theme.PALETTE.primary.red.main};
  `
  S.log_out_layout = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: row;
    
    gap: 74px;

    & button {
      background-color: #fff;
      font-family: 'pretendard';
      font-size: ${({ theme }) => theme.FONT_SIZE.h6};
      font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
      padding: 0;
    }
  `
  S.right_layout = styled.div`
     display: flex;
    align-items: center;
    gap: 49px;
    & .alarm {
      width: 16px;
      height: 16px;
    }
  `

  S.notice_wrap = styled.div`
    height: 420px;
    width: 430px;
    border: solid 1px #121212;
    border-radius: 10px;
    position: absolute;
    top:85px;
    right: 215px;
    display: flex;
    justify-content: center;
  `
  S.notice_header = styled.div`
    width: 373px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #464D4A;
    margin-top: 48px;
    margin-bottom: 8px;
    & {
      font-family: 'pretendard';
      font-size: ${({ theme }) => theme.FONT_SIZE.h6};
      font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    }
  `
  S.notice_handler = styled.div`
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
  `
  S.read_all = styled.button`
    background-color: #fff;
    font-family: 'pretendard';
    font-size: ${({ theme }) => theme.FONT_SIZE.h8};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
    padding: 0px;
  `
  S.remove_all = styled.button`
    background-color: #fff;
    font-family: 'pretendard';
    font-size: ${({ theme }) => theme.FONT_SIZE.h8};
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.light};
    padding: 0px;
  `
  export default S;
