import React, { useEffect, useState } from 'react';
import S from "./style";
import { useSearchParams } from 'react-router-dom';

const LongPractice = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [inputValue, setInputValue] = useState("");
  const [sentenceList, setSentenceList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState(""); // ⭐ 현재 타이핑해야 할 문장

  useEffect(() => {
    if (id) fetchContent();
  }, [id]);

  const fetchContent = async () => {
    const res = await fetch(`http://localhost:10000/typing/long/${id}`);
    const data = await res.json();
    const content = data.data;

    // 문장 배열 만들기
    const list = (content.subject || "")
      .split("#")
      .filter(v => v.trim() !== "");

    setSentenceList(list);

    // 첫 문장은 "제목"
    setCurrentText(content.title);

    setCurrentIndex(0);
    setInputValue("");
  };

  // 다음 문장들 (currentText 다음 4줄)
  const visibleSentences = sentenceList.slice(currentIndex + 1, currentIndex + 6);

  const renderTitle = () => {
    return currentText.split("").map((char, index) => {
      const typedChar = inputValue[index];
      let color = "white";

      if (typedChar !== undefined) {
        color = typedChar === char ? "black" : "red";
      }

      return <span key={index} style={{ color }}>{char}</span>;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    // 다음 문장으로 넘어감 (정답 판정 X)
    setCurrentIndex(prev => {

      const nextIndex = prev + 1;

      // 다음 문장이 있으면 currentText 업데이트
      if (sentenceList[nextIndex]) {
        setCurrentText(sentenceList[nextIndex]);
      }

      return nextIndex;
    });

    // 입력칸 초기화
    setInputValue("");
  };

  return (
    <>
      <S.TypingSection>

        {/* 현재 타이핑해야 할 문장 */}
        <S.SectionTitle>
          {renderTitle()}
        </S.SectionTitle>

        {/* 입력칸 */}
        <S.InputWrapper>
          <img src="/assets/icons/pencil.svg" alt="edit" />
          <S.InputBox
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </S.InputWrapper>

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

export default LongPractice;
