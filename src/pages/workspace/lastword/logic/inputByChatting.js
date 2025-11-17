import { useEffect, useRef } from "react";

export const setupChattingSubscription = (
  client,
  roomId,
  onMessageReceived,
  onGameStart,
  onCountdownStart
) => {
  return client.subscribe(`/sub/chats/room/${roomId}`, (message) => {
    const body = JSON.parse(message.body);

    if (body.chatMessageType === "GAME_START") {
      if (onGameStart && body.gameStartTime && body.startWord) {
        onGameStart({
          gameStartTime: body.gameStartTime,
          startWord: body.startWord,
        });
      }
      return;
    }

    if (body.chatMessageType === "MESSAGE") {
      if (body.chatMessageContent?.startsWith("__COUNTDOWN_START__")) {
        if (onCountdownStart) {
          onCountdownStart();
        }
        return;
      }

      if (body.chatMessageContent?.startsWith("__GAME_START__")) {
        try {
          const contentWithoutPrefix = body.chatMessageContent.replace(
            "__GAME_START__",
            ""
          );
          const gameData = JSON.parse(contentWithoutPrefix);
          if (onGameStart && gameData.gameStartTime && gameData.startWord) {
            const gameStartTimestamp = Number(gameData.gameStartTime);
            if (!isNaN(gameStartTimestamp)) {
              onGameStart({
                gameStartTime: gameStartTimestamp,
                startWord: gameData.startWord,
              });
            }
          }
        } catch (error) {
          console.error("GAME_START 파싱 실패:", error);
        }
        return;
      }
    }

    if (body.chatMessageType !== "MESSAGE") return;

    onMessageReceived({
      userSenderId: body.userSenderId,
      chatMessageContent: body.chatMessageContent,
      userSenderTeamcolor: body.userSenderTeamcolor,
    });
  });
};

export const useChattingSubscription = (
  roomId,
  onMessageReceived,
  onGameStart,
  onCountdownStart
) => {
  const onMessageReceivedRef = useRef(onMessageReceived);
  const onGameStartRef = useRef(onGameStart);
  const onCountdownStartRef = useRef(onCountdownStart);

  useEffect(() => {
    onMessageReceivedRef.current = onMessageReceived;
  }, [onMessageReceived]);

  useEffect(() => {
    onGameStartRef.current = onGameStart;
  }, [onGameStart]);

  useEffect(() => {
    onCountdownStartRef.current = onCountdownStart;
  }, [onCountdownStart]);

  useEffect(() => {
    let subscription = null;
    let checkConnection = null;

    const setupSubscription = (client) => {
      subscription?.unsubscribe();
      subscription = setupChattingSubscription(
        client,
        roomId,
        (message) => {
          onMessageReceivedRef.current(message);
        },
        (gameStartData) => {
          onGameStartRef.current?.(gameStartData);
        },
        () => {
          onCountdownStartRef.current?.();
        }
      );
    };

    const stompClient = window.stompClientRef?.current;
    if (stompClient?.connected) {
      setupSubscription(stompClient);
    } else {
      checkConnection = setInterval(() => {
        const client = window.stompClientRef?.current;
        if (client?.connected) {
          clearInterval(checkConnection);
          setupSubscription(client);
        }
      }, 500);
    }

    return () => {
      subscription?.unsubscribe();
      if (checkConnection) clearInterval(checkConnection);
    };
  }, [roomId]);
};
