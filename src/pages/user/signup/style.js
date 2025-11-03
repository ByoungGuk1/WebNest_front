import styled from "styled-components";
import { flexCenterColumn, h7Light, h7Medium } from "../../../styles/common";

const S = {};

S.SignupForm = styled.form``;

S.LiPasswordException = styled.li`
  ${h7Light};
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  margin-left: 24px;
  list-style-type: circle;
`;

S.Space60px = styled.div`
  height: 60px;
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

export default S;
