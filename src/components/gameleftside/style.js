import { h3Medium, h6Light } from "styles/common";

const { default: styled } = require("styled-components");
const { default: theme } = require("styles/theme");

const S = {};

/* 전체 래퍼: 좌측 메시지 315×700, 우측 바둑판 700×700 */
S.Wrap = styled.div`
    display: flex;
    gap: 20px;
    align-items: flex-start;
    width: 1045px; /* 315 + 700 + gap(20) */
`;

/* 왼쪽 패널 (메세지 입출력창) */
S.LeftPanel = styled.aside`
    width: 315px;
    height: 700px;
    background: #ffffff;
    border-radius: 8px;
    padding: 18px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.06);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

S.Logo = styled.div`
    ${theme.FONT_WEIGHT.light}
    color: #333;
    margin-bottom: 8px;
`;

S.Timer = styled.div`
    display: flex;
    justify-content: center;
    ${h3Medium}
    color: ${theme.PALETTE.primary.red.main};
    margin-bottom: 6px;
`;

S.Day = styled.div`
    color: #666;
    margin-bottom: 12px;
`;

S.HelpBlock = styled.div`
    background: #f7f7f8;
    padding: 10px;
    border-radius: 6px;
    color: #444;
    ${h6Light}
    margin-bottom: 12px;
`;

S.HelpTitle = styled.div`
    ${theme.FONT_WEIGHT.light}
    margin-bottom: 6px;
`;

S.HelpText = styled.div`
    margin-bottom: 4px;
`;

S.Form = styled.form`
    margin-top: 8px;
    display: flex;
    gap: 8px;
    align-items: center;
`;

S.Input = styled.input`
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 6px;
    outline: none;
    font-size: 14px;
    box-sizing: border-box;
    `;

S.Submit = styled.button`
    padding: 8px 12px;
    background: #7b5e3b;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
`;

S.MessageBox = styled.div`
    margin-top: 12px;
    flex: 1;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
    border: 1px solid #eee;
`;

S.MsgHeader = styled.div`
    padding: 8px 10px;
    background: #fafafa;
    border-bottom: 1px solid #eee;
    font-weight: 700;
    color: #333;
`;

S.MsgBody = styled.div`
    padding: 12px;
    color: #444;
    font-size: 14px;
    overflow: auto;
`;

export default S;