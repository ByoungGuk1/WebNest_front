import styled from "styled-components";
import { h6Bold, h6Medium } from "../../../styles/common";
import theme from "../../../styles/theme";

const S = {};


S.GameRoomBackGround = styled.div`
    width: 1920px;
    height: 1080px;
    background-image: url("/assets/background/workspacebackground.png");
    background-position: center;
    background-size: 1920px 1080px;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
`

S.GameRoomToggleWrap = styled.div`
    width: 1160px;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    padding: 51px 0px;
`

S.GameRoomToggle = styled.div`
    position: relative;
    width: 142px;
    height: 50px;
    border: 2px;
    border-radius: 25px;
    padding-left: 8px;
    background: #F5F7FD;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1;

    &:hover {
        background: linear-gradient(to right, #2F58FD99, #7255EE44, #AB4BFF88);
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

    span {
        font: ${h6Bold};
        background: linear-gradient(to right, #AB4BFF, #7255EE, #2F58FD);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
                display: flex;
        align-items: center;
        gap: 12px;
    }
`;



S.DropConatiner = styled.div`
    display: flex;
    gap: 19px;
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
    font: ${h6Medium};
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
        font: ${h6Bold};
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

S.SearchWrap = styled.div`
    width: 1160px;
    height: 33px;
    border: 1px solid;
`;
S.LeftWrap = styled.div`
    width: 240px;
    height: 33px;
    position: relative;

    img {
        position: absolute;
        bottom: 35%;
        right: 1%;

    }
`

S.LeftInput = styled.input`
    width: 240px;
    height: -webkit-fill-available;
    border: none;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 20px 0px #00000033;
`


export default S;