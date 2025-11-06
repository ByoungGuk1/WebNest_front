// QuizList.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import S from './style';
import Pagination from '../pagination/Pagination';

const parseFiltersFromSearch = (search) => {
    const params = new URLSearchParams(search);
    console.log("파람:", params.toString())
    return {
        quizLanguage: params.get('quizLanguage') || null,
        quizDifficult: params.get('quizDifficult') || null,
        solve: params.get('solve') || null,
        keyword: params.get('keyword') || null,
        page: Number(params.get('page')) || 1
    };
};

const pageCount = 100

const QuizList = () => {
    const location = useLocation();
    const [quizs, setQuizs] = useState([]);
    const [bookMarkId, setBookMarkId] = useState([]);
    const [loading, setLoading] = useState(false);
    const [quizTotalCount, setQuizTotalCount] = useState();

    // 북마크기능
    useEffect(() => {
        const session = sessionStorage.getItem("bookMarkId");
        if (session != null) {
            const parse = JSON.parse(session);

            if (Array.isArray(parse)) {
                setBookMarkId(parse.map((data) => Number(data)))
            }
        }
    }, []);
    const clickBookmark = (bookMarkId) => {
        console.log("bookMarkId: ", bookMarkId)
        const id = Number(bookMarkId);
        setBookMarkId((prev) => {
            const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
            sessionStorage.setItem("bookMarkId", JSON.stringify(next));

            return next;
        })
    };

    // 문제리스트 요청청
    useEffect(() => {
        const filters = parseFiltersFromSearch(location.search);

        const fetchByFilters = async () => {
            setLoading(true);
            try {
                const url = `${process.env.REACT_APP_BACKEND_URL}/quiz`; // POST 엔드포인트
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(filters) // RequestBody로 filters값들을 보냄
                });
                if (!res.ok) {
                    setQuizs([]);
                    return;
                }

                const json = await res.json();
                console.log('POST 응답 전체:', json.data); // 디버그용: 구조 확인
                setQuizs(Array.isArray(json.data.findQuizList) ? json.data.findQuizList : []);
                setQuizTotalCount(json.data.quizTotalCount)
            } catch (err) {
                setQuizs([]);
                setQuizTotalCount();
            } finally {
                setLoading(false);
            }
        };
        fetchByFilters();
    }, [location.search]); // 쿼리스트링에 값이 추가될 때마다 == 토글 선택마다 or 페이지 넘어갈때마다
    console.log("응답 : ", quizs)
    console.log("응답 : ", quizTotalCount)
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

            {Array.isArray(quizs) && quizs.map((quiz, index) => {
                if (!quiz) return null;
                const id = Number(quiz.id);
                return (
                    <S.Row key={quiz.id ?? `quiz-${index}`}>
                        <S.BookMark value={sessionStorage.getItem("bookMarkId")} onClick={() => clickBookmark(id)}>
                            <S.BookMarkIcon active={bookMarkId.includes(id)} />
                        </S.BookMark>
                        <S.Cell flex={0.6} style={{ textAlign: 'left' }}>
                            {Number.isFinite(id) && id > 0 ? `000${id}` : quiz.id}
                        </S.Cell>
                        <S.Cell flex={1}>
                            <S.Difficulty level={quiz.quizDifficult}>
                                {quiz.quizDifficult || 'L1'}
                            </S.Difficulty>
                        </S.Cell>
                        <S.Cell flex={1}>{quiz.quizLanguage}</S.Cell>
                        <S.Cell flex={3.5}>
                            <S.TitleLink as={Link} to={`/workspace/quiz/${id}`}>
                                {quiz.quizTitle}
                            </S.TitleLink>
                        </S.Cell>
                        <S.Cell flex={2}>{quiz.quizCategory}</S.Cell>
                        <S.Cell flex={1}>
                            <S.Status isClear={quiz.solve}>
                                {quiz.solve ? '해결됨' : '미해결'}
                            </S.Status>
                        </S.Cell>
                    </S.Row>
                );
            })}
            <Pagination totalCount={quizTotalCount} />
        </S.ListContainer>
    );
};

export default QuizList;
