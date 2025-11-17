import React, { useContext, useEffect, useState } from 'react';
import S from "./style";
import { TypingContext } from 'context/TypingContext';

const ShortPractice = () => {
  
  const { state, actions } = useContext(TypingContext);
  const { typingList, currentTypingId, isShowModal, wordCount } = state;
  const { setIsTypingStart, handleShowModal, setIsShowModal, setWordCount} = actions;
  const [currentTyping, setCurrentTyping] = useState(typingList[0])
  
  useEffect(() => {
    setCurrentTyping(typingList[currentTypingId])
  }, [state])
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(5)
  const [currentTypingLine, setCurrentTypingLine] = useState(currentTyping?.title)
  const typingArray = currentTyping?.subject.split("#");
  const maxTypingIndex = currentTyping?.subject.split("#").length;
  const currentTypingList = currentTyping?.subject.split("#").slice(currentIndex, endIndex).map((content, i) => (<div key={i}>{content}</div>))

  // 사용자의 입력
  const [expression, setExpression] = useState("")
  const onChangeExpression = (e) => { setExpression(e.target.value) }
  const onKeyDownChangeIndex = (e) => { 
    setIsTypingStart(true)
    setWordCount( wordCount + 1)

    if(e.key === 'Enter'){
      // 첫 번째 
      if(currentIndex < maxTypingIndex){
        setCurrentIndex(currentIndex + 1)
        setCurrentTypingLine(typingArray[currentIndex + 1])
      }

      // 더 불러올 줄이 있을 때
      if(endIndex < maxTypingIndex){
        setEndIndex(endIndex + 1)
        setExpression("")
      }
    }

    // 종료될 때
    if(currentIndex === maxTypingIndex){
      setIsTypingStart(false)
      setIsShowModal(true)
    }
    
  }


  return (
    <>
      <S.TypingSection>

        {/* 현재 타이핑해야 할 문장 */}
        <S.SectionTitle>
          { !currentIndex ? currentTyping?.title : currentTypingLine }
        </S.SectionTitle>

        {/* 입력칸 */}
          <S.InputBox
            value={expression}
            onChange={onChangeExpression}
            onKeyDown={onKeyDownChangeIndex}
          />

        {/* 다음 문장 4개 */}
        <S.SentenceList>
          {currentTypingList}
        </S.SentenceList>

      </S.TypingSection>
    </>
    
  );
};

export default ShortPractice;
