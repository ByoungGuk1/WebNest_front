import React, { useContext, useEffect, useState } from 'react';
import S from '../style';
import { TypingContext } from 'context/TypingContext';

const RunningTime = () => {
  
  const { state, actions } = useContext(TypingContext)
  const { isTypingStart } = state;
  const { setRunningTime } = actions;

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
  };
  
  useEffect(() => {
    if(isTypingStart){
      setIsRunning(true)
    } else {
      setIsRunning(false)
       
      let finishRunningTime = {
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        millisecond: milliseconds.toString().padStart(2, "0"), 
      }
      setRunningTime(finishRunningTime)
    }
  }, [isTypingStart])


  return (
    <>
      
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
    </>
  );
};

export default RunningTime;