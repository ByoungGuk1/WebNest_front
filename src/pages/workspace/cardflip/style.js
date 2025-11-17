// src/pages/cardflip/style.js
import styled, { keyframes } from "styled-components";

const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-13px); }
  40% { transform: translateX(13px); }
  60% { transform: translateX(-8px); }
  80% { transform: translateX(8px); }
  100% { transform: translateX(0); }
`;

const S = {};

S.PageWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #7345fd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  box-sizing: border-box;
`;

S.CardInner = styled.div`
  width: 800px;
  height: 700px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 30px;
`;

S.Cards = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
  height: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
`;

S.CardItem = styled.li`
  border: 1px solid #ccc;
  perspective: 1000px;
  transform-style: preserve-3d;
  position: relative;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.7 : 1)};

  &.flip .front {
    transform: rotateY(-180deg);
  }

  &.flip .back {
    transform: rotateY(0deg);
  }

  &.shake {
    animation: ${shake} 0.35s ease-in-out;
  }
`;

S.View = styled.div`
  position: absolute;
  background: rgba(0, 0, 255, 0.2);
  padding: 10%;
  transition: transform 0.5s linear;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  &.front {
    z-index: 10;
    transform: rotateY(0deg);
  }

  &.back {
    transform: rotateY(180deg);
    background: ${({ $cardType }) => {
      if ($cardType === 'problem') return '#E3F2FD';
      if ($cardType === 'answer') return '#E8F5E9';
      return '#ffffff';
    }};
    border: 2px solid ${({ $cardType }) => {
      if ($cardType === 'problem') return '#2196F3';
      if ($cardType === 'answer') return '#4CAF50';
      return '#ccc';
    }};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    vertical-align: top;
  }
`;

S.ContentText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  text-align: center;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.4;
  padding: 8px;
  box-sizing: border-box;
`;

S.GameHeader = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

S.GameInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

S.TimerDisplay = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #7345fd;
  display: flex;
  align-items: center;
  gap: 8px;
`;

S.ProgressDisplay = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  background-color: #f0f0f0;
  padding: 8px 16px;
  border-radius: 20px;
`;

S.WinnerDisplay = styled.div`
  text-align: center;
  font-size: ${({ $isMe }) => ($isMe ? '20px' : '18px')};
  font-weight: ${({ $isMe }) => ($isMe ? '700' : '600')};
  color: ${({ $isMe }) => ($isMe ? '#ff6b6b' : '#7345fd')};
  background-color: ${({ $isMe }) => ($isMe ? '#fff3cd' : '#e7f3ff')};
  padding: 12px 20px;
  border-radius: 10px;
  border: 2px solid ${({ $isMe }) => ($isMe ? '#ff6b6b' : '#7345fd')};
`;

S.Leaderboard = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

S.LeaderboardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0 0 15px 0;
  text-align: center;
`;

S.LeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  margin-bottom: 8px;
  background-color: ${({ $isMe }) => ($isMe ? '#fff3cd' : '#f8f9fa')};
  border-radius: 8px;
  border: ${({ $isMe }) => ($isMe ? '2px solid #ffc107' : '1px solid #e0e0e0')};
`;

S.Rank = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #7345fd;
  min-width: 40px;
  text-align: center;
`;

S.PlayerName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  flex: 1;
`;

S.PlayerProgress = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #666;
  min-width: 120px;
  text-align: right;
`;

export default S;
