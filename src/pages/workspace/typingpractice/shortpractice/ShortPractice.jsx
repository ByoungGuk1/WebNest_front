import React, { useEffect, useRef, useState, useMemo } from 'react';
import S from "./style";
import { useSearchParams } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";

const ShortPractice = () => {
  const { 
    setPracticeTime,
    setPracticeAccuracy,
    setPracticeWPM
  } = useOutletContext();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [inputValue, setInputValue] = useState("");
  const [sentenceList, setSentenceList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState(""); 

  // 타이머
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef(null);

  // 누적 입력 (완료된 문장들)
  const [totalTyped, setTotalTyped] = useState("");

  // 전체 정답 텍스트 (제목 + 본문)
  const [fullText, setFullText] = useState("");

  // 이전 계산값 저장 (불필요한 업데이트 방지)
  const prevAccuracyRef = useRef(100);
  const prevWPMRef = useRef(0);

 
  //  정확도 / 타수 계산
  useEffect(() => {
    // 현재까지 입력한 전체 텍스트 (완료된 문장 + 현재 입력 중인 문장)
    const currentAllText = totalTyped + inputValue;
    
    // 입력이 없으면 계산하지 않음
    if (currentAllText.length === 0) {
      if (prevAccuracyRef.current !== 100 || prevWPMRef.current !== 0) {
        setPracticeAccuracy(100);
        setPracticeWPM(0);
        prevAccuracyRef.current = 100;
        prevWPMRef.current = 0;
      }
      return;
    }

    // 총 입력한 글자 수
    const totalTypedLength = currentAllText.length;

    // 현재까지 입력해야 할 정답 텍스트 (fullText의 처음부터 총 입력 길이만큼)
    const expectedText = fullText.substring(0, Math.min(totalTypedLength, fullText.length));

    // 정확도 계산: 정확히 입력한 글자 수 / 총 입력한 글자 수
    let correct = 0;
    const compareLength = Math.min(currentAllText.length, expectedText.length);
    
    for (let i = 0; i < compareLength; i++) {
      if (currentAllText[i] === expectedText[i]) {
        correct++;
      }
    }

    // 정확도 = (정확히 입력한 글자 수 / 총 입력한 글자 수) * 100
    const accuracy = totalTypedLength > 0 
      ? Number(((correct / totalTypedLength) * 100).toFixed(2))
      : 100;

    // 타수 계산 (한국어 기준: 글자 수 / 분)
    const timeInMin = currentTime / 60;
    const wpm = timeInMin > 0 && totalTypedLength > 0
      ? Number((totalTypedLength / timeInMin).toFixed(2))
      : 0;

    // 값이 변경된 경우에만 업데이트 (불필요한 리렌더링 방지)
    if (Math.abs(prevAccuracyRef.current - accuracy) > 0.01) {
      setPracticeAccuracy(accuracy);
      prevAccuracyRef.current = accuracy;
    }

    if (Math.abs(prevWPMRef.current - wpm) > 0.01) {
      setPracticeWPM(wpm);
      prevWPMRef.current = wpm;
    }
  }, [totalTyped, inputValue, currentTime, fullText, setPracticeAccuracy, setPracticeWPM]);


  //  데이터 불러오기
  useEffect(() => {
    if (id) fetchContent();
  }, [id]);

  const fetchContent = async () => {
    try {
      const res = await fetch(`http://localhost:10000/typing/short/${id}`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      const content = data.data;

      const list = (content.subject || "")
        .split("#")
        .filter(v => v.trim() !== "");

      setSentenceList(list);

      const joined = [content.title, ...list].join("");
      setFullText(joined);

      setCurrentText(content.title);

      // 초기화
      setCurrentIndex(0);
      setInputValue("");
      setTotalTyped("");
      setStartTime(null);
      setPracticeTime(0);
      setCurrentTime(0);
      setIsFinished(false);
      setPracticeAccuracy(100);
      setPracticeWPM(0);
      prevAccuracyRef.current = 100;
      prevWPMRef.current = 0;
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      setSentenceList([]);
      setFullText("");
      setCurrentText("");
    }
  };



  //  타이머

  useEffect(() => {
    if (startTime && !isFinished) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => prev + 0.1);
        setPracticeTime(prev => Number((prev + 0.1).toFixed(1)));
      }, 100);
    }

    return () => clearInterval(timerRef.current);
  }, [startTime, isFinished, setPracticeTime]);

  // 다음 문장들 (currentText 다음 4줄)
  const visibleSentences = sentenceList.slice(currentIndex + 1, currentIndex + 6);

  
  //  문장 비교 
  const renderTitle = useMemo(() => {
    return currentText.split("").map((char, index) => {
      const typedChar = inputValue[index];
      let color = "white";

      if (typedChar !== undefined) {
        color = typedChar === char ? "black" : "red";
      }

      return <span key={index} style={{ color }}>{char}</span>;
    });
  }, [currentText, inputValue]);


  //  입력 처리
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (!startTime) setStartTime(Date.now());
  };


  //  엔터로 문장 이동
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    // 방금 입력한 문장을 totalTyped에 누적
    setTotalTyped(prev => prev + inputValue);

    // 다음 문장으로 넘어감
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;

      // 다음 문장이 있으면 currentText 업데이트
      if (sentenceList[nextIndex]) {
        setCurrentText(sentenceList[nextIndex]);
      } else {
        // 마지막 문장이면 완료 처리
        setIsFinished(true);
        clearInterval(timerRef.current);
      }

      return nextIndex;
    });
    setInputValue("");
  };

  return (
    <>
      <S.TypingSection>

        {/* 현재 타이핑해야 할 문장 */}
        <S.SectionTitle>
          {renderTitle}
        </S.SectionTitle>

        {/* 입력칸 */}
          <S.InputBox
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        

        {/* 다음 문장 4개 */}
        <S.SentenceList>
          {visibleSentences.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </S.SentenceList>

      </S.TypingSection>
    </>
    
  );
};

export default ShortPractice;
