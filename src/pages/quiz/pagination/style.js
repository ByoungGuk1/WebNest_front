import styled from "styled-components";
import { h6Medium } from "../../../styles/common";


const S = {};

S.NavigateWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    margin: 100px 0 100px;
    position: relative;
`
S.Navigate = styled.nav`
    display: flex;
    align-items: center;
    gap: 8px;
`
S.NavigateBtn = styled.button`
    width: 32px;
    height: 32px;
    margin: 0 45px;
    border: none;
    border-radius: 50%;
    background-color: ${({ disabled }) =>
    disabled ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.05)"};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    transition: all 0.2s ease;

    img {
        width: 6px;
        height: 12px;
        opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
    }
    &:hover {
        background-color: ${({ disabled }) =>
        disabled ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.1)"};
    }
`;


S.PageButton = styled.button`
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 50%;
    background-color: ${({ $active }) =>
        $active ? "#FFC107" : "transparent"};
    color: ${({ $active }) => ($active ? "#fff" : "#000")};
    ${h6Medium}
    cursor: pointer;

    &:hover {
        background-color: ${({ $active }) =>
        !$active ? "rgba(0,0,0,0.05)" : "#FFC107"};
    }
`;


export default S;