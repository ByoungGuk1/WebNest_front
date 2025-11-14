import styled from 'styled-components';
import { h5Medium, h6Medium } from '../../../styles/common';

const S = {};

// Footer 전체 래퍼
S.FooterWrap = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid black;
`;

// Footer 내부 컨테이너 (1160px, 12컬럼 그리드 기준)
// 그리드: 1160px 전체 너비
// 플렉스박스로 1160px 내부에 모든 요소 배치
S.FooterInner = styled.div`
  width: 1160px;
  max-width: 100%;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 40px;

`;

// 왼쪽: 링크 섹션 (4개 컬럼, 그리드에 맞춤)
// 양옆 간격 40px, 컬럼끼리 align-items: center
S.LinksSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: center;
  flex: 0 1 auto;
  min-width: 0;


`;

// 각 링크 컬럼 (그리드에 맞춤, 260px 기준)
// 컬럼 헤더와 링크 리스트가 세로로 정렬되어 있음
S.LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex: 0 0 260px;
  width: 260px;
  min-width: 260px;

  @media (max-width: 1200px) {
    flex: 0 0 auto;
    width: auto;
    min-width: 200px;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    flex: 1 1 100%;
  }
`;

// 컬럼 헤더
S.ColumnHeader = styled.h3`
  ${h6Medium}
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  margin: 0;
  padding: 0;
`;

// 링크 리스트
S.LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 링크 아이템
S.LinkItem = styled.li`
  ${h6Medium}
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  
  a {
    color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.PALETTE.primary.purple.main};
    }
  }
`;


// Web Nest 강조 텍스트
S.WebNestHighlight = styled.strong`
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

// 오른쪽: 로고 래퍼 (로고 영역)
S.LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex: 1;
  max-width: 400px;
`;

// WebNest 로고 텍스트 (헤더와 동일한 폰트)
S.WebNestLogo = styled.div`
  display: flex;
  flex-direction: row;
`;

S.WebNestWeb = styled.span`
  font-family: 'RomanticGumi';
  font-size: ${({ theme }) => theme.FONT_SIZE.h3};
  color: ${({ theme }) => theme.PALETTE.primary.blue.main || '#1976D2'};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;

S.WebNestNest = styled.span`
  font-family: 'RomanticGumi';
  font-size: ${({ theme }) => theme.FONT_SIZE.h3};
  color: ${({ theme }) => theme.PALETTE.primary.green.main || '#2E7D32'};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;

// 로고 이미지
S.LogoImage = styled.img`
  width: auto;
  height: 80px;
  object-fit: contain;
`;
S.LeftWrap= styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`
S.FooterCol =styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`
S.RightWrap = styled.div`
  display: flex;
  width: 560px;
  flex-direction: row;
  justify-content: space-between;
`
export default S;

