import styled from "styled-components";
import { flexCenter, h3Bold, h6Medium, h6Bold } from "../../../styles/common"; // ✅ flexCenter 추가


const S = {};


/* 🟣 배너 */
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
  /* color: ${({ theme }) => theme.PALETTE.neutral.white.main}; */
  color : #FFFFFF;
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
  gap: 30px;
`;

// /* 페이지 제목 */
// S.TitleWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// S.PageTitle = styled.div`
//   ${h3Bold}
//   color: ${({ theme }) => theme.PALETTE.neutral.black.main};
// `;

// S.PageDesc = styled.div`
//   ${h6Medium}
//   color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
// `;

/* 카테고리 선택 */
S.CategoryWrap = styled.div`
  display: flex;
  gap: 14px;
`;

S.Select = styled.div`
  position: relative;

  select {
    width: 180px;
    height: 44px;
    border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
    border-radius: 10px;
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};
    ${h6Medium}
    cursor: pointer;
    padding: 0 40px 0 14px;
    outline: none;
    appearance: none;
    background-image: url("/assets/icons/downarrow.svg");
    background-repeat: no-repeat;
    background-size: 14px;
    background-position: calc(100% - 14px) center;
    transition: all 0.2s ease;

    &:focus {
      border-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
    }
  }

  select option {
    font-size: 15px;
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  }
`;


/* 제목 input */
S.InputTitle = styled.input`
  width: 100%;
  height: 48px;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  ${h6Bold}
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  }
`;

/* 내용 textarea */
S.InputContent = styled.textarea`
  width: 100%;
  height: 400px;
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  padding: 16px;
  resize: none;
  outline: none;
  ${h6Medium}
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.PALETTE.primary.purple.secondary};
  }
`;

/* 버튼 */
S.ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

S.CancelBtn = styled.button`
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
