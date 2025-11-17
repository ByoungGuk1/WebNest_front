import React from 'react';
import S from '../style';

const RunningAccuracy = () => {
  return (
    <S.ProgressBox>
      <S.ProgressTime>
        <span>정확도 (%)</span>

      </S.ProgressTime>
      {/* <S.Bar className="red" /> */}
      <S.Bar />
    </S.ProgressBox>
  );
};

export default RunningAccuracy;