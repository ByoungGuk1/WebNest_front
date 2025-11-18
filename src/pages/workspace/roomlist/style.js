import styled from "styled-components";
import { Link } from "react-router-dom";
import { h5Bold, h6Bold, h6Medium, h7Light, h7Medium, h8Bold, h8Light, h8Medium, h9Bold, h9Light, h9Medium, h10Bold, h10Medium } from "../../../styles/common";
import theme from "../../../styles/theme";

const S = {};


S.RoomListPosition = styled.div`
    position: relative;
`

S.RoomBg = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);

`


S.GameRoomBackGround = styled.div`
    height: 1080px;
    background-image: url("/assets/background/workspacebackground.png");
    background-position: center;
    background-size: 1920px 1080px;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    background-color: #F5F7FD;
`

S.LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
`

S.ListWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px;
`

S.LeftSection = styled.div`
    width: 242px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

S.RoomListWrapper = styled.div`
    width: 890px;
    height: 630px;
`
S.RoomListWrap = styled.div`
    width: 890px;
    height: 630px;
    background-color: #fff;
    border: 2px solid #C1A8F9;
    border-radius:10px;
    padding: 20px 10px;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;

    &::-webkit-scrollbar {
        width: 30%;
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: ${theme.PALETTE.primary.purple.light};
        border-radius: 10px;
        
        &:hover {
            background-color: ${theme.PALETTE.primary.purple.main};
        }
    }
`

S.RoomListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    align-items: center;
    gap: 10px;
`

S.RoomListLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`
S.RoomList = styled.div`
    position: relative;
    padding: 0 30px;
    width: 850px;
    height: 90px;
    box-sizing: border-box;
    border-radius:10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.2s ease;
    cursor: ${({ $isDisabled }) => $isDisabled ? 'not-allowed' : 'pointer'};
    
    &:hover {
        background-color: ${({ $isDisabled }) => 
            $isDisabled ? 'rgba(0, 0, 0, 0.1)' : 'rgba(149, 133, 242, 0.1)'
        };
    }
    
    .flag {
        width : 40px;
        height: 42px;
    }
    .locker {
        width: 25px;
        height: 25px;
        position: absolute;
        top: 50%;           /* 요소의 상단 경계를 부모 요소의 중앙에 위치시킴 */
        left: 50%;          /* 요소의 좌측 경계를 부모 요소의 중앙에 위치시킴 */
        transform: translate(-50%, -50%); /* 요소 자체의 너비와 높이의 50%를 이동시켜 정중앙에 위치시킴 */
    }
`
S.PasswordHidden = styled.p`
    display: none;
`
S.RowWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
S.ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
`

S.ProfileWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4px;
`

S.AverageLevelText = styled.p`
    ${h8Bold}
    color: ${({ $levelColor }) => $levelColor || theme.PALETTE.primary.red.main};
    margin: 0;
    padding: 0;
    text-align: center;
`

S.RoomLeft = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
`

S.RoomTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    ${h5Bold}
    line-height: 12px;
    margin-top: 12px;
    gap: 4px;
`

S.RoomLanguage = styled.span`
    ${h6Medium}
`
S.RoomRight = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
`
S.ProfileImgWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`

S.ProfileImg = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 100%;
    border: solid 1px #d9d9d9;
    object-fit: cover;
`

S.CrownIcon = styled.img`
    position: absolute;
    z-index: 1;
    top: -6px;
    left: 3px;
    transform: translateX(-50%) rotate(-40deg);
    width: 12px;
    height: auto;
`
S.ColWrap = styled.div`
    display: flex;
    flex-direction: column;
`
S.TeamWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    p {
        ${h8Bold}
    }
`
S.FollowWrap = styled.div`
    padding-top: 12px;
    width: 100%;
    height: 410px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 12px;
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1;
`
S.Followlist = styled.div`
    width: 200px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
    p {
        font-size: 12px;
        line-height: 16px;
    }
`

