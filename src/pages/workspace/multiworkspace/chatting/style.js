// styles/Chatting.styled.js
import styled from "styled-components";
import { h6Light } from "styles/common";

const S = {};

/* 선택: 바깥 컨테이너 */
S.ChattingLayout = styled.div`
  /* 필요 시 추가 */
`;

/* 메시지 목록: 메시지 간격 4px */
S.ChatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  white-space: normal;
  min-width: 0;
`;

/* ========== 내 메시지 ========== */
S.MyChatWrap = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  padding-right: 12px;       /* 오른쪽에서 12px */
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

/* 아바타: 24px, 둥글게 */
S.Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex: 0 0 24px;
`;

export default S;
