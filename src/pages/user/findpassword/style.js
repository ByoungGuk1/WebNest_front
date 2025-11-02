import styled from "styled-components";
import {
  flexCenterColumn,
  h6Bold,
  h7Light,
  h7Medium,
  h8Medium,
  h9Medium,
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

S.InputNameWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  gap: 3px;
  width: 100%;
  height: auto;
  margin-top: 40px;
`;

S.InputName = styled.div`
  ${h6Bold};
  padding-left: 3px;
`;

S.InputEssential = styled.div`
  ${h9Medium};
  color: ${({ theme }) => theme.PALETTE.primary.purple.main};
`;

S.InputExplanation = styled.div`
  ${h8Medium};
  padding-left: 3px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  width: 100%;
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
