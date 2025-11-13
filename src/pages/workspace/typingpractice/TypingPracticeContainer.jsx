import React from "react";
import S from "./style";

const TypingPracticeContainer = () => {
  return (
    <>
      {/* 상단 옵션 영역 */}
      <S.Option>
        <S.ModeSelect>
          <S.ModeButton>긴 글 연습</S.ModeButton>
        </S.ModeSelect>

        <S.LanguageSelect>
          <S.LanguageToggle>
            한국어 <span>ENG</span>
          </S.LanguageToggle>
        </S.LanguageSelect>
      </S.Option>

      {/* 전체 레이아웃 */}
      <S.TypingAll>
        {/* 왼쪽 내 정보 */}
        <S.MyInfo>
          <S.MyInfoInner>
            <S.SelectTitle>글선택</S.SelectTitle>

            <S.DropdownBox>
              <span>애국가</span>
              <S.Arrow>⌄</S.Arrow>
            </S.DropdownBox>

            <S.MyCharacter>
              <img src="/assets/images/chick.png" alt="캐릭터" />
              <S.CharacterName>만렙코더</S.CharacterName>
            </S.MyCharacter>

            <S.ProgressTitle>현재 진행도</S.ProgressTitle>

            <S.ProgressBox>
              <p>진행 시간 (초)</p>
              <b>05 : 02</b>
              <S.Bar className="blue" />
            </S.ProgressBox>

            <S.ProgressBox>
              <p>타수 (타/분)</p>
              <b>208</b>
              <S.Bar className="blue" />
            </S.ProgressBox>

            <S.ProgressBox>
              <p>정확도 (%)</p>
              <b>100.00</b>
              <S.Bar className="red" />
            </S.ProgressBox>
          </S.MyInfoInner>
        </S.MyInfo>

        {/* 오른쪽 타이핑 영역 */}
        <S.TypingSection>
          <S.SectionTitle>콘솔 2</S.SectionTitle>

          <S.InputBox />

          <S.SentenceList>
            <li>만약 금히 서두르려면 돌아가는 길로 가라.</li>
            <li>만약 금히 서두르려면 돌아가는 길로 가라.</li>
            <li>만약 금히 서두르려면 돌아가는 길로 가라.</li>
            <li>만약 금히 서두르려면 돌아가는 길로 가라.</li>
            <li>만약 금히 서두르려면 돌아가는 길로 가라.</li>
            <li>만약 금히 서두르려면 돌아가는 길로 가라.</li>
          </S.SentenceList>
        </S.TypingSection>
      </S.TypingAll>

      {/* 오른쪽 아래 버튼 */}
      <S.StopPracticeButton>타자연습 그만하기</S.StopPracticeButton>
    </>
  );
};

export default TypingPracticeContainer;
