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
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: white;
  height: 65px;
  border-radius: 10px;
  ${h4Bold}
  //
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;     /* 세로 가운데 */
  padding-left: 35px;
`;



S.InputBox = styled.input`
  width: 95%;
  height: 65px;
  margin-bottom: 40px;
  border: 2px solid ${({ theme }) => theme.PALETTE.primary.green.main};
  border-radius: 10px;
  background: white;

  ${h4Bold};
  color: #000;

  outline: none;

  /* 🔥 글씨 위치 제목 박스와 완벽 동일 */
  padding-left: 35px;       
  padding-right: 15px;

  /* 🔥 세로 중앙 자동 정렬 (input은 기본적으로 됨) */
  display: flex;
  align-items: center;

`;



S.SentenceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 19px;
  list-style: none;
 

  div {
    background-color: white;
    display: flex;
    align-items: center;
    padding-left: 40px;
    width: 840px;
    height: 57px;
    margin: 0 auto;
    border-radius: 10px;
    ${h5Medium}
    color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
  }
`;
S.P = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 19px;
  list-style: none;
 

  div {
    background-color: white;
    display: flex;
    align-items: center;
    padding-left: 40px;
    width: 840px;
    height: 57px;
    margin: 0 auto;
    border-radius: 10px;
    ${h5Medium}
    color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
  }
`;

export default S;