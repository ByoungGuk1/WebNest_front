// QuizList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import S from './style';
import Pagination from '../pagination/Pagination';
import { clickTitle } from '../function/getQuiz';
import QuizRead from 'pages/workspace/singleworkspace/quizread/QuizRead';


const QuizList = ({ quizs = [], loading = false, toggleBookmark, bookMarkId = [], solveIds = new Set(), quizTotalCount = 0, requesting = new Set() }) => {

    const quizList = Array.isArray(quizs) ? quizs.map((item, index) => {
        // item이 이미 퀴즈 객체인지, 혹은 { quiz: {...} } 구조인지 안전하게 처리
        const quiz = item.quiz ?? item; // item.quiz가 있으면 그 안의 실제 객체, 아니면 item 자체
        const rawId = quiz.id ?? quiz.quizId;
        if (rawId == null) return null; // undefined/null 체크

        const idNum = Number(rawId);
        if (!Number.isFinite(idNum)) return null;

        // 서버에서 내려오는 값(quizPersonalIsSolve)이 있을 경우 우선 사용
        const personalSolveVal = Number(quiz.quizPersonalIsSolve ?? 0);
        const isSolved = personalSolveVal >= 1 || solveIds.has(idNum);

        const isActive = Array.isArray(bookMarkId) ? bookMarkId.includes(idNum) : false;
        const isLoading = requesting.has(idNum);

        console.log("isSolved", isSolved)
        const { quizDifficult, quizLanguage, quizTitle, quizCategory } = quiz;
        <QuizRead isSolved={isSolved} />
        return (
            <S.Row key={idNum ?? `quiz-${index}`}>
                <S.BookMark onClick={() => !isLoading && toggleBookmark(idNum)}>
                    <S.BookMarkIcon active={isActive} />
                </S.BookMark>
                <S.Cell flex={0.6} style={{ textAlign: 'left' }}>
                    {idNum > 0 ? `000${idNum}` : rawId}
                </S.Cell>
                <S.Cell flex={1}>
                    <S.Difficulty level={quizDifficult}>
                        {quizDifficult || 'L1'}
                    </S.Difficulty>
                </S.Cell>
                <S.Cell flex={1}>{quizLanguage}</S.Cell>
                <S.Cell flex={3.5}>
                    <S.TitleLink as={Link} to={`/workspace/quiz/${idNum}`} >
                        {quizTitle}
                    </S.TitleLink>
                </S.Cell>
                <S.Cell flex={2}>{quizCategory}</S.Cell>
                <S.Cell flex={1}>
                    <S.Status isSolved={isSolved} isClear={!isSolved}>
                        {isSolved ? '해결됨' : '미해결'}
                    </S.Status>
                </S.Cell>
            </S.Row>
        );
    }) : null;

    return (
        <>
            <S.ListContainer>
                <S.Header>
                    <S.Cell flex={0.6} style={{ textAlign: 'left' }}>#문제</S.Cell>
                    <S.Cell flex={1} paddingLeft>난이도</S.Cell>
                    <S.Cell flex={1}>언어</S.Cell>
                    <S.Cell flex={3.5}>제목</S.Cell>
                    <S.Cell flex={2}>유형</S.Cell>
                    <S.Cell flex={1}>해결 여부</S.Cell>
                </S.Header>

                {loading && <div>로딩중...</div>}

                {Array.isArray(quizs) && quizs.length === 0 && !loading && (
                    <div>표시할 문제가 없습니다.</div>
                )}
                {quizList}


                <Pagination totalCount={quizTotalCount} />
            </S.ListContainer>
        </>
    );
};

export default QuizList;
