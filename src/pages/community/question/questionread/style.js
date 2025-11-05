import styled from "styled-components";
import {
  flexCenter,
  h3Bold,
  h6Medium,
  h6Bold,
  h7Medium,
  h8Medium,
} from "../../../../styles/common";

const S = {};

/* 🟣 배너 */
S.BannerWrap = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

S.Banner = styled.div`
  width: 100%;
  height: 188px;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  ${flexCenter}
`;

S.BannerInner = styled.div`
  width: 1160px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.PageTitle = styled.div`
  ${h3Bold}
`;

S.PageDesc = styled.div`
  ${h6Medium}
`;

S.Illust = styled.img`
  width: 180px;
  height: auto;
`;

/* 🟡 본문 영역 */
S.ContentWrap = styled.div`
  width: 1160px;
  margin: 60px auto 120px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

S.QuestionWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

S.QuestionTitle = styled.h2`
  ${h6Bold}
  font-size: 26px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

S.QuestionerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.LeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

S.ProfileImg = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
`;

S.FollowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 92px;
  height: 36px;
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  ${h7Medium}
`;

S.QuestionContent = styled.p`
  ${h6Medium}
  line-height: 1.7;
  word-break: break-word;
`;

S.QuestionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${h8Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
`;

S.QuestionMetaWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  b {
    color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
  }
`;

S.ReportBtn = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

/* 🟢 답변 섹션 */
S.AnswerSection = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

S.AnswerTitle = styled.h3`
  ${h6Bold}
`;

S.AnswerCard = styled.div`
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.AnswerTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

S.AnswerProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

S.AnswerUser = styled.div`
  ${h7Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

S.AnswerMeta = styled.div`
  ${h8Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
`;

S.AnswerContent = styled.p`
  ${h6Medium}
  line-height: 1.6;
`;

S.NoAnswer = styled.div`
  text-align: center;
  margin-top: 30px;
  color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
`;

S.BackButton = styled.div`
  margin-top: 60px;
  text-align: center;
  a {
    ${h6Bold}
    color: ${({ theme }) => theme.PALETTE.primary.purple.main};
    text-decoration: none;
  }
`;

/* 상태 메시지 */
S.LoadingMsg = styled.p`
  text-align: center;
  margin-top: 120px;
`;

S.NotFoundMsg = styled.p`
  text-align: center;
  margin-top: 120px;
  color: gray;
`;

export default S;
