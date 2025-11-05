import styled from "styled-components";
import { h6Bold, h6Medium, h8Medium, h9Bold, h9Light, h9Medium } from "../../../styles/common";
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
    display: flex;
    justify-content: space-between;
`;
S.IconBox = styled.div`
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
        background-color: #FFFFFF;
    box-shadow: 0px 0px 5px 0px #00000011;
    border-radius: 8px;
    img {
        width: 10px;
        height: 10px;
    }
`;

S.RightWrap = styled.div`
    width: 321px;
    height: 33px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .lastImg {
        position: relative;
        right: 8%;
    }

`

S.RightArrayWrap = styled.div`
    width: fit-content;
    height: 25px;
    display: flex;
    align-items: center;
    gap: 4px;
    font: ${h9Light};
    font-size: 10px;

`
S.RightRefreshWrap = styled.div`
    width: 81px;
    height: 25px;
    display: flex;
    align-items: center;
    gap: 4px;
    font: ${h9Light};
    font-size: 10px;
`

S.RightInput = styled.input`
    width: 160px;
    height: -webkit-fill-available;
    border: none;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px 0px #00000011;
    border-radius: 8px;
    font-size: 10px;
    position: relative;
    font: ${h9Medium};
`


S.LeftWrap = styled.div`
    width: 240px;
    height: 33px;
    position: relative;
        img {
        position: absolute;
        bottom: 35%;
        right: 4%;
    };
`;
S.LeftInput = styled.input`
    width: 240px;
    height: -webkit-fill-available;
    border: none;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px 0px #00000011;
    border-radius: 8px;
    font: ${h9Medium};
    font-size: 12px;
    padding-left: ${({ placeholder }) => placeholder || ""};
    
`

S.LeftInterFaceWrap = styled.div`
    width: 242px;
    height: 633px;
    display: flex;
    flex-direction: column;
    margin-top: 14px;
    gap: 42px;
`

S.LeftFriendWrap = styled.div`
    width: 100%;
    height: 423px;
    display: flex;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px 0px #00000011;
    border-radius: 8px;
    justify-content: center;
    border-color: ${theme.PALETTE.primary.red.lightGray};
    span {
        text-align: center;
        padding: 30px;
        font: ${h8Medium};
        font-size: 12px;
        color: ${theme.PALETTE.primary.red.gray};
    }
`

S.LeftUserCardWrap = styled.div`
    width: 100%;
    height: 168px;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px 0px #00000011;
    border-radius: 8px;
    border-color: ${theme.PALETTE.primary.red.lightGray};
`

S.LeftUserHeaderWrap = styled.div`
    width: 100%;
    height: 26px;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px 0px #00000011;
    border-radius: 8px;
    border-color: ${theme.PALETTE.primary.red.lightGray};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 45px;
    span {
        font: ${h9Medium};
        font-size: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2px;
        padding-left: 7px;
    }

    div {
        font: ${h9Bold};
        font-size: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    div > span {
        display: flex;
        gap: 4px;
    }
    img {
        width: 10px;
        height: 8px
    }
`

S.UserProfileImgWrap = styled.div`
    display: flex;
    justify-content: center;
    margin: 12px 0;

    img {
        width: 92px;
        height: 92px;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0 0 8px rgba(0,0,0,0.03);
    }
`;

S.LeftUserMainWrap = styled.div`
    display: flex;
    margin: 0px 16px;
    gap: 24px;
`
S.LeftUserMainTextWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
S.LeftUserCardName = styled.span`
    font: ${h9Bold};
    font-size: 10px;
`
S.UserInfoWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

S.UserInfoRow = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 12px;
    width: 80px;
`;

S.UserInfoTitle = styled.span`
    font: ${h9Light};
    font-size: 10px;
    color: ${theme.PALETTE.primary.red.gray};
`;

S.UserInfoContent = styled.span`
    font: ${({ level}) => level ? h9Bold : h9Medium};
    font-size: 9px;
    color: ${({ level}) => level ? theme.PALETTE.primary.green.main : "#222"};
    &.grade {
        font: 800;
    }
`;



S.LeftUserCheerUp = styled.div`
    font: ${h8Medium};
    line-height: 8px;
    font-size: ${theme.FONT_SIZE.h8};
    color: ${theme.PALETTE.primary.blue.main};
    margin-bottom: 6px;
    text-align: center;
`;

S.LeftUserFooterWrap = styled.div`
    width: 100%;
`;

S.ExpBarWrap = styled.div`
    width: 100%;
    height: 12px;
    background-color: #eee;
    border-radius: 6px;
    overflow: hidden;
`;

S.ExpBarFill = styled.div`
    height: 100%;
    background: linear-gradient(to right, #AB4BFF, #2F58FD);
    transition: width 0.4s ease;
`;
//   h1: "60px",
//   h2: "40px",
//   h3: "32px",
//   h4: "24px",
//   h5: "18px",
//   h6: "16px",
//   h7: "14px",
//   h8: "12px",
//   h9: "10px",
S.ExpText = styled.p`
    font-size: ${theme.FONT_SIZE.h8};
    margin-top: 4px;
    text-align: center;
    color: #666;
`;


export default S;