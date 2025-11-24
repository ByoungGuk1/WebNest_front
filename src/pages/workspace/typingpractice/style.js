import styled from "styled-components";
import { h4Bold, h5Bold, h5Medium, h6Bold, h6Medium, h7Bold, h7Medium, h8Bold } from "styles/common";

const S = {};

  S.Main = styled.div`
    height: 795px;
    background-color: #F5F6F8;
    padding: 20px 0 0 0;
  `;


/* 상단 옵션 */
S.Option = styled.div`
  width: 100%;
  max-width: 1440px;       //헤더와 동일한 중앙 그리드 폭
  margin: 0 auto 15px;   
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.ModeSelect = styled.div``;

S.ModeButton = styled.button`
  ${h5Bold}
  border: none;
  border-radius: 100px;
  padding: 5px 30px;
  cursor: pointer;
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};

  background-color: ${({ $active, theme }) =>
    $active
      ? theme.PALETTE.primary.green.main   // short 모드 버튼
      : theme.PALETTE.primary.blue.main    // long 모드 버튼
  };
`;

// S.ModeButton = styled.button`
//   color: white;
//   ${h5Bold}
//   border: none;
//   border-radius: 100px;
//   padding: 5px 30px;
//   cursor: pointer;

//   background-color: ${({ $active, theme }) =>
//     $active
//       ? theme.PALETTE.primary.green.main   // 선택된 버튼
//       : theme.PALETTE.primary.blue.main    // 선택 안 된 버튼
//   };
// `;


S.LanguageSelect = styled.div`
  display: flex;
  align-items: center;
`;


/* 언어 토글 전체 */
S.ToggleWrapper = styled.div`
  width: 130px;
  height: 40px;
  background-color: #fff;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  position: relative;
  user-select: none;

  span {
    flex: 1;
    text-align: center;
    ${h6Bold}
    z-index: 2;
    cursor: pointer;
  }

  .ko {
    color: ${({ $lang }) => ($lang === "한국어" ? "#fff" : "#666")};
  }
  .en {
    color: ${({ $lang }) => ($lang === "영어" ? "#fff" : "#666")};
  }
`;

S.ToggleButton = styled.div`
  width: 70px;
  height: 30px;
  border-radius: 40px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ $lang }) => ($lang === "한국어" ? "5px" : "68px")};
  transition: left 0.25s ease;
  z-index: 1;

  /* short → 초록 / long → 파랑 */
  background-color: ${({ $isShort, theme }) =>
    $isShort === "short"
      ? theme.PALETTE.primary.green.main
      : theme.PALETTE.primary.blue.main};
`;







// /* 전체 영역(중앙 그리드 정렬) */
S.TypingAll = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 20px 0 0 0;
`;


/* 왼쪽 패널 */
S.MyInfo = styled.div`
  width: 320px;
  /* min-height: 600px; */
  height: 700px;
  background-color: white;
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.PALETTE.primary.blue.main};
    position: relative;
    left: -40px;   // 오직 이 박스만 왼쪽으로 이동
`;

S.MyInfoInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;  
  padding: 20px;
`;

S.SelectTitle = styled.div`
  ${h6Bold}
  color: ${({ theme }) => theme.PALETTE.primary.blue.main};
`;




/* 드롭다운 박스(첫번째 사진의 모습) */
S.DropdownBox = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.primary.blue.main};
  /* padding: 8px 4px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; 
  border-bottom: 2px solid #dcdcdc; 
  cursor: pointer;

  span {
    ${h5Bold} 
    margin: 0 0 5px 15px;
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  }
`;

S.Arrow = styled.div`
  margin: 0 5px 0 0;
  img {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

/* 드롭다운 리스트 */
S.DropdownMenu = styled.ul`
  width: 90%; 
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  margin-top: 6px;
  background-color: white;
  list-style: none;
  /* padding: 6px 0; */
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  right: 17px;
  bottom: 393px;
  z-index: 50;
`;

/* 드롭다운 아이템 */
S.DropdownItem = styled.li`
  padding: 12px 14px;
  ${h6Medium};
  color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary.green.light};
    color: #000;
  }
`;



S.ModeOption = styled.div`
  ${h4Bold}
  margin: 0 auto;
  padding-top: 10px;
`;

S.MyCharacter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25px 0;
  border-color: 2px solid #000000;
  padding-bottom: 20px;

  img {
    width: 100px;
    height: 100px;

    border-radius: 50%;   /* 🔥 동그라미로 만들어주는 핵심 코드 */
    object-fit: cover;    /* 🔥 사진 비율 깨지지 않도록 */
  }
`;

S.CharacterName = styled.div`
  ${h5Medium}
  margin-top: 30px;
`;

S.ProgressTitle = styled.div`
  ${h6Bold}
  display: inline-flex;        /* 요소가 밀리지 않도록 inline-flex */
  align-items: center;
  gap: 10px;                   /* 텍스트와 선 사이 간격 */

  &::before,
  &::after {
    content: "";
    flex: 1;                   /* 알아서 적당히 양쪽 선 길이 맞춤 */
    height: 1px;
    background-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  }
`;



S.ProgressBox = styled.div`
`;
S.ProgressTime = styled.div`
  display: flex;
  justify-content: space-between;
  ${h6Medium}
  margin-bottom: 10px;


`;


  S.Bar = styled.div`
    width: ${({ $width }) => ($width != null ? `${$width}%` : "100%")};
    height: 4px;
    transition: width 0.1s linear;

    &.blue {
      background-color: #4aa7ff;
    }
    &.red {
      background-color: #ff5e5e;
    }
  `;
// S.ProgressBox = styled.div`
//   position: relative;
//   height: 25px;  /* 고정 높이 */
//   margin-bottom: 10px;
// `;

// S.Bar = styled.div`
//   position: absolute;   /* 부모에 영향을 안 주게 */
//   bottom: 0;
//   left: 0;
//   height: 4px;
//   width: ${({ $width }) => $width || "0%"};
//   transition: width 0.15s linear;

//   &.blue {
//     background-color: #4aa7ff;
//   }
//   &.red {
//     background-color: #ff5e5e;
//   }
// `;

// S.ProgressTime = styled.div`
//   display: flex;
//   justify-content: space-between;
//   ${h6Medium}
//   margin-bottom: 10px;

//   span:last-child {
//     min-width: 60px;
//     text-align: right;
//     font-family: monospace;
//   }
// `;







/* 오른쪽 아래 버튼 */
S.StopPracticeButton = styled.button`
  position: fixed;
  right: 95px;
  bottom: 60px;
  border: 2px solid ${({ theme }) => theme.PALETTE.primary.purple.main};
  color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  background-color: white;
  border-radius: 100px;
  padding: 10px 25px; 
  ${h6Bold}
  cursor: pointer;
`;

export default S;
