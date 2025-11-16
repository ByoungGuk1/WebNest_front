import React, { useEffect, useRef, useState, useMemo } from 'react';
import S from "./style";
import { useSearchParams } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { useSelector } from 'react-redux';

const LongPractice = () => {
  const { 
    setPracticeTime,
    setPracticeAccuracy,
    setPracticeWPM,
    setPracticeFinish
  } = useOutletContext();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  // Redux에서 userId 가져오기
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?.id;

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



  // 정확도 / 타수 계산 
  useEffect(() => {
    // 연습이 완료되면 더 이상 계산하지 않음
    if (isFinished) {
      return;
    }

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
  }, [totalTyped, inputValue, currentTime, fullText, isFinished, setPracticeAccuracy, setPracticeWPM]);


  // 데이터 불러왹
  useEffect(() => {
    if (id) fetchContent();
  }, [id]);

  const fetchContent = async () => {
    try {
      const res = await fetch(`http://localhost:10000/typing/long/${id}`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      const content = data.data;

      const list = (content.subject || "")
        .split("#")
        .filter(v => v.trim() !== "");

      setSentenceList(list);

      // 전체 정답 텍스트 완성
      const joined = [content.title, ...list].join("");
      setFullText(joined);

      // 초기화
      setCurrentText(content.title);
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
      // 에러 발생 시 기본값 설정
      setSentenceList([]);
      setFullText("");
      setCurrentText("");
    }
  };


  //   타이머
  useEffect(() => {
    if (startTime && !isFinished) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => prev + 0.1);
        setPracticeTime(prev => Number((prev + 0.1).toFixed(1)));
      }, 100);
    }

    return () => clearInterval(timerRef.current);
  }, [startTime, isFinished]);


  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (!startTime) setStartTime(Date.now());
  };


  // 엔터로 문장 이동
  const handleKeyDown = async (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    // 방금 입력한 문장을 totalTyped에 누적
    setTotalTyped(prev => prev + inputValue);

    const isLast = currentIndex === sentenceList.length - 1;
    
    console.log("🔥 엔터 입력:", { 
      currentIndex, 
      sentenceListLength: sentenceList.length, 
      isLast,
      inputValueLength: inputValue.length 
    });

    if (isLast) {
      console.log("🔥 마지막 문장 완료!");
      
      // 연습 완료 처리 - 타이머 즉시 정지
      setIsFinished(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // 최종 정확도와 타수 계산 (마지막 문장 포함)
      const finalAllText = totalTyped + inputValue;
      const finalExpectedText = fullText.substring(0, Math.min(finalAllText.length, fullText.length));
      
      let finalCorrect = 0;
      const finalCompareLength = Math.min(finalAllText.length, finalExpectedText.length);
      
      for (let i = 0; i < finalCompareLength; i++) {
        if (finalAllText[i] === finalExpectedText[i]) {
          finalCorrect++;
        }
      }

      const finalAccuracy = finalAllText.length > 0 
        ? Number(((finalCorrect / finalAllText.length) * 100).toFixed(2))
        : 100;

      const timeInMin = currentTime / 60;
      const finalWPM = timeInMin > 0 && finalAllText.length > 0
        ? Number((finalAllText.length / timeInMin).toFixed(2))
        : 0;

      // 최종 시간 
      const finalTime = Number(currentTime.toFixed(1));
      
      console.log("🔥 최종 결과:", { wpm: finalWPM, accuracy: finalAccuracy, time: finalTime });

      // DB에 저장
      const saveAndShowModal = async () => {
        try {
          if (!userId) {
            // console.error("🔥 userId가 없습니다. 로그인이 필요합니다.");
            // userId가 없어도 결과는 표시
            const finishData = {
              wpm: finalWPM,
              accuracy: finalAccuracy,
              time: finalTime
            };
            // console.log("🔥 setPracticeFinish 호출 (userId 없음):", finishData);
            setPracticeFinish(finishData);
            return;
          }

          // 백엔드에 전송할 데이터 준비
          const requestBody = {
            wpm: Number(finalWPM),
            accuracy: Number(finalAccuracy),
            time: Number(finalTime),
            userId: Number(userId),
            typingContentsId: Number(id)
          };
          
          // console.log("🔥 DB 저장 요청 데이터:", requestBody);
          // console.log("🔥 요청 URL:", `http://localhost:10000/typing/save`);

          const response = await fetch(`http://localhost:10000/typing/save`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(requestBody)
          });

          if (response.ok) {
            const result = await response.json();
            // console.log("🔥 결과 저장 성공:", result);
            // 저장된 결과를 부모에게 전달하여 모달 표시
            const finishData = {
              wpm: finalWPM,
              accuracy: finalAccuracy,
              time: finalTime
            };
            // console.log("🔥 setPracticeFinish 호출 (저장 성공):", finishData);
            setPracticeFinish(finishData);
          } else {
            const errorText = await response.text();
            // console.log("🔥 결과 저장 실패 (HTTP 오류):", response.status, errorText);
            // 저장 실패해도 결과는 표시
            const finishData = {
              wpm: finalWPM,
              accuracy: finalAccuracy,
              time: finalTime
            };
            console.log("🔥 setPracticeFinish 호출 (저장 실패):", finishData);
            setPracticeFinish(finishData);
          }
        } catch (error) {
          console.error("🔥 결과 저장 실패 (네트워크 오류):", error);
          // 저장 실패해도 결과는 표시
          const finishData = {
            wpm: finalWPM,
            accuracy: finalAccuracy,
            time: finalTime
          };
          console.log("🔥 setPracticeFinish 호출 (네트워크 오류):", finishData);
          setPracticeFinish(finishData);
        }
      };
      saveAndShowModal();
      return;
    }

    // 다음 문장
    setCurrentIndex(prev => {
      const next = prev + 1;
      setCurrentText(sentenceList[next]);
      return next;
    });

    setInputValue("");
  };


  
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


  return (
    <>
      <S.TypingSection>

        <S.SectionTitle>
          {renderTitle}
        </S.SectionTitle>

        <S.InputWrapper>
          <img src="/assets/icons/pencil.svg" alt="edit" />
          <S.InputBox
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </S.InputWrapper>

        <S.SentenceList>
          {sentenceList.slice(currentIndex + 1, currentIndex + 6).map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </S.SentenceList>

      </S.TypingSection>
    </>
    
  );
};

export default LongPractice;
