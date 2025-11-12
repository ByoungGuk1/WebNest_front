import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import S from './style';
import QuizRead from '../quizread/QuizRead';

const QuizReadFetch = () => {

    const { quizid } = useParams();
    const location = useLocation();

    const [quizs, setQuizs] = useState([]);
    const [quiz, setQuiz] = useState({});
    const [loading, setLoading] = useState(false);
    const [userExp, setUserExp] = useState();
    const [isBookmark, setIsBookmark] = useState();
    const [isSolve, setIsSolve] = useState();


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
    
    useEffect(() => {
        
        const readQuiz = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/workspace/quiz/${quizid}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (!response.ok) throw new Error("퀴즈 요청 실패")
                    const data = await response.json()
                setQuiz(data.data)
                setUserExp(data.data.findQuizPersonalData.userExp)
                setIsBookmark(data.data.findQuizPersonalData.quizPersonalIsBookmark)
                setIsSolve(data.data.findQuizPersonalData.quizPersonalIsSolve)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        readQuiz()
    }, [quizid])
    console.log("디티오:", userExp)
    console.log("디티오:", isBookmark)
    console.log("디티오:", isSolve)
    
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
            userExp={userExp}
            isBookmark={isBookmark}
            isSolve={isSolve}
            />

    );
};

export default QuizReadFetch;