import { useState, useEffect, useRef } from "react";

const INITIAL_TIME_SECONDS = 30;
const UPDATE_INTERVAL = 100;
const SPEED_MULTIPLIER = 0.15;

export const useTimeLimit = (
  datas,
  onTimeUp,
  gameKey,
  gameStatus,
  gameStartTime
) => {
  const [timeRemaining, setTimeRemaining] = useState(100);
  const intervalRef = useRef(null);
  const onTimeUpRef = useRef(onTimeUp);
  const datasLengthRef = useRef(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    datasLengthRef.current = datas.length;
  }, [datas.length]);

  useEffect(() => {
    if (gameStatus === "playing" && gameStartTime) {
      startTimeRef.current = gameStartTime;
      setTimeRemaining(100);
    } else if (gameStatus !== "playing") {
      startTimeRef.current = null;
    }
  }, [gameKey, gameStatus, gameStartTime]);

  useEffect(() => {
    if (gameStatus !== "playing" || !startTimeRef.current) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const calculateTimeRemaining = () => {
      const now = Date.now();
      const elapsed = (now - startTimeRef.current) / 1000;
      const speed = 1 + datasLengthRef.current * SPEED_MULTIPLIER;
      const adjustedElapsed = elapsed * speed;
      const remaining = Math.max(0, INITIAL_TIME_SECONDS - adjustedElapsed);
      const percentage = (remaining / INITIAL_TIME_SECONDS) * 100;

      return { remaining, percentage };
    };

    intervalRef.current = setInterval(() => {
      const { remaining, percentage } = calculateTimeRemaining();
      setTimeRemaining(Math.max(0, percentage));

      if (remaining <= 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setTimeRemaining(0);
        onTimeUpRef.current?.();
      }
    }, UPDATE_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [gameStatus, gameKey, gameStartTime]);

  return timeRemaining;
};
