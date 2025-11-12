// BoardOnly.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import S from "./style";

const SnakePuzzleContainer = () => {
  // 10x10 뷰 순서(지그재그)로 정렬된 숫자 배열 생성
  // 말판 부분
  const cells = useMemo(() => {
    const gather = [];
    for (let row = 9; row >= 0; row--) {
      const start = row * 10 + 1;
      const end = row * 10 + 10;
      const rowNums =
        ((9 - row) % 2 === 0) // 화면에서 아래쪽(첫 줄)이 왼→오
          ? Array.from({ length: 10 }, (_, i) => start + i)
          : Array.from({ length: 10 }, (_, i) => end - i);
      gather.push(...rowNums);
    }
    return gather;
  }, []);

  const [diceFaces, setDiceFaces] = useState([]);
  const [isRolling, setIsRolling] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const rollTimerRef = useRef(null);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (rollTimerRef.current) window.clearTimeout(rollTimerRef.current);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  const generateDiceFaces = () => {
    const positions = [];
    const minGap = 18; // 퍼센트 거리 최소값

    const createPos = () => ({
      top: Math.random() * 70 + 15,
      left: Math.random() * 70 + 15,
    });

    while (positions.length < 2) {
      let candidate = createPos();
      let isTooClose = positions.some(
        (pos) =>
          Math.hypot(pos.top - candidate.top, pos.left - candidate.left) < minGap
      );

      let guard = 0;
      while (isTooClose && guard < 12) {
        candidate = createPos();
        isTooClose = positions.some(
          (pos) =>
            Math.hypot(pos.top - candidate.top, pos.left - candidate.left) < minGap
        );
        guard += 1;
      }

      positions.push(candidate);
    }

    const now = Date.now();
    return positions.map((pos, idx) => ({
      id: `${now}-${idx}`,
      value: Math.floor(Math.random() * 6) + 1,
      ...pos,
    }));
  };

  const handleRollDice = () => {
    if (isRolling) return;

    setIsPressing(false);
    setIsRolling(true);
    if (rollTimerRef.current) window.clearTimeout(rollTimerRef.current);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);

    setDiceFaces(generateDiceFaces());

    // 간단한 연출을 위해 약간 지연 후 값 반영
    rollTimerRef.current = window.setTimeout(() => {
      setIsRolling(false);
      rollTimerRef.current = null;
    }, 450);

    hideTimerRef.current = window.setTimeout(() => {
      setDiceFaces([]);
      hideTimerRef.current = null;
    }, 2200);
  };

  const handlePressStart = () => setIsPressing(true);
  const handlePressEnd = () => setIsPressing(false);

  return (
    <S.Section>
      <S.DiceArea>
        <S.RollBtn
          type="button"
          onClick={handleRollDice}
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
          onTouchCancel={handlePressEnd}
          disabled={isRolling}
          data-pressing={isPressing}
        >
          {isRolling ? "Rolling..." : "주사위 굴리기"}
        </S.RollBtn>
      </S.DiceArea>

      <S.BoardWrap>
        <S.Board>
          {cells.map((n) => (
            <S.Cell key={n} $even={n % 2 === 0}>
              <S.Number>{n}</S.Number>
              {/* 내부 장식/요소(사다리/뱀 등) 필요 시 이 위치에 추가 */}
            </S.Cell>
          ))}
          {diceFaces.map(({ id, value, top, left }) => (
            <S.BoardDice key={id} $top={top} $left={left} $rolling={isRolling}>
              {value}
            </S.BoardDice>
          ))}
        </S.Board>
      </S.BoardWrap>
    </S.Section>
  );
};

export default SnakePuzzleContainer;
