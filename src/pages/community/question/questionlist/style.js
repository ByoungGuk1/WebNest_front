import styled from "styled-components";
import { flexCenter, flexCenterColumn, h1Bold, h3Bold, h6Bold, h6Light, h6Medium, h7Bold, h8Medium } from "../../../../styles/common";

const S ={};

S.BannerWrap = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;


S.Banner = styled.div`
  width: 100%;
  height: 188px;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  color: ${({theme}) => theme.PALETTE.neutral.white.main};
  /* display: flex; align-items: center; */ 
  ${flexCenter}
`;

S.BannerInner = styled.div`
  width: 1160px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.PageTitle = styled.div`
  ${h3Bold}
`;

S.PageDesc = styled.div`
  ${h6Medium} 
`;

S.Illust = styled.img`
width: 180px;
height: auto;
`;

// 전체 큰틀
S.Container = styled.div`
  position: relative;
  width: 1160px;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;


S.ArrowBtn = styled.button`
  position: absolute; /* 기준 부모(S.All) 안에서 절대 위치 */
  /* top: 50%; */
  top: calc(50% + 23px);
  transform: translateY(-50%); /* 진짜 중앙 정렬 */
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background-color: #FFFFFF; /*${({theme}) => theme.PALETTE.neutral.white.main};*/
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;                 /* flex 중앙정렬 */
  justify-content: center;       /* 가로 가운데 */
  align-items: center;           /* 세로 가운데 */
  transition: all 0.2s ease;
  z-index: 10;
  

  /* 호버 효과 */
  &:hover {
    /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25); */
    transform: translateY(-55%);
  }

  img {
    width: 11px;
    height: 18px;
    display: block; /* 아이콘 여백 없애기 */
   // 위치 가운데 애매함 
  }

  &.left {
    left: -75px;  //간격 + 버튼 반지름
  }

  &.right {
    right: -75px;
  }
`;

S.PopularWrap = styled.div`
  position: relative;
  display: flex;
  margin-top: 46px;
  gap: 12px;
  flex-wrap: nowrap;
  overflow: hidden;       /* 오른쪽 넘어가면 안 보이게 숨김 */
  width: 1160px;           /*숨김 기준이 되는 고정 너비 */
  
  //그라데이션 어케하는건데;;
`;


S.PopularCard = styled.div` 
  width: 308px;
  height: 198px;
  background-color: ${({theme}) => theme.PALETTE.neutral.white.secondary};
  border: 1px solid ${({theme}) => `${theme.PALETTE.neutral.black.main}14`};
  border-radius: 12px;
  flex-shrink: 0;
`;

S.PopularTitle = styled.div`
  ${h6Bold}
  margin: 21px 21px 8px;
`;
S.PopularPreview = styled.div`
  ${h6Light}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  height: 90px;
  margin: 0 21px 6px;
`;
S.Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 21px 17px;
`;
S.MetaWrap = styled.div`
  display: flex;
  gap: 4px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  ${h8Medium}
  img{
    width: 16px;
    height: auto;
  }
`;
S.Response = styled.div`
${h8Medium}
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  img {
    width: 14px;
    height: 14px;
  }
`;
S.SortWrap = styled.div`
  width: 1160px;
  margin: 46px auto 0;  /* 위에 여백 */
  display: flex;
  justify-content: space-between; /* 왼쪽 정렬 + 오른쪽 버튼 */
  align-items: center;
`;
S.Select = styled.div`
   select {
    width: 113px;
    height: 40px;
    /* padding: 0 10px; */
    border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
    border-radius: 10px;
    background-color: #FFFFFF; //${({ theme }) => theme.PALETTE.neutral.white.main};
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};
    ${h6Medium}
    cursor: pointer;
    
    /* ✅ 내부 여백 설정 */
    padding: 0 40px 0 12px; 
    /* 왼쪽: 글자 여백 12px / 오른쪽: 아이콘 들어올 공간 확보 */

    /* ✅ 화살표 아이콘 커스텀 */
    appearance: none; /* 기본 화살표 제거 */
    background-image: url("/assets/icons/downarrow.svg");
    background-repeat: no-repeat;
    background-size: 14px;
    background-position: calc(100% - 12px) center; 
    /* 오른쪽에서 12px 떨어진 위치에 배치 */
    outline: none;
  }
`;
S.WriteButton = styled.div`
  width: 113px;
  height: 40px;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  ${h6Bold}
  border-radius: 10px;
  display: flex;
  justify-content: center;   /* ✅ 가로 중앙 */
  align-items: center;       /* ✅ 세로 중앙 */
  margin: auto 0;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary.purple.dark};
  }
`;

/* 🟢 질문 리스트 */
S.ListWrap = styled.div`
  width: 1160px;
  margin: 50px auto 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

S.Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  padding-bottom: 20px;
`;

/* 🟡 언어 태그 색상 */
S.Tag = styled.div`
  ${h6Bold}
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  background-color: ${({ lang }) =>
    lang === "JS"
      ? "#F7DF1E"
      : lang === "JAVA"
      ? "#007396"
      : lang === "ORACLE"
      ? "#F80000"
      : "#aaa"};
`;

S.QuestionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

S.QuestionTitle = styled.div`
  ${h6Bold}
`;

S.QuestionPreview = styled.div`
  ${h6Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
`;
          

export default S;