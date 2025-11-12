import styled from "styled-components";
import {
  flexCenter,
  h3Bold,
  h6Medium,
  h7Bold,
  h5Bold,
  h7Medium,
  h8Medium,
  h4Bold,
} from "../../../../styles/common";

const S = {};

/* 상단 배너 */
S.PurpleBannerWrap = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

S.PurpleBanner = styled.div`
  width: 100%;
  height: 188px;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  color: #ffffff;
  ${flexCenter}
`;

S.PurpleBannerInner = styled.div`
  width: 1160px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.PurplePageTitle = styled.div`
  ${h3Bold}
`;

S.PurplePageDesc = styled.div`
  ${h6Medium}
`;

S.PurpleIllust = styled.img`
  width: 180px;
  height: auto;
`;

/* 본문 전체 래퍼 */
S.ContentWrap = styled.div`
  width: 1160px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

/* 질문 본문 */
S.QuestionWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

S.QuestionTitle = styled.div`
  ${h4Bold}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  margin-bottom: 8px;
`;

S.QuestionerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

S.LeftBox = styled.div`
  ${h7Bold}
  display: flex;
  align-items: center;
  gap: 10px;
`;

S.ProfileImgA = styled.img`
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
  margin-bottom: 20px;
`;

S.QuestionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${h7Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
`;

S.QuestionMetaWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  b {
    color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
  }
`;

/* 답변 영역 전체 컨테이너 */
S.Container = styled.div`
  width: 1160px;
  margin: 40px auto 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px; 
  box-sizing: border-box;
`;

/* 답변 카드 */
S.ResponseCard = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  border-radius: 14px;
  background-color: #fff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
`;

/* 프로필 & 작성 버튼 */
S.InfoAndWrite = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.ResponseBanner = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

S.ProfileImg = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
`;

S.ResponserInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7px 0 0 0;

  & > div:first-child {
    ${h7Bold}
    color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
    line-height: 1.2;
  }

  & > div:last-child {
    ${h5Bold}
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  }
`;

/* 버튼 */
S.ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 113px;
  height: 39px;
  color: #ffffff;
  ${h6Medium}
  border-radius: 8px;
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.light};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  }
`;

/* 코드 영역 */
S.CodeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 5px 0 0 0;
  gap: 3px;
`;
S.CodeBtn = styled.div`
  cursor: pointer;
`;
S.CodeImg = styled.div`
  padding: 0 0 0 15px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
`;

S.SorceCode = styled.div`
  ${h6Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
`;

/* 답변 입력 textarea */
S.InputResponse = styled.textarea`
  width: 100%;
  min-height: 300px;
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  border-radius: 10px;
  padding: 16px;
  ${h6Medium} 
  outline: none;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.secondary};
  box-sizing: border-box;
  resize: none;

  &::placeholder {
    white-space: pre-line;
    color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
  }

`;



export default S;