S.FollowLeftWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`

S.FollowImg = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #e5e7eb;
`
S.LevelImg = styled.img`
    width: 6px;
    height: 7px;
`
S.LevelWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    background-color: #fff;
    border-radius: 12px;
    align-items: center;
`

S.LevelText = styled.p`
    font-size: 10px;
    line-height: 12px;
    white-space: nowrap;
    font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
    letter-spacing: -0.5px;
    margin: 0;
    color: ${({ $levelColor }) => $levelColor || theme.PALETTE.primary.red.main};
`

S.StatusWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
`

S.StatusDot = styled.div`
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-color: ${({ $color }) => $color || theme.PALETTE.neutral.gray.main};
`

S.StatusText = styled.p`
    ${h6Medium}
    letter-spacing: -0.5px;
    font-size: 12px;
    color: #808080;
`

S.FollowLeftWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`
S.FollowNameWrap = styled.div`
    display: flex;
    flex-direction: column;

    & p {
        font-size: 13px;
    }
`
S.RoomHeaderWrap = styled.div`
    display: flex;
    flex-direction: row;
`

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
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
`
S.RightArrayWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    ${h7Light};
    cursor: pointer;
    
`
S.RightRefreshWrap = styled.div`
    height: 25px;
    display: flex;
    align-items: center;
    gap: 4px;
    ${h7Light};
    cursor: pointer;
`
S.RightInputWrap = styled.div`
    border: ${({ $focused }) => $focused ? `2px solid ${theme.PALETTE.primary.purple.main}` : 'none'};
    background-color: #fff;
    border-radius: 8px;
    font-size: 10px;
    width: 160px;
    height: 33px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    & button {
        width: 8px;
        height: 8px;
        background-image: url("/assets/icons/search.png");
        background-repeat: no-repeat;
        background-color: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
    }
    `
    S.RightInput = styled.input`
        background-color: transparent;
        width: 80%;
        height: -webkit-fill-available;
        border: none;
        border-radius: 8px;
        font-size: 10px;
        outline: none;
        &::placeholder {
            ${h7Light}
        }
        &:focus {
            outline: none;
        }
    `
S.LeftWrap = styled.div`
    width: 240px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
        img {
        width: 12px;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
        cursor: pointer;
    };
`;
S.LeftInput = styled.input`
    width: 240px;
    height: -webkit-fill-available;
    border: none;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 5px 0px #00000011;
    border-radius: 8px;
    ${h8Medium};
    &::placeholder{
        padding: 0 0 0 8px;
    }
    &:focus {
        outline: 2px solid ${theme.PALETTE.primary.purple.main};
    }
    
`
S.SelectBox = styled.div`
    width: 107px;
    height: 37px;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    background-color: rgba(255,255,255,0.5);
    font-weight: ${({ $isSelected }) => $isSelected ? 700 : 500};
    color: ${({ $isSelected }) => $isSelected ? theme.PALETTE.primary.purple.main : "#999"};
    border-top: ${({ $isSelected }) => $isSelected ? `2px solid ${theme.PALETTE.primary.purple.main}` : '2px solid transparent'};
    border-left: ${({ $isSelected }) => $isSelected ? `2px solid ${theme.PALETTE.primary.purple.main}` : '2px solid transparent'};
    border-right: ${({ $isSelected }) => $isSelected ? `2px solid ${theme.PALETTE.primary.purple.main}` : '2px solid transparent'};
    border-bottom: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: rgba(193, 168, 249, 0.3);
    }
`
S.SelectBoxWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 6px;
`
S.FilterWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
    margin-right: 10px;
    gap: 12px;
`
S.FollowFooterWrap = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: center;
    align-items: center;
`
S.MenuFont = styled.span`
    font-size: 22px;
`
S.FooterText = styled.span`
    ${h7Light}
`
S.FooterItems = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 6px;
`
S.ArrangeIcon = styled.span`
    font-size: 10px;
    font-weight: 800;
    letter-spacing:-2px;
`
S.FollowListWarp = styled.div`
    width: 100%;
    height: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
`
export default S;