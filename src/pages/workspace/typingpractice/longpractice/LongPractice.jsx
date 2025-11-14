import React, { useState } from 'react';
import S from "./style";
const LongPractice = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <S.TypingSection>
        <S.P>
          <div>만약 금히 서두르려면 돌아가는 길로 가라.</div>
        </S.P>
        <S.SectionTitle>콘솔 444</S.SectionTitle>

        <S.InputBox
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />


        <S.SentenceList>
          <div>만약 금히 서두르려면 돌아가는 길로 가라.</div>
          <div>만약 금히 서두르려면 돌아가는 길로 가라.</div>
          <div>만약 금히 서두르려면 돌아가는 길로 가라.</div>
          <div>만약 금히 서두르려면 돌아가는 길로 가라.</div>
          <div>만약 금히 서두르려면 돌아가는 길로 가라.</div>
          {/* <div>만약 금히 서두르려면 돌아가는 길로 가라.</div> */}
        </S.SentenceList>
      </S.TypingSection>
    </>
  );
};

export default LongPractice;