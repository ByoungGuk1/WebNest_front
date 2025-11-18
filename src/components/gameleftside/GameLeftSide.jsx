import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import S from "./style";

const GameLeftSide = (props) => {
  // 시간/초초
  const timeoutSec = props.timeoutSec === undefined ? 30 : props.timeoutSec;

  // 유저턴 0 또는 1
  const [turn, setTurn] = useState(1);
  const [message, setMessage] = useState("끝말잇기! 시-작!!");
  const [inGameMessage, setInGameMessage] = useState("게임 시작");
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const remainingRef = useRef(timeoutSec);
  const subscriptionRef = useRef(null);
  const [remaining, setRemaining] = useState(timeoutSec);

  // roomId와 사용자 정보 가져오기
  const { roomId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userSenderId = currentUser?.id;
  const userNickname = currentUser?.userNickname;

  const [winning, setWinning] = useState(null);
  // 게임시작버튼 누르면 타이머가동
  const [start, setStart] = useState(false);

  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // 게임 시작 알림 구독
  useEffect(() => {
    if (!roomId) return;

    // 소켓 연결 확인 함수
    const setupSubscription = () => {
      const stompClient = window.stompClientRef?.current;

      // 소켓이 없거나 연결되지 않았으면 나중에 다시 시도
      if (!stompClient || !stompClient.connected) {
        return false;
      }

      // 이미 구독 중이면 중복 구독 방지
      if (subscriptionRef.current) {
        return true;
      }

      // 게임 상태 구독 (게임 시작 알림 받기)
      try {
        const subscription = stompClient.subscribe(
          `/sub/game/last-word/room/${roomId}`,
          (message) => {
            try {
              const body = JSON.parse(message.body);

              // // 수신된 결과를 S.MsgBody에 출력
              // // JSON 문자열로 변환하여 표시 (가독성을 위해 포맷팅)
              // const formattedMessage = JSON.stringify(body, null, 2);
              // setMessage(formattedMessage);

              if (body.type === "WORD_SUBMITTED")
                setWordList((prev) => {
                  const updated = [...prev, body.word]; // 새 단어 추가

                  if (updated.length < 7) return updated;

                  return updated.slice(updated.length - 6);
                });

              // 게임 시작 알림 받으면 타이머 시작
              if (body.type === "GAME_STARTED") {
                setStart(true);
                setInGameMessage("게임 진행 중");
              }

              // 게임 상태 업데이트 (턴 정보 등)
              if (body.gameState && Array.isArray(body.gameState)) {
                const currentPlayer = body.gameState.find(
                  (p) => String(p.userId) === String(userSenderId)
                );
                if (currentPlayer) {
                  setTurn(currentPlayer.isGameJoinMyturn ? 1 : 0);
                }
              }
            } catch (error) {
              console.error("게임 상태 파싱 오류:", error);
              setMessage(`오류: ${error.message}`);
            }
          }
        );
        subscriptionRef.current = subscription;
        return true;
      } catch (error) {
        console.error("구독 설정 오류:", error);
        return false;
      }
    };

    // 즉시 시도
    let isSubscribed = setupSubscription();

    // 소켓이 아직 연결되지 않았으면 주기적으로 확인
    let retryInterval = null;
    if (!isSubscribed) {
      retryInterval = setInterval(() => {
        isSubscribed = setupSubscription();
        if (isSubscribed && retryInterval) {
          clearInterval(retryInterval);
          retryInterval = null;
        }
      }, 500); // 0.5초마다 확인
    }

    return () => {
      if (retryInterval) {
        clearInterval(retryInterval);
      }
      if (subscriptionRef.current) {
        try {
          subscriptionRef.current.unsubscribe();
          subscriptionRef.current = null;
        } catch (error) {
          console.error("구독 해제 오류:", error);
        }
      }
    };
  }, [roomId, userSenderId]);

  function clearTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }
  // 타이머
  function startTimer(start) {
    if (start) {
      clearTimer();
      remainingRef.current = timeoutSec;
      setRemaining(timeoutSec);
      timerRef.current = setInterval(() => {
        remainingRef.current -= 1;
        setRemaining(remainingRef.current);
        if (remainingRef.current <= 0) {
          clearTimer();
        }
        // 1초마다
      }, 1000);
    }
  }

  // start state가 변경될 때 타이머 시작/중지
  useEffect(() => {
    startTimer(start);
    return () => clearTimer();
  }, [start]);

  // 입력값을 받고 핸들링
  function handleSubmit(e) {
    // 걸려있는 이벤트 무효화
    e.preventDefault();

    // 입력값 검증
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      setMessage("단어를 입력해주세요.");
      return;
    }

    if (isSubmitting) {
      return;
    }

    if (!roomId || !userSenderId) {
      setMessage("게임방 정보를 불러올 수 없습니다.");
      return;
    }

    // 소켓 연결 확인
    const stompClient = window.stompClientRef?.current;
    if (!stompClient || !stompClient.connected) {
      setMessage("서버에 연결되지 않았습니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const submitMessage = {
        userId: userSenderId,
        gameRoomId: Number(roomId),
        word: trimmedValue,
      };

      stompClient.publish({
        destination: "/pub/game/last-word/submit",
        body: JSON.stringify(submitMessage),
      });

      // 채팅으로도 알림 전송 (선택사항)
      const chatMessage = {
        gameRoomId: Number(roomId),
        userSenderId: userSenderId,
        userReceiverId: null,
        chatMessageContent: `${userNickname}님이 "${trimmedValue}"를 제출했습니다.`,
        chatMessageType: "LASTWORD_SUBMIT",
      };

      stompClient.publish({
        destination: "/pub/chats/send",
        body: JSON.stringify(chatMessage),
      });

      setMessage(`${trimmedValue} 제출 완료!`);

      // 입력값 초기화
      setInputValue("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (error) {
      console.error("단어 제출 오류:", error);
      setMessage("단어 제출 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // 위 함수 실행시키는 함수수
  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit(e);
  }

  return (
    <S.LeftPanel>
      <S.Logo>WebNest</S.Logo>
      <S.Timer>{String(remaining).padStart(2, "0")}초</S.Timer>
      <S.Day></S.Day>

      <S.HelpBlock>
        <S.HelpTitle>설명</S.HelpTitle>
        <S.HelpText>끝말잇기와 비슷하게 생각해주세요.</S.HelpText>
        <S.HelpText>선택한 언어에 따라</S.HelpText>
        <S.HelpText>맞는 키워드를 입력해주세요</S.HelpText>
        <S.HelpText>ex) JAVA : Integer -> return</S.HelpText>
      </S.HelpBlock>

      <S.Form onSubmit={handleSubmit}>
        <S.Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ex) const"
          autoComplete="off"
          disabled={isSubmitting}
        />
        <S.Submit type="submit" disabled={isSubmitting}>
          {isSubmitting ? "제출 중..." : "입력"}
        </S.Submit>
      </S.Form>

      <S.MessageBox>
        <S.MsgHeader>log</S.MsgHeader>
        <S.MsgBody>{message}</S.MsgBody>
        {wordList.map((word, index) => {
          return <S.MsgBody key={index}>{word}</S.MsgBody>;
        })}
      </S.MessageBox>
    </S.LeftPanel>
  );
};

export default GameLeftSide;
