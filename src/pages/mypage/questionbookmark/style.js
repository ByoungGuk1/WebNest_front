import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { h6Bold, h6Medium, h7Medium } from "../../../styles/common";

const S = {};

const difficultyColors = {
    "초급": `${theme.PALETTE.primary.purple.main}`,    // 보라
    "중급": `${theme.PALETTE.primary.blue.main}`,    // 파랑
    "중상급": `${theme.PALETTE.primary.green.main}`,  // 초록
    "상급": `${theme.PALETTE.primary.yellow.main}`,    // 노랑
    "최상급": `${theme.PALETTE.primary.red.main}`,  // 빨강
};

S.AllContaner = styled.div`
    width: 1160px;
`
S.Containers = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

S.Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 24px;
`;

S.Header = styled.div`
    display: flex;
    padding: 12px 16px 12px;
    border-radius: 6px;
    border-bottom: 1px solid #141216;
    gap: 10px;
    ${h6Bold}
    
    
`;

S.Row = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 16px; 
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: background-color 0.2s;

    &:hover {
        background-color: #f0f8ff;
    }
`;

S.Cell = styled.div`
    flex: ${({ flex }) => flex || 1};
    text-align: ${({ align }) => align || "center"};
    font-size: 14px;
    color: ${({ dim }) => (dim ? "#888" : "#333")};
    padding: 8px 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

`;

S.TitleLink = styled(Link)`
    color: ${theme.PALETTE.neutral.black.main};
    font: ${h6Bold};
    cursor: pointer;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

S.Status = styled.div`
    font-weight: bold;
    color: ${({ isClear }) => (isClear ? "#2e7d32" : "#d32f2f")};
`;

S.Difficulty = styled.div`
    width: 40px;
    height: auto;
    padding: 6px 12px;
    border-radius: 12px;
    font-weight: ${theme.FONT_WEIGHT.bold};
    font-size: ${theme.FONT_SIZE.h7};
    background-color: ${({ level }) => difficultyColors[level] || "#e0e0e0"};
    color: #fff;
    display: inline-block;
`;
S.BookMark = styled.div`
    width: 12px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg{
        transition: fill 0.2s;
    }
`
S.BookMarkIcon = ({ active }) => (
    <svg
        width="12"
        height="14"
        viewBox="0 0 12 14"
        xmlns="http://www.w3.org/2000/svg"
        fill={active ? `${theme.PALETTE.primary.yellow.main}` : `${theme.PALETTE.neutral.gray.light}`}
    >
        <path d="M2 0C1.44772 0 1 0.447715 1 1V13.5C1 13.7761 1.22386 14 1.5 14C1.63261 14 1.75979 13.9473 1.85355 13.8536L6 9.70711L10.1464 13.8536C10.2402 13.9473 10.3674 14 10.5 14C10.7761 14 11 13.7761 11 13.5V1C11 0.447715 10.5523 0 10 0H2Z" />
    </svg>
);




S.DropConatiner = styled.div`
    display: flex;
    gap: 19px;
    padding: 46px 0 9px 0; //---------------------------------
    justify-content: flex-end;
    `
S.ButtonWrap = styled.div`
    
    `
S.DropDownButton = styled.button`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 40px 0px 16px;
    border: 1px solid #DDDFE0;
    border-radius: 12px;
    width: 113px;
    height: 40px;
    font: ${h6Medium};
    background-color: white;
        &:hover {
        background-color: ${theme.PALETTE.neutral.white.main};
        
    }
    `
S.DropDownIconWrap = styled.svg`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
`

S.StyledIcon = styled.svg`
    width: 12px;
    height: 7px;
    stroke: black;
    stroke-width: 1.5;
`;

S.DropDownIcon = () => (
    <S.StyledIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 7" fill="none">
        <path d="M1 1L6 6L11 1" stroke="black" strokeWidth="1.5" fill="none" />
    </S.StyledIcon>
);

S.DropDownMenuWrap = styled.div`
    display: ${({ isDropped }) => (isDropped ? "flex" : "none")};
    flex-direction: column;
    gap: 10px;
    padding: 10px 0px;
    align-items: center;
    position: absolute;
    background-color: white;
    border: 1px solid #DDDFE0;
    border-radius: 12px;
    width: 113px;
    height: fit-content;
`
S.DropDownMenu = styled.span`
    width: fit-content;
    padding: 4px 8px;
    background-color: transparent;
    transition: background-color 0.2s ease;
    &:hover{
        background-color: ${theme.PALETTE.neutral.white.main};
    }
    cursor: pointer;
`
S.QuizIdHeader = styled.div`
    width: 98px;
`

export default S;