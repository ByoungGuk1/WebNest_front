import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import S from "./style";
import useGetUserData from "hooks/useGetUserData";

import ContentsContainer from "./contents/ContentsContainer";
import MainContainer from "./header/MainContainer";

import { processWordChain, getLastWord } from "./logic/LastWordLogic";
import { useChattingSubscription } from "./logic/inputByChatting";
import {
  checkAllPlayersReady,
  updateAllUsersStatus,
  selectRandomWord,
  getPlayers,
} from "./logic/players";

const LastWordContainer = () => {
  const [startWord, setStartWord] = useState("");
  const [inputWord, setInputWord] = useState("");
  const [datas, setDatas] = useState([]);
  const [gameKey, setGameKey] = useState(0);
  const [gameStatus, setGameStatus] = useState("waiting");
  const [countdown, setCountdown] = useState(null);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const { roomId } = useParams();
  const { currentUser } = useGetUserData();

  const startWordRef = useRef("");
  const inputWordRef = useRef("");
  const countdownIntervalRef = useRef(null);

  const dummyWordList = [
    "이발소",
    "도서관",
    "학교",
    "병원",
    "은행",
    "우체국",
    "약국",
    "마트",
    "식당",
    "카페",
    "공원",
    "영화관",
    "서점",
    "미용실",
    "세탁소",
    "주유소",
    "편의점",
    "백화점",
    "시장",
    "놀이터",
    "체육관",
    "수영장",
    "박물관",
    "미술관",
    "극장",
    "콘서트",
    "축제",
    "여행",
    "휴가",
    "방학",
    "친구",
    "가족",
    "선생님",
    "학생",
    "의사",
    "간호사",
    "요리사",
    "운전사",
    "기자",
    "변호사",
    "경찰",
    "소방관",
    "군인",
    "선수",
    "가수",
    "배우",
    "작가",
    "화가",
    "음악가",
    "무용가",
    "연기자",
    "코미디언",
    "아나운서",
  ];

  const startGame = useCallback(
    (startTime, word) => {
      const selectedWord = word || selectRandomWord(dummyWordList);
      const startTimestamp = startTime || Date.now();

      setStartWord(selectedWord);
      setInputWord(selectedWord);
      setDatas([]);
      setGameStartTime(startTimestamp);
      setGameStatus("playing");
      setGameKey((prev) => prev + 1);
      startWordRef.current = selectedWord;
      inputWordRef.current = selectedWord;

      if (isHost && !word) {
        const stompClient = window.stompClientRef?.current;
        if (stompClient?.connected) {
          const gameStartData = JSON.stringify({
            gameStartTime: startTimestamp,
            startWord: selectedWord,
          });

          const gameStartMessage = {
            gameRoomId: roomId,
            userSenderId: currentUser?.id || currentUser?.userId,
            chatMessageType: "MESSAGE",
            chatMessageContent: `__GAME_START__${gameStartData}`,
            userSenderTeamcolor: "system",
          };

          try {
            stompClient.publish({
              destination: "/pub/chats/send",
              body: JSON.stringify(gameStartMessage),
            });
          } catch (error) {
            console.error("GAME_START 메시지 전송 실패:", error);
          }
        }
      }
    },
    [isHost, roomId, currentUser]
  );

  const startCountdown = useCallback(() => {
    setCountdown(3);
    setGameStatus("counting");

    if (isHost) {
      const stompClient = window.stompClientRef?.current;
      if (stompClient?.connected) {
        const countdownMessage = {
          gameRoomId: roomId,
          userSenderId: currentUser?.id || currentUser?.userId,
          chatMessageType: "MESSAGE",
          chatMessageContent: `__COUNTDOWN_START__`,
          userSenderTeamcolor: "system",
        };

        try {
          stompClient.publish({
            destination: "/pub/chats/send",
            body: JSON.stringify(countdownMessage),
          });
        } catch (error) {
          console.error("COUNTDOWN_START 메시지 전송 실패:", error);
        }
      }
    }

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          startGame();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, [startGame, isHost, roomId, currentUser]);

  useEffect(() => {
    const checkHostStatus = async () => {
      const players = await getPlayers(roomId);
      if (!players?.length) return;

      const currentUserId = currentUser?.id || currentUser?.userId;
      const currentPlayer = players.find(
        (p) => String(p.userId) === String(currentUserId)
      );
      setIsHost(currentPlayer?.gameJoinIsHost || false);
    };

    if (roomId && currentUser) {
      checkHostStatus();
      const interval = setInterval(checkHostStatus, 3000);
      return () => clearInterval(interval);
    }
  }, [roomId, currentUser]);

  useEffect(() => {
    if (gameStatus !== "waiting" || !isHost) return;

    const checkReadyStatus = async () => {
      const allReady = await checkAllPlayersReady(roomId);
      if (allReady) {
        startCountdown();
      }
    };

    const interval = setInterval(checkReadyStatus, 1000);
    return () => clearInterval(interval);
  }, [gameStatus, roomId, startCountdown, isHost]);

  useEffect(() => {
    startWordRef.current = startWord;
  }, [startWord]);

  useEffect(() => {
    inputWordRef.current = inputWord;
  }, [inputWord]);

  const handleChatMessage = useCallback(
    (chatData) => {
      if (gameStatus !== "playing") return;

      setDatas((prev) => {
        const savedChatData = processWordChain(
          chatData,
          prev,
          getLastWord(inputWordRef.current, prev, startWordRef.current),
          startWordRef.current
        );

        if (savedChatData) {
          setInputWord(savedChatData.chatMessageContent);
          return [...prev, savedChatData];
        }
        return prev;
      });
    },
    [gameStatus]
  );

  const handleCountdownStart = useCallback(() => {
    if (gameStatus === "waiting") {
      setCountdown(3);
      setGameStatus("counting");

      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [gameStatus]);

  const handleGameStart = useCallback(
    (gameStartData) => {
      if (!gameStartData?.gameStartTime || !gameStartData?.startWord) {
        return;
      }

      const gameStartTimestamp = Number(gameStartData.gameStartTime);
      if (isNaN(gameStartTimestamp)) {
        console.error("Invalid gameStartTime:", gameStartData.gameStartTime);
        return;
      }

      setCountdown(null);
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
      startGame(gameStartTimestamp, gameStartData.startWord);
    },
    [startGame]
  );

  useChattingSubscription(
    roomId,
    handleChatMessage,
    handleGameStart,
    handleCountdownStart
  );

  const handleTimeUp = useCallback(async () => {
    setGameStatus("ended");
    await updateAllUsersStatus(roomId, "준비중", false);

    setTimeout(() => {
      setGameStatus("waiting");
      setStartWord("");
      setInputWord("");
      setDatas([]);
      setGameStartTime(null);
    }, 3000);
  }, [roomId]);

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  return (
    <S.MainWrapper>
      {countdown !== null && (
        <S.CountdownOverlay>
          <S.CountdownText>{countdown}</S.CountdownText>
        </S.CountdownOverlay>
      )}
      <MainContainer
        startWord={startWord}
        inputWord={inputWord}
        datas={datas}
        onTimeUp={handleTimeUp}
        gameKey={gameKey}
        gameStatus={gameStatus}
        gameStartTime={gameStartTime}
      />
      <ContentsContainer datas={datas} />
    </S.MainWrapper>
  );
};

export default LastWordContainer;
