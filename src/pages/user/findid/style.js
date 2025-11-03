import styled from "styled-components";
import { flexCenterColumn, h6Bold, h7Medium } from "../../../styles/common";
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

S.FindIdForm = styled.form`
  ${flexCenterColumn};
  width: 520px;
`;

S.SendEmailWrapper = styled.div`
  width: 100%;
`;

S.EmailVerification = styled.div`
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
  gap: 8px;
  width: 520px;
  margin: 120px 0 34px 0;
  ${h6Bold}
`;

export default S;
