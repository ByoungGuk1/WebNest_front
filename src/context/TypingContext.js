import { createContext, useEffect, useState, useMemo } from "react";

export const TypingContext = createContext();

export const TypingProvider = ({ children }) => {
  const [isTypingStart, setIsTypingStart] = useState(false);
  const [runningTime, setRunningTime] = useState({
    totalSeconds: 0,
    minutes: "00",
    seconds: "00",
    millisecond: "00",
  });
  const [wordCount, setWordCount] = useState(0);
  const [totalTypedCount, setTotalTypedCount] = useState(0);
  const [totalCorrectCount, setTotalCorrectCount] = useState(0);
  const [totalWrongCount, setTotalWrongCount] = useState(0);
  const [isShort, setIsShort] = useState("short");
  const [language, setLanguage] = useState("한국어");
  const [typingList, setTypingList] = useState([]);
  const [currentTypingId, setCurrentTypingId] = useState(0);
  const [finalResult, setFinalResult] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const handleShowModal = () => setIsShowModal(!isShowModal);

  const resetTyping = () => {
    setIsTypingStart(false);
    setRunningTime({ totalSeconds: 0, minutes: "00", seconds: "00", millisecond: "00" });
    setWordCount(0);
    setTotalTypedCount(0);
    setTotalCorrectCount(0);
    setTotalWrongCount(0);
    setFinalResult(null);
  };

  useEffect(() => {
    let intervalId;
    if (isTypingStart) {
      intervalId = setInterval(() => {
        setRunningTime(prev => {
          const totalSeconds = prev.totalSeconds + 0.1;
          const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
          const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, "0");
          const millisecond = String(Math.floor((totalSeconds % 1) * 100)).padStart(2, "0");
          return { totalSeconds, minutes, seconds, millisecond };
        });
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [isTypingStart]);

  // 초기 데이터 fetch
  useEffect(() => {
    const getList = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/typing/${isShort}/list?language=${language}`);
      if (!response.ok) throw new Error(`getList fetching error ${response.status}`);
      const { data } = await response.json();
      setTypingList(data);
    };
    getList().catch(console.error);
  }, [isShort, language]);

  // context value
  const value = useMemo(() => ({
    state: {
      isShort,
      typingList,
      isTypingStart,
      runningTime,
      wordCount,
      language,
      currentTypingId,
      isShowModal,
      totalTypedCount,
      totalCorrectCount,
      totalWrongCount,
      finalResult,
    },
    actions: {
      setIsShort,
      setIsTypingStart,
      setWordCount,
      setLanguage,
      setCurrentTypingId,
      setIsShowModal,
      handleShowModal,
      setTotalTypedCount,
      setTotalCorrectCount,
      setTotalWrongCount,
      setFinalResult,
      resetTyping,
      setRunningTime,
    },
  }), [typingList, isTypingStart, runningTime, wordCount, language, currentTypingId, isShowModal, totalTypedCount, totalCorrectCount, totalWrongCount, finalResult]);

  return (
    <TypingContext.Provider value={value}>
      {children}
    </TypingContext.Provider>
  );
};
