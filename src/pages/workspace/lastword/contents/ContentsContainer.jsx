import ContentContainer from "./ContentContainer";
import S from "../style";

const ContentsContainer = ({ datas }) => {
  const validDatas = Array.isArray(datas)
    ? datas.filter((item) => item?.chatMessageContent)
    : [];

  return (
    <S.ContentsSection>
      {validDatas.map((data, index) => (
        <ContentContainer
          key={`${data.userSenderId}-${data.chatMessageContent}-${index}`}
          word={data.chatMessageContent}
          userSenderTeamcolor={data.userSenderTeamcolor}
        />
      ))}
    </S.ContentsSection>
  );
};

export default ContentsContainer;
