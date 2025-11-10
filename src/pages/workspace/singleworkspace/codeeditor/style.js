import { Editor } from "@monaco-editor/react";
import styled from "styled-components";
import { h6Medium } from "../../../../styles/common";
import theme from "../../../../styles/theme";

const S = {};

S.Editor = styled(Editor)`
    height: 800px;
    border-bottom: 1px solid black;
`
S.OutputBox = styled.div`
    position: relative;
    height: 158px;
    background-color: white;
    color: black;
    padding: 16px;
    ${h6Medium}
`;

S.OutputTitle = styled.h4`
    margin-bottom: 8px;
`;

S.OutputContent = styled.pre`
    white-space: pre-wrap;
    word-break: break-word;
    color: ${theme.PALETTE.primary.red.main};
`;
S.ButtonWrap = styled.div`
    position: absolute;
    bottom: 8px;
    right: 8px;
    display: flex;
    gap: 5px;
`

S.RunButton = styled.button`
    padding: 8px 14px;
    background-color: ${theme.PALETTE.primary.green.lightGray};
    ${h6Medium}
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: ${theme.PALETTE.neutral.gray.light};
    }
`;




export default S;