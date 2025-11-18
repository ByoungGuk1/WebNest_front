import React, { useContext } from 'react';
import S from '../style';
import { TypingContext } from 'context/TypingContext';

const RunningAccuracy = () => {
  const { state } = useContext(TypingContext);
  const { totalTypedCount, correctTypedCount } = state;

  const accuracyValue =
    totalTypedCount > 0 
      ? ((correctTypedCount / totalTypedCount) * 100).toFixed(1)
      : 100;

  return (
    <S.ProgressBox>
      <S.ProgressTime>
        <span>정확도 (%)</span>
        <span className="value">{accuracyValue}</span>
      </S.ProgressTime>

      <S.Bar
      />
    </S.ProgressBox>
  );
};

export default RunningAccuracy;
