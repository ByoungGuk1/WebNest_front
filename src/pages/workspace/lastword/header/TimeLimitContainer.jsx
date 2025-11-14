import React from "react";
import S from "../style";

const TimeLimitContainer = () => {
  return (
    <S.TimeLimitSection>
      <S.TimeLimitLabel>
        <span>남은 입력 시간</span>
      </S.TimeLimitLabel>
      <S.TimeLimitBar test={68} />
      {/* 남은 시간을 프롭스로 넘기기 단위는 % */}
    </S.TimeLimitSection>
  );
};

export default TimeLimitContainer;
