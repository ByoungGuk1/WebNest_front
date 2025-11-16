import styled from "styled-components";

const S = {};

S.Wrap = styled.div`
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
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
