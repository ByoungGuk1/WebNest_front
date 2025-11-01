import styled from "styled-components";
import {
  flexBeetweenColumn,
  flexBeetweenRow,
  flexCenter,
  h4Medium,
  h5Bold,
  h6Medium,
  h7Medium,
} from "../../../styles/common";
import { Link } from "react-router-dom";

const S = {};

S.ContentContainer = styled.div`
  ${flexCenter};
  flex-direction: column;
  width: 615px;
  height: 610px;
  margin: 160px auto 0 auto;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.main};
`;

S.LogoWrapper = styled.div`
  ${flexCenter};
  margin: 48px auto 42px auto;
`;

S.logo_grean = styled.h4`
  font-family: "RomanticGumi";
  text-decoration: none;
  color: ${({ theme }) => theme.PALETTE.primary.green.main};
  ${h4Medium}
`;

S.logo_blue = styled.h4`
  font-family: "RomanticGumi";
  text-decoration: none;
  color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  ${h4Medium}
`;

S.LoginForm = styled.div`
  ${flexBeetweenColumn};
  height: 270px;
`;

S.InputWrapper = styled.div`
  ${flexCenter};
  width: 520px;
  height: 52px;
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.black.disable};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.secondary};
`;

S.Input = styled.input`
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

S.passwordEye = styled.button`
  ${flexCenter};
  margin-right: 20px;
  background-color: transparent;
`;

S.CheckBoxLabel = styled.label`
  ${flexBeetweenRow};
  justify-content: start;
  gap: 8px;
  font-size: 14px;
  width: 100%;
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  ${h7Medium}
`;

S.CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;

S.Button = styled.button`
  ${flexCenter};
  gap: 16px;
  width: 520px;
  height: 58px;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  ${h5Bold}
  border: none;
  border-radius: 8px;
`;

S.UserPageLINK = styled.div`
  ${flexBeetweenRow};
  gap: 32px;
  margin: 22px auto 0 auto;
`;

S.UserLink = styled(Link)`
  min-width: 72px;
  ${flexCenter}
  font-size: 14px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  text-decoration: none;
  ${h7Medium}
`;

S.OAuthLinkContainer = styled.div`
  margin: 30px auto auto auto;
  ${flexCenter};
  flex-direction: column;
  ${h7Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
`;

S.OAuthLinkWrapper = styled.div`
  ${flexBeetweenRow};
  gap: 24px;
  margin: 12px auto 0 auto;
`;

S.OAuthLink = styled(Link)`
  width: 50px;
  height: 50px;
`;

export default S;
