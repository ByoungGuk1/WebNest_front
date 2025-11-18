import React, { useContext } from 'react';
import S from '../style';
import { TypingContext } from 'context/TypingContext';
import Bar from './Bar';

const RunningTyping = () => {
  const { state } = useContext(TypingContext);
  const { runningTime, wordCount } = state;

  const totalSeconds = Number(runningTime?.totalSeconds ?? 0);
  const wc = Number(wordCount ?? 0);

  const wpmNumber = totalSeconds > 0 ? (wc / totalSeconds) * 60 : 0;
  const wpm = wpmNumber.toFixed(1);

  const MAX_WPM = 500;

  // percent를 정수로 고정 (미세한 변동 방지)
  const percent = Math.min(
    Math.floor((wpmNumber / MAX_WPM) * 100),
    100
  );

  return (
    <S.ProgressBox>
      <S.ProgressTime>
        <span>타수 (타/분)</span>
        <span>{wpm}</span>
      </S.ProgressTime>

      {/* Bar 컴포넌트 */}
      <Bar percent={percent} color="blue" />
    </S.ProgressBox>
  );
};

export default RunningTyping;
