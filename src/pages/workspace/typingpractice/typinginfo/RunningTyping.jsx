import React, { useContext } from 'react';
import S from '../style';
import { TypingContext } from 'context/TypingContext';

const RunningTyping = () => {

  const { state, actions } = useContext(TypingContext)
  const { runningTime, wordCount } = state;
  const { minutes } = runningTime

  console.log(Number(wordCount) / (Number(minutes) || 1))

  return (
    <S.ProgressBox>
      <S.ProgressTime>
        <span>타수 (타/분)</span>
        <span>{Number(wordCount) / (Number(minutes) || 1)}</span>
      </S.ProgressTime>
      <S.Bar />
    </S.ProgressBox>
  );
};

export default RunningTyping;