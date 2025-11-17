import { createContext, useEffect, useState } from "react";

export const TypingContext = createContext()

export const TypingProvider = ({children}) => {

  const [isTypingStart, setIsTypingStart] = useState(false);
  const [runningTime, setRunningTime] = useState(0);

  const [wordCount, setWordCount] = useState(0);
  const [wordPerMinute, setWordPerMinute] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const [isShort, setIsShort] = useState("short")
  const [language, setLanguage] = useState("한국어")
  const [typingList, setTypingList] = useState([])
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentTypingId, setCurrentTypingId] = useState(0)

  // 모달 제어
  const [isShowModal, setIsShowModal] = useState(false);
  const handleShowModal = () => setIsShowModal(!isShowModal)

  
  const value = {
    state: {
      isShort: isShort,
      typingList: typingList,
      isTypingStart: isTypingStart,
      runningTime: runningTime,
      wordCount: wordCount,
      wordPerMinute: wordPerMinute,
      accuracy: accuracy,
      language: language,
      currentTypingId: currentTypingId,
      isShowModal: isShowModal,

    },
    actions: {
      setIsShort: setIsShort,
      setIsUpdate: setIsUpdate,
      setIsTypingStart: setIsTypingStart,
      setRunningTime: setRunningTime,
      setWordCount: setWordCount,
      setWordPerMinute: setWordPerMinute,
      setAccuracy: setAccuracy,
      setLanguage: setLanguage,
      setCurrentTypingId: setCurrentTypingId,
      setIsShowModal: setIsShowModal,
      handleShowModal: handleShowModal
    },
  }

  // 데이터를 요청 후 초기값을 전달하는 것도 가능하다.
  useEffect(() => {
    const getList = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/typing/${isShort}/list?language=${language || "한국어"}`)
      if(!response.ok) throw new Error(`getList fetching error ${response.status}`) 
      const typingList = await response.json()
      const { data } = typingList;
      setTypingList(data)
    }

    getList()
      .catch(console.error)

  }, [isUpdate, language, isShort])

  return (
    <TypingContext.Provider value={value}>
      {children}
    </TypingContext.Provider>
  )

}