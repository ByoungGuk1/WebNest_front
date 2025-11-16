import styled from "styled-components";
import { h5Bold, h6Medium, h7Medium } from "../../../styles/common";
import theme from "../../../styles/theme";

const S = {};

// 페이지 전체 컨테이너
S.Page = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 40px 0;
`;

// 배경 이미지
S.Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/assets/background/purple.png");
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  z-index: -1;
  opacity: 0.1;
`;

// 메인 컨테이너
S.Container = styled.div`
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// 공통 카드 스타일
const CardBase = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

// 등급 카드
S.GradeCard = styled(CardBase)`
  background: ${({ theme }) => theme?.PALETTE?.card?.purple || "#EAE7FC"};
  border: 1px solid ${({ theme }) => theme?.PALETTE?.primary?.purple?.light || "#9585F2"};
`;

S.GradeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

S.BadgeArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

S.Circle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ $color }) => $color || "#E9E9EE"};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

S.EggImg = styled.img`
  width: 70%;
  height: 70%;
  object-fit: contain;
`;

S.LevelText = styled.p`
  ${h5Bold}
  margin: 0;
  color: ${({ theme }) => theme?.PALETTE?.neutral?.black?.main || "#222"};
`;

S.BarArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

S.BarTrack = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 6px;
  width: 100%;
  height: 14px;
`;

S.BarSegment = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 99px;
  background: ${({ $filled, $color }) => ($filled ? $color : "#E9E9EE")};
  transition: background 160ms ease;
`;

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

// 섹션 제목
S.SectionTitle = styled.h2`
  ${h5Bold}
  margin: 0 0 20px 0;
  color: ${({ theme }) => theme?.PALETTE?.neutral?.black?.main || "#222"};
`;

// 경험치 카드
S.ExpCard = styled(CardBase)``;

S.ExpContent = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

S.PieChartContainer = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  flex-shrink: 0;
`;

S.PieChart = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    ${({ $gradient }) => $gradient || "#E9E9EE"}
  );
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    border-radius: 50%;
    background: #fff;
  }
`;

S.ExpList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

S.ExpItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${h6Medium}
  color: ${({ theme }) => theme?.PALETTE?.neutral?.black?.main || "#222"};

  > span:last-child {
    font-weight: 600;
    color: ${({ theme }) => theme?.PALETTE?.primary?.purple?.main || "#7255EE"};
  }
`;

S.ExpTotal = styled.div`
  ${h6Medium}
  font-weight: 600;
  color: ${({ theme }) => theme?.PALETTE?.neutral?.black?.main || "#222"};
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme?.PALETTE?.neutral?.white?.dark || "#D9D9D9"};
`;

// 타자 카드
S.TypingCard = styled(CardBase)``;

S.TypingContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

S.TypingItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

S.TypingIcon = styled.div`
  font-size: 24px;
  margin-bottom: 4px;
`;

S.TypingValue = styled.div`
  ${h5Bold}
  color: ${({ theme }) => theme?.PALETTE?.neutral?.black?.main || "#222"};
`;

S.TypingLabel = styled.div`
  ${h7Medium}
  color: ${({ theme }) => theme?.PALETTE?.neutral?.black?.secondary || "#4d4d4d"};
`;

// 문제 해결 현황 카드
S.ProblemCard = styled(CardBase)``;

S.ProblemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

S.ProblemHeader = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid ${({ theme }) => theme?.PALETTE?.neutral?.white?.dark || "#D9D9D9"};
  ${h7Medium}
  font-weight: 600;
  color: ${({ theme }) => theme?.PALETTE?.neutral?.black?.secondary || "#4d4d4d"};
`;

S.ProblemHeaderItem = styled.div``;

S.ProblemRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

S.LanguageName = styled.div`
  ${h6Medium}
  font-weight: 600;
  color: ${({ theme }) => theme?.PALETTE?.neutral?.black?.main || "#222"};
`;

S.ProgressBarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme?.PALETTE?.neutral?.white?.dark || "#D9D9D9"};
`;

S.ProgressBarSegment = styled.div`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: ${({ $color }) => $color};
  transition: width 0.3s ease;

  &:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

export default S;
