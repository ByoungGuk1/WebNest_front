// QiuzDropDown.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useDropDown from '../../../hooks/useDropDown';
import S from './style';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

const QiuzDropDown = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [wordOpen, wordRef, wordHandler, wordClose] = useDropDown();
    const [langOpen, langRef, langHandler, langClose] = useDropDown();
    const [levelOpen, levelRef, levelHandler, levelClose] = useDropDown();
    const [isClearOpen, isClearRef, isClearHandler, isClearClose] = useDropDown();

    const closeAll = () => {
        wordClose();
        langClose();
        levelClose();
        isClearClose();
    }
    // 로컬 표시 상태 (UI)
    const [selectLang, setSelectLang] = useState(null);
    const [selectDifficult, setSelectDifficult] = useState(null);
    const [selectIsSolve, setSelectIsSolve] = useState(null);
    const [selectKeyword, setSelectKeyword] = useState(null);

    // 마운트 시: URL -> UI 동기화 + 구식 키 삭제(주소 정리)
    useEffect(() => {
        const params = new URLSearchParams(location.search);

        // URL 값으로 UI 초기화
        const solveParam = params.get('quizPersonalIsSolve');
        if (solveParam === '1') setSelectIsSolve('해결');
        else if (solveParam === '0') setSelectIsSolve('미해결');
        else setSelectIsSolve(null);

        const langParam = params.get('quizLanguage');
        setSelectLang(langParam && langParam.trim() !== "" ? langParam : null);

        const diffParam = params.get('quizDifficult');
        setSelectDifficult(diffParam && diffParam.trim() !== "" ? diffParam : null);

        const kwParam = params.get('keyword');
        setSelectKeyword(kwParam && kwParam.trim() !== "" ? kwParam : null);
    }, [location.search]);

    // buildAndNavigate: 현재 UI 상태 기반으로 새 쿼리 생성
    const buildAndNavigate = ({ quizLanguage, quizDifficult, quizPersonalIsSolve, keyword }) => {

        const params = new URLSearchParams();

        if (quizLanguage && quizLanguage.trim() !== "") params.set('quizLanguage', quizLanguage);
        if (quizDifficult && quizDifficult.trim() !== "") params.set('quizDifficult', quizDifficult);
        if (quizPersonalIsSolve === '0' || quizPersonalIsSolve === '1') params.set('quizPersonalIsSolve', quizPersonalIsSolve);
        if (keyword && keyword.trim() !== "") params.set('keyword', keyword);

        params.set('page', '1');

        navigate({ pathname: '/quiz', search: `?${params.toString()}` }, { replace: true });
    };


    // 선택 핸들러: local state 업데이트 + URL 즉시 반영
    const handleSelect = (type, value) => {
        let nextLang = selectLang;
        let nextDiff = selectDifficult;
        let nextSolve = selectIsSolve === '해결' ? '1' : selectIsSolve === '미해결' ? '0' : undefined;
        let nextKeyword = selectKeyword
        switch (type) {
            case 'Lang': {
                nextLang = selectLang === value ? undefined : value;
                setSelectLang(nextLang);
                break;
            }
            case 'Defficult': {
                nextDiff = selectDifficult === value ? undefined : value;
                setSelectDifficult(nextDiff);
                break;
            }
            case 'IsSolve': {
                const tempSolve = selectIsSolve === value ? undefined : value;
                setSelectIsSolve(tempSolve);
                nextSolve = tempSolve === '해결' ? '1' : tempSolve === '미해결' ? '0' : undefined;
                break;
            }
            case 'Keyword': {
                nextKeyword = selectKeyword === value ? undefined : value;
                setSelectKeyword(nextKeyword);
                break;
            }
            default:
                break;
        }
        buildAndNavigate({
            quizLanguage: nextLang,
            quizDifficult: nextDiff,
            quizPersonalIsSolve: nextSolve,
            keyword: nextKeyword
        });
    };

    const refreshToggle = () => {
        setSelectLang(null);
        setSelectDifficult(null);
        setSelectIsSolve(null);
        setSelectKeyword(null);
        closeAll();
        buildAndNavigate({ quizLanguage: undefined, quizDifficult: undefined, quizPersonalIsSolve: undefined, keyword: undefined });
    };

    return (
        <S.DropContainer>
            <S.ButtonWrap ref={langRef}>
                <S.DropDownButton onClick={() => { langHandler(); }} selected={selectLang}>
                    {selectLang || '언어'}
                    <S.DropDownIconWrap><S.DropDownIcon /></S.DropDownIconWrap>
                </S.DropDownButton>
                {langOpen && (
                    <S.DropDownMenuWrap $isDropped={langOpen} >
                        {['JAVA', 'JS', 'ORACLE'].map(lang => (
                            <S.DropDownMenu key={lang} onClick={() => { handleSelect('Lang', lang); closeAll() }}>{lang}</S.DropDownMenu>
                        ))}
                    </S.DropDownMenuWrap>
                )}
            </S.ButtonWrap>

            <S.ButtonWrap ref={levelRef}>
                <S.DropDownButton onClick={levelHandler} selected={selectDifficult}>
                    {selectDifficult || '난이도'}
                    <S.DropDownIconWrap><S.DropDownIcon /></S.DropDownIconWrap>
                </S.DropDownButton>
                <S.DropDownMenuWrap $isDropped={levelOpen}>
                    {['초급', '중급', '중상급', '상급', '최상급'].map(level => (
                        <S.DropDownMenu key={level} onClick={() => { handleSelect('Defficult', level); closeAll() }}>{level}</S.DropDownMenu>
                    ))}
                </S.DropDownMenuWrap>
            </S.ButtonWrap>
            <S.ButtonWrap ref={isClearRef}>
                <S.DropDownButton onClick={isClearHandler} selected={selectIsSolve}>
                    {selectIsSolve || '해결여부'}
                    <S.DropDownIconWrap><S.DropDownIcon /></S.DropDownIconWrap>
                </S.DropDownButton>
                <S.DropDownMenuWrap $isDropped={isClearOpen}>
                    {['미해결', '해결'].map(isSolve => (
                        <S.DropDownMenu key={isSolve} onClick={() => { handleSelect('IsSolve', isSolve); closeAll() }}>{isSolve}</S.DropDownMenu>
                    ))}
                </S.DropDownMenuWrap>
            </S.ButtonWrap>
            <S.ButtonWrap ref={wordRef}>
                <S.DropDownButton onClick={wordHandler} selected={selectKeyword}>
                    {selectKeyword || '키워드'}
                    <S.DropDownIconWrap><S.DropDownIcon /></S.DropDownIconWrap>
                </S.DropDownButton>
                <S.DropDownMenuWrap $isDropped={wordOpen}>
                    {['반복문', '배열', '조건식', '함수'].map(keyword => (
                        <S.DropDownMenu key={keyword} onClick={() => { handleSelect('Keyword', keyword); closeAll() }}>{keyword}</S.DropDownMenu>
                    ))}
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
