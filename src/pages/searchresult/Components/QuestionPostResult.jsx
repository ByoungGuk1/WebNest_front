import React, { useMemo, useState } from 'react';
import S from './style'
import { Link } from 'react-router-dom';
const QuestionPostResult = (props) => {
  const search = props.search;
  const posts = props.datas;
  // 받아온 데이터에는 어디랑 일치하는 지 모름. 그래서 둘 다 포함 > 컨텐트 포함 순으로 보여줄 예정
  // 여기까지 데이터 분류 작업
  const displayFiltered = useMemo(()=>{
    return [...posts]
    .sort((a, b) => {
      const dateA = new Date(a?.createdAt ?? 0);
      const dateB = new Date(b?.createdAt ?? 0);
      // 최신 우선
      return dateB - dateA; 
    })
    // 최신 글 3개만
    .slice(0, 3);
  }, [posts]);
  console.log(posts)
  // search
  console.log(displayFiltered)
  const maxLength1st = 93;
  
  function selectLangStyle(lang){
    return lang == "JAVA" ? <S.javaBox>JAVA</S.javaBox> : lang == "JS" ? <S.jsBox>JS</S.jsBox> : <S.oracleBox>ORACLE</S.oracleBox>
  }
  
  const toListContent = displayFiltered.map((post) => {
    const lang = post.postLang;
    console.log(lang)
    const title = post.postTitle;
    const content = post.postContent;

    let targetIdx = post.postContent.indexOf(search);

    let beforeContentTarget = post.postContent.slice(0, targetIdx);
    let contentTarget = post.postContent.slice(targetIdx, search.length)
    let afterContentTarget = post.postContent.slice(targetIdx + search.length, content.length)
    let result = (<></>);
    let contentResult = (<></>);
    const sliceFirst = beforeContentTarget.length > 93 && afterContentTarget.length + search.length < 93;
    const sliceLast = beforeContentTarget.length < 93 && afterContentTarget.length + search.length > 93;
    const sliceFirstAndLast = beforeContentTarget.length > 93 && afterContentTarget.length + search.length > 93;
    const nonSlice = beforeContentTarget.length < 93 && afterContentTarget.length + search.length < 93;
    let arrContent = content.split(search);
    let resultLang = selectLangStyle(lang);
    // 일치하지 않을 때에도 렝쓰 1 + 일치하면 렝쓰 2이상
    // console.log(title.split(search).length)
    // console.log(content.split(search).length)

    if(arrContent.length <= 1){
      // 내용엔 일치 xxxx
      contentResult = (<S.contentWrap><span>{content}</span></S.contentWrap>)
    }else{
      // 내용 일치함

    // 앞에만 잘라야 할 경우 (두 줄)
    // 타겟 앞에 공백 있음 공백까지 적용됨 
      beforeContentTarget = arrContent[0]
      contentTarget = search
      afterContentTarget = content.slice(targetIdx + search.length)
      // console.log(arrContent[0])
      if(sliceFirst){
        beforeContentTarget = "..." + beforeContentTarget
        contentResult = (
          <S.contentWrap>
            <p>{beforeContentTarget}</p>
            <span className='target'>{contentTarget}</span>
            <span>{afterContentTarget}</span>
          </S.contentWrap>
        )
      }else if(sliceFirstAndLast){
        beforeContentTarget = "..." + beforeContentTarget
        afterContentTarget = afterContentTarget + "..."
        contentResult = (
          <S.contentWrap>
            <p>{beforeContentTarget}</p>
            <span className='target'>{contentTarget}</span>
            <span>{afterContentTarget}</span>
          </S.contentWrap>
        )
      }else if(sliceLast){
        afterContentTarget = afterContentTarget + "..."
        contentResult = (
          <S.contentWrap>
            <span>{beforeContentTarget}</span>
            <span className='target'>{contentTarget}</span>
            <span>{afterContentTarget}</span>
          </S.contentWrap>
        )
        // 한 줄 레이아웃
      }else if(nonSlice){
        contentResult = (
          <S.contentWrap>
            <span>{beforeContentTarget}</span>
            <span className='target'>{contentTarget}</span>
            <span>{afterContentTarget}</span>
          </S.contentWrap>
        )
      }
    }
    if(title.split(search).length <= 1){
      // console.log("여기들어옴11111?")
      // 이거 들어오면 타이틀엔 내용없음
      result = (<S.postTitleWrap> <span>{title} </span></S.postTitleWrap>)
    }else{
      // console.log("여기들어옴?")
      let before = title.split(search)[0]
      let after = title.split(search)[1]
      result = (
      <S.postTitleWrap>
        <span>{before}</span>
        <span className='target'>{search}</span>
        <span>{after}</span>
      </S.postTitleWrap>)
    }
    
    console.log("검색결과 이전 값 ::::" + beforeContentTarget)
    console.log("검색결과 값 ::::::" + contentTarget)
    console.log("검색결과 이후 값 ::::" + afterContentTarget)
    // const resultText = beforeTarget + target + afterTarget;
    return (
      <S.postListWrap>
        {resultLang}
        <div>
          {result}
          {contentResult}
        </div>
      </S.postListWrap>
  )
  });
  
  return (
    <S.postWraper>
      <S.postListContainer>
        <S.resultBorder>
          <S.resultWrap>
            <div>
              <span>문제둥지&nbsp;</span> <span className='blue'>{posts.length}</span>
            </div>
            <Link to={"/"}>
              <div>
                <img src='/assets/icons/plus-black.png'></img>
                더보기
              </div>
            </Link>
          </S.resultWrap>
        </S.resultBorder>
        {toListContent}
      </S.postListContainer>
    </S.postWraper>
  );
};

export default QuestionPostResult;