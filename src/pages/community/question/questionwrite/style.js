import styled from "styled-components";
import { flexCenter, h3Bold, h6Medium, h6Bold } from "../../../../styles/common";

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
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  border-radius: 14px;
  background-color: #fff;
  /* box-shadow: 0 2px 5px rgba(0,0,0,0.05); */
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

/* 프로필 */
S.ResponserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  ${h6Bold};
`;

S.ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

/* {} 코드 영역 */
S.CodeBox = styled.div`
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.secondary};

  .code-label {
    background-color: ${({ theme }) => theme.PALETTE.neutral.gray.light};
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};
    font-family: "Courier New", monospace;
    font-weight: bold;
    padding: 8px 12px;
  }
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
  width: 100%;
  height: 200px;
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  border-radius: 10px;
  padding: 16px;
  ${h6Medium};
  resize: none;
  outline: none;
  line-height: 1.6;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.main};

  &:focus {
    border-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  }
`;

/* 버튼 */
S.ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

S.TempSaveBtn = styled.button`
  padding: 10px 24px;
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.main};
  border-radius: 10px;
  background-color: white;
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  cursor: pointer;
  ${h6Medium};

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.neutral.white.secondary};
  }
`;

S.SubmitBtn = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  color: white;
  cursor: pointer;
  ${h6Bold};

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary.purple.dark};
  }
`;

export default S;
