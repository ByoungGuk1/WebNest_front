import React from 'react';
import { Link } from 'react-router-dom';
import S from './footerStyle';

const Footer = () => {
  return (
    <S.FooterWrap>
      <S.FooterInner>
        {/* 왼쪽: 링크 컬럼들 */}
        <S.LeftWrap>
          <S.FooterCol>
            <p>Link</p>
            <p>고객 지원</p>
            <p>소셜 & 팀 정보</p>
          </S.FooterCol>
          <S.FooterCol>
            <span>문제풀기</span>
            <span>문의하기</span>
            <span>GitHub</span>
          </S.FooterCol>
          <S.FooterCol>
            <span>워크스페이스</span>
            <span>FAQ</span>
            <span>Figma</span>
          </S.FooterCol>
          <S.FooterCol>
            <span>커뮤니티</span>
            <span>버그신고</span>
            <span>팀소개</span>
          </S.FooterCol>
          <S.FooterCol>
            <span>마이페이지</span>
            <span>사용 가이드</span>
            <span>개발자 소개</span>
          </S.FooterCol>
        </S.LeftWrap>
        {/* 오른쪽: 로고 */}
        <S.RightWrap>
          <S.RightText >
            <p>
              알에서 깨어나 세상을 나는 개발자로 거듭나세요 !
            </p>
            <div>
              <span className='logo'>WebNest</span><span>가 도와드릴게요</span>
            </div>
          </S.RightText>
          <S.LogoWrapper>
            <S.WebNestLogo>
              <S.WebNestWeb className='blue'>Web</S.WebNestWeb>
              <S.WebNestNest className='green'>Nest</S.WebNestNest>
            </S.WebNestLogo>
            <img src="/assets/images/header/logo.png" alt="WebNest Logo" />
          </S.LogoWrapper>
        </S.RightWrap>
      </S.FooterInner>
    </S.FooterWrap>
  );
};

export default Footer;
