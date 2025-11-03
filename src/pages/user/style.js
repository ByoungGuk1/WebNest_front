import styled from "styled-components";
import {
  flexBeetweenRow,
  flexCenter,
  flexCenterRow,
  h4Medium,
  h5Bold,
  h6Bold,
  h6Medium,
  h7Medium,
  h8Medium,
  h9Medium,
} from "../../styles/common";

const Su = {};

Su.Div = styled.div`
  ${flexCenterRow};
  justify-content: start;
  width: 100%;
`;

Su.ContentContainer = styled.div`
  ${flexCenter};
  justify-content: start;
  flex-direction: column;
  min-height: 510px;
  width: 615px;
  margin: 160px auto 160px auto;
  padding-top: 60px;
  padding-bottom: 60px;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  border-radius: 8px;
`;

Su.LogoWrapper = styled.div`
  ${flexCenter};
  margin-bottom: 30px;
`;

Su.LogoGrean = styled.h4`
  font-family: "RomanticGumi";
  text-decoration: none;
  color: ${({ theme }) => theme.PALETTE.primary.green.main};
  ${h4Medium}
`;

Su.LogoBlue = styled.h4`
  font-family: "RomanticGumi";
  text-decoration: none;
  color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  ${h4Medium}
`;

Su.InputWrapper = styled.div`
  ${flexCenter};
  width: 520px;
  height: 52px;
  margin-top: 12px;
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.black.disable};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.secondary};
`;

Su.Input = styled.input`
  width: 100%;
  border: none;
  padding: 0 20px;
  font-size: 16px;
  ${h6Medium}
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.secondary};
  &::placeholder {
    color: ${({ theme }) => theme.PALETTE.neutral.black.disable};
  }
  &:focus {
    outline: none;
  }
`;

Su.InputNameWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  gap: 3px;
  width: 100%;
  height: auto;
  margin-top: 40px;
`;

Su.InputName = styled.div`
  ${h6Bold};
  padding-left: 3px;
`;

Su.InputEssential = styled.div`
  ${h9Medium};
  color: ${({ theme }) => theme.PALETTE.primary.purple.main};
`;

Su.InputExplanation = styled.div`
  ${h8Medium};
  padding-left: 3px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  width: 100%;
`;

Su.CheckBoxLabel = styled.label`
  ${flexBeetweenRow};
  justify-content: start;
  gap: 8px;
  font-size: 14px;
  padding-left: 2px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  ${h7Medium}
`;

Su.CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;

Su.Button = styled.button`
  ${flexCenter};
  gap: 16px;
  width: 100%;
  height: 58px;
  margin-top: 12px;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  ${h5Bold}
  border: none;
  border-radius: 8px;
  :hover {
    background-color: ${({ theme }) => theme.PALETTE.primary.purple.dark};
  }
`;

export default Su;
