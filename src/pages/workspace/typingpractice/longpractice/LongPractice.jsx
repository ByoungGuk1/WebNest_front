import React, { useState } from 'react';
import S from "./style";
const LongPractice = () => {
  const targetText = "콘솔 444";        // 비교할 문장
  const [inputValue, setInputValue] = useState("");

  //글자 단위 렌더링
  const renderTitle = () => {
    return targetText.split("").map((char, index) => {
      const typedChar = inputValue[index];
      let color = "white"; // 기본

      if (typedChar !== undefined) {
        if (typedChar === char) {
          color = "black"; //  일치
        } else {
          color = "red";   // 틀림
        }
      }

      return (
        <span key={index} style={{ color: color }}>
          {char}
        </span>
      );
    });
  };


  return (
    <>
      <S.TypingSection>
        <S.P>
          <div>만약 금히 서두르려면 돌아가는 길로 가라.</div>
          <div>만약 금히 서두르려면 돌아가는 길로 가라.</div>
        </S.P>
        {/* <S.SectionTitle>콘솔 444</S.SectionTitle> */}
        {/*글자 단위 색 적용 */}
        <S.SectionTitle>
          {renderTitle()}
        </S.SectionTitle>

        <S.InputWrapper>
          <img src="/assets/icons/pencil.svg" alt="edit" />
          <S.InputBox
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </S.InputWrapper>


        <S.SentenceList>
          <div>만약 금히 서두르려면 돌아가는 길로 가라.</div>
          {/* <div></div> */}
          <div>만약 금히 서두르려면 돌아가는 길로 가라.</div>
          {/* <div></div> */}
          <div>만약 금히 서두르려면 돌아가는 길로 가라.</div>
          {/* <div></div> */}
          <div>만약 금히 서두르려면 돌아가는 길로 가라.</div>
          {/* <div></div> */}
          {/* <div>만약 금히 서두르려면 돌아가는 길로 가라.</div> */}
          {/* <div></div> */}
          {/* <div>만약 금히 서두르려면 돌아가는 길로 가라.</div> */}
        </S.SentenceList>
      </S.TypingSection>
    </>
  );
};

export default LongPractice;