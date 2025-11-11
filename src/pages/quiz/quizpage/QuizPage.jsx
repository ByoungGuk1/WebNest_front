import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import QuizList from '../quizlist/QuizList';
console.log("QuizPage 렌더링됨");

const parseFiltersFromSearch = (search) => {
    const params = new URLSearchParams(search);
    console.log("search", search)
    return {
        quizLanguage: params.get('quizLanguage') || null,
        quizDifficult: params.get('quizDifficult') || null,
        solve: params.get('solve') || null,
        keyword: params.get('keyword') || null,
        page: Number(params.get('page')) || 1
    };
};

const QuizPage = () => {

    const location = useLocation();
    const [quizs, setQuizs] = useState([]);
    const [bookMarkId, setBookMarkId] = useState([]);
    const [loading, setLoading] = useState(false);
    const [quizTotalCount, setQuizTotalCount] = useState(0);

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
                    setQuizTotalCount(0);
                    return;
                }

                const json = await res.json();
                console.log("json:", json)
                setQuizs(Array.isArray(json.data.findQuizList) ? json.data.findQuizList : []);
                setQuizTotalCount(json.data.quizTotalCount)
                console.log("json.data.findQuizList:", json.data.findQuizList);
                console.log("첫 번째 퀴즈 객체:", json.data.findQuizList?.[0]);

            } catch (err) {
                setQuizs([]);
                setQuizTotalCount(0);
            } finally {
                setLoading(false);
            }
        };
        fetchByFilters();
    }, [location.search]); // 쿼리스트링에 값이 추가될 때마다 == 토글 선택마다 or 페이지 넘어갈때마다
    console.log("QuizRead/ quizs:", quizs)

    return (
        <div>
            <QuizList
                quizs={quizs}
                loading={loading}
                toggleBookmark={clickBookmark}
                bookMarkId={bookMarkId}
                quizTotalCount={quizTotalCount}
            />
        </div>
    );
};

export default QuizPage;