import React, { useEffect } from 'react';
import S from './style';
import CodeEditor from '../codeeditor/CodeEditor';

const QuizRead = ({ 
    quiz = {}, 
    prevQuiz = {},
    nextQuiz = {},
    userId,
    userExp,
    isSolve,
    isBookmark
        }) => {

    const {
        id,
        quizTitle,
        quizDescription,
        quizLanguage,
        quizExp,
        quizExpectation
    } = quiz;

    const {
        id: prevId,
        quizTitle: prevQuizTitle,
        quizDifficult: prevQuizDifficult,
    } = prevQuiz;

    const {
        id: nextId,
        quizTitle: nextQuizTitle,
        quizDifficult: nextQuizDifficult,
    } = nextQuiz;

    return (
        <S.QuizReadWrap>
            {/* 좌측 헤더 */}
            <S.QuizLeftWrap flex={1}>
                <S.QuizLeftTextWrap>
                    <S.BookMark>
                        <S.BookMarkIcon active={true} />
                    </S.BookMark>
                    <S.QuizLeftInner>
                        <S.QuizLeftText>
                            {quizTitle}
                        </S.QuizLeftText>
                        <S.QuizLeftText>
                            <S.QuizLeftTextLink to={"/question/write"}>
                                질문하기
                            </S.QuizLeftTextLink>
                        </S.QuizLeftText>
                    </S.QuizLeftInner>
                </S.QuizLeftTextWrap>
                {/* 좌측 미드 */}
                <S.QuizLeftMiddleWrap>
                    <S.QuizLeftMiddleHeader flex={0.1}>
                        문제 설명
                    </S.QuizLeftMiddleHeader>
                    <S.QuizLeftMiddleDescription flex={1}>
                        {quizDescription}
                    </S.QuizLeftMiddleDescription>
                    <S.QuizExpectationWrap flex={0.3}>
                        언어 종류:{quizLanguage}
                    </S.QuizExpectationWrap>
                    
                </S.QuizLeftMiddleWrap>
                {/* 좌측 푸터터 */}
                <S.QuizLeftFooterWrap>
                    <S.QuizLeftPrevQuiz>
                        {prevId && (
                            <S.QuizLeftPrevAndNext to={`/workspace/quiz/${prevId}`}>
                                <span>이전문제</span>
                                <S.Difficulty level={prevQuizDifficult}>{prevQuizDifficult}</S.Difficulty>
                                <span>{prevQuizTitle}</span>
                            </S.QuizLeftPrevAndNext>
                        )}
                    </S.QuizLeftPrevQuiz>
                    <S.LinkToList to={"/quiz"}>
                        목록
                    </S.LinkToList>
                    <S.QuizLfetNextQuiz>
                        {nextId && (
                            <S.QuizLeftPrevAndNext to={`/workspace/quiz/${nextId}`}>
                                <span>다음문제</span>
                                <S.Difficulty level={nextQuizDifficult}>{nextQuizDifficult}</S.Difficulty>
                                <span>{nextQuizTitle}</span>

                            </S.QuizLeftPrevAndNext>
                        )}
                    </S.QuizLfetNextQuiz>
                </S.QuizLeftFooterWrap>
            </S.QuizLeftWrap>

            {/* 우측 */}
            <S.quizRightWrap flex={1.46}>
                <S.QuizRightTextWrap>
                    solution
                </S.QuizRightTextWrap>
                <S.QuizRightConsoleArea>
                    <CodeEditor 
                        quizLanguage={quizLanguage} 
                        id={id} 
                        userExp={userExp}
                        userId={userId}
                        isBookmark={isBookmark}
                        isSolve={isSolve}
                    />
                </S.QuizRightConsoleArea>
            </S.quizRightWrap>
        </S.QuizReadWrap>
    );
};

export default QuizRead;