import styled from "styled-components";
import {
  flexBeetweenColumn,
  flexBeetweenRow,
  flexCenter,
  h7Medium,
} from "../../../styles/common";
import { Link } from "react-router-dom";

const S = {};

S.LoginForm = styled.form`
  ${flexBeetweenColumn};
  height: 270px;
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
  margin: 30px auto 0 auto;
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
