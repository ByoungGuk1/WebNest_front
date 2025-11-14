import ContentContainer from "./ContentContainer";
import S from "../style";

const ContentsContainer = () => {
  const contents = [
    {
      word: "이발소",
      partOfSpeech: "「명사」",
      definition: "일정한 시설을 갖추고 주로 남자의 머리털을 깎아 다듬어 주는 곳.",
      relatedTerms: "≒이발관, 이용소, 이용원",
      color: "purple",
    },
    {
      word: "이발소",
      partOfSpeech: "「명사」",
      definition: "일정한 시설을 갖추고 주로 남자의 머리털을 깎아 다듬어 주는 곳.",
      relatedTerms: "≒이발관, 이용소, 이용원",
      color: "yellow",
    },
    {
      word: "이발소",
      partOfSpeech: "「명사」",
      definition: "일정한 시설을 갖추고 주로 남자의 머리털을 깎아 다듬어 주는 곳.",
      relatedTerms: "≒이발관, 이용소, 이용원",
      color: "green",
    },
  ];

  return (
    <S.ContentsSection>
        {contents.map((content, index) => (
          <ContentContainer key={index} {...content} />
        ))}
    </S.ContentsSection>
  );
};

export default ContentsContainer;
