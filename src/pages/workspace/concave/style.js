import styled from "styled-components";

const S = {};

S.Wrap = styled.div`
    background: transparent;
    border-radius: 8px;
`;

S.Header = styled.h2`
    margin: 0 0 12px 0;
    font-size: 18px;
    color: #222;
`;

S.ContentArea = styled.div`
    display: flex;
    gap: 20px;
    align-items: flex-start;
`;

export default S;
