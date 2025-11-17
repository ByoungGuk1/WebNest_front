import React, { useEffect, useRef, useState, useMemo } from 'react';
import S from "./style";
import { useSearchParams } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { useSelector } from 'react-redux';

const ShortPractice = () => {
  const { 
    setPracticeTime,
    setPracticeAccuracy,
    setPracticeWPM,
    setPracticeFinish
  } = useOutletContext();
  
  // Redux에서 userId 가져오기
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?.id;

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
  
  // 오타 발생 여부 추적 (한 번이라도 틀리면 100% 불가능)
  const hasWrongTypedRef = useRef(false);
  
  // 타이머 업데이트 최적화를 위한 ref
  const lastUpdateTimeRef = useRef(0);

 
  // C 코드 방식: 정확도 / 타수 계산 (오타 개수 기반)
  useEffect(() => {
    // 연습이 완료되면 더 이상 계산하지 않음
    if (isFinished) {
      return;
    }

    // 전체 정답 텍스트 길이 (C 코드의 30에 해당 - 고정값)
    const totalLength = fullText.length;
    
    // 입력이 없으면 계산하지 않음
    if (totalLength === 0) {
      return;
    }

    // 현재까지 입력한 전체 텍스트 (완료된 문장 + 현재 입력 중인 문장)
    const currentAllText = totalTyped + inputValue;
    const typedLength = currentAllText.length; // 입력한 글자 수
    
    // 상태 업데이트를 다음 틱으로 지연 (렌더링 중 상태 업데이트 방지)
    const updateState = () => {
      // 입력이 없으면 100% 유지
      if (typedLength === 0) {
        if (prevAccuracyRef.current !== 100) {
          setPracticeAccuracy(100);
          prevAccuracyRef.current = 100;
          hasWrongTypedRef.current = false; // 초기화
        }
      } else {
        // 맞게 입력한 글자 수 세기
        let correctCount = 0;
        const compareLength = Math.min(typedLength, totalLength);
        
        for (let i = 0; i < compareLength; i++) {
          if (currentAllText[i] === fullText[i]) {
            correctCount++;
          } else {
            // 오타 발생 - 한 번이라도 틀리면 100% 불가능
            hasWrongTypedRef.current = true;
          }
        }
        
        // 정확도 계산: (맞게 입력한 글자 수 ÷ 입력한 글자 수) × 100
        // 이렇게 하면 입력이 적을 때도 정확도가 급격히 떨어지지 않음
        // 예: 10자 입력했는데 1자 틀리면 (9/10) × 100 = 90%
        // 예: 100자 입력했는데 1자 틀리면 (99/100) × 100 = 99%
        const accuracy = typedLength > 0 
          ? Number(((correctCount / typedLength) * 100).toFixed(2))
          : 100;
        
        // 값이 변경된 경우에만 업데이트 (불필요한 리렌더링 방지)
        if (Math.abs(prevAccuracyRef.current - accuracy) > 0.01) {
          setPracticeAccuracy(accuracy);
          prevAccuracyRef.current = accuracy;
        }
      }

      // C 코드 방식: 타수 = (60초 / 소요시간) * 총 글자 수 = (총 글자 수 / 분)
      // C 코드: (60 / t) * 30
      const timeInMin = currentTime / 60;
      const wpm = timeInMin > 0 && totalLength > 0
        ? Number((totalLength / timeInMin).toFixed(2))
        : 0;

      // 값이 변경된 경우에만 업데이트 (불필요한 리렌더링 방지)
      if (Math.abs(prevWPMRef.current - wpm) > 0.01) {
        setPracticeWPM(wpm);
        prevWPMRef.current = wpm;
      }
    };

    // 다음 이벤트 루프에서 실행 (렌더링 중 상태 업데이트 방지)
    const timeoutId = setTimeout(updateState, 0);
    
    return () => clearTimeout(timeoutId);
  }, [totalTyped, inputValue, currentTime, fullText, isFinished, setPracticeAccuracy, setPracticeWPM]);


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
      hasWrongTypedRef.current = false;
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
      lastUpdateTimeRef.current = 0;
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 0.1;
          const roundedTime = Number(newTime.toFixed(1));
          // 부모 컴포넌트 업데이트는 0.5초마다만 (화면 흔들림 방지)
          if (roundedTime - lastUpdateTimeRef.current >= 0.5) {
            setPracticeTime(roundedTime);
            lastUpdateTimeRef.current = roundedTime;
          }
          return newTime;
        });
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      lastUpdateTimeRef.current = 0;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [startTime, isFinished]);

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
  const handleKeyDown = async (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    // 방금 입력한 문장을 totalTyped에 누적
    setTotalTyped(prev => prev + inputValue);

    const isLast = currentIndex === sentenceList.length - 1;

    if (isLast) {
      console.log("🔥 짧은글 마지막 문장 완료!");
      
      // 연습 완료 처리 - 타이머 즉시 정지
      setIsFinished(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // 최종 정확도와 타수 계산
      const finalAllText = totalTyped + inputValue;
      const totalLength = fullText.length; // 제시된 글자 수
      
      // 맞게 입력한 글자 수 세기
      let correctCount = 0;
      const compareLength = Math.min(finalAllText.length, totalLength);
      
      for (let i = 0; i < compareLength; i++) {
        if (finalAllText[i] === fullText[i]) {
          correctCount++;
        }
      }
      
      // 타자연습 정확도 산출 방법: 정확도(%) = (맞게 입력한 글자 수 ÷ 제시된 글자 수) × 100
      const finalAccuracy = totalLength > 0 
        ? Number(((correctCount / totalLength) * 100).toFixed(2))
        : 100;

      // C 코드 방식: 타수 = (총 글자 수 / 분)
      const timeInMin = currentTime / 60;
      const finalWPM = timeInMin > 0 && totalLength > 0
        ? Number((totalLength / timeInMin).toFixed(2))
        : 0;

      const finalTime = Number(currentTime.toFixed(1));
      
      console.log("🔥 짧은글 최종 결과:", { wpm: finalWPM, accuracy: finalAccuracy, time: finalTime });

      // DB에 저장 후 모달 표시
      const saveAndShowModal = async () => {
        try {
          if (!userId) {
            console.error("🔥 userId가 없습니다. 로그인이 필요합니다.");
            const finishData = {
              wpm: finalWPM,
              accuracy: finalAccuracy,
              time: finalTime
            };
            console.log("🔥 setPracticeFinish 호출 (userId 없음):", finishData);
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
          
          console.log("🔥 DB 저장 요청 데이터:", requestBody);

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
            console.log("🔥 결과 저장 성공:", result);
            const finishData = {
              wpm: finalWPM,
              accuracy: finalAccuracy,
              time: finalTime
            };
            console.log("🔥 setPracticeFinish 호출 (저장 성공):", finishData);
            setPracticeFinish(finishData);
          } else {
            const errorText = await response.text();
            console.log("🔥 결과 저장 실패 (HTTP 오류):", response.status, errorText);
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

    // 다음 문장으로 넘어감
    setCurrentIndex(prev => {
      const nextIndex = prev + 1;

      // 다음 문장이 있으면 currentText 업데이트
      if (sentenceList[nextIndex]) {
        setCurrentText(sentenceList[nextIndex]);
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
