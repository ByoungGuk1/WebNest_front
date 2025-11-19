import styled from "styled-components";
import { flexCenter } from "../../styles/common";
import { h4Bold, h6Medium, h7Bold } from "../../styles/common";

const S = {};

S.ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  ${flexCenter}
  z-index: 999;
`;

S.ModalBox = styled.div`
  width: 320px;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  border-radius: 10px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
`;

S.ModalTitle = styled.h3`
  ${h4Bold}
  margin-bottom: 12px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

S.ModalDesc = styled.p`
  ${h6Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  line-height: 1.5;
  margin-bottom: 24px;
`;

S.ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

S.CancelBtn = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.lightGray};
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  ${h7Bold}
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.neutral.gray.light};
  }
`;

S.ConfirmBtn = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  color: white;
  ${h7Bold}
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary.blue.dark};
  }
`;

export default S;










