import React from 'react';
import S from './style';

const LevelOne = () => {
    return (
        <S.LevelBadge1>
            <S.LevelIcon src="/assets/images/grade/grade1.png" alt="레벨 아이콘" />
            <span>Lv 1</span>
        </S.LevelBadge1>
    );
};

export default LevelOne;