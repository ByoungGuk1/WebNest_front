import React, { useContext, useEffect, useState } from 'react';
import S from '../style';
import { TypingContext } from 'context/TypingContext';

const RunningTime = () => {
  
  const { state, actions } = useContext(TypingContext)
  const { isTypingStart, runningTime } = state;
  const { setRunningTime } = actions;

  // const [time, setTime] = useState(0);

  const [time, setTime] = useState(0); // 이거는 내부 카운터만
  const totalSeconds = time / 100;   

  useEffect(() => {
    let intervalId;
    if (isTypingStart) {
      intervalId = setInterval(() => setTime(prev => prev + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isTypingStart]);

  // runningTime 업데이트
  useEffect(() => {
    if (isTypingStart) {
      setRunningTime({ totalSeconds });
    }
  }, [time]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  //  resetTyping 시 Context에서 runningTime 초기화 → time도 초기화
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
      <S.Bar className="blue" />
    </S.ProgressBox>
  );
};

export default RunningTime;
