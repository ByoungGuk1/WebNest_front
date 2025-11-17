import React, { useEffect, useRef, useState } from 'react';
import S from './style';

const GameLeftSide = (props) => {

    const timeoutSec = props.timeoutSec === undefined ? 30 : props.timeoutSec;
    // 유저턴 0 또는 1
    const [turn, setTurn] = useState(1);
    const [message, setMessage] = useState("좌표를 입력하세요. 예: [3|1] 또는 3,1");
    const [inGameMessage, setInGameMessage] = useState("게임 시작");
    const inputRef = useRef(null);
    const timerRef = useRef(null);
    const remainingRef = useRef(timeoutSec);
    const [remaining, setRemaining] = useState(timeoutSec);

    const [winning, setWinning] = useState(null);
    // 게임시작버튼 누르면 타이머가동
    const [start, setStart] = useState(false);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    function gameStart(host) {
    }

    function clearTimer() {
        console.log("콘솔", timerRef.current)
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }
    // 착수 제한시간
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
            }, 1000);
        }
    }

    useEffect(() => {
        startTimer();
        return () => clearTimer();
    }, []);
    // 입력값을 받고 핸들링
    function handleSubmit(e) {
        // 걸려있는 이벤트 무효화
        e.preventDefault();

        // 실제 좌표 입력값 ex 3,1
        const val = inputRef.current ? inputRef.current.value : "";

        // 입력좌표받고고 파싱 row 또는 colum
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") handleSubmit(e);
    }

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
        </S.Wrap>
    );
};

export default GameLeftSide;