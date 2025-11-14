import React, { useState } from "react";
import S from "./style";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const TypingPracticeContainer = () => {
  const [lang, setLang] = useState("ko");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("애국가");
  const navigate = useNavigate();
  // const [inputValue, setInputValue] = useState("");
  //
  const location = useLocation();

  // 현재 경로가 long이면 긴글연습 active
  const isLong = location.pathname.includes("long");

    // 버튼 active는 반대로 들어감
  const isShortActive = isLong;   // 긴글 UI → 짧은글 버튼 파랑
  const isLongActive = !isLong;   // 기본 화면 → 긴글 버튼 초록

  return (
    <>
    <S.Main>
       {/* 상단 옵션 영역 */}
      <S.Option>
        <S.ModeSelect>

          {/* /typing → 긴 글 연습 버튼만 표시 */}
          {!isLong && (
            <S.ModeButton
              $active={true}           // 초록
              onClick={() => navigate("long")}
            >
              긴 글 연습
            </S.ModeButton>
          )}

          {/* /typing/long → 짧은 글 연습 버튼만 표시 */}
          {isLong && (
            <S.ModeButton
              $active={false}          // 파랑
              onClick={() => navigate("")}
            >
              짧은 글 연습
            </S.ModeButton>
          )}


        </S.ModeSelect>

        <S.LanguageSelect>
          <S.ToggleWrapper 
            onClick={() => setLang(lang === "ko" ? "en" : "ko")} 
            $lang={lang}
          >
            <S.ToggleButton 
              $lang={lang} 
              $mode={isLong ? "long" : "short"} 
            />

            <span className="ko">한국어</span>
            <span className="en">ENG</span>
          </S.ToggleWrapper>
        </S.LanguageSelect>
      </S.Option>

      {/* 전체 레이아웃 */}
      <S.TypingAll>
        {/* 왼쪽 내 정보 */}
        <S.MyInfo>
          <S.MyInfoInner>
            <S.SelectTitle>글선택</S.SelectTitle>

            {/* 🔽 선택된 값 표시 영역 */}
            <S.DropdownBox onClick={() => setIsOpen(!isOpen)}>
              <span>{selected}</span>
              <S.Arrow><img src="/assets/images/downarrow.svg" alt="화살표" /></S.Arrow>
            </S.DropdownBox>

            {/* 🔽 드롭다운 옵션 리스트 */}
            {isOpen && (
              <S.DropdownMenu>
                {["애국가 1절", "애국가 2절", "애국가 3절", "애국가 4절", "애국가 5절"].map((item) => (
                  <S.DropdownItem
                    key={item}
                    onClick={() => {
                      setSelected(item);
                      setIsOpen(false);
                    }}
                  >
                    {item}
                  </S.DropdownItem>
                ))}
              </S.DropdownMenu>
            )}
{/* 
            <S.ModeOption>짧은 글 연습</S.ModeOption> */}
            <S.ModeOption>
              {isLong ? "긴 글 연습" : "짧은 글 연습"}
            </S.ModeOption>

            <S.MyCharacter>
              <img src="/assets/images/chicken.png" alt="캐릭터" />
              <S.CharacterName>만렙코더</S.CharacterName>
            </S.MyCharacter>

            <S.ProgressTitle>현재 진행도</S.ProgressTitle>

            <S.ProgressBox>
              <S.ProgressTime>
                <span>진행 시간 (초)</span>
                <span>05 : 02</span>
              </S.ProgressTime>
              <S.Bar className="blue" />
            </S.ProgressBox>

            <S.ProgressBox>
              <S.ProgressTime>
                <span>타수 (타/분)</span>
                <span>208</span>
              </S.ProgressTime>
              <S.Bar className="blue" />
            </S.ProgressBox>

            <S.ProgressBox>
              <S.ProgressTime>
                <span>정확도 (%)</span>
                <span>100.00</span>
              </S.ProgressTime>
              <S.Bar className="red" />
            </S.ProgressBox>
          </S.MyInfoInner>
        </S.MyInfo>

        <Outlet />

      
      </S.TypingAll>

      {/* 오른쪽 아래 버튼 */}
      <S.StopPracticeButton onClick={() => navigate("/workspace/rooms")}>
        타자연습<br />그만하기
      </S.StopPracticeButton>

    </S.Main>
     
    </>
  );
};

export default TypingPracticeContainer;
