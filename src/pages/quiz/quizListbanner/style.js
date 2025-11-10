import styled from "styled-components";
import { flexCenter, h3Bold, h5Light, h6Light, h6Medium } from "../../../styles/common";

const S = {};

S.BannerWrap = styled.div`
    width: 100%;
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
    ${h5Light} 
`;

S.Illust = styled.img`
width: 180px;
height: auto;
`;

export default S;