import S from "../style";
import SuggestedWordContainer from "./SuggestedWordContainer";
import TimeLimitContainer from "./TimeLimitContainer";
import UserInputContainer from "./UserInputContainer";

const MainContainer = ({
  startWord,
  inputWord,
  datas,
  onTimeUp,
  gameKey,
  gameStatus,
  gameStartTime,
}) => {
  return (
    <S.HeaderSection>
      <SuggestedWordContainer startWord={startWord} />
      <UserInputContainer inputWord={inputWord} />
      <TimeLimitContainer
        datas={datas}
        onTimeUp={onTimeUp}
        gameKey={gameKey}
        gameStatus={gameStatus}
        gameStartTime={gameStartTime}
      />
    </S.HeaderSection>
  );
};

export default MainContainer;
