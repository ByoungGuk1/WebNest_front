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
  const [wordPerMinute, setWordPerMinute] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const [isShort, setIsShort] = useState("short");
  const [language, setLanguage] = useState("한국어");
  const [typingList, setTypingList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentTypingId, setCurrentTypingId] = useState(0);
  const [finalResult, setFinalResult] = useState(null);

  // 모달
  const [isShowModal, setIsShowModal] = useState(false);
  const handleShowModal = () => setIsShowModal(!isShowModal);

  // 정확도
  const [totalTypedCount, setTotalTypedCount] = useState(0);
  const [correctTypedCount, setCorrectTypedCount] = useState(0);


  // 전체 초기화 함수 (다시하기/그만하기에서 사용)
  const resetTyping = () => {
    setIsTypingStart(false);

    setRunningTime({
      totalSeconds: 0,
      minutes: "00",
      seconds: "00",
      millisecond: "00",
    });

    setWordCount(0);
    setWordPerMinute(0);
    setAccuracy(100);
    setTotalTypedCount(0);
    setCorrectTypedCount(0);
    setFinalResult(null);

  };

  // value (state + actions)

  const value = useMemo(
    () => ({
      state: {
        isShort,
        typingList,
        isTypingStart,
        runningTime,
        wordCount,
        wordPerMinute,
        accuracy,
        language,
        currentTypingId,
        isShowModal,
        totalTypedCount,
        correctTypedCount,
        finalResult,
      },
      actions: {
        setIsShort,
        setIsUpdate,
        setIsTypingStart,
        setRunningTime,
        setWordCount,
        setWordPerMinute,
        setAccuracy,
        setLanguage,
        setCurrentTypingId,
        setIsShowModal,
        handleShowModal,
        setTotalTypedCount,
        setCorrectTypedCount,
        setFinalResult,
        resetTyping,
      },
    }),
    [
      isShort,
      typingList,
      isTypingStart,
      runningTime,
      wordCount,
      wordPerMinute,
      accuracy,
      language,
      currentTypingId,
      isShowModal,
      totalTypedCount,
      correctTypedCount,
      resetTyping,
    ]
  );


  useEffect(() => {
    const getList = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/typing/${isShort}/list?language=${
          language || "한국어"
        }`
      );
      if (!response.ok)
        throw new Error(`getList fetching error ${response.status}`);

      const typingList = await response.json();
      const { data } = typingList;
      setTypingList(data);
    };

    getList().catch(console.error);
  }, [isUpdate, language, isShort]);

  return (
    <TypingContext.Provider value={value}>
      {children}
    </TypingContext.Provider>
  );
};
