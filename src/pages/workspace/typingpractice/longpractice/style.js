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
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;     /* 세로 가운데 */
  padding-left: 64px;
  //
  white-space: pre-wrap;
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


export default S;