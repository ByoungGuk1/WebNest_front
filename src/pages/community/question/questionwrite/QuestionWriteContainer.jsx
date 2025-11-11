import React from "react";
import S from "./style";

const   QuestionWriteContainer = () => {
  return (
    <>
    
       {/* 🟣 상단 배너 */}
      <S.PurpleBannerWrap>
        <S.PurpleBanner>
          <S.PurpleBannerInner>
            <div>
              <S.PurplePageTitle>문제 둥지</S.PurplePageTitle>
              <S.PurplePageDesc>
                모르는 문제를 함께 올리고 답변을 받아보세요.
              </S.PurplePageDesc>
            </div>
            <S.PurpleIllust src="/assets/images/chickens.png" alt="문제둥지 일러스트" />
          </S.PurpleBannerInner>
        </S.PurpleBanner>
      </S.PurpleBannerWrap>

      {/* 🟢 답변 작성 영역 */}
      <S.Container>
        <S.ResponseCard>
          {/* 🧑‍💻 프로필 & 안내 */}
          <S.InfoAndWrite>
            <S.ResponseBanner>
              <S.ProfileImg src="/assets/images/defalutpro.svg" alt="프로필" />
              <S.ResponserInfo>
                <div>뚜왈밍3냥님,</div>
                <div>정보를 공유해 주세요.</div>
              </S.ResponserInfo>
            </S.ResponseBanner>
            
              {/* 버튼 */}
            <S.ButtonWrap>
              답변등록
            </S.ButtonWrap>
          </S.InfoAndWrite>
          

          {/* {} 코드 입력칸 */}
          <S.CodeBox>
            <S.CodeImg>
              <img src="/assets/icons/code.svg" alt="{}" />
            </S.CodeImg> 
            <S.SorceCode>
              소스코드
            </S.SorceCode>
          </S.CodeBox>

          {/* 안내문 포함 답변 입력란 */}
          <S.InputResponse
            placeholder={`답변 작성 시 서비스 운영정책을 지켜주세요.\n이상한 말 쓰지 말고 제대로 작성하세요. 매너 지켜요.\n욕 안돼요. 못한다고 잔소리 안됩니다.`}
          />

          
        </S.ResponseCard>
      </S.Container>
    </>
    
  );
};

export default QuestionWriteContainer;
