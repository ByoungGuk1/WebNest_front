import styled from "styled-components";
import { h4Bold, h5Bold, h5Medium, h6Bold, h6Medium, h7Bold, h7Medium, h8Bold } from "styles/common";

const S = {};

/* 오른쪽 타이핑 영역 */
S.TypingSection = styled.div`
  flex: 1;
  max-width: 915px;
  margin-top: 19px;

`;

S.SectionTitle = styled.div`
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  color: white;
  height: 65px;
  border-radius: 10px;
  ${h4Bold}
  //
  margin-top: 40px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;     /* 세로 가운데 */
  padding-left: 60px;
`;

S.InputWrapper = styled.div`
  width: 100%;
  margin: 0 auto 25px;
  display: flex;
  align-items: center;
  gap: 20px; /* 아이콘과 input 사이 간격 */
  border-bottom: 2px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};

  &:focus-within {
    border-bottom-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  }

  img {
    width: 20px;
    height: 20px;
    margin-left: 20px;
  }
`;
S.InputBox = styled.input`
  flex: 1;
  height: 55px;
  border: none;
  background: transparent;
  ${h4Bold};
  outline: none;
  padding-left: 5px; /* 글씨 살짝 오른쪽으로 */
`;



// /* 🔤 입력창도 밑줄형 */
// S.InputBox = styled.input`
//   width: 96%;
//   height: 55px;
//   margin: 0 auto 40px;
//   background: transparent;
//   border: none;
//   border-bottom: 2px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
//   ${h4Bold};
//   color: #000;
//   padding-left: 35px;
//   outline: none;

//   &:focus {
//     border-bottom-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
//   }
// `;


S.SentenceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  div {
    width: 100%;
    max-width: 840px;
    margin: 0 auto;
    ${h5Medium};
    padding-left: 40px;
    color: ${({ theme }) => theme.PALETTE.primary.blue.gray};
    padding-bottom: 40px;
    border-bottom: 2px solid ${({ theme }) =>
      theme.PALETTE.neutral.gray.light};
  }
`;

/* 🔥 위에 두 줄 문장(P) - 밑줄형 */
S.P = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 25px;

  div {
    width: 100%;
    max-width: 840px;
    margin: 0 auto;
    ${h5Medium}
    color: ${({ theme }) => theme.PALETTE.primary.blue.gray};
    padding-bottom: 10px;
    border-bottom: 2px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
    padding-left: 50px;
  }
    /* 첫 번째 줄 스타일 */
  div:first-child {
    border-bottom: none;
    padding-bottom: 0; /* 밑줄 없으면 아래 패딩도 제거하는 게 자연스러움 */
    padding-left: 40px;
    color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
    ${h5Bold}
  }
`;


export default S;