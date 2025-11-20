import React, { useContext } from 'react';
import S from '../style';
import { TypingContext } from 'context/TypingContext';
import Bar from './Bar';

const RunningAccuracy = () => {
  const { state } = useContext(TypingContext);
  const { totalTypedCount, correctTypedCount } = state;

  const accuracyValue =
    totalTypedCount > 0 
      ? ((correctTypedCount / totalTypedCount) * 100).toFixed(1)
      : 0;

   //  percent 계산 (0~100 그대로 사용)
  const percent = Math.min(Number(accuracyValue), 100);
  return (
    <S.ProgressBox>
      <S.ProgressTime>
        <span>정확도 (%)</span>
        <span className="value">{accuracyValue}</span>
      </S.ProgressTime>

      {/* <S.Bar/> */}
      <Bar percent={percent} color="blue" />
    </S.ProgressBox>
  );
};

export default RunningAccuracy;
