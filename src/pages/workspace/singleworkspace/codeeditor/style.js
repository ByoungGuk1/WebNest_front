import styled from "styled-components";
import { h6Medium } from "../../../../styles/common";
import theme from "../../../../styles/theme";
import { Editor } from "@monaco-editor/react";


const S = {};

S.StyledEditor = styled(Editor)`
    height: 600px;
    .monaco-editor .view-lines{
        width: 1100px;
    }
    .monaco-editor .scrollbar {
        color: black;
    }
    .invisible .scrollbar .vertical .fade{
        background-color: black;
    }
    
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
    &:disabled {
    background: #666;   /* 더 진한 회색 */
    color: #ccc;        /* 글자도 흐리게 */
    cursor: not-allowed; /* 마우스 호버 불가 */
    
    &:hover {
      background: #666; /* hover 효과 제거 */
    }
}

`;




export default S;