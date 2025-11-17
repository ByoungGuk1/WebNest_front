import styled from "styled-components";
import { h7Light, h9Medium } from "../../../../styles/common";
import theme from "../../../../styles/theme";

const S = {};

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
    display: flex;
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
    width: 160px;
    height: -webkit-fill-available;
    position: relative;
    img {
        position: absolute;
        right: 5%;
        top: 40%;
        cursor: pointer;
    }
    `
    S.RightInput = styled.input`
        width: 50%;
        height: -webkit-fill-available;
        border: #FFFFFF;
        box-shadow: 0px 0px 5px 0px #00000011;
        border-radius: 8px;
        font-size: 10px;
        &::placeholder {
            ${h9Medium}
            padding: 0 0 0 8px;
        }
        &:focus {
            outline: 2px solid ${theme.PALETTE.primary.purple.main};
        }
    `
S.LeftWrap = styled.div`
    width: 240px;
    height: 33px;
    position: relative;
        img {
        position: absolute;
        bottom: 35%;
        right: 4%;
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
    ${h9Medium};
    &::placeholder{
        padding: 0 0 0 8px;
    }
    &:focus {
        outline: 2px solid ${theme.PALETTE.primary.purple.main};
    }
    
`


export default S;