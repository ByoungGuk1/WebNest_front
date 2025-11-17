import S from "../style";
import { useTimeLimit } from "../logic/timeHanddleLogic";

const TimeLimitContainer = ({
  datas,
  onTimeUp,
  gameKey,
  gameStatus,
  gameStartTime,
}) => {
  const timeRemaining = useTimeLimit(
    datas,
    onTimeUp,
    gameKey,
    gameStatus,
    gameStartTime
  );

  return (
    <S.TimeLimitSection>
      <S.TimeLimitLabel>
        <span>남은 입력 시간</span>
      </S.TimeLimitLabel>
      <S.TimeLimitBar test={timeRemaining} />
    </S.TimeLimitSection>
  );
};

export default TimeLimitContainer;
