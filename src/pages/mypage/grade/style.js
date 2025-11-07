// src/pages/mypage/grade/style.js
import styled from "styled-components";

const S = {};

// 1160 그리드 중앙 정렬
S.Wrap = styled.section`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 16px;
`;

// 카드 컨테이너
S.Card = styled.div`
  border: 1px solid ${({ theme }) => theme?.PALETTE?.neutral?.line || "#EEE"};
  border-radius: 12px;
  background: #fff;
  padding: 20px 24px;
`;

// 좌우 정렬 행
S.Row = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr; /* 배지 220, 우측 막대 확장 */
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

/* ===== 배지 영역 ===== */
S.BadgeArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

S.Circle = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: ${({ theme }) => theme?.PALETTE?.neutral?.surface || "#F7F7FA"};
  border: 1px solid ${({ theme }) => theme?.PALETTE?.neutral?.line || "#EEE"};
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
`;

// 실제 알 아이콘(이미지)
// * 기본값으로만 표시(플레이스홀더는 시멘틱용으로 숨김)
S.EggImg = styled.img`
  width: 64%;
  height: 64%;
  object-fit: contain;
  display: block;
`;

// 이미지 대체 텍스트(시멘틱 유지, 시각적으로 숨김)
S.PlaceholderEgg = styled.span`
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap; 
  border: 0;
`;

S.LevelText = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: ${({ theme }) => theme?.FONT_SIZE?.h6 || "16px"};
  color: ${({ theme }) => theme?.PALETTE?.neutral?.black?.primary || "#222"};
`;

/* ===== 막대 영역 ===== */
S.BarArea = styled.div`
  display: grid;
  gap: 10px;
`;

// 10칸 트랙(세그먼트 래퍼)
S.BarTrack = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 6px;
  width: 100%;
  height: 14px;
`;

// 각 세그먼트
S.BarSegment = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 99px;
  background: ${({ $filled, $color }) => ($filled ? $color : "#E9E9EE")};
  transition: background 160ms ease;
`;

// 아래 라벨( Lv1 ~ LvX )
S.BarLabels = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 6px;

  > span {
    font-size: ${({ theme }) => theme?.FONT_SIZE?.caption || "11px"};
    color: ${({ theme }) => theme?.PALETTE?.neutral?.black?.tertiary || "#888"};
    text-align: center;
    user-select: none;
  }
`;

export default S;
