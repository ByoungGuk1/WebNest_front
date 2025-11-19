import React, { useContext, useEffect, useState, useMemo } from 'react';
import S from "./shortStyle";
import { TypingContext } from 'context/TypingContext';

const ShortPractice = () => {
  const { state, actions } = useContext(TypingContext);
  const { typingList, currentTypingId, language, isShort, totalTypedCount, totalCorrectCount, totalWrongCount} = state;
  const { setIsTypingStart, setTotalTypedCount, setTotalCorrectCount, setTotalWrongCount, setWordCount, setIsShowModal, setFinalResult } = actions;

  const currentTyping = typingList[currentTypingId];
  const typingArray = currentTyping?.subject?.split("#") || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const currentLine = currentIndex === 0 ? currentTyping?.title : typingArray[currentIndex - 1];
  const nextLines = typingArray.slice(currentIndex, currentIndex + 5);

  const onChange = (e) => {
    setInputValue(e.target.value);
    setIsTypingStart(true);
    setWordCount(prev => prev + 1);
  };

  const onKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    let correctCount = 0;
    let wrongCount = 0;

    for (let i = 0; i < currentLine.length; i++) {
      const typed = inputValue[i] || "";
      if (typed === currentLine[i]) correctCount++;
      else wrongCount++;
    }

    const newTotalTyped = totalTypedCount + currentLine.length;
    const newTotalCorrect = totalCorrectCount + correctCount;
    const newTotalWrong = totalWrongCount + wrongCount;

    setTotalTypedCount(newTotalTyped);
    setTotalCorrectCount(newTotalCorrect);
    setTotalWrongCount(newTotalWrong);

    const isLast = currentIndex === typingArray.length;
    if (isLast) {
      setIsTypingStart(false);
      setFinalResult({
        wpm: ((state.wordCount / state.runningTime.totalSeconds) * 60).toFixed(1),
        accuracy: ((newTotalCorrect / newTotalTyped) * 100).toFixed(1), // ← 여기
        time: state.runningTime.totalSeconds.toFixed(1)
      });
      setIsShowModal(true);
      return;
    }

    setCurrentIndex(prev => prev + 1);
    setInputValue("");
  };


  const coloredLine = useMemo(() => {
    if (!currentLine) return null;
    return currentLine.split("").map((char, i) => {
      const typed = inputValue[i];
      let color = "white";
      if (typed !== undefined) color = typed === char ? "black" : "red";
      return <span key={i} style={{ color }}>{char}</span>;
    });
  }, [currentLine, inputValue]);

  useEffect(() => {
    setCurrentIndex(0);
    setInputValue("");
  }, [currentTypingId, language, isShort]);

  return (
    <S.TypingSection>
      <S.SectionTitle>{coloredLine}</S.SectionTitle>
      <S.InputBox value={inputValue} onChange={onChange} onKeyDown={onKeyDown} />
      <S.SentenceList>{nextLines.map((line, i) => <div key={i}>{line}</div>)}</S.SentenceList>
    </S.TypingSection>
  );
};

export default ShortPractice;
