import styled from "styled-components";
import theme from "../../../styles/theme";
import {
  flexBeetweenColumn,
  flexBeetweenRow,
  flexCenterColumn,
  flexCenterRow,
  h2Light,
  h4Light,
  h6Light,
  h8Light,
} from "../../../styles/common";

const colors = {
  purple: {
    background: "rgba(224, 219, 252,0.2)",
    boxShadow: "inset 0px 0px 12px #E0DBFC",
  },
  yellow: {
    background: "rgba(253, 241, 204,0.2)",
    boxShadow: "inset 0px 0px 12px #FDF1CC",
  },
  green: {
    background: "rgba(209, 244, 204, 0.2)",
    boxShadow: "inset 0px 0px 12px #D1F4CC",
  },
  blue: {
    background: "rgba(211, 232, 255, 0.2)",
    boxShadow: "inset 0px 0px 12px #d3e8ff",
  },
  red: {
    background: "rgba(253, 215, 210, 0.2)",
    boxShadow: "inset 0px 0px 12px #fdd7d2",
  },
  aqua: {
    background: "rgba(224, 238, 255,0.2)",
    boxShadow: "inset 0px 0px 12px #e0eeff",
  },
  black: {
    background: "rgba(232, 232, 232, 0.2)",
    boxShadow: "inset 0px 0px 12px #eae8e8",
  },
  orange: {
    background: "rgba(253, 230, 210,0.2)",
    boxShadow: "inset 0px 0px 12px #fde6d2",
  },
};

const S = {};

S.MainWarp = styled.div`
  ${flexBeetweenRow}
  gap: 20px;
  width: 1045px; /* 315 + 700 + gap(20) */
`;

S.LastWordWrap = styled.div`
  height: 700px;
  width: 700px;
  gap: 20px;
  ${flexBeetweenColumn}
`;

S.TitleWarp = styled.div`
  ${flexCenterRow}
  ${h2Light}
  height: 200px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(2px);
  border-radius: 12px;
  background: rgb(244, 242, 254, 0.2);
  box-shadow: inset 0px 0px 12px #e0dbfc;
`;

S.ContentsWrap = styled.div`
  ${flexBeetweenRow}
  justify-content: end;
  gap: 50px;
  width: 100%; /* 700 + gap(20) */
  min-height: 445px;
  height: 100%;
  overflow: hidden;
`;

S.SuggestedText = styled.div`
  ${flexCenterRow}
  gap: 10px;
`;

S.ContentContainer = styled.div`
  ${flexCenterColumn}
  width: 250px;
  height: 100%;
  gap: 30px;
  flex-shrink: 0;
`;

S.WordContainer = styled.div`
  ${flexCenterRow}
  height: 80px;
  min-height: 80px;
  width: 100%;
  background: ${({ color, recentword }) => {
    if (recentword) {
      return colors[`${color}`]?.background ?? colors.purple.background;
    }
    return "rgba(255, 255, 255, 0.2)";
  }};
  box-shadow: ${({ color }) => {
    return colors[`${color}`]?.boxShadow ?? colors.purple.boxShadow;
  }};
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(2px);
  border-radius: 12px;
  ${h4Light}

  & > * {
    display: inline-block;
    min-width: 0;
  }
`;

S.ExplanationContainer = styled.div`
  height: 300px;
  width: 100%;
  flex-grow: 1;
  ${flexCenterColumn}
  background: ${({ color, recentword }) => {
    if (recentword) {
      return colors[`${color}`]?.background ?? colors.purple.background;
    }
    return "rgba(255, 255, 255, 0.2)";
  }};
  box-shadow: ${({ color }) => {
    return colors[`${color}`]?.boxShadow ?? colors.purple.boxShadow;
  }};
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(2px);
  border-radius: 12px;
  ${h6Light}

  & > p {
    padding: 16px;
  }
`;

export default S;
