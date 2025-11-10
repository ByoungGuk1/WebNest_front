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
  h9Medium,
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

  /* ✅ 답변하기 버튼에 가리지 않게 여백 추가 */
  padding-bottom: 100px;
`;

S.QuestionWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

S.QuestionTitle = styled.div`
  ${h4Bold}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  margin-bottom: 8px; /* ✅ 제목 아래 간격 */
`;

S.QuestionerInfo = styled.div`
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

S.QuestionContent = styled.div`
  ${h6Medium}
  word-break: break-word;
  margin-bottom: 20px; /* ✅ 본문 아래 간격 */
`;




export default S;