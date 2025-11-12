import styled from "styled-components";
import { h1Light, h5Medium, h7Medium, h8Medium } from '../../../styles/common'

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
    width : 1160px;
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
    font-size: ${({ theme }) => theme.FONT_SIZE.h4};
    color : ${({ theme }) => theme.PALETTE.neutral.black.main};
  `
  S.Category = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 168px;
    gap: 70px;
    :hover{
      color : ${({ theme }) => theme.PALETTE.primary.purple.main};
    }

    & a {
      font-size: ${({ theme }) => theme.FONT_SIZE.h5};
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
    border-block-end: 1px solid black;
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
      background-image: url('/assets/images/header/search.png');
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
  S.RightWrap = styled.div`
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
    background-image: url('assets/images/header/bell.png');
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
      ${h1Light}
      
    }
  `

  S.notice_wrap = styled.div`
    height: 420px;
    width: 430px;
    border: solid 1px #121212;
    border-radius: 10px;
    position: absolute;
    background-color: #fff;
    top: 55px;
    right: -212px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll
  `
  S.notice_header = styled.div`
    width: 373px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #464D4A;
    margin-top: 36px;
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
  S.NotificationItems = styled.div`
    /* background-color: blue; */
    ${h8Medium}
     min-width: 0;
    width: 100%;
    word-break: break-word;
    display: flex;
    flex-direction: row;
    justify-content: baseline;
    /* justify-content: center; */
  `
  S.NotificationItemsWrap = styled.div`
    width: 373px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
  `

  S.NotificationCategory = styled.div`
    width: 42px;
    height: 36px;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    ${h8Medium}
    position: relative;
    
  `
  S.NotificationCategoryWrap = styled.div`
    display: flex;
    margin-left: 40px;
    width: 100%;
    flex-direction: row;
    gap: 24px;
    justify-content: baseline;
  `
  S.NotificationCategoryBadge = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 100%;
    position: absolute;
    background-color: red;
    top: -4px;
    right:-5px;
    ;
  `

  S.UserNameHug = styled.div`
    background-color: #6434B1;
    padding-left: 4px;
    padding-right: 4px;
    height: 24px;
    color: #ffc600;
    border-radius: 4px;
  `
  S.OnlyRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 6px;
  `
  S.BetweenRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `
  S.OnlyColumn = styled.div`
    display: flex;
    flex-direction: column;
  `
  S.NotificationItemsRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `
  export default S;
