import styled from "styled-components";
import { h6Bold, h6Medium } from "styles/common";


const S = {};


/* 정렬 + 글쓰기 버튼 */
S.SortWrap = styled.div`
  width: 1160px;
  margin: 46px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.Select = styled.div`
  position: relative;

  select {
    width: 120px;
    height: 44px;
    border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
    border-radius: 10px;
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};
    ${h6Medium}
    cursor: pointer;
    padding: 0 40px 0 14px;
    outline: none;
    appearance: none;
    background-image: url("/assets/icons/downarrow.svg");
    background-repeat: no-repeat;
    background-size: 14px;
    background-position: calc(100% - 14px) center;
    transition: all 0.2s ease;
  }

  select option {
    font-size: 15px;
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};
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
  justify-content: center;
  align-items: center;
  margin: auto 0;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary.purple.dark};
  }
`;


export default S;