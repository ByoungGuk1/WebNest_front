import GameLeftSide from "components/gameleftside/GameLeftSide";
import S from "./style";
import TitleContainer from "./TitleContainer";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useGetUserData from "hooks/useGetUserData";
import ContentContainer from "./ContentContainer";

const LastWordContainer = () => {
  // 유저턴 0 또는 1
  const [turn, setTurn] = useState(1);
  const [message, setMessage] = useState("");
  const subscriptionRef = useRef(null);
  const { currentUser, isLogin } = useGetUserData();

  // roomId와 사용자 정보 가져오기
  const { roomId } = useParams();
  const userSenderId = currentUser?.id;

  const [winning, setWinning] = useState(null);
  // 게임시작버튼 누르면 타이머가동
  const [start, setStart] = useState(false);

  const [wordList, setWordList] = useState([]);
  // 모든 플레이어의 색상을 저장하는 맵 (userId -> color)
  const playersColorMapRef = useRef(new Map());
  // gameState를 저장 (WORD_SUBMITTED 메시지에 gameState가 없을 수 있으므로)
  const gameStateRef = useRef(null);

  // 플레이어 데이터를 가져와서 색상 정보 저장
  useEffect(() => {
    if (!roomId) return;

    const getPlayers = async () => {
      try {
        const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/player/${roomId}`;
        const res = await fetch(fetchUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          return;
        }

        const datas = await res.json();
        const players = datas?.data || [];

        if (!Array.isArray(players)) {
          return;
        }

        // 모든 플레이어의 색상을 맵에 저장
        const colorMap = new Map();
        players.forEach((player) => {
          if (player.userId && player.gameJoinTeamcolor) {
            colorMap.set(String(player.userId), player.gameJoinTeamcolor);
          }
        });
        playersColorMapRef.current = colorMap;
      } catch (error) {
        console.error("getPlayers error:", error);
      }
    };

    getPlayers();

    // 주기적으로 플레이어 데이터 갱신 (색상 변경 감지)
    const interval = setInterval(() => {
      getPlayers();
    }, 3000);

    return () => clearInterval(interval);
  }, [roomId]);

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

              // gameState가 있으면 저장 (WORD_SUBMITTED 메시지에 없을 수 있으므로)
              if (body.gameState) {
                gameStateRef.current = body.gameState;
              }

              const newInputWord = () => {
                if (body.type === "WORD_SUBMITTED") {
                  setWordList((prev) => {
                    const data = {
                      word: body.word,
                      explanation: body.explanation ?? "",
                      color: body.userColor,
                      recentword: true,
                    };

                    prev.map((word) => (word.recentword = false)); // 기존 단어들 포커스 해제

                    const updated = [...prev, data]; // 새 단어 추가

                    if (updated.length < 4) return updated;

                    return updated.slice(updated.length - 3);
                  });
                  return true;
                }
                return false;
              };

              // 게임 상태 업데이트 (턴 정보 등)
              if (newInputWord()) {
                if (body.gameState && Array.isArray(body.gameState)) {
                  const currentPlayer = body.gameState.find(
                    (p) => String(p.userId) === String(userSenderId)
                  );
                  if (currentPlayer) {
                    setTurn(currentPlayer.isGameJoinMyturn ? 1 : 0);
                  }
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

  const startWord = "시작 단어를 입력해 주세요";

  return (
    <S.MainWarp>
      <GameLeftSide />
      <S.LastWordWrap>
        {wordList[wordList.length - 1]?.word ? (
          <TitleContainer word={wordList[wordList.length - 1]?.word} />
        ) : (
          <TitleContainer startWord={startWord} />
        )}
        <S.ContentsWrap>
          {wordList.map((wordVO, index) => {
            return (
              <ContentContainer key={index} wordVO={wordVO}></ContentContainer>
            );
          })}
        </S.ContentsWrap>
      </S.LastWordWrap>
    </S.MainWarp>
  );
};

export default LastWordContainer;
