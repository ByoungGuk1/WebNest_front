import styled from "styled-components";
import {
  flexCenterColumn,
  flexCenterRow,
  h8Medium,
  h9Bold,
} from "../../../../../styles/common";
import theme from "../../../../../styles/theme";

const S = {};

const colors = {
  purple: {
    boxShadow: "inset 0px 0px 12px #E0DBFC",
  },
  yellow: {
    boxShadow: "inset 0px 0px 12px #FDF1CC",
  },
  green: {
    boxShadow: "inset 0px 0px 12px #D1F4CC",
  },
  blue: {
    boxShadow: "inset 0px 0px 12px #d3e8ff",
  },
  red: {
    boxShadow: "inset 0px 0px 12px #fdd7d2",
  },
  aqua: {
    boxShadow: "inset 0px 0px 12px #e0eeff",
  },
  black: {
    boxShadow: "inset 0px 0px 12px #eae8e8",
  },
  orange: {
    boxShadow: "inset 0px 0px 12px #fde6d2",
  },
};

S.UserProfileWrapper = styled.div`
  width: 120px;
  height: 160px;
  border-radius: 10px;
  position: relative;
  ${flexCenterColumn}
  gap: 3px;
  backdrop-filter: blur(2px);
  background: "rgba(255, 255, 255, 0.2)";
  box-shadow: ${({ color }) => {
    return colors[`${color}`]?.boxShadow ?? colors.black.boxShadow;
  }};
`;

S.ResignButton = styled.div`
  position: absolute;
  right: 12.5px;
  top: 5.5px;
  width: 10px;
  height: 10px;
  ${flexCenterColumn}
`;

S.ProfileImageWrap = styled.div`
  ${flexCenterColumn}
  border-radius: 50%;
  width: 48px;
  height: 48px;
  overflow: hidden;
  background-color: ${theme.PALETTE.neutral.gray.light};
  position: relative;

  & > [name="userThumbnail"] {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

S.CrownIcon = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  z-index: 1;
  top: -16px;
`;

S.UserNameWrap = styled.div`
  ${h8Medium}
  ${flexCenterRow}
  position: relative;
`;

S.UserGradeWrap = styled.div`
  ${flexCenterRow}
  ${h9Bold}
  width: 31px;
  height: 15px;
  border-radius: 12px;
  background-color: #fff;
  gap: 4px;
  padding-left: 3px;
  padding-right: 2px;
  & img {
    width: 6px;
    height: 7px;
  }
`;

S.UserTextWrap = styled.div`
  border-radius: 8px;
  width: 80px;
  height: 28px;
  ${flexCenterColumn}
  ${h9Bold}
  background: ${theme.PALETTE.background.ready};
`;

S.SelectColorWrap = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  ${flexCenterRow}
  width: 68px;
  height: 30px;
  gap: 5px;
  flex-wrap: wrap;
`;

S.ColorButton = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;

S.UserExpBar = styled.progress`
  width: 80%;
`;

export default S;
