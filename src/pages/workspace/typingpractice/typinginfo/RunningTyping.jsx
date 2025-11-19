import React, { useContext, useMemo } from 'react';
import S from '../style';
import { TypingContext } from 'context/TypingContext';
// import Bar from './Bar';

const RunningTyping = () => {
  const { state } = useContext(TypingContext);
  const { runningTime, wordCount } = state;

  const totalSeconds = Number(runningTime?.totalSeconds ?? 0);
  const wc = Number(wordCount ?? 0);

  const wpmNumber = totalSeconds > 0 ? (wc / totalSeconds) * 60 : 0;
  const wpm = wpmNumber.toFixed(1);

  const MAX_WPM = 500;
  // const percent = useMemo(() => Math.min(Math.floor((wpmNumber / MAX_WPM) * 100), 100), [wpmNumber]);
  
  return (
    <S.ProgressBox>
      <S.ProgressTime>
        <span>타수 (타/분)</span>
        <span>{wpm}</span>
      </S.ProgressTime>

      {/* <Bar percent={percent} color="blue" /> */}
    </S.ProgressBox>
  );
};

export default RunningTyping;
