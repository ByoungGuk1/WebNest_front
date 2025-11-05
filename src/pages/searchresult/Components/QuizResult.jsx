import React, { useMemo, useState } from 'react';
import S from './style'
const QuizResult = ({datas = [], search = "", count}) => {
  const quizs = datas;
  const counts = count;
  const [bookMarkId, setBookMarkId] = useState([]);
  const top10 = useMemo(() => {
      return [...datas]
        .sort((a, b) => (b.quizId ?? b.quizId ?? 0) - (a.quizId ?? a.quizId ?? 0))
        .slice(0, 10);
    }, [datas]);
  const clickBookmark = (id) => {
  setBookMarkId((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item != id)
      : [...prev, id]
  )}
  console.log(top10)

  const replaceTag = top10.map((quiz) => {
    let id = quiz.quizId
    let quizDifficult = quiz.quizDefficult
    let language = quiz.language
    let title = quiz.quizTitle
    let category = quiz.quizCategory
    let isClear = quiz.isClear
    let isLike = quiz.isLike

    function fillBookMark(isLike){
      if(isLike === true){ return <img src='/assets/icons/book-mark.png'></img>}
      return <img src='/assets/icons/book-mark-nonLike.png'></img>
    }
    return(
      <S.Row key={id}>
        <S.BookMark onClick={() => clickBookmark(id)}>
          <S.BookMarkIcon active={bookMarkId.includes(id)} />
        </S.BookMark>
        <S.Cell flex={0.6}>{id}</S.Cell>
        <S.Cell flex={1}>
          <S.Difficulty level={quizDifficult}>
            {quizDifficult || "L1"}
          </S.Difficulty>
        </S.Cell>
        <S.Cell flex={1}>{language}</S.Cell>
        <S.Cell flex={3.5}>
          <S.TitleLink to={`/workspace/quiz/${id}`}>
            {title}
          </S.TitleLink>
        </S.Cell>
        <S.Cell flex={2}>{category}</S.Cell>
        <S.Cell flex={1}>
          <S.Status isClear={isClear}>
            {isClear ? "해결됨" : "미해결"}
          </S.Status>
        </S.Cell>
      </S.Row>
    )
  })

  return (
    <S.AllContaner>
      <S.Container>
        <S.HeaderRow>
          <div>훈련장 <span className="blue">{datas.length}</span></div>
          <S.CleanLinkPlus to={`/search-detail/quiz?search=${encodeURIComponent(search)}`}>
            <img src="/assets/icons/plus-black.png" alt="" />
            더보기
          </S.CleanLinkPlus>
        </S.HeaderRow>
        <S.RowWrap>
          {replaceTag}
        </S.RowWrap>
      </S.Container>
    </S.AllContaner>
  );
};

export default QuizResult;