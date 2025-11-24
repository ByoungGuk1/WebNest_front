import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S from "../../quiz/style";
import QuizListStyle from "../../quiz/quizlist/style";

const QuestionBookmarkContainer = () => {
  const myData = useOutletContext();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?.id;

  // quizMyPage 데이터 가져오기
  const quizMyPage = Array.isArray(myData?.quizMyPage) ? myData.quizMyPage : [];
  
  const [bookMarkId, setBookMarkId] = useState([]);
  const [solveIds, setSolveIds] = useState(new Set());
  const requestingRef = useRef(new Set());
  const [requesting, setRequesting] = useState(new Set());

  // 초기 북마크 및 해결 상태 설정
  useEffect(() => {
    if (quizMyPage.length > 0) {
      const bookmarkedIds = [];
      const solvedIds = new Set();
      
      quizMyPage.forEach((quiz) => {
        // quizId가 있는 경우 (실제 문제 ID)
        const quizId = quiz.quizId || quiz.id;
        if (quizId) {
          const idNum = Number(quizId);
          if (Number.isFinite(idNum)) {
            // 북마크된 문제는 모두 표시되므로 모두 북마크 상태로 설정
            bookmarkedIds.push(idNum);
            
            // 해결 여부 확인 (quizPersonalIsSolve 또는 다른 필드 확인)
            const isSolveVal = Number(quiz.quizPersonalIsSolve ?? 0);
            if (isSolveVal >= 1) {
              solvedIds.add(idNum);
            }
          }
        }
      });
      
      setBookMarkId(bookmarkedIds);
      setSolveIds(solvedIds);
    } else {
      // 데이터가 없으면 초기화
      setBookMarkId([]);
      setSolveIds(new Set());
    }
  }, [quizMyPage]);

  // 북마크 토글 기능
  const toggleBookmark = async (quizId) => {
    if (!userId || requestingRef.current.has(quizId)) return;

    requestingRef.current = new Set(requestingRef.current).add(quizId);
    setRequesting(prev => {
      const next = new Set(prev);
      next.add(quizId);
      return next;
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/quiz/${quizId}/bookmark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({
          userId: userId,
          quizId: quizId
        })
      });

      const data = await response.json();
      const quizPersonal = data?.data?.quizPersonal;
      
      let personal = null;
      if (!quizPersonal) {
        personal = null;
      } else if (Array.isArray(quizPersonal)) {
        personal = quizPersonal.find(quiz => Number(quiz.quizId) === Number(quizId)) || quizPersonal[0] || null;
      } else {
        personal = quizPersonal;
      }

      const serverBookmark = Number(personal?.quizPersonalIsBookmark ?? 0);
      const serverIsSolve = Number(personal?.quizPersonalIsSolve ?? 0);

      setBookMarkId(prev => {
        if (serverBookmark === 1) {
          return prev.includes(quizId) ? prev : [...prev, quizId];
        } else {
          return prev.filter(i => i !== quizId);
        }
      });

      setSolveIds(prev => {
        const next = new Set(prev);
        if (serverIsSolve >= 1) {
          next.add(quizId);
        } else {
          next.delete(quizId);
        }
        return next;
      });
    } catch (err) {
      // 에러 발생 시 롤백
      setBookMarkId(prev => prev.includes(quizId) ? prev.filter(i => i !== quizId) : [...prev, quizId]);
    } finally {
      const nextRef = new Set(requestingRef.current);
      nextRef.delete(quizId);
      requestingRef.current = nextRef;

      setRequesting(prev => {
        const next = new Set(prev);
        next.delete(quizId);
        return next;
      });
    }
  };

  return (
    <S.AllContainer>
      <S.InnerContainer>
        <QuizListStyle.ListContainer>
          <QuizListStyle.Header>
            <QuizListStyle.Cell flex={0.6} style={{ textAlign: 'left' }}>#문제</QuizListStyle.Cell>
            <QuizListStyle.Cell flex={1} $paddingLeft>난이도</QuizListStyle.Cell>
            <QuizListStyle.Cell flex={1}>언어</QuizListStyle.Cell>
            <QuizListStyle.Cell flex={3.5}>제목</QuizListStyle.Cell>
            <QuizListStyle.Cell flex={2}>유형</QuizListStyle.Cell>
            <QuizListStyle.Cell flex={1}>해결 여부</QuizListStyle.Cell>
          </QuizListStyle.Header>

          {quizMyPage.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              북마크한 문제가 없습니다.
            </div>
          ) : (
            quizMyPage.map((quiz, index) => {
              // quizId 추출 (백엔드에서 quizId를 포함해서 보내줘야 함)
              const rawId = quiz.quizId || quiz.id;
              
              // quizId가 없으면 표시하지 않음 (백엔드 쿼리 수정 필요)
              if (!rawId) {
                return null;
              }

              const idNum = Number(rawId);
              if (!Number.isFinite(idNum)) return null;

              const isActive = bookMarkId.includes(idNum);
              const isLoading = requesting.has(idNum);
              
              // 해결 여부 확인
              const personalSolveVal = Number(quiz.quizPersonalIsSolve ?? 0);
              const isSolved = personalSolveVal >= 1 || solveIds.has(idNum);

              const { quizDifficult, quizLanguage, quizTitle, quizCategory } = quiz;

              return (
                <QuizListStyle.Row key={idNum || `quiz-${index}`}>
                  <QuizListStyle.BookMark onClick={() => !isLoading && toggleBookmark(idNum)}>
                    <QuizListStyle.BookMarkIcon active={isActive} />
                  </QuizListStyle.BookMark>
                  <QuizListStyle.Cell flex={0.6} style={{ textAlign: 'left' }}>
                    {idNum > 0 ? `000${idNum}` : rawId}
                  </QuizListStyle.Cell>
                  <QuizListStyle.Cell flex={1}>
                    <QuizListStyle.Difficulty level={quizDifficult}>
                      {quizDifficult || '초급'}
                    </QuizListStyle.Difficulty>
                  </QuizListStyle.Cell>
                  <QuizListStyle.Cell flex={1}>{quizLanguage || 'JS'}</QuizListStyle.Cell>
                  <QuizListStyle.Cell flex={3.5}>
                    <QuizListStyle.TitleLink as={Link} to={`/workspace/quiz/${idNum}`}>
                      {quizTitle || '제목 없음'}
                    </QuizListStyle.TitleLink>
                  </QuizListStyle.Cell>
                  <QuizListStyle.Cell flex={2}>{quizCategory?.trim() || '카테고리'}</QuizListStyle.Cell>
                  <QuizListStyle.Cell flex={1}>
                    <QuizListStyle.Status $isSolved={isSolved}>
                      {isSolved ? '해결됨' : '미해결'}
                    </QuizListStyle.Status>
                  </QuizListStyle.Cell>
                </QuizListStyle.Row>
              );
            })
          )}
        </QuizListStyle.ListContainer>
      </S.InnerContainer>
    </S.AllContainer>
  );
};

export default QuestionBookmarkContainer;