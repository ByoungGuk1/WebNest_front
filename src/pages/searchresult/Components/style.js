// ./style.js
import styled from "styled-components";
import { Link } from "react-router-dom";
import { h4Bold, h5Medium, h6Bold, h6Medium, h7Bold, h7Light, h7Medium, h9Bold } from "../../../styles/common";
import theme from "../../../styles/theme";

const S = {};

/* ====================== 공통 레이아웃 ====================== */
S.Container = styled.div`
  width: 1160px;
  margin: 0 auto;
`;

S.HeaderRow = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1.5px solid #2F96FD;
  ${h5Medium}
  .blue { color:#2F96FD; }
`;

S.CleanLinkPlus = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  &:hover { opacity:.8; }
  img { width:12px; height:12px; margin-right:6px; }
`;

S.List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/* ===== 카드(아이템) 한 장: 192px 고정, 여러 장 세로 스택 ===== */
S.Item = styled.div`
  width: 100%;
  height: 192px;
  border-bottom: 1px solid #eee;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  display: block;      /* flex 여분 간격 제거 */
  overflow: hidden;    /* 내용 넘침 방지 */
`;

/* 카드 전체 클릭 가능하게 – 3행(grid)로 고정 배치 */
S.CleanLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: grid;
  /* grid-template-rows: 20px 28px 1fr;  배지 / 타이틀 / 본문 */
  row-gap: 8px;
  align-content: center;              /* 192px 내 세로 중앙 */
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 8px;
  &:hover { background:#f0f8ff; }
`;

/* ===== 상단 배지 줄 (배지만 위로 올림) ===== */
S.BadgeCol = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 20px;       /* grid 1행 채움 */
  margin-bottom: 4px;
`;

/* ===== 텍스트 영역 ===== */
S.TextCol = styled.div`
  display: contents;  /* 불필요 래퍼 여백 제거, ellipsis 정상화 */
  min-width: 0;
`;

S.Title = styled.h3`
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

S.Body = styled.p`
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;    /* 2줄 말줄임 */
  overflow: hidden;

  .target {
    color: #00D674;
    font-weight: 600;
  }
`;

/* ===== 언어 배지 3종 (건들지 말자!) ===== */
S.javaBox = styled.div`
  width: 43px; height: 20px; border-radius: 3px;
  display:flex; align-items:center; justify-content:center;
  background:#00D674; color:#fff; font-weight:700; font-size:12px;
`;

S.jsBox = styled.div`
  width: 24px; height: 20px; border-radius: 3px;
  display:flex; align-items:center; justify-content:center;
  background:#FFC600; color:#fff; font-weight:700; font-size:12px;
`;

S.oracleBox = styled.div`
  width: 58px; height: 20px; border-radius: 3px;
  display:flex; align-items:center; justify-content:center;
  background:#7255EE; color:#fff; font-weight:700; font-size:12px;
`;

/* ====================== 문제 리스트(테이블) 레이아웃 ====================== */
/* ⚠️ 여기서 예전엔 S.Container 를 다시 선언해서 위 컨테이너를 덮어썼음 → 이름 변경 */


// Quiz 부분


const difficultyColors = {
    "초급": `${theme.PALETTE.primary.purple.main}`,    // 보라
    "중급": `${theme.PALETTE.primary.blue.main}`,    // 파랑
    "중상급": `${theme.PALETTE.primary.green.main}`,  // 초록
    "상급": `${theme.PALETTE.primary.yellow.main}`,    // 노랑
    "최상급": `${theme.PALETTE.primary.red.main}`,  // 빨강
};

S.ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

S.Header = styled.div`
    display: flex;
    padding: 12px 16px 12px;
    border-bottom: 1px solid ${theme.PALETTE.primary.purple.light};

    gap: 10px;
    ${h6Bold}
    
`;

S.Row = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: background-color 0.2s;

    &:hover {
        background-color: #f6f6ff;
    }
`;

S.Cell = styled.div`
    flex: ${({ flex }) => flex || 1};
    text-align: ${({ align }) => align || "center"};
    font-size: 16px;
    color: ${({ dim }) => (dim ? "#888" : "#333")};
    padding: 8px 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-left: ${({ paddingLeft}) => (paddingLeft ? '8px' : 0)};

`;

S.TitleLink = styled(Link)`
    color: ${theme.PALETTE.neutral.black.main};
    font-size: ${h6Bold};
    cursor: pointer;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

S.Status = styled.div`
    font-weight: bold;
    color: ${({ isClear }) => (isClear ? "#2e7d32" : "#d32f2f")};
`;

S.Difficulty = styled.div`
    width: 40px;
    height: auto;
    padding: 6px 12px;
    border-radius: 12px;
    font-weight: ${theme.FONT_WEIGHT.bold};
    font-size: ${theme.FONT_SIZE.h7};
    background-color: ${({ level }) => difficultyColors[level] || "#e0e0e0"};
    color: #fff;
    display: inline-block;
`;
S.BookMark = styled.div`
    width: 12px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg{
        transition: fill 0.2s;
        cursor: pointer;
    }
`
S.BookMarkIcon = ({ active }) => (
    <svg
        width="12"
        height="14"
        viewBox="0 0 12 14"
        xmlns="http://www.w3.org/2000/svg"
        fill={active ? `${theme.PALETTE.primary.yellow.main}` : `${theme.PALETTE.neutral.gray.light}`}
    >
        <path d="M2 0C1.44772 0 1 0.447715 1 1V13.5C1 13.7761 1.22386 14 1.5 14C1.63261 14 1.75979 13.9473 1.85355 13.8536L6 9.70711L10.1464 13.8536C10.2402 13.9473 10.3674 14 10.5 14C10.7761 14 11 13.7761 11 13.5V1C11 0.447715 10.5523 0 10 0H2Z" />
    </svg>
);





S.UserCard = styled.div`
  width: 1160px;
  height: 153px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
S.UserLevelCard = styled.div`
  width: 35px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #fff;
  position: absolute;
  bottom: 0px;
  right: -8px;
  & span {
    ${h9Bold}
    color: #2F96FD;
  }
  & .lv {
    ${h9Bold}
    color: #2F96FD;
  }
  & .lvImg {
    width: calc(61px * 0.1);
    height: calc(74px * 0.1);
    background-color: #fff;
    margin-right: 3px;
  }
  
`
S.UserLeftWrap = styled.div`
  width: 320px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & .lv {
    ${h9Bold}
    color: #2F96FD;
  }
  & img {
    width: 66px;
    height: 66px;
    border-radius: 100%;
    background-color: gray;
  }
  & p{
    ${h4Bold}
  }
  & .follower {
    ${h7Light}
    color: #555;
  }
  & .count {
    color: #4d4d4d;
    ${h7Medium}
  }
`
S.UserProfile = styled.div` 
  position: relative;
`
S.AlreadyFollowingBox = styled.div`
  width: 86px;
  height: 34px;
  background-color: #00D674;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  & span{
    ${h7Bold}
    color : #fff;
  }
`
S.HopeFollowingBox = styled.div`
  width: 86px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2F96FD;
  & span{
    ${h7Bold}
    color: #fff;
  }
`


// 검색결과 없음 페이지 레이아웃
const PURPLE = "#7255EE";
const BLUE = "#2F96FD";
const LINE = "#D9D9D9";

S.Wrap = styled.div`
  width: 1160px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-top: 108px;
`;

/* 상단 검색 인풋 라인 */
S.InputRow = styled.div`
  width: 920px;
  height: 74px;
  margin: 0 auto;
  border-bottom: 1px solid ${PURPLE};
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    flex: 1;
    height: 100%;
    border: 0;
    outline: 0;
    font-size: 18px;
  }

  img {
    width: 18px;
    height: 18px;
  }
`;

/* 탭 라인 */
S.Tabs = styled.div`
  width: 1160px;
  display: flex;
  justify-content: space-between;
`;

S.Tab = styled.div`
  width: calc(1160px / 6);
  height: 92px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${LINE};
  position: relative;

  .count {
    color: ${BLUE};
  }

  /* 활성 탭 하이라이트 */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: ${({ $active }) => ($active ? "6px" : "0")};
    border-radius: ${({ $active }) => ($active ? "10px" : "0")};
    background: ${PURPLE};
    transition: height 0.15s ease;
  }
`;

/* 빈결과 카드 */
S.EmptyCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 100%; */
  min-height: 220px;
  border-top: 1px solid ${LINE};
  border-bottom: 1px solid ${LINE};
  display: flex;
  align-items: center;
  gap: 36px;
  padding: 40px 24px;
`;

S.IconWrap = styled.div`
  width: 84px;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 72px;
    height: 72px;
    object-fit: contain;
  }
`;

S.EmptyText = styled.div`
  font-size: 18px;
  line-height: 1.6;

  .term {
    color: ${BLUE};
    font-weight: 700;
  }
`;

/* 도움말 2단 */
S.HelpGrid = styled.div`
  width: 100%;
  border-top: 2px solid #cfe3ff;
  border-bottom: 2px solid #cfe3ff;
  display: flex;
  height: 360px;
  flex-direction: column;
  justify-content: center;
`;
S.HelpTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
S.HelpContent =styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`
S.HelpToWrite = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 36px;
  gap: 24px;
`

S.CleanLinkTag =  styled(Link)`
  color: inherit;
  text-decoration: none;
  justify-content: center;
  :hover{
    cursor: pointer;
  }
`
S.HelpLinkWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`
S.HelpTitleSpan = styled.span`
  ${h4Bold}
`
S.HelpContentSpan = styled.span`
  ${h6Medium}
`
export default S;
