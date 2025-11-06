import styled from "styled-components";
import { flexCenter, h3Bold, h6Medium } from "../../../styles/common";

const S = {};

S.BannerWrap = styled.div`
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
`;
S.Banner = styled.div`
    width: 100%;
    height: 188px;
    background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
    color: ${({theme}) => theme.PALETTE.neutral.white.main};
    /* display: flex; align-items: center; */ 
    ${flexCenter}
`;

S.BannerInner = styled.div`
    width: 1160px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    `;
    
S.PageTitle = styled.div`
    ${h3Bold}
`;

S.PageDesc = styled.div`
    ${h6Medium} 
`;

S.Illust = styled.img`
width: 180px;
height: auto;
`;

export default S;