import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/theme";

const S = {};

const difficultyColors = {
    "초급": `${theme.PALETTE.primary.purple.main}`,    // 보라
    "중급": `${theme.PALETTE.primary.blue.main}`,    // 파랑
    "중상급": `${theme.PALETTE.primary.green.main}`,  // 초록
    "상급": `${theme.PALETTE.primary.yellow.main}`,    // 노랑
    "최상급": `${theme.PALETTE.primary.red.main}`,  // 빨강
};


S.Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 24px;
`;

S.Header = styled.div`
    display: flex;
    padding: 12px 16px 12px 26px;
    background-color: #f5f5f5;
    font-weight: ${theme.FONT_WEIGHT.medium};
    font-size: ${theme.FONT_SIZE.h7};
    border-radius: 6px;
    
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
    text-align: center;
    font-size: 14px;
    color: ${({ dim }) => (dim ? "#888" : "#333")};

`;

S.TitleLink = styled(Link)`
    color: ${theme.PALETTE.neutral.black.main};
    font-weight: 500;
    cursor: pointer;
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
    border: 1px solid black;
`

S.DropDownButton = styled.button`
    border: 1px solid black;
`
S.Menu = styled.span`
    display: ${({ isDropped }) => (isDropped ? "block" : "none")};
    position: absolute;
    background-color: white;
    border: 1px solid #ddd;

`
S.ButtonWrap = styled.div`
    background-color: ${theme.PALETTE.primary.yellow.light};
`

export default S;