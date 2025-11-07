import styled from "styled-components";
import { h5Medium, h6Medium, h7Medium } from "../../../../../styles/common";
import theme from "../../../../../styles/theme";

const S = {}

S.Modal = styled.div`
  position: fixed;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  width: 407px;
  height: 529px;
  background-color: white;
  border: 1px solid #000;
  border-radius: 12px;
  z-index: 100;
  display: flex;
  justify-content: center;
  
`;
S.InnerWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 24px;
`

S.TitleWrap = styled.div`
  display: flex;
  justify-content: center;
  ${h5Medium}
  padding: 25px 0;
`
S.LeftTitle = styled.div`
  display: flex;
  flex-direction: column;
  ${h6Medium}
  gap:29px
`
S.RightInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`
S.RightInput = styled.input`
  width: 248px;
  height: 31px;
  border: 1px solid ${theme.PALETTE.neutral.gray.light};
  border-radius: 10px;
  &::placeholder {
    ${h7Medium}
    padding: 0 0 0 13px;
  }
`
S.FormBtn = styled.button`
  width: 100px;
  height: 30px;
  margin: 15px 0 0px 120px;
  background-color: #FFFFFF;
  border: 1px solid ${theme.PALETTE.neutral.gray.light};
  border-radius: 8px;
  color: ${theme.PALETTE.primary.blue.main};
`

S.ExitBtn = styled.p`
  position: absolute;
  right: 8%;
  top: 6%;
`
export default S;