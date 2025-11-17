import React, { useEffect, useRef, useState } from 'react';
import S from './style';

const GameLeftSide = (props) => {

    // 시간/초초
    const timeoutSec = props.timeoutSec === undefined ? 30 : props.timeoutSec;
    
    // 유저턴 0 또는 1
    const [turn, setTurn] = useState(1);
    const [message, setMessage] = useState("여기 게임 설명글 추가  ex) 좌표를 입력하세요 || ?? ");
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

    // 웹소켓 서버 연결하면 db에서 host가져오면됨
    function gameStart(host) {
    }

    function clearTimer() {
        console.log("콘솔", timerRef.current)
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

    useEffect(() => {
        startTimer();
        return () => clearTimer();
    }, []);


    // 입력값을 받고 핸들링
    function handleSubmit(e) {

        // 걸려있는 이벤트 무효화
        e.preventDefault();
        // 밑에 필요로직작성
    }

    // 위 함수 실행시키는 함수수
    function handleKeyDown(e) {
        if (e.key === "Enter") handleSubmit(e);
    }

    return (
        <S.Wrap>
            <S.LeftPanel>
                <S.Logo>WebNest</S.Logo>
                <S.Timer>{String(remaining).padStart(2, "0")}초</S.Timer>
                <S.Day></S.Day>

                <S.HelpBlock>
                    <S.HelpTitle></S.HelpTitle>
                    <S.HelpText></S.HelpText>
                    <S.HelpText></S.HelpText>
                    <S.HelpText></S.HelpText>
                    <S.HelpText></S.HelpText>
                </S.HelpBlock>

                <S.Form onSubmit={handleSubmit}>
                    <S.Input
                        ref={inputRef}
                        onKeyDown={handleKeyDown}
                        placeholder="[r|c] 예: [3|1]"
                        autoComplete="off"
                    />
                    <S.Submit></S.Submit>
                </S.Form>

                <S.MessageBox>
                    <S.MsgHeader></S.MsgHeader>
                    <S.MsgBody>{message}</S.MsgBody>
                </S.MessageBox>
            </S.LeftPanel>
        </S.Wrap>
    );
};

export default GameLeftSide;