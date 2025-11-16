export const getLastWord = (
  currentInputWord,
  currentDatas,
  currentStartWord
) => {
  if (currentInputWord) return currentInputWord;

  const lastData = currentDatas
    .slice()
    .reverse()
    .find((data) => data?.chatMessageContent);
  if (lastData) return lastData.chatMessageContent;

  return currentStartWord || "";
};

export const removeSpaces = (text) => text.replace(/\s+/g, "");

export const checkCondition = (
  newWord,
  currentDatas,
  lastWord,
  currentStartWord
) => {
  if (!newWord || newWord.length < 2 || !lastWord) return false;
  if (currentStartWord === newWord) return false;
  if (currentDatas.some((data) => data?.chatMessageContent === newWord))
    return false;

  return lastWord[lastWord.length - 1] === newWord[0];
};

export const processWordChain = (
  chatData,
  currentDatas,
  currentLastWord,
  currentStartWord
) => {
  if (!chatData.chatMessageContent?.trim()) return null;

  const processedWord = removeSpaces(chatData.chatMessageContent);
  if (
    !checkCondition(
      processedWord,
      currentDatas,
      currentLastWord,
      currentStartWord
    )
  ) {
    return null;
  }

  return { ...chatData, chatMessageContent: processedWord };
};
