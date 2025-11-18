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
    border-bottom: 1px solid black;
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
    align-items: center;
    border-block-end: 1px solid black;
    margin-left: 301px;

    & input {
      border: none;
      width: 160px;
      background-color: white;
      outline: none;
      font-family: 'pretendard';
      font-size: ${({ theme }) => theme.FONT_SIZE.h6};
    }
    
    & button {
      background-image: url('/assets/images/header/search.png');
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
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
    background-image: url('/assets/images/header/bell.png');
  `
  S.notification_wrap = styled.div`
    width: 16px;
    height: 18px;
    position: relative;
    z-index: 10000;
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
    z-index: 10001;
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
   // 알림 패널 컨테이너 (스크롤은 내부 ListBody가 담당)// ===== Notification panel (flex version, no duplicates) =====
S.notice_wrap = styled.div`
  height: 420px;
  width: 430px;
  border: 1px solid #121212;
  border-radius: 10px;
  position: absolute;
  z-index: 10001;
  background-color: #fff;
  top: 55px;
  right: -212px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

// 상단 탭 (필요 없으면 JSX에서 안 쓰면 됨)
S.NotificationCategoryWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  padding: 12px 18px 4px;
  box-sizing: border-box;
`;
S.TabBox = styled.div`
  padding: 6px 10px;
  background: #f3f3f3;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  ${h8Medium}
`;

// 헤더
S.notice_header = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #464D4A;
  box-sizing: border-box;
  & > span { 
    ${h7Medium};
  }
`

S.notice_handler = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
S.read_all = styled.button`
  background: #fff;
  padding: 0;
  border: 0;
  cursor: pointer;
  ${h8Medium}
`;
S.remove_all = styled.button`
  background: #fff;
  padding: 0;
  border: 0;
  cursor: pointer;
  ${h8Medium}
`;

// 내부 스크롤 (여기에만 overflow)
S.ListBody = styled.div`
  width: 100%;
  max-height: calc(420px - 90px); /* 탭/헤더 제외한 높이 */
  overflow-y: auto;
  padding: 6px 0 10px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-thumb { background: rgba(0,0,0,.25); border-radius: 8px; }
`;

// 리스트 래퍼
S.NotificationItemsWrap = styled.div`
  width: 373px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

// 개별 아이템 (flex row: 시간 | 내용)
S.NotificationItems = styled.div`
  width: 100%;
  padding: 10px 4px;
  box-sizing: border-box;

  display: flex;
  align-items: flex-start;
  gap: 10px;

  &:not(:last-child){ border-bottom: 1px solid #eee; }
  &:hover { background: #f6f6ff; } /* 너가 지정한 hover 컬러 유지 */
  ${h8Medium}
`;

// 왼쪽 시간
S.TimeText = styled.div`
  flex: 0 0 56px;         /* 고정폭 */
  white-space: nowrap;
  color: #9aa0a6;
  line-height: 22px;
  ${h8Medium}
`;

// 오른쪽 내용 박스
S.ContentBox = styled.div`
  flex: 1 1 auto;
  min-width: 0;           /* 줄어들 수 있게 */
  color: #2b2b2b;
  line-height: 22px;
  overflow: hidden;
`;

// 한 줄 … 처리 라인 (이름 ↔ 문장 간격 좁게)
S.OneLine = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 22px;

  .name{
    ${h8Medium}
    font-weight: 800;
    color: #6434B1;       /* 허그 제거하고 보라 텍스트만 */
    white-space: nowrap;
    flex: 0 0 auto;
  }
  .msg{
    ${h8Medium}
    min-width: 0;
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;  /* 한 줄 … */
    overflow-wrap: anywhere;
  }
`;

 

  export default S;
