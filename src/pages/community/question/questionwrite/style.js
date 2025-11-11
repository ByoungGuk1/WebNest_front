import styled from "styled-components";
import { flexCenter, h3Bold, h6Medium, h6Bold, h7Bold, h5Bold, h7Medium } from "../../../../styles/common";

const S = {};

/* 🟣 상단 배너 */
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

/* 전체 컨테이너 */
S.Container = styled.div`
  width: 1160px;
  margin: 50px auto 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* 답변 박스 (하얀 카드) */
S.ResponseCard = styled.div`
  width: 100%;
  height: 1000px;
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  border-radius: 14px;
  background-color: #fff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


/* 프로필 + 작성 버튼 감싸는 영역 */
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
/* 프로필 */
S.ResponserInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7px 0 0 0;
  

  /* 첫 번째 div (닉네임) */
  & > div:first-child {
    ${h7Bold}
    color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
    line-height: 1.2;
  }

  /* 두 번째 div (안내 문구) */
  & > div:last-child {
    ${h5Bold}
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  }
`;

S.ProfileImg = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
`;

/* 버튼 */
S.ButtonWrap = styled.div`
  display: flex;
  justify-content: center;  /* ✅ 가로 가운데 */
  align-items: center;      /* ✅ 세로 가운데 */
  width: 113px;
  height: 39px;
  color: #FFFFFF;
  ${h6Medium}
  border-radius: 8px;
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.light};

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  }
`;


/* {} 코드 영역 */
S.CodeBox = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;   /* 가로 기준 왼쪽 정렬 */
  justify-content: flex-start; /* ✅ 세로 기준 위쪽 정렬 */
  padding: 5px 0 0 0;
  gap: 3px;
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
S.CodeInput = styled.textarea`
  border: none;
  outline: none;
  resize: none;
  min-height: 100px;
  padding: 12px;
  font-family: "Courier New", monospace;
  ${h6Medium};
  background-color: transparent;
`;

/* 답변 입력 textarea */
S.InputResponse = styled.textarea`
  /* width: 100%; */
  height: 800px;
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  border-radius: 10px;
  padding: 16px;
  ${h6Medium}
  resize: none;
  outline: none;
  line-height: 1.6;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.secondary};

  &:focus {
    border-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  }
`;


export default S;
