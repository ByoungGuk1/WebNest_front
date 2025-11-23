import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SearchResultContext } from 'context/SearchResultContext';
import QuizListStyle from '../../quiz/quizlist/style';
import S from '../style';

const QuizSearchDetail = () => {
  const location = useLocation();
  const { state } = useContext(SearchResultContext);
  const { search, quizzes } = state;

  // 무한 스크롤을 위한 상태
  const [displayedQuizzes, setDisplayedQuizzes] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef(null);
  const itemsPerPage = 10;

  // 북마크 기능
  const [bookMarkId, setBookMarkId] = useState([]);
  
  useEffect(() => {
    const session = sessionStorage.getItem("bookMarkId");
    if (session != null) {
      const parse = JSON.parse(session);
      if (Array.isArray(parse)) {
        setBookMarkId(parse.map((data) => Number(data)));
      }
    }
  }, []);

  const clickBookmark = (bookMarkId) => {
    const id = Number(bookMarkId);
    setBookMarkId((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      sessionStorage.setItem("bookMarkId", JSON.stringify(next));
      return next;
    });
  };

  // 페이지별 데이터 로드
  useEffect(() => {
    const startIndex = 0;
    const endIndex = page * itemsPerPage;
    setDisplayedQuizzes(quizzes.slice(startIndex, endIndex));
  }, [quizzes, page]);

  // 무한 스크롤 옵저버
  const observerCallback = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        if (displayedQuizzes.length < quizzes.length) {
          setIsLoading(true);
          setTimeout(() => {
            setPage((prev) => prev + 1);
            setIsLoading(false);
          }, 300);
        }
      }
    },
    [displayedQuizzes.length, quizzes.length, isLoading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerCallback]);

  return (
    <S.LayOutWrap>
      <S.LayOut>
        <S.SearchCategoryWrap>
          <S.SearchResultCategoryLeft>
            <span>훈련장</span>
            <span className="blue">{quizzes.length}</span>
          </S.SearchResultCategoryLeft>
        </S.SearchCategoryWrap>

        {/* QuizListStyle 테이블 형식 사용 */}
        <S.QuizListContainerWithMargin>
          <QuizListStyle.ListContainer>
            <QuizListStyle.Header>
              <QuizListStyle.Cell flex={0.6} align="left">#문제</QuizListStyle.Cell>
              <QuizListStyle.Cell flex={1} $paddingLeft>난이도</QuizListStyle.Cell>
              <QuizListStyle.Cell flex={1}>언어</QuizListStyle.Cell>
              <QuizListStyle.Cell flex={3.5}>제목</QuizListStyle.Cell>
              <QuizListStyle.Cell flex={2}>유형</QuizListStyle.Cell>
              <QuizListStyle.Cell flex={1}>해결 여부</QuizListStyle.Cell>
            </QuizListStyle.Header>

            {displayedQuizzes.map((quiz, idx) => {
              const quizData = quiz.quiz || quiz;
              const quizId = quizData.id || quizData.quizId || idx + 1;
              const ids = Number(quizId);
              return (
                <QuizListStyle.Row key={quizId}>
                  <QuizListStyle.BookMark onClick={() => clickBookmark(ids)}>
                    <QuizListStyle.BookMarkIcon active={bookMarkId.includes(ids)} />
                  </QuizListStyle.BookMark>
                  <QuizListStyle.Cell flex={0.6} align="left">
                    {Number.isFinite(ids) && ids > 0 ? `000${ids}` : ids}
                  </QuizListStyle.Cell>
                  <QuizListStyle.Cell flex={1}>
                    <QuizListStyle.Difficulty level={quizData.quizDifficult || '초급'}>
                      {quizData.quizDifficult || 'L1'}
                    </QuizListStyle.Difficulty>
                  </QuizListStyle.Cell>
                  <QuizListStyle.Cell flex={1}>{quizData.quizLanguage || 'JAVA'}</QuizListStyle.Cell>
                  <QuizListStyle.Cell flex={3.5}>
                    <QuizListStyle.TitleLink as={Link} to={`/workspace/quiz/${quizId}`}>
                      {quizData.quizTitle || quizData.title || '제목 없음'}
                    </QuizListStyle.TitleLink>
                  </QuizListStyle.Cell>
                  <QuizListStyle.Cell flex={2}>{quizData.quizCategory || '카테고리'}</QuizListStyle.Cell>
                  <QuizListStyle.Cell flex={1}>
                    <QuizListStyle.Status $isSolved={quizData.solve || false}>
                      {quizData.solve ? '해결됨' : '미해결'}
                    </QuizListStyle.Status>
                  </QuizListStyle.Cell>
                </QuizListStyle.Row>
              );
            })}
          </QuizListStyle.ListContainer>
        </S.QuizListContainerWithMargin>

        {/* 무한 스크롤 트리거 */}
        {displayedQuizzes.length < quizzes.length && (
          <S.InfiniteScrollTrigger ref={observerTarget}>
            {isLoading && <div>로딩 중...</div>}
          </S.InfiniteScrollTrigger>
        )}
      </S.LayOut>
    </S.LayOutWrap>
  );
};

export default QuizSearchDetail;
