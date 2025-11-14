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
            <span>아이템1</span>
            <span>아이템1</span>
            <span>아이템1</span>
          </S.FooterCol>
          <S.FooterCol>
            <span>아이템1</span>
            <span>아이템1</span>
            <span>아이템1</span>
          </S.FooterCol>
          <S.FooterCol>
            <span>아이템1</span>
            <span>아이템1</span>
            <span>아이템1</span>
          </S.FooterCol>
          <S.FooterCol>
            <span>아이템1</span>
            <span>아이템1</span>
            <span>아이템1</span>
          </S.FooterCol>
        </S.LeftWrap>
        {/* 오른쪽: 로고 */}
        <S.RightWrap>
          <div>
            <p>
              알에서 깨어나 세상을 나는 개발자로 거듭나세요 !
            </p>
            <span>Web Nest</span><span>가 도와드릴게요🐣</span>
          </div>
          <S.LogoWrapper>
            <S.WebNestLogo>
              <S.WebNestWeb>Web</S.WebNestWeb>
              <S.WebNestNest>Nest</S.WebNestNest>
            </S.WebNestLogo>
            <img src="/assets/images/header/logo.png" alt="WebNest Logo" />
          </S.LogoWrapper>
        </S.RightWrap>
      </S.FooterInner>
    </S.FooterWrap>
  );
};

export default Footer;
