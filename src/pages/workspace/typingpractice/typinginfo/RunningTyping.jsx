import React, { useContext } from 'react';
import S from '../style';
import { TypingContext } from 'context/TypingContext';
import Bar from './Bar';

const RunningTyping = () => {
  const { state } = useContext(TypingContext);
  const { runningTime, wordCount } = state;

  // 안전 처리 (초기 값 undefined 방지)
  const totalSeconds = Number(runningTime?.totalSeconds ?? 0);
  const wc = Number(wordCount ?? 0);

  const wpm = totalSeconds > 0
    ? ((wc / totalSeconds) * 60).toFixed(1)
    : 0;

   //  최대 타수 기준 바 width 계산
  const MAX_WPM = 500; 
  const percent = Math.min((wpm / MAX_WPM) * 100, 100); 

  return (
    <S.ProgressBox>
      <S.ProgressTime>
        <span>타수 (타/분)</span>
        <span>{wpm}</span>
      </S.ProgressTime>
      {/* <S.Bar /> */}
      <Bar percent={percent} color="blue" />
    </S.ProgressBox>
  );
};

export default RunningTyping;
