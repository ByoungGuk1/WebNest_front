// QiuzDropDown.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useDropDown from '../../../hooks/useDropDown';
import S from './style';

const QiuzDropDown = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [wordOpen, wordRef, wordHandler] = useDropDown();
    const [langOpen, langRef, langHandler] = useDropDown();
    const [levelOpen, levelRef, levelHandler] = useDropDown();
    const [isClearOpen, isClearRef, isClearHandler] = useDropDown();

    // 로컬 표시 상태 (UI)
    const [selectLang, setSelectLang] = useState(null);
    const [selectDifficult, setSelectDifficult] = useState(null);
    const [selectIsClear, setSelectIsClear] = useState(null);
    const [selectKeyword, setSelectKeyword] = useState(null);

    // location.search 기반 기존 쿼리 유지/수정 함수
    const buildAndNavigate = (overrides = {}) => {
        const params = new URLSearchParams(location.search);
        // 현재 UI 값 또는 overrides 우선 적용
        const lang = overrides.quizLanguage ?? selectLang;
        const diff = overrides.quizDifficult ?? selectDifficult;
        const solve = overrides.solve ?? selectIsClear;
        const keyword = overrides.keyword ?? selectKeyword;
        // const page = overrides.page ?? "1";
        

        if (lang) params.set('quizLanguage', lang); else params.delete('quizLanguage');
        if (diff) params.set('quizDifficult', diff); else params.delete('quizDifficult');
        if (solve) params.set('solve', solve); else params.delete('solve');
        if (keyword) params.set('keyword', keyword); else params.delete('keyword');

        // params.set('page', String(page)); // 항상 page 유지 혹은 리셋
        navigate({ pathname: '/quiz', search: `?${params.toString()}` });
    };

    // 선택 핸들러: 로컬 state 업데이트 + URL 즉시 반영 (overrides 사용)
    const handleSelect = (type, value) => {
        switch (type) {
            case 'Lang': {
                const next = selectLang === value ? null : value;
                setSelectLang(next);
                buildAndNavigate({ quizLanguage: next, page: 1 });
                break;
            }
            case 'Defficult': {
                const next = selectDifficult === value ? null : value;
                setSelectDifficult(next);
                buildAndNavigate({ quizDifficult: next, page: 1 });
                break;
            }
            case 'IsClear': {
                const next = selectIsClear === value ? null : value;
                setSelectIsClear(next);
                buildAndNavigate({ solve: next, page: 1 });
                break;
            }
            case 'Keyword': {
                const next = selectKeyword === value ? null : value;
                setSelectKeyword(next);
                buildAndNavigate({ keyword: next, page: 1 });
                break;
            }
            default:
                break;
        }
    };

    const refreshToggle = () => {
        setSelectLang(null);
        setSelectDifficult(null);
        setSelectIsClear(null);
        setSelectKeyword(null);
        // URL에서도 삭제
        buildAndNavigate({ quizLanguage: null, quizDifficult: null, solve: null, keyword: null, page: 1 });
    };

    return (
        <S.DropContainer>
            <S.ButtonWrap ref={langRef}>
                <S.DropDownButton onClick={langHandler} select={!!selectLang}>
                    {selectLang || '언어'}
                    <S.DropDownIconWrap><S.DropDownIcon /></S.DropDownIconWrap>
                </S.DropDownButton>
                <S.DropDownMenuWrap isDropped={langOpen}>
                    <S.DropDownMenu onClick={() => handleSelect('Lang', 'JAVA')}>JAVA</S.DropDownMenu>
                    <S.DropDownMenu onClick={() => handleSelect('Lang', 'JS')}>JS</S.DropDownMenu>
                    <S.DropDownMenu onClick={() => handleSelect('Lang', 'ORACLE')}>ORACLE</S.DropDownMenu>
                </S.DropDownMenuWrap>
            </S.ButtonWrap>

            <S.ButtonWrap ref={levelRef}>
                <S.DropDownButton onClick={levelHandler} select={!!selectDifficult}>
                    {selectDifficult || '난이도'}
                    <S.DropDownIconWrap><S.DropDownIcon /></S.DropDownIconWrap>
                </S.DropDownButton>
                <S.DropDownMenuWrap isDropped={levelOpen}>
                    <S.DropDownMenu onClick={() => handleSelect('Defficult', '초급')}>초급</S.DropDownMenu>
                    <S.DropDownMenu onClick={() => handleSelect('Defficult', '중급')}>중급</S.DropDownMenu>
                    <S.DropDownMenu onClick={() => handleSelect('Defficult', '중상급')}>중상급</S.DropDownMenu>
                    <S.DropDownMenu onClick={() => handleSelect('Defficult', '상급')}>상급</S.DropDownMenu>
                    <S.DropDownMenu onClick={() => handleSelect('Defficult', '최상급')}>최상급</S.DropDownMenu>
                </S.DropDownMenuWrap>
            </S.ButtonWrap>

            <S.ButtonWrap ref={isClearRef}>
                <S.DropDownButton onClick={isClearHandler} select={!!selectIsClear}>
                    {selectIsClear || '해결여부'}
                    <S.DropDownIconWrap><S.DropDownIcon /></S.DropDownIconWrap>
                </S.DropDownButton>
                <S.DropDownMenuWrap isDropped={isClearOpen}>
                    <S.DropDownMenu onClick={() => handleSelect('IsClear', '미해결')}>미해결</S.DropDownMenu>
                    <S.DropDownMenu onClick={() => handleSelect('IsClear', '해결')}>해결</S.DropDownMenu>
                </S.DropDownMenuWrap>
            </S.ButtonWrap>

            <S.ButtonWrap ref={wordRef}>
                <S.DropDownButton onClick={wordHandler} select={!!selectKeyword}>
                    {selectKeyword || '키워드'}
                    <S.DropDownIconWrap><S.DropDownIcon /></S.DropDownIconWrap>
                </S.DropDownButton>
                <S.DropDownMenuWrap isDropped={wordOpen}>
                    <S.DropDownMenu onClick={() => handleSelect('Keyword', '반복문')}>반복문</S.DropDownMenu>
                    <S.DropDownMenu onClick={() => handleSelect('Keyword', '배열')}>배열</S.DropDownMenu>
                    <S.DropDownMenu onClick={() => handleSelect('Keyword', '조건식')}>조건식</S.DropDownMenu>
                    <S.DropDownMenu onClick={() => handleSelect('Keyword', '함수')}>함수</S.DropDownMenu>
                </S.DropDownMenuWrap>
            </S.ButtonWrap>

            <S.DropDownRefreshWrap onClick={refreshToggle}>
                <img src="/assets/icons/refresh.svg" alt="토글 전체선택해제" />
                <S.DropDownRefreshText>전체 선택해제</S.DropDownRefreshText>
            </S.DropDownRefreshWrap>
        </S.DropContainer>
    );
};

export default QiuzDropDown;
