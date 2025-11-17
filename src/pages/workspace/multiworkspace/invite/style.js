import styled from "styled-components";
import { h6Bold, h6Medium } from "../../../../styles/common";
import theme from "../../../../styles/theme";

const S = {};

S.ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

S.ModalContent = styled.div`
  background-color: white;
  border-radius: 16px;
  width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

S.ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #111827;
  }
`;

S.CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #111827;
  }
`;

S.ModalBody = styled.div`
  padding: 20px 24px;
  overflow-y: auto;
  flex: 1;
`;

S.EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
  font-size: 16px;
`;

S.RoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.RoomItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? '#6D2FFD' : '#e5e7eb')};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ $isSelected }) => ($isSelected ? '#f5f3ff' : 'white')};

  &:hover {
    border-color: ${({ $isSelected }) => ($isSelected ? '#6D2FFD' : '#d1d5db')};
    background-color: ${({ $isSelected }) => ($isSelected ? '#f5f3ff' : '#f9fafb')};
  }
`;

S.FollowerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.FollowerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? '#6D2FFD' : '#e5e7eb')};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ $isSelected }) => ($isSelected ? '#f5f3ff' : 'white')};

  &:hover {
    border-color: ${({ $isSelected }) => ($isSelected ? '#6D2FFD' : '#d1d5db')};
    background-color: ${({ $isSelected }) => ($isSelected ? '#f5f3ff' : '#f9fafb')};
  }
`;

S.FollowerImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e5e7eb;
`;

S.FollowerInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

S.FollowerNameWrap = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;

  gap: 2px;
`;

S.LevelWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  width: 30px;
  height: 15px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 0px 1.75px rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
`;

S.LevelImg = styled.img`
  width: 6px;
  height: 7px;
`;

S.LevelText = styled.p`
  font-size: 8px;
  line-height: 12px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  letter-spacing: -0.5px;
  margin: 0;
  color: ${({ $levelColor }) => $levelColor || theme.PALETTE.primary.red.main};
`;

S.FollowerName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #111827;
`;

S.StatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

S.StatusDot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: ${({ $color }) => $color || theme.PALETTE.neutral.gray.main};
`;

S.StatusText = styled.p`
  font-size: 12px;
  line-height: 12px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  letter-spacing: -0.5px;
  color: #808080;
  margin: 0;
`;

S.Checkbox = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ $selected }) => ($selected ? '#6D2FFD' : '#D9D9D9')};
  background-color: ${({ $selected }) => ($selected ? '#6D2FFD' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
`;

S.Checkmark = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
`;

S.RoomInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

S.RoomTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #111827;
`;

S.RoomMeta = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

S.RoomPlayers = styled.div`
  font-size: 12px;
  color: #9ca3af;
`;

S.ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
`;

S.CancelButton = styled.button`
  ${h6Medium}
  padding: 10px 20px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }
`;

S.InviteButton = styled.button`
  ${h6Bold}
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(to right, #6D2FFD 0%, #7255EE 38%, #AB4BFF 100%);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(109, 47, 253, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default S;

