import styled from "styled-components";
import { h4Bold, h4Medium, h5Bold, h5Medium, h6Medium } from "styles/common";

const S = {};

S.ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

S.ModalBox = styled.div`
  width: 360px;
  height: 500px;
  background: white;
  border-radius: 20px;
  padding: 40px;
  /* margin: 40px; */
  text-align: center;
`;

S.ModalImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
`;

S.Title = styled.div`
  ${h4Medium}
  margin: 20px 0 50px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

S.Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  ${h5Medium}

  span:last-child {
    font-weight: bold;
    color: ${({ theme }) => theme.PALETTE.primary.purple.main};
    ${h5Bold}
  }
`;

S.ButtonWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: space-between;

  button {
    width: 48%;
    padding: 12px 0;
    border-radius: 10px;
    ${h5Medium}
    cursor: pointer;
    border: none;
    background: ${({ theme }) => theme.PALETTE.neutral.white.main};
    transition: 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.PALETTE.primary.purple.main};
      color: white;
    }
  }
`;


export default S;







