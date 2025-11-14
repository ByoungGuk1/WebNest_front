import styled from "styled-components";
import { h6Bold, h6Light } from "styles/common";

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

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
`;

// 친구 항목
S.FriendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

// 체크박스
S.Checkbox = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.selected ? "#2F96FD" : "#D9D9D9")};
  background-color: ${(props) => (props.selected ? "#2F96FD" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
`;

// 체크마크
S.Checkmark = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
`;

// 친구 아바타
S.FriendAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background-color: #EFEFEF;
`;

// 친구 정보 (레벨 + 이름)
S.FriendInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

// 레벨 배지
S.LevelBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  
  img {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }

  span {
    ${h6Light}
    font-size: 12px;
    color: #666;
    font-weight: 600;
  }
`;

// 친구 이름
S.FriendName = styled.span`
  ${h6Light}
  font-size: 14px;
  color: #121212;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 친구 목록 푸터
S.FriendListFooter = styled.div`
  width: 100%;
  height: 60px;
  border-top: 1px solid #EFEFEF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #FAFAFA;
`;

// 초대하기 버튼
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

  &:hover {
    background-color: rgba(47, 150, 253, 0.1);
  }

  &:active {
    background-color: rgba(47, 150, 253, 0.2);
  }
`;

// 취소하기 버튼
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

  &:hover {
    background-color: rgba(244, 67, 54, 0.1);
  }

  &:active {
    background-color: rgba(244, 67, 54, 0.2);
  }
`;

// 푸터 상태 (중앙)
S.FooterStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  ${h6Light}
  font-size: 12px;
  color: #666;

  span:first-child {
    font-size: 16px;
  }
`;

// 정렬 버튼
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

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export default S;

