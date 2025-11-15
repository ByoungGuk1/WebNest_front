import styled from "styled-components";
import { h7Medium, h8Medium, h9Bold, h9Light, h9Medium } from "../../../../styles/common";
import theme from "../../../../styles/theme";

const S = {};

S.LeftInterFaceWrap = styled.div`
    width: 100%;
    height: 168px;
    display: flex;
    flex-direction: column;
    margin-top: 24px;
`

S.LeftUserCardWrap = styled.div`
    width: 242px;
    height: 100%;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px 0px #00000011;
    border-radius: 8px;
    border-color: ${theme.PALETTE.primary.red.lightGray};
    display: flex;
    flex-direction: column;
`
S.LeftUserHeaderWrap = styled.div`
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px 0px #00000011;
    border-radius: 8px;
    border-color: ${theme.PALETTE.primary.red.lightGray};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 45px;
    span {
        ${h9Medium};
        align-items: center;
        gap: 2px;
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
S.LeftUserHeaderLeft = styled.span`
        ${h9Medium};
        align-items: center;
        gap: 2px;
        margin: 0 0 0 12px;
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
S.LeftUserMiddleWrap = styled.div`
    display: flex;
    margin: 0px 16px;
    gap: 24px;
`
S.LeftUserMiddleTextWrap = styled.div`
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
    position: relative;
    img {
        position: absolute;
        left: -50%;
        top: 10%;
    }
`;
S.UserInfoContent = styled.span`
    font: ${({ $level}) => $level ? h9Bold : h9Medium};
    font-size: 9px;
    color: ${({ $level}) => $level ? theme.PALETTE.primary.green.main : "#222"};
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
`;
S.ExpBarWrap = styled.div`
    height: 12px;
    background-color: #eee;
    border-radius: 6px;
`;
S.ExpBarFill = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(to right, #AB4BFF, #2F58FD);
    transition: width 0.4s ease;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    text-align: center;
`;
S.ExpText = styled.p`
    font-size: ${theme.FONT_SIZE.h8};
    color: ${theme.PALETTE.neutral.white.dark};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0;
    width: 100%;
    text-align: center;
`;



export default S;