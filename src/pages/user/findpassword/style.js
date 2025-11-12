import styled from "styled-components";
import {
  flexCenterColumn,
  h6Bold,
  h7Light,
  h7Medium,
} from "../../../styles/common";
import { Link } from "react-router-dom";

const S = {};

S.FindLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
  ${h6Bold}
`;

S.FindLink = styled(Link)`
  ${flexCenterColumn}
  min-width: 84px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.disable};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  }
`;

S.FindPwForm = styled.form`
  ${flexCenterColumn};
  width: 520px;
`;

S.SendPhoneWrapper = styled.div`
  width: 100%;
`;

S.PhoneVerification = styled.div`
  ${flexCenterColumn};
  justify-content: center;
  align-items: start;
  gap: 2px;
  margin: 4px auto;
  ${h7Medium}

  button {
    color: ${({ theme }) => theme.PALETTE.neutral.black.disable};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
    }
  }
`;

S.FoundResult = styled.div`
  ${flexCenterColumn};
  gap: 80px;
  width: 520px;
  margin: 120px 0 34px 0;
  ${h6Bold}
`;

S.LiPasswordException = styled.li`
  ${h7Light};
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  margin-left: 24px;
  list-style-type: circle;
`;

S.Space60px = styled.div`
  height: 60px;
`;

export default S;
