// QiuzDropDown.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useDropDown from '../../../hooks/useDropDown';
import S from './style';

const QiuzDropDown = () => {
    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const solveParam = params.get('quizPersonalIsSolve');
        if(solveParam === '1') setSelectIsSolve('해결');
        else if(solveParam === '0') setSelectIsSolve('미해결');
        else setSelectIsSolve(null);

        let paramReplace = false;
        if( params.has('solve')) { params.delete('solve'); paramReplace = true; }
        if( params.has('quizPersonalSolve')) { params.delete('quizPersonalSolve')}

        if(paramReplace){

            const next = new URLSearchParams();
            if(params.get('quizLanguage')) next.set('quizLanguage', params.get('quizLanguage'));
            if(params.get('quizDifficult')) next.set('quizDifficult',params.get('quizDifficult'));    
            if(params.get('quizPersonalIsSolve')) next.set('quizPersonalIsSolve',params.get('quizPersonalIsSolve'));    
            if(params.get('quiz')) next.set('',params.get(''));
            next.set('page', '1');

        }
    }, [])
    const navigate = useNavigate();
    const location = useLocation();

    const [wordOpen, wordRef, wordHandler] = useDropDown();
    const [langOpen, langRef, langHandler] = useDropDown();
    const [levelOpen, levelRef, levelHandler] = useDropDown();
    const [isClearOpen, isClearRef, isClearHandler] = useDropDown();

    // 로컬 표시 상태 (UI)
    const [selectLang, setSelectLang] = useState(null);
    const [selectDifficult, setSelectDifficult] = useState(null);
    const [selectIsSolve, setSelectIsSolve] = useState(null);
    const [selectKeyword, setSelectKeyword] = useState(null);

    const buildAndNavigate = (overrides = {}) => {

        const params = new URLSearchParams();

        const lang = overrides.quizLanguage != undefined ? overrides.quizLanguage : selectLang;
        const diff = overrides.quizDifficult != undefined ? overrides.quizDifficult : selectDifficult;

        const solve = overrides.quizPersonalIsSolve != undefined
            ? overrides.quizPersonalIsSolve
            : (selectIsSolve === "해결" ? "1" : selectIsSolve === "미해결" ? "0" : undefined);

        const keyword = overrides.keyword != undefined ? overrides.keyword : selectKeyword;
        // const page = overrides.page ?? "1";


        if (lang) params.set('quizLanguage', String(lang));
        if (diff) params.set('quizDifficult', String(diff));

        if (solve === '0' || solve === '1') params.set('quizPersonalIsSolve', String(solve));
        if (keyword) params.set('keyword', keyword);

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
            case 'IsSolve': {
                const next = selectIsSolve === value ? null : value;
                setSelectIsSolve(next);
                const solveParam = next === "해결" ? "1" : next === "미해결" ? "0" : undefined;
                buildAndNavigate({ quizPersonalIsSolve: solveParam, page: 1 });
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
        setSelectIsSolve(null);
        setSelectKeyword(null);
        // URL에서도 삭제
        buildAndNavigate({ quizLanguage: null, quizDifficult: null, quizPersonalIsSolve: null, keyword: null, page: 1 });
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
                <S.DropDownButton onClick={isClearHandler} select={!!selectIsSolve}>
                    {selectIsSolve || '해결여부'}
                    <S.DropDownIconWrap><S.DropDownIcon /></S.DropDownIconWrap>
                </S.DropDownButton>
                <S.DropDownMenuWrap isDropped={isClearOpen}>
                    <S.DropDownMenu onClick={() => handleSelect('IsSolve', '미해결')}>미해결</S.DropDownMenu>
                    <S.DropDownMenu onClick={() => handleSelect('IsSolve', '해결')}>해결</S.DropDownMenu>
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
