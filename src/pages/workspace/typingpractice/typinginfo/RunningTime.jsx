import React, { useContext, useEffect, useState } from 'react';
import S from '../style';
import { TypingContext } from 'context/TypingContext';

const RunningTime = () => {
  
  const { state, actions } = useContext(TypingContext)
  const { isTypingStart, runningTime } = state;
  const { setRunningTime } = actions;
  const [time, setTime] = useState(0);
  const totalSeconds = time / 100;   

  useEffect(() => {
    let intervalId;
    if (isTypingStart) {
      intervalId = setInterval(() => setTime(prev => prev + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isTypingStart]);

  useEffect(() => {
    if (isTypingStart) {
      setRunningTime({ totalSeconds });
    }
  }, [time]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  useEffect(() => {
    if (!isTypingStart && runningTime.totalSeconds === 0) {
      setTime(0);
    }
  }, [isTypingStart, runningTime.totalSeconds]);

  return (
    <S.ProgressBox>
      <S.ProgressTime>
        <span>진행 시간 (초)</span>
        <span>
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
          {milliseconds.toString().padStart(2, "0")}
        </span>
      </S.ProgressTime>
      {/* <S.Bar className="blue" /> */}
    </S.ProgressBox>
  );
};

export default RunningTime;
