import styled from "styled-components";
import { h6Bold, h6Light, h9Medium, h9Light } from "styles/common";
import theme from "../../../../styles/theme";

const S = {};

// 친구 목록 전체 래퍼
S.FriendListWrap = styled.div`
  width: 320px;
  height: 700px;
  box-shadow: inset 1px 1px 12px rgba(149, 133, 242, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  background-color: #fff;
`;

// 친구 목록 헤더
S.FriendListHeader = styled.div`
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #9585F2;
  ${h6Bold}

  h2 {
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: 700;
    color: #121212;
  }
`;

// 친구 목록 콘텐츠 영역 (스크롤 가능)
S.FriendListContent = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 3px; }
`;

// ====== Follow styles (룸 리스트와 동일 네이밍/역할) ======
S.FollowWrap = styled.div`
  padding-top: 12px;
  width: 100%;
  height: 99%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* background-color: #fff; */
  border-radius: 12px;
  overflow: scroll;
`;

S.FollowListWarp = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
`;

S.Followlist = styled.div`
  width: 85%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  p { 
    ${h9Medium};
     margin: 0;
    }
`;

S.FollowLeftWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

S.FollowImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e5e7eb;
  object-fit: cover;
`;

S.FollowNameWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

S.LevelImg = styled.img`
  width: 6px;
  height: 7px;
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

S.LevelText = styled.p`
  font-size: 8px;
  line-height: 12px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  letter-spacing: -0.5px;
  margin: 0;
  color: ${({ $levelColor }) => $levelColor || theme.PALETTE.primary.red.main};
`;

// 체크박스 (이미지 옆)
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
  font-size: 8px;
  line-height: 12px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
  letter-spacing: -0.5px;
  color: #808080;
  margin: 0;
`;
// ====== Follow styles end ======

// ====== 아래 푸터는 절대 수정 금지 ======
S.FriendListFooter = styled.div`
  width: 100%;
  height: 60px;
  border-top: 1px solid #EFEFEF;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

S.InviteButton = styled.button`
  ${h6Bold}
  font-size: 14px;
  color: #2F96FD;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  &:hover { background-color: rgba(47,150,253,0.1); }
  &:active { background-color: rgba(47,150,253,0.2); }
`;

S.CancelButton = styled.button`
  ${h6Bold}
  font-size: 14px;
  color: #F44336;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  &:hover { background-color: rgba(244,67,54,0.1); }
  &:active { background-color: rgba(244,67,54,0.2); }
`;

S.FooterStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  ${h6Light}
  font-size: 12px;
  color: #666;
  span:first-child { font-size: 16px; }
`;

S.SortButton = styled.button`
  ${h6Light}
  font-size: 12px;
  color: #666;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  &:hover { background-color: rgba(0,0,0,0.05); }
`;

export default S;

