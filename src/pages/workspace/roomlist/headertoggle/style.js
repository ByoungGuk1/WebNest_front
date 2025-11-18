import styled from "styled-components";
import { h6Bold, h6Medium } from "../../../../styles/common";
import theme from "../../../../styles/theme";

const S = {};

// 토글 스타일
S.GameRoomToggleWrap = styled.div`
    width: 1160px;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    margin: 36px 0;
`
S.GameRoomToggleInnerText = styled.span`
        font: ${h6Bold};
        background: ${({ $isSelected }) => $isSelected 
            ? 'transparent' 
            : 'linear-gradient(to right, #AB4BFF, #7255EE, #2F58FD)'};
        background-clip: ${({ $isSelected }) => $isSelected ? 'unset' : 'text'};
        -webkit-background-clip: ${({ $isSelected }) => $isSelected ? 'unset' : 'text'};
        -webkit-text-fill-color: ${({ $isSelected }) => $isSelected ? '#FFFFFF' : 'transparent'};
        color: ${({ $isSelected }) => $isSelected ? '#FFFFFF' : 'transparent'};
        display: flex;
        align-items: center;
        gap: 12px;
`

S.GameRoomToggle = styled.div`
    position: relative;
    width: 142px;
    height: 50px;
    border-radius: 25px;
    padding-left: 8px;
    background: ${({ $isSelected }) => $isSelected 
        ? 'linear-gradient(to right, #6D2FFD 0%, #7255EE 38%, #AB4BFF 100%)' 
        : '#F5F7FD'};
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1;
    
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 25px;
        padding: 3px;
        background: ${({ $isSelected }) => $isSelected 
            ? 'transparent' 
            : 'linear-gradient(to right, #AB4BFF, #7255EE, #2F58FD)'};
        -webkit-mask:
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
                mask-composite: exclude;
        z-index: 0;
        pointer-events: none;
        display: ${({ $isSelected }) => $isSelected ? 'none' : 'block'};
    }
    & > * {
        z-index: 1;
    }
    &:hover {
        background: ${({ $isSelected }) => $isSelected 
            ? 'linear-gradient(to right, #6D2FFD 0%, #7255EE 38%, #AB4BFF 100%)' 
            : 'linear-gradient(to left, #2F58FD, #7255EE, #AB4BFF)'};
    }
    &:hover ${S.GameRoomToggleInnerText} {
        -webkit-text-fill-color: ${({ $isSelected }) => $isSelected ? '#FFFFFF' : '#FFFFFF'};
        color: #FFFFFF;
    }

`;
// 드롭다운스타일
S.DropConatiner = styled.div`
    display: flex;
    gap: 19px;
    `
S.ButtonWrap = styled.div`
    position: relative;
    `
S.DropDownButton = styled.button`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 40px 0px 16px;
    border: 1px solid #DDDFE0;
    border-radius: 12px;
    width: 113px;
    height: 40px;
    ${h6Medium};
    background-color: white;
        &:hover {
        background-color: ${theme.PALETTE.neutral.white.main};
        
    }
    `
S.DropDownMenu = styled.div`
    position: absolute;
    width: 150px;
    margin-top: 10px;
    background: #F5F7FD;
    border-radius: 25px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    z-index: 10;
    overflow: hidden;

    span {
        ${h6Bold};
        background: linear-gradient(to right, #AB4BFF, #7255EE, #2F58FD);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 5px 8px;
        cursor: pointer;
        &:not(:last-child){
            border-bottom: 2px solid #AB4BFF;
        }
    }
    
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 25px;
        padding: 3px;
        background: linear-gradient(to right, #AB4BFF, #7255EE, #2F58FD);
        -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
        pointer-events: none;
        z-index: -1;
    }
`;

S.IconCircle = styled.div`
    width: 40px;
    height: 40px;
    background-color: #FFFFFF;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 20px;
        height: 20px;
    }
`;
S.ToggleIconCircle = styled.div`
    width: 40px;
    height: 40px;
    background-color: #FFFFFF;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 30px;
        height: 30px;
    }
`;

// 방 만들기 모달창


S.Modal = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    background-color: white;
    z-index: 100;
    padding: 20px;
    font-size: 18px;
    
    & input[type='text'] {
    width: 200px;
    font-size: 18px;
    }
`;

S.TitleWrap = styled.div`
    display: flex;
    justify-content: space-between;
`

S.ModalBG = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100dvw;
    height: 100dvh;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 99;
`;

S.Li = styled.li`
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 8px;
    border-radius: 5px;
`



export default S;