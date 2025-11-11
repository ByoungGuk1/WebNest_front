import styled from "styled-components";
import { h4Bold, h5Medium, h6Medium } from "../../../../styles/common";
import theme from "../../../../styles/theme";
import { Link } from "react-router-dom";
const difficultyColors = {
    "초급": `${theme.PALETTE.primary.purple.main}`,    // 보라
    "중급": `${theme.PALETTE.primary.blue.main}`,    // 파랑
    "중상급": `${theme.PALETTE.primary.green.main}`,  // 초록
    "상급": `${theme.PALETTE.primary.yellow.main}`,    // 노랑
    "최상급": `${theme.PALETTE.primary.red.main}`,  // 빨강
};

const S = {}

S.QuizReadWrap = styled.div`
    display: flex;
    justify-content: space-between;
`
S.QuizLeftWrap = styled.div`
    flex: ${({ flex }) => flex || 1};
    display: flex;
    flex-direction: column;
`
S.QuizLeftTextWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 24px;
    gap: 8px;
    ${h5Medium}
    border: 1px solid black;
    `
S.QuizLeftInner = styled.span`
    width: 100%;
    display: flex;
    justify-content: space-between;
    ${h5Medium}
`
S.QuizLeftText = styled.span`
    ${h5Medium}
`
S.QuizLeftTextLink = styled(Link)`
    text-decoration: none;
    ${h6Medium}
    color: ${theme.PALETTE.neutral.gray.light};
    &:hover{
        color: ${theme.PALETTE.neutral.gray.main}
    }
`
// 왼쪽 퀴즈설명부분
S.QuizLeftMiddleWrap = styled.div`
    height: 600px;
    border-right: 1px solid black;
    display: flex;
    flex-direction: column;
`
S.QuizLeftMiddleHeader = styled.div`
    flex: ${({ flex }) => flex || 1};
    ${h4Bold}
    padding: 20px 24px;
    
`
S.QuizLeftMiddleDescription = styled.div`
    flex: ${({ flex }) => flex || 1};
    ${h5Medium}
    padding: 0px 24px;
`
S.QuizExpectationWrap = styled.div`
    flex: ${({ flex }) => flex || 1};
    padding: 0px 24px;
`

// 왼쪽 푸터부분
S.QuizLeftFooterWrap = styled.div`
    position: relative;
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid black;
    `
S.LinkToList = styled(Link)`
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    ${h6Medium}
    text-decoration: none;
    color: ${theme.PALETTE.neutral.black.main};
    &:hover{
        color: ${theme.PALETTE.primary.red.light}
    }
`
S.QuizLeftPrevQuiz = styled.div`
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
`
S.QuizLfetNextQuiz = styled.div`
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
`
S.QuizLeftPrevAndNext = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 0 20px;
    text-decoration: none;
    span{
        ${h6Medium}
        color: ${theme.PALETTE.neutral.black.main};
        &:hover{
            color: ${theme.PALETTE.primary.red.light}
        }
    }
`
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
    text-align: center;
`;
// 오른쪽
S.quizRightWrap = styled.div`
    flex: ${({ flex }) => flex || 1};
    display: flex;
    flex-direction: column;
`
S.QuizRightTextWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 24px;
    ${h5Medium}
    border: 1px solid black;
`
S.QuizRightConsoleArea = styled.div`

`


S.BookMark = styled.div`
    width: 12px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg{
        transition: fill 0.2s;
        cursor: pointer;
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

export default S;