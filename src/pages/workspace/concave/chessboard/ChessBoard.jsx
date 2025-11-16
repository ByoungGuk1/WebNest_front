import React, { useEffect, useRef, useState } from "react";
import S from "./style";

const ChessBoard = (props) => {
    const boardSize = props.boardSize === undefined ? 15 : props.boardSize;
    const timeoutSec = props.timeoutSec === undefined ? 30 : props.timeoutSec;

    const [board, setBoard] = useState(
        () => Array.from({ length: boardSize }, () => Array(boardSize).fill(0))
    );
    const [turn, setTurn] = useState(1);
    const [message, setMessage] = useState("좌표를 입력하세요. 예: [3|1] 또는 3,1");
    const [lastMove, setLastMove] = useState(null);
    const inputRef = useRef(null);
    const timerRef = useRef(null);
    const remainingRef = useRef(timeoutSec);
    const [remaining, setRemaining] = useState(timeoutSec);
    const [winning, setWinning] = useState(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    function clearTimer() {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }
    // 착수 제한시간
    function startTimer() {
        clearTimer();
        remainingRef.current = timeoutSec;
        setRemaining(timeoutSec);
        timerRef.current = setInterval(() => {
            remainingRef.current -= 1;
            setRemaining(remainingRef.current);
            if (remainingRef.current <= 0) {
                clearTimer();
                placeRandomMove();
            }
        }, 1000);
    }

    useEffect(() => {
        startTimer();
        return () => clearTimer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function parseCoords(raw) {
        if (!raw) return null;
        const s = raw.trim().replace(/\|/g, ",");
        const bracketMatch = s.match(/^\[?\s*(\d+)[,\s|]+\s*(\d+)\s*\]?$/);
        if (bracketMatch) return { row: Number(bracketMatch[1]), colum: Number(bracketMatch[2]) };
        const parts = s.split(/[, ]+/).filter(Boolean);
        if (parts.length >= 2 && parts[0].match(/^\d+$/) && parts[1].match(/^\d+$/)) {
            return { r: Number(parts[0]), c: Number(parts[1]) };
        }
        return null;
    }

    function validAndIndex({ row, colum }) {
        if (!row || !colum) return null;
        if (row < 1 || row > boardSize || colum < 1 || colum > boardSize) return null;
        return { rowIdx: row - 1, columIdx: colum - 1 };
    }

    function placeAt(row0, colum0) {
        setBoard(prev => {
            if (prev[row0][colum0] !== 0) {
                setMessage("이미 돌이 있습니다. 다른 좌표를 입력하세요.");
                return prev;
            }
            const next = prev.map(row => row.slice());
            next[row0][colum0] = turn;
            return next;
        });
        setLastMove({ row: row0, colum: colum0 });
        setTurn(turn => (turn === 1 ? 2 : 1));
        setMessage(`두었습니다: (${row0 + 1}|${colum0 + 1}) - ${turn === 1 ? "흑" : "백"}`);
        startTimer();
        if (inputRef.current) {
            inputRef.current.value = "";
            inputRef.current.focus();
        }
    }

    function placeRandomMove() {
        const empties = [];
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] === 0) empties.push({ i, j });
            }
        }
        if (empties.length === 0) {
            setMessage("더 이상 둘 곳이 없습니다.");
            return;
        }
        const pick = empties[Math.floor(Math.random() * empties.length)];
        setBoard(prev => {
            const next = prev.map(row => row.slice());
            next[pick.i][pick.j] = turn;
            return next;
        });
        setLastMove({ row: pick.i, colum: pick.j });
        setTurn(turn => (turn === 1 ? 2 : 1));
        setMessage(`시간 초과: 무작위 착수 (${pick.i + 1}|${pick.j + 1}) - ${turn === 1 ? "흑" : "백"}`);
        startTimer();
    }
        // 입력값을 받고 핸들링
    function handleSubmit(e) {
        // 걸려있는 이벤트 무효화
        e.preventDefault();
        // 실제 좌표 입력값 ex 3,1
        const val = inputRef.current ? inputRef.current.value : "";
        // 입력좌표 컬럼으로 파싱 row 또는 colum
        const parsed = parseCoords(val);
        if (!parsed) {
            setMessage("좌표 형식이 잘못되었습니다. 예: [3|1] 또는 3,1");
            if (inputRef.current) inputRef.current.focus();
            return;
        }
        const idx = validAndIndex(parsed);
        console.log("idx", idx)
        if (!idx) {
            setMessage(`좌표는 1부터 ${boardSize} 사이여야 합니다.`);
            if (inputRef.current) inputRef.current.focus();
            return;
        }
        const { rowIdx, columIdx } = idx;
        if (board[rowIdx][columIdx] !== 0) {
            setMessage("이미 돌이 있습니다. 다른 좌표를 입력하세요.");
            if (inputRef.current) inputRef.current.focus();
            return;
        }
        placeAt(rowIdx, columIdx);
        console.log("inputRef", inputRef.current.value)
        console.log("val", val)
        console.log("parsed", parsed)
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") handleSubmit(e);
    }
    // render
    return (
        <S.Wrap>
            <S.LeftPanel>
                <S.Logo>WebNest</S.Logo>
                <S.Timer>{String(remaining).padStart(2, "0")}:00</S.Timer>
                <S.Day>토요일</S.Day>

                <S.HelpBlock>
                    <S.HelpTitle>설명</S.HelpTitle>
                    <S.HelpText>이 오목게임은 키보드 입력으로 진행됩니다</S.HelpText>
                    <S.HelpText>좌표 입력 예: [3|1]</S.HelpText>
                    <S.HelpText>이미 돌이 있으면 입력 불가</S.HelpText>
                    <S.HelpText>30초 지나면 무작위 배치됩니다</S.HelpText>
                </S.HelpBlock>

                <S.Form onSubmit={handleSubmit}>
                    <S.Input
                        ref={inputRef}
                        onKeyDown={handleKeyDown}
                        placeholder="[r|c] 예: [3|1]"
                        autoComplete="off"
                    />
                    <S.Submit>입력</S.Submit>
                </S.Form>

                <S.MessageBox>
                    <S.MsgHeader>메시지</S.MsgHeader>
                    <S.MsgBody>{message}</S.MsgBody>
                </S.MessageBox>
            </S.LeftPanel>

            <S.BoardPanel>
                <S.BoardOuter>
                    <S.Board gridSize={boardSize}>
                        {board.map((row, rowIdx) =>
                            row.map((cell, columIdx) => {
                                const isLast = lastMove && lastMove.rowIdx === rowIdx && lastMove.columIdx === columIdx;
                                return (
                                    <S.Cell key={`${rowIdx}-${columIdx}`}>
                                        <S.Intersection />
                                        {cell !== 0 && <S.Stone color={cell === 1 ? "black" : "white"} />}
                                        {isLast && <S.LastMark />}
                                    </S.Cell>
                                );
                            })
                        )}
                    </S.Board>
                </S.BoardOuter>
            </S.BoardPanel>
        </S.Wrap>
    );
};

export default ChessBoard;
