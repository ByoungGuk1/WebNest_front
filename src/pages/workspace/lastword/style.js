import styled from "styled-components";
import theme from "../../../styles/theme";
import {
  flexCenterColumn,
  flexCenterRow,
  h3Medium,
  h4Light,
  h5Medium,
  h7Light,
  h8Light,
} from "../../../styles/common";

const S = {};

S.MainWrapper = styled.div`
  ${flexCenterColumn}
  padding: 34px 150px 62px 150px;
  gap: 30px;
  width: 740px;
`;

S.HeaderSection = styled.div`
  width: 100%;
  ${flexCenterColumn}
  border-radius: 12px;
`;

S.SuggestedWordBanner = styled.div`
  width: 100%;
  height: 68px;
  background: ${theme.PALETTE.primary.yellow.light};
  border-radius: 12px 12px 0px 0px;
  ${flexCenterRow}
  ${h3Medium}
  gap: 16px;
  min-height: 68px;

  span {
    display: inline-block;
    min-width: 0;
    white-space: nowrap;
  }
`;

S.UserInputSection = styled.div`
  width: 100%;
  height: 50px;
  min-height: 50px;
  background: ${theme.PALETTE.neutral.white.main};
  ${h5Medium}
  ${flexCenterRow}
`;

S.TimeLimitSection = styled.div`
  border-radius: 0px 0px 12px 12px;
  width: 100%;
  height: 32px;
  position: relative;
  background: ${theme.PALETTE.primary.purple.lightGray};
`;

S.TimeLimitLabel = styled.div`
  z-index: 2;
  position: absolute;
  ${h7Light}
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

S.TimeLimitBar = styled.div`
  position: absolute;
  z-index: 1;
  width: ${({ test }) => test}%;
  height: 100%;
  border-radius: 0px 0px
    ${({ test }) => {
      if (test === 100) return `12px`;
      return `0px`;
    }}
    12px;
  background: ${theme.PALETTE.primary.purple.light};
`;

S.ContentsSection = styled.div`
  ${flexCenterRow}
  justify-content: end;
  gap: 50px;
  width: 100%;
  min-height: 445px;
  height: 100%;
  border: solid 1px ${theme.PALETTE.neutral.white.secondary};
  border-radius: 12px;
  overflow: hidden;
`;

S.ContentWrapper = styled.div`
  ${flexCenterColumn}
  width: 240px;
  gap: 30px;
  flex-shrink: 0;
`;

S.WordBox = styled.div`
  ${flexCenterRow}
  height: 80px;
  min-height: 80px;
  width: 100%;
  background: ${({ color }) => {
    if (color === "purple") return "rgba(255, 255, 255, 0.2)";
    if (color === "yellow") return "rgba(255, 255, 255, 0.2)";
    if (color === "green") return "rgba(209, 244, 204, 0.2)";
    return "rgba(255, 255, 255, 0.2)";
  }};
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: ${({ color }) => {
    if (color === "purple") return "inset 0px 0px 12px #E0DBFC";
    if (color === "yellow") return "inset 0px 0px 12px #FDF1CC";
    if (color === "green") return "inset 0px 0px 12px #D1F4CC";
    return "inset 0px 0px 12px #E0DBFC";
  }};
  backdrop-filter: blur(2px);
  ${h4Light}

  & > * {
    display: inline-block;
    min-width: 0;
  }
`;

S.ExplanatoryBox = styled.div`
  height: 300px;
  ${flexCenterColumn}
  padding: 0 12px;
  background: ${({ color }) => {
    if (color === "purple") return "rgba(255, 255, 255, 0.2)";
    if (color === "yellow") return "rgba(255, 255, 255, 0.2)";
    if (color === "green") return "rgba(209, 244, 204, 0.2)";
    return "rgba(255, 255, 255, 0.2)";
  }};
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: ${({ color }) => {
    if (color === "purple") return "inset 0px 0px 12px #E0DBFC";
    if (color === "yellow") return "inset 0px 0px 12px #FDF1CC";
    if (color === "green") return "inset 0px 0px 12px #D1F4CC";
    return "inset 0px 0px 12px #E0DBFC";
  }};
  backdrop-filter: blur(2px);
  border-radius: 12px;
  ${h8Light}
`;

S.CountdownOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  ${flexCenterColumn}
  z-index: 1000;
`;

S.CountdownText = styled.div`
  font-size: 120px;
  font-weight: bold;
  color: ${theme.PALETTE.primary.yellow.light};
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
`;

export default S;
