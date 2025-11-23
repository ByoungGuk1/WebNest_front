import React, { useEffect, useRef, useState } from "react";
import S from "./style";
import OmokEndModal from "../omokmodal/OmokEndModal";

const ChessBoard = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [winner, setWinner] = useState(null);
    const [finishTime, setFinishTime] = useState(0);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}분 ${seconds}초`;
    };

    // 게임 종료 시 호출
    const handleGameOver = (winnerPlayer, timeTaken) => {
        setWinner(winnerPlayer); // 1 = 흑, 2 = 백
        setFinishTime(timeTaken);
        setIsModalOpen(true);
    };


    const boardSize = props.boardSize === undefined ? 15 : props.boardSize;
    const timeoutSec = props.timeoutSec === undefined ? 30 : props.timeoutSec;

    const [chessBoard, setChessBoard] = useState(
        () => Array.from({ length: boardSize }, () => Array(boardSize).fill(0))
    );
    // 유저턴 흑 또는 백
    const [isMyTurn, setIsMyTurn] = useState(1);
    const [message, setMessage] = useState("좌표를 입력하세요. 예: [3|1] 또는 3,1");
    const [lastMove, setLastMove] = useState(null);
    const [winLine, setWinLine] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);

    const inputRef = useRef(null);
    const timerRef = useRef(null);
    // remainingRef: 제한시간 설정
    const remainingRef = useRef(timeoutSec);
    const [remaining, setRemaining] = useState(timeoutSec);

    const [boardPx, setBoardPx] = useState({ width: 0, height: 0 });

    function cellCenterX(col) {
        const w = boardPx.width || 700;
        const cellSize = w / boardSize;
        return cellSize * col + cellSize / 2;
    }
    function cellCenterY(row) {
        const h = boardPx.height || 700;
        const cellSize = h / boardSize;
        return cellSize * row + cellSize / 2;
    }

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    // 5목 탐지
    function detectFiveInARow(board, row, col, winLen = 5) {
        const numRows = board.length;
        if (numRows === 0) return { win: false, winner: null, line: [] };
        const numCols = board[0].length;
        if (row < 0 || row >= numRows || col < 0 || col > numCols) {
            return { win: false, winner: null, line: [] };
        }

        const player = board[row][col];
        if (!player) return { win: false, winner: null, line: [] };

        const directions = [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, -1],
        ];
        for (const [dr, dc] of directions) {
            const line = [{ row, col }];

            let r = row + dr;
            let c = col + dc;
            while (r >= 0 && r < numRows && c >= 0 && c < numCols && board[r][c] === player) {
                line.push({ row: r, col: c });
                r += dr;
                c += dc;
            }
            r = row - dr;
            c = col - dc;
            while (r >= 0 && r < numRows && c >= 0 && c < numCols && board[r][c] === player) {
                line.unshift({ row: r, col: c });
                r -= dr;
                c -= dc;
            }
            if (line.length >= winLen) {
                return { win: true, winner: player, line };
            }
        }
        return { win: false, winner: null, line: [] }
    }

    function parseCoords(row) {
        if (!row) return null;
        const s = row.trim().replace(/\|/g, ",");
        const bracketMatch = s.match(/^\[?\s*(\d+)[,\s|]+\s*(\d+)\s*\]?$/);
        if (bracketMatch) return { row: Number(bracketMatch[1]), col: Number(bracketMatch[2]) };
        const parts = s.split(/[, ]+/).filter(Boolean);
        if (parts.length >= 2 && parts[0].match(/^\d+$/) && parts[1].match(/^\d+$/)) {
            return { row: Number(parts[0]), col: Number(parts[1]) };
        }
        return null;
    }

    function validAndIndex({ row, col }) {
        if (row < 0 || row > boardSize - 1 || col < 0 || col > boardSize - 1) return null;
        return { row, col };
    }

    // 방장이 게임시작누르면 타이머발동
    // 제한시간 셋 초기화
    function clearTimer() {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }


    // 착수 제한시간
    function startTimer(turn) {
        if (turn) {
            clearTimer();
            remainingRef.current = timeoutSec;
            setRemaining(timeoutSec);
            timerRef.current = setInterval(() => {
                remainingRef.current -= 1;
                setRemaining(remainingRef.current);
                if (remainingRef.current <= 0) {
                    clearTimer();
                    placeRandomMove();
                    setIsMyTurn(0);
                }
            }, 1000);
        }
    }

    // 돌 놓는로직
    function placeAt(row0, col0) {
        setChessBoard(prev => {
            if (prev[row0][col0] !== 0) {
                setMessage("이미 돌이 있습니다. 다른 좌표를 입력하세요.");
                return prev;
            }
            const next = prev.map(row => row.slice());
            next[row0][col0] = isMyTurn;
            const detect = detectFiveInARow(next, row0, col0);
            console.log("detect", detect)
            if (detect.win) {
                setWinLine(detect.line);
                setIsGameOver(true);
                setWinner(detect.winner);
                setFinishTime(remainingRef.current ? timeoutSec - remainingRef.current : 0);
                setIsModalOpen(true);
                clearTimer();
                setMessage(`게임 종료: ${detect.winner === 1 ? "흑" : "백"} 승리`);
                setLastMove({ row: row0, col: col0 });
                return next;
            }
            setLastMove({ row: row0, col: col0 });
            setIsMyTurn(isMyTurn => (isMyTurn === 1 ? 2 : 1));
            const placedColor = isMyTurn === 1 ? "흑" : "백";
            setMessage(`두었습니다: (${row0}|${col0}) - ${placedColor}`);
            startTimer(true);
            if (inputRef.current) {
                inputRef.current.value = "";
                inputRef.current.focus();
            }
            return next;
        });
    }

    function placeRandomMove() {
        const empties = [];
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (chessBoard[i][j] === 0) empties.push({ i, j });
            }
        }
        if (empties.length === 0) {
            setMessage("더 이상 둘 곳이 없습니다.");
            return;
        }
        const pick = empties[Math.floor(Math.random() * empties.length)];
        setChessBoard(prev => {
            const next = prev.map(row => row.slice());
            next[pick.i][pick.j] = isMyTurn;
            const detect = detectFiveInARow(next, pick.i, pick.j);
            setLastMove({ row: pick.i, col: pick.j });
            if (detect.win) {
                setWinLine(detect.line);
                setIsGameOver(true);
                setWinner(detect.winner)
                setIsModalOpen(true)
                setMessage(`시간 초과: 착수 후 ${detect.winner === 1 ? "흑" : "백"} 승리`)
                clearTimer();
                return next;
            }
            setIsMyTurn(isMyTurn => (isMyTurn === 1 ? 2 : 1));
            const placedColor = isMyTurn === 1 ? "흑" : "백";
            setMessage(`시간 초과: 무작위 착수 (${pick.i}|${pick.j}) - ${placedColor}`);
            startTimer(true);
            return next;
        });
    }
    // 입력값을 받고 핸들링
    function handleSubmit(e) {
        // 걸려있는 이벤트 무효화
        e.preventDefault();
        // 실제 좌표 입력값 ex 3,1
        const val = inputRef.current ? inputRef.current.value : "";
        // 입력좌표받고고 파싱 row 또는 colum
        const parsed = parseCoords(val);
        if (!parsed) {
            setMessage("좌표 형식이 잘못되었습니다. 예: [3|1] 또는 3,1");
            if (inputRef.current) inputRef.current.focus();
            return;
        }
        const idx = validAndIndex(parsed);
        if (!idx) {
            setMessage(`좌표는 0부터 ${boardSize - 1} 사이여야 합니다.`);
            if (inputRef.current) inputRef.current.focus();
            return;
        }
        const { row, col } = idx;
        if (chessBoard[row][col] !== 0) {
            setMessage("이미 돌이 있습니다. 다른 좌표를 입력하세요.");
            if (inputRef.current) inputRef.current.focus();
            return;
        }
        placeAt(row, col);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") handleSubmit(e);
    }
    // render
    return (
        <>
            <S.Wrap>
                <S.LeftPanel>
                    <S.Logo>WebNest</S.Logo>
                    <S.Timer>{String(remaining).padStart(2, "0")}초</S.Timer>
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
                    <div>
                        <S.BoardImg src="/assets/gameroom/concaveboard.png" />
                        <S.BoardOuter>
                            <S.Board $gridSize={boardSize}>
                                {chessBoard.map((row, rowIdx) =>
                                    row.map((cell, columIdx) => {
                                        const isWinCell = winLine.some(line => line.row === rowIdx && line.col === columIdx);
                                        const isLast = lastMove && lastMove.rowIdx === rowIdx && lastMove.columIdx === columIdx;
                                        return (
                                            <S.Cell key={`${rowIdx}-${columIdx}`}>
                                                <S.Intersection />
                                                {cell !== 0 && <S.Stone color={cell === 1 ? "black" : "white"} $isWin={isWinCell} />}
                                                {isLast && <S.LastMark />}
                                            </S.Cell>
                                        );
                                    })
                                )}
                            </S.Board>
                            {winLine && winLine.length >= 2 && boardPx.width > 0 && (
                                <S.WinSvg viewBox={`0 0 ${boardPx.width} ${boardPx.height}`} preserveAspectRatio="none">
                                    <S.WinPolyline
                                        points={winLine.map(p => `${cellCenterX(p.col)} ${cellCenterY(p.row)}`).join(" ")}
                                        stroke="gold"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </S.WinSvg>
                            )}
                        </S.BoardOuter>
                    </div>
                </S.BoardPanel>
            </S.Wrap>
            {/* 게임 종료 모달 */}
            <OmokEndModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                winner={winner}
                finishTime={finishTime}
                formatTime={formatTime}
            />
        </>
    );

}
export default ChessBoard;
