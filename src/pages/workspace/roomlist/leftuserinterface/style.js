import styled from "styled-components";
import { h7Medium, h8Medium, h9Bold, h9Light, h9Medium } from "../../../../styles/common";
import theme from "../../../../styles/theme";

const S = {};

S.LeftInterFaceWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

S.LeftUserCardWrap = styled.div`
    width: 242px;
    height: 180px;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px 0px #00000011;
    border-radius: 8px;
    border-color: ${theme.PALETTE.primary.red.lightGray};
    display: flex;
    flex-direction: column;
    position: relative;
`
S.LeftUserHeaderWrap = styled.div`
    margin: 0 10px 0 10px;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px 0px #00000011;
    border-radius: 8px;
    border-color: ${theme.PALETTE.primary.red.lightGray};
    display: flex;
    align-items: center;
    justify-content: space-between;
`
S.LeftUserHeaderLeft = styled.div`
    display: flex;
    align-items: center;
    & img {
        width: 14px;
        height: 14px;
        margin: 0 4px 0 0;
    }

    & span {
        ${h7Medium};
    }
`

S.SettingImage = styled.img`
    width: 14px;
    height: 14px;
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
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 10px 0;
`
S.UserInfoWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;
S.UserInfoRow = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 12px;
    width: 80px;
`;
S.UserInfoTitle = styled.span`
    color: ${theme.PALETTE.primary.red.gray};
    font-size: 14px;
    font-weight: 300;
`;
S.UserInfoContent = styled.span`
    color: ${theme.PALETTE.primary.green.main};
    font-size: 14px;
    font-weight: 700;
`;

S.LeftUserCheerUp = styled.div`
    font: ${h8Medium};
    line-height: 8px;
    font-size: ${theme.FONT_SIZE.h8};
    color: ${theme.PALETTE.primary.blue.main};
    margin-bottom: 6px;
    text-align: center;
`;

S.ExpBarWrap = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 12px;
    background-color: #eee;
    border-radius: 6px;
`;
S.ExpBarFill = styled.div`
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