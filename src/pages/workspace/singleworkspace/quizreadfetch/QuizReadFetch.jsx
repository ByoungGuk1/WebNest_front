import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import S from './style';
import QuizRead from '../quizread/QuizRead';
import { useSelector } from 'react-redux';

const QuizReadFetch = () => {
    // 화면에서 값을 전달 -> 컨트롤러에서 쿼리전송 후 응답반환 -> 
    const { quizid } = useParams();
    const location = useLocation();
    const [quizs, setQuizs] = useState([]);
    const [quiz, setQuiz] = useState({});
    const [loading, setLoading] = useState(false);

    const [requesting, setRequesting] = useState(new Set());
    const [bookmarkId, setBookmarkId] = useState();
    const getUser = useSelector(state => state.user)
    const currentUser = getUser.currentUser
    const userId = currentUser.id

    useEffect(() => {
        const fetchQuizListAndCurrent = async () => {
            try {
                let quizList = location.state?.quizs;

                if (!quizList) {
                    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/quiz/all`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({}) // 토글이나 페이져가 없기떄문에 필터링없이 조회
                    });
                    const json = await res.json();
                    console.log("json", json)
                    quizList = json.data;
                }

                setQuizs(quizList);

                const current = quizList.find(q => q.id === Number(quizid));
                if (current) {
                    setQuiz(current);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizListAndCurrent();
    }, [loading]);


    const currentIndex = quizs.findIndex(q => q.id === Number(quizid))
    const prevQuiz = quizs[currentIndex - 1];
    const nextQuiz = quizs[currentIndex + 1];
    console.log("userId", userId)
    useEffect(() => {
        const readQuiz = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/workspace/quiz/${quizid}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "quizId": quizid,
                        "userId": userId
                    })
                })
                if (!response.ok) throw new Error("퀴즈 요청 실패")
                const data = await response.json()
                setQuiz(data.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        readQuiz()
    }, [quizid])

    if (loading || !quiz.id) {
        return (
            <S.Bg>
                <S.FontAwesomeIcon icon={faSpinner} spinPulse size='2xl' />
            </S.Bg  >
        )
    }

    return (

        <QuizRead
            quiz={quiz}
            prevQuiz={prevQuiz}
            nextQuiz={nextQuiz}
            quizs={quizs}
            loading={loading}
            bookmarkId={bookmarkId}
            requesting={requesting}
        />

    );
};

export default QuizReadFetch;