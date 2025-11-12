import { h6Bold, h6Light, h6Medium, h8Medium } from "styles/common";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";


const S = {};

/* ⚪ 인기 질문 Swiper 전체 틀 */
S.Container = styled.div`
  position: relative;
  width: 1160px;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

/* 좌우 화살표 버튼 */
S.ArrowBtn = styled.button`
  position: absolute;
  top: calc(50% + 23px);
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    transform: translateY(-55%);
  }

  img {
    width: 11px;
    height: 18px;
    display: block;
  }

  &.left {
    left: -75px;
  }

  &.right {
    right: -75px;
  }
`;

/* 인기글 카드 Swiper */
S.PopularWrap = styled.div`
  position: relative;
  display: flex;
  margin-top: 46px;
  gap: 12px;
  flex-wrap: nowrap;
  width: 1160px;
  overflow: hidden;

  .swiper {
    width: 100%;
    overflow: visible;
  }

  .swiper-wrapper {
    display: flex !important;
    flex-direction: row !important;
    align-items: stretch;
  }

  .swiper-slide {
    height: auto !important;
    display: flex;
    justify-content: center;
  }

  .swiper-button-prev,
  .swiper-button-next {
    display: none !important;
  }
`;

/* 카드 */
S.PopularCard = styled.div`
  width: 308px;
  height: 198px;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.secondary};
  border: 1px solid ${({ theme }) => `${theme.PALETTE.neutral.black.main}14`};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

/* 카드 제목 */
S.PopularTitle = styled.div`
  ${h6Bold}
  width: 266px;
  height: 38px;
  margin: 21px 21px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 42px);
`;

/* 카드 내용 */
S.PopularPreview = styled.div`
  ${h6Light}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  width: 266px;
  height: 96px;
  margin: 0 21px 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

S.Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 21px 12px;
`;

S.MetaWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  ${h8Medium}

  b {
    font-weight: normal;
    color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
  }
`;

S.ProfileImg = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #f5f5f5;
`;

S.Response = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  ${h8Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};

  img {
    width: 13px;
    height: 13px;
  }
`;

/* 오른쪽 그라데이션 */
S.GradientRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 120px;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(
    to left,
    white 20%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 5;
`;

S.Link = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
  display: block;
`;


export default S;