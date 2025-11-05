import styled from "styled-components";
import { h9Bold } from "../../../../styles/common";
import theme from "../../../../styles/theme";

const S = {};

S.LevelIcon = styled.img`
    width: 6px;
    height: 7px;
    object-fit: contain;
`;
S.LevelBadge1 = styled.div`
    width: 31px;
    height: 15px;
    background-color: #FFFFFF;
    border-radius: 30%;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font: ${h9Bold};
    font-size: 9px;
    color: ${theme.PALETTE.primary.red.main};
`;

export default S;