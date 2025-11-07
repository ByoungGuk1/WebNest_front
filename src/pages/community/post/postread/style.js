import styled from "styled-components";
import {
  flexCenter,
  h3Bold,
  h6Medium,
  h6Bold,
  h7Medium,
  h8Medium,
  h7Bold,
  h4Bold,
  h7Light,
  h5Bold,
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
  margin: 60px auto;
  display: flex;
  flex-direction: column;
`;

/* ✅ question → post 로 변경 */
S.PostWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

S.PostTitle = styled.div`
  ${h4Bold}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  margin-bottom: 8px; /* ✅ 제목 아래 간격 */
`;

S.PosterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px; /* ✅ 프로필 아래 간격 */
`;

S.LeftBox = styled.div`
  ${h7Bold}
  display: flex;
  align-items: center;
  gap: 10px;
`;

S.ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

S.FollowButton = styled.div`
  cursor: pointer;
  ${h7Bold}
  color: ${({ theme }) => theme.PALETTE.primary.blue.main};
`;

S.PostContent = styled.div`
  ${h6Medium}
  word-break: break-word;
  margin-bottom: 20px; /* ✅ 본문 아래 간격 */
`;

S.PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${h7Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
`;

S.PostMetaWrap = styled.div`
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

/* 답변갯수, 좋아요, 알림받는 창 */
S.AlarmBox = styled.div`
  display: flex;
  /* flex-direction: column; */
`;

S.AnswerCn = styled.div``;

S.LikeAndAlarm = styled.div``;

S.Like = styled.div``;

S.Alarm = styled.div``;

S.ToggleSwitch = styled.div``;

S.ToggleCircle = styled.div``;

/* 🟢 답변 섹션 (이름 유지) */
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
