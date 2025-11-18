import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import QuizList from '../quizlist/QuizList';
import { useSelector } from 'react-redux';
import QuizReadFetch from 'pages/workspace/singleworkspace/quizreadfetch/QuizReadFetch';

const parseFiltersFromSearch = (search) => {
    const params = new URLSearchParams(search);
    return {
        // 필터링 시 쿼리스트링 겟
        quizLanguage: params.get('quizLanguage') || null,
        quizDifficult: params.get('quizDifficult') || null,
        quizPersonalIsSolve: params.get('quizPersonalIsSolve') || null,
        keyword: params.get('keyword') || null,
        page: Number(params.get('page')) || 1
    };
};

const QuizPage = () => {

    const user = useSelector(state => state.user);
    const { currentUser, isLogined } = user;
    const userId = currentUser.id;

    const { quizid } = useParams();
    const location = useLocation();
    const [quizs, setQuizs] = useState([]);
    const [bookMarkId, setBookMarkId] = useState([]);
    const [solveIds, setSolveIds] = useState(new Set());

    const requestingRef = useRef(new Set());
    const [requesting, setRequesting] = useState(new Set());
    const [loading, setLoading] = useState(false);
    const [quizTotalCount, setQuizTotalCount] = useState(0);

    const token = localStorage.getItem('accessToken');

    // 북마크기능
    async function toggleBookmark(quizId) {
        if (requestingRef.current.has(quizId)) return

        requestingRef.current = new Set(requestingRef.current).add(quizId);
        setRequesting(prev => {
            const next = new Set(prev);
            next.add(quizId);
            return next
        })
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/quiz/${quizId}/bookmark`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "userId": userId,
                    "quizId": quizId
                })
            })
            const data = await response.json();
            let personal = null;
            const quizPersonal = data?.data?.quizPersonal;
            if (!quizPersonal) {
                personal = null;
            } else if (Array.isArray(quizPersonal)) {
                personal = quizPersonal.find(quiz => Number(quiz.quizId) || quizPersonal[0] || null);
            } else {
                personal = quizPersonal;
            }

            console.log('serverBookmark, serverIsSolve:', serverBookmark, serverIsSolve);
            const serverBookmark = Number(personal?.quizPersonalIsBookmark ?? 0);
            const serverIsSolve = Number(personal?.quizPersonalIsSolve ?? 0);
            const serverQuizPersonalId = personal?.quizPersonalId ?? personal?.id ?? null;
            setBookMarkId(prev => {
                if (serverBookmark == 1) {
                    return prev.includes(quizId) ? prev : [...prev, quizId];
                } else {
                    return prev.filter(i => i != quizId);
                }
            });
            setSolveIds(prev => {
                const next = new Set(prev);
                if (serverIsSolve >= 1) next.add(quizId);
                else next.delete(quizId);
                return next;
            })

            setQuizs(prevQuizs =>
                prevQuizs.map(quiz => {
                    const idNum = Number(quiz.id ?? quiz.quizId)
                    if (idNum != Number(quizId)) return quiz;
                    return { ...quiz, quizPersonalIsBookmark: serverBookmark, quizPersonalIsSolve: serverIsSolve, quizPersonalId: serverQuizPersonalId }
                })
            );
        } catch (err) {
            setBookMarkId(prev => prev.includes(quizId) ? prev.filter(i => i != quizId) : [...prev, quizId]);
        } finally {
            const nextRef = new Set(requestingRef.current)
            nextRef.delete(quizId);
            requestingRef.current = nextRef;

            setRequesting(prev => {
                const next = new Set(prev);
                next.delete(quizId);
                return next;
            })
        }

    }
    // 문제리스트 요청청
    useEffect(() => {
        const filters = parseFiltersFromSearch(location.search);
        const fetchByFilters = async () => {
            setLoading(true);
            try {
                const url = `${process.env.REACT_APP_BACKEND_URL}/quiz`; // POST 엔드포인트
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                    },
                    body: JSON.stringify(filters) // RequestBody로 filters값들을 보냄
                });
                if (!res.ok) {
                    setQuizs([]);
                    setQuizTotalCount(0);
                    return;
                }
                const json = await res.json();
                const quizList = Array.isArray(json.data?.findQuizList) ? json.data.findQuizList : [];
                setQuizs(quizList);
                setQuizTotalCount(json.data.quizTotalCount)

                const solved = new Set();
                quizList.forEach(data => {
                    const isSolveVal = Number(data.quizPersonalIsSolve || 0);
                    if (isSolveVal >= 1) solved.add(data.id || data.quizId);
                });
                setSolveIds(solved);

                const bookmarkedIds = quizList
                    .filter(q => Number(q.quizPersonalIsBookmark || 0) === 1)
                    .map(q => q.id);

                setBookMarkId(bookmarkedIds);


            } catch (err) {
                setQuizs([]);
                setQuizTotalCount(0);
                setBookMarkId([])
            } finally {
                setLoading(false);
            }
        };
        fetchByFilters();
    }, [location.search]); // 쿼리스트링에 값이 추가될 때마다 == 토글 선택마다 or 페이지 넘어갈때마다
    console.log("BookMarkdi", bookMarkId)
    return (
        <div>
            <QuizList
                quizs={quizs}
                loading={loading}
                toggleBookmark={toggleBookmark}
                bookMarkId={bookMarkId}
                solveIds={solveIds}
                quizTotalCount={quizTotalCount}
                requesting={requesting}
            />

        </div>
    );
};

export default QuizPage;