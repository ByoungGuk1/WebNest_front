import styled from "styled-components";
import theme from "../../../styles/theme";

const S = {};

S.ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

S.ModalContent = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

S.ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

S.ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.PALETTE.primary.purple.main};
  margin: 0;
`;

S.ModalBody = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

S.WinnerText = styled.p`
  font-size: 18px;
  color: #333;
  margin: 0;
  line-height: 1.6;
`;

S.WinnerName = styled.span`
  font-weight: bold;
  color: ${theme.PALETTE.primary.purple.main};
`;

S.ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;

S.ConfirmButton = styled.button`
  background: linear-gradient(to right, #6D2FFD 0%, #7255EE 38%, #AB4BFF 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(109, 47, 253, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default S;

