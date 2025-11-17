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

S.DropdownWrapper = styled.div`
  position: relative;
  width: 248px;
`

S.DropdownButton = styled.button`
  width: 100%;
  height: 31px;
  border: 1px solid ${theme.PALETTE.neutral.gray.light};
  border-radius: 10px;
  background-color: #FFFFFF;
  ${h7Medium}
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 13px;
  color: ${theme.PALETTE.neutral.gray.main};
  
  &:hover {
    border-color: ${theme.PALETTE.primary.purple.main};
  }
`

S.DropdownArrow = styled.span`
  font-size: 10px;
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`

S.DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background-color: #FFFFFF;
  border: 1px solid ${theme.PALETTE.neutral.gray.light};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`

S.DropdownItem = styled.div`
  padding: 10px 13px;
  ${h7Medium}
  cursor: pointer;
  color: ${({ $isSelected }) => $isSelected ? '#FFFFFF' : theme.PALETTE.neutral.gray.main};
  background-color: ${({ $isSelected }) => $isSelected 
    ? 'linear-gradient(to right, #6D2FFD 0%, #7255EE 38%, #AB4BFF 100%)' 
    : '#FFFFFF'};
  
  &:hover {
    background-color: ${({ $isSelected }) => $isSelected 
      ? 'linear-gradient(to right, #6D2FFD 0%, #7255EE 38%, #AB4BFF 100%)' 
      : 'rgba(193, 168, 249, 0.1)'};
  }
  
  &:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

S.NumberInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 248px;
`

S.NumberButton = styled.button`
  width: 31px;
  height: 31px;
  border: 1px solid ${theme.PALETTE.neutral.gray.light};
  border-radius: 10px;
  background-color: #FFFFFF;
  ${h7Medium}
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.PALETTE.neutral.gray.main};
  font-size: 18px;
  font-weight: bold;
  
  &:hover {
    border-color: ${theme.PALETTE.primary.purple.main};
    background-color: rgba(193, 168, 249, 0.1);
    color: ${theme.PALETTE.primary.purple.main};
  }
  
  &:active {
    background-color: rgba(193, 168, 249, 0.2);
  }
`

S.NumberInput = styled.input`
  flex: 1;
  height: 31px;
  border: 1px solid ${theme.PALETTE.neutral.gray.light};
  border-radius: 10px;
  background-color: #FFFFFF;
  ${h7Medium}
  text-align: center;
  padding: 0 13px;
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  -moz-appearance: textfield;
  
  &:focus {
    outline: none;
    border-color: ${theme.PALETTE.primary.purple.main};
  }
`

S.NumberDisplay = styled.div`
  flex: 1;
  height: 31px;
  border: 1px solid ${theme.PALETTE.neutral.gray.light};
  border-radius: 10px;
  background-color: #FFFFFF;
  ${h7Medium}
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.PALETTE.neutral.gray.main};
`
export default S;