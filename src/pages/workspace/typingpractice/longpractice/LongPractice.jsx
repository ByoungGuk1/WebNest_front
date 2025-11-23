import React, { useContext, useEffect, useState, useMemo } from 'react';
import S from "./longStyle";
import { TypingContext } from 'context/TypingContext';


const LongPractice = () => {
  const { state, actions } = useContext(TypingContext);
    // const { typingList, currentTypingId } = state;
    const { typingList, currentTypingId, language, isShort } = state;

    // const { 
    //   setIsTypingStart, 
    //   setIsShowModal, 
    //   setTotalTypedCount, 
    //   setCorrectTypedCount 
    // } = actions;
    const { 
      setIsTypingStart, 
      setIsShowModal, 
      setTotalTypedCount, 
      setTotalCorrectCount 
    } = actions;

  
    // 현재 타이핑 데이터
    const currentTyping = typingList[currentTypingId];
  
    // 줄 데이터
    const typingArray = currentTyping?.subject?.split("#") || [];
  
    // 현재 타이핑 관련 state
    const [currentIndex, setCurrentIndex] = useState(0);  // 현재 문장
    const [inputValue, setInputValue] = useState("");     // 입력값
  
    // 현재 보여줄 문장
    const currentLine = currentIndex === 0 
      ? currentTyping?.title 
      : typingArray[currentIndex - 1];
  
    // 다음에 보여줄 문장 4개
    const nextLines = typingArray.slice(currentIndex, currentIndex + 5);
  
    // 현재 타이핑 바뀌면 초기화
    useEffect(() => {
      setCurrentIndex(0);
      setInputValue("");
      setTotalTypedCount(0);
      // setCorrectTypedCount(0);
      setTotalCorrectCount(0);
    }, [currentTypingId]);
  
    // 입력 처리
    const onChange = (e) => {
      const value = e.target.value;
      const old = inputValue;
  
      // 입력 시작 표시
      setIsTypingStart(true);
  
      // 총 타이핑 수 계산
      if (value.length > old.length) {
        // 추가된 글자
        const added = value.slice(old.length);
        const addedLength = added.length;
  
          //  타수 증가 (단어수 → 글자수)
        actions.setWordCount((prev) => prev + addedLength);
  
        let correctCount = 0;
        for (let i = 0; i < addedLength; i++) {
          const addedChar = added[i];
          const correctChar = currentLine[old.length + i] || "";
  
          if (addedChar === correctChar) correctCount++;
        }
  
        setTotalTypedCount((p) => p + addedLength);
        // setCorrectTypedCount((p) => p + correctCount);
        setTotalCorrectCount((p) => p + correctCount);

      } else {
        // 삭제된 글자
        const deletedLength = old.length - value.length;
        // 삭제 시 wordCount 감소
        actions.setWordCount((prev) => Math.max(0, prev - deletedLength));
        let correctCount = 0;
  
        for (let i = 0; i < deletedLength; i++) {
          const deletedChar = old[value.length + i];
          const correctChar = currentLine[value.length + i];
  
          if (deletedChar === correctChar) correctCount++;
        }
  
        setTotalTypedCount((p) => Math.max(0, p - deletedLength));
        // setCorrectTypedCount((p) => Math.max(0, p - correctCount));
        setTotalCorrectCount((p) => Math.max(0, p - correctCount));
      }
  
      setInputValue(value);
    };
  
    // 엔터키 처리
    const onKeyDown = (e) => {
      if (e.key !== "Enter") return;
  
      e.preventDefault();
  
      const isLast = currentIndex === typingArray.length;
  
      if (isLast) {
        // 1) 타이머 STOP
        setIsTypingStart(false);
  
        // 2) finalResult 저장
        actions.setFinalResult({
          wpm: ((state.wordCount / state.runningTime.totalSeconds) * 60).toFixed(1),
          accuracy: ((state.correctTypedCount / state.totalTypedCount) * 100).toFixed(1),
          time: state.runningTime.totalSeconds.toFixed(1)
        });
  
        // 3) 모달 열기
        setIsShowModal(true);
        return;
      }
  
  
      // 다음 문장
      setCurrentIndex((prev) => prev + 1);
      setInputValue("");
    };
  
    // 글자 비교해서 색깔 넣기
    const coloredLine = useMemo(() => {
      if (!currentLine) return null;
  
      return currentLine.split("").map((char, i) => {
        const typed = inputValue[i];
  
        let color = "white"; // 아직 안침
        if (typed !== undefined) {
          color = typed === char ? "black" : "red";
        }
  
        return (
          <span key={i} style={{ color }}>
            {char}
          </span>
        );
      });
    }, [currentLine, inputValue]);

    // 🔥 모드/언어/제목이 바뀌면 입력창과 currentIndex도 초기화
    // 🔥 모드/언어/제목이 바뀌면 입력창과 currentIndex도 초기화
    useEffect(() => {
      setInputValue("");
      setCurrentIndex(0);
    }, [currentTypingId, language, isShort]);




  return (
    <>
    <S.TypingSection>

      <S.SectionTitle>
          {coloredLine}
      </S.SectionTitle>

      <S.InputWrapper>
        <img src="/assets/icons/pencil.svg" alt="edit" />
        <S.InputBox
          value={inputValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </S.InputWrapper>

      <S.SentenceList>
        {nextLines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </S.SentenceList>

    </S.TypingSection>
    </>
    
  );
};

export default LongPractice;
