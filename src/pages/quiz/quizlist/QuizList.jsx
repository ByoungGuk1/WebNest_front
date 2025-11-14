// QuizList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import S from './style';
import Pagination from '../pagination/Pagination';


const QuizList = ({ quizs = [], loading = false, toggleBookmark, bookMarkId = [], quizTotalCount = 0, showPagination = true }) => {

    const quizList = Array.isArray(quizs) && quizs.map((q, index) => {
        const quiz = q.quiz || q;
        const { id, quizDifficult, quizLanguage, quizTitle, quizCategory, solve = false } = quiz
        if (!id && id == null) return null;
        const ids = Number(id);
        return (
            <S.Row key={id ?? `quiz-${index}`}>
                <S.BookMark value={sessionStorage.getItem("bookMarkId")} onClick={() => toggleBookmark(ids)}>
                    <S.BookMarkIcon active={bookMarkId.includes(ids)} />
                </S.BookMark>
                <S.Cell flex={0.6} style={{ textAlign: 'left' }}>
                    {Number.isFinite(ids) && ids > 0 ? `000${ids}` : id}
                </S.Cell>
                <S.Cell flex={1}>
                    <S.Difficulty level={quizDifficult}>
                        {quizDifficult || 'L1'}
                    </S.Difficulty>
                </S.Cell>
                <S.Cell flex={1}>{quizLanguage}</S.Cell>
                <S.Cell flex={3.5}>
                    <S.TitleLink as={Link} to={`/workspace/quiz/${ids}`}>
                        {quizTitle}
                    </S.TitleLink>
                </S.Cell>
                <S.Cell flex={2}>{quizCategory}</S.Cell>
                <S.Cell flex={1}>
                    <S.Status isClear={solve}>
                        {solve ? '해결됨' : '미해결'}
                    </S.Status>
                </S.Cell>
            </S.Row>
        );
    })


    return (
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

            {showPagination && <Pagination totalCount={quizTotalCount} />}
        </S.ListContainer>
    );
};

export default QuizList;
