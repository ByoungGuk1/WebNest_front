import styled from "styled-components";
import { h6Medium, h7Medium } from "../../../styles/common";
import theme from "../../../styles/theme";

const S = {};

S.DropContainer = styled.div`
    display: flex;
    gap: 12px;
    padding: 46px 0 34px 0;
    `
S.ButtonWrap = styled.div`
    position: relative;
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
    white-space: nowrap;
    background-color: ${({ selected }) => selected ? "#924EFF" : "white"};
    color: ${({ selected }) => selected ? "#FFFFFF" : "000000"};
    font-size: 15.5px;
    font-weight: 600;
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
    display: ${({ $isDropped }) => $isDropped ? "flex" : "none"};
    flex-direction: column;
    gap: 10px;
    padding: 10px 0px 10px 8px;
    position: absolute;
    background-color: white;
    border: 1px solid #DDDFE0;
    border-radius: 12px;
    width: 102px;
    height: fit-content;
    top: 45px;
`
S.DropDownMenu = styled.span`
    width: 78px;
    padding: 4px 8px;
    background-color: transparent;
    transition: background-color 0.2s ease;
    cursor: pointer;
    ${h6Medium};
    &:hover{
        background-color: #f6f6ff;
    }
`
S.DropDownRefreshWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    & img {
        width: 12px;
        height: 12px;
    }
`
S.DropDownRefreshText = styled.span`
    ${h7Medium}
    color: ${theme.PALETTE.primary.green.darkGray};
`

S.QuizIdHeader = styled.div`
    width: 98px;
`

export default S;