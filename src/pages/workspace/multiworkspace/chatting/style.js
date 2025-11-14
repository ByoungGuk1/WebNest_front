// styles/Chatting.styled.js
import styled from "styled-components";
import { h6Bold, h6Light, h8Light } from "styles/common";

const S = {};

/* 선택: 바깥 컨테이너 */
S.ChattingLayout = styled.div`
  /* 필요 시 추가 */
`;

/* 메시지 목록: 메시지 간격 4px */
S.ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  white-space: normal;
  min-width: 0;
`;

/* ========== 내 메시지 ========== */
S.MyChatWrap = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  min-width: 0;
`;

S.MyChatLayout = styled.div`
  display: inline-block;     /* 내용만큼 */
  max-width: 70%;            /* 한 줄 최대 폭 */
  padding: 8px 12px;
  background-color: #7255EE;
  color: #fff;
  border-radius: 12px;
  line-height: 1.5;
  ${h6Light}

  /* 줄바꿈 설정 */
  white-space: pre-wrap;     /* \n 유지 + 자동 줄바꿈 */
  word-break: break-word;    /* 긴 단어 줄바꿈 */
  overflow-wrap: anywhere;   /* 보강 */
`;

/* ========== 상대 메시지 ========== */
S.OthersChatWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;        /* 아바타 ↔ 말풍선 4px */
  min-width: 0;
`;

/* 상대측 닉/버블용 세로스택 */
S.OnlyCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

/* 상대 말풍선 (오타 포함 원래 키 유지) */
S.OthersChatLyaout = styled.div`
  display: inline-block;   /* 내용만큼 */
  max-width: 70%;
  padding: 8px 12px;
  background-color: #EFEFEF;
  color: #121212;
  border-radius: 12px;
  line-height: 1.5;
  ${h6Light}

  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

S.Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  /* 이미지 들어오면 수정해야됨 */
  background-color: black;
  flex: 0 0 24px;
`;
S.ChatListWrap = styled.div`
   /* 높이 지정 */
  min-height: 300px;        /* ← camelCase 말고 하이픈 */
  height: 85%;
  width: 100%;


  /* 리스트 형태 */
  display: flex;
  flex-direction: column;
  gap: 4px;

  /* 패딩/박스사이징 */
  padding: 8px 12px;
  box-sizing: border-box;

  /* 넘치면 세로 스크롤 */
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;

  /* 긴 단어/URL로 가로 터짐 방지 */
  word-break: break-word;
  overflow-wrap: anywhere;

  /* 스크롤바(선택) */
  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-thumb { background: rgba(0,0,0,.2); border-radius: 8px; }
`;
S.ChatWrap = styled.div`
  width: 320px;
  height: 700px;
  box-shadow: inset 1px 1px 12px rgba(149, 133, 242 ,0.25); 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
`
S.InputBox = styled.div`
  width: 240px;
  height: 36px;
  border-radius: 18px;
  background-color: rgba(0, 0, 0, 0.05);
  /* border: 3px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
`
S.Input = styled.input`
  width: 80%;
  height: 85%;
  background-color: rgba(0, 0, 0, 0.0);
  border: none;
  :focus{
    border: none;
  }
  ${h8Light}
`
S.ChatHeader = styled.div`
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #9585F2;
  ${h6Bold}
`
S.RowWrap =styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
  gap: 8px;
  & .airplane{
    width: 13px;
    height: 12px;
  }
  & .arrow {
    width: 11px;
    height: 18px;
    margin-right: 8px;
  }
`

S.ArrowButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    opacity: 0.5;
  }
`

export default S;
