import GameLeftSide from "components/gameleftside/GameLeftSide";
import ContentsContainer from "./ContentsContainer";
import S from "./style";
import TitleContainer from "./TitleContainer";

const LastWordContainer = () => {
  const startWord = "시작 단어 예시";

  const listWordVO = [
    {
      word: "예시 단어 1",
      explanation: "이것은 예시 설명 1입니다.",
      color: "red",
      isFocus: false,
    },
    {
      word: "예시 단어 2",
      explanation: "이것은 예시 설명 2입니다.",
      color: "green",
      isFocus: false,
    },
    {
      word: "예시 단어 3",
      explanation: "이것은 예시 설명 3입니다.",
      color: "black",
      isFocus: true,
    },
  ];

  return (
    <S.MainWarp>
      <GameLeftSide />
      <S.LastWordWrap>
        {listWordVO[listWordVO.length - 1]?.word ? (
          <TitleContainer word={listWordVO[listWordVO.length - 1]?.word} />
        ) : (
          <TitleContainer startWord={startWord} />
        )}
        <ContentsContainer listWordVO={listWordVO} />
      </S.LastWordWrap>
    </S.MainWarp>
  );
};

export default LastWordContainer;
