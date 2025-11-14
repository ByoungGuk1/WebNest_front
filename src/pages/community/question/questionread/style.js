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

/* 배너 */
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

/* 본문 영역 */
S.ContentWrap = styled.div`
  width: 1160px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;

  /* 답변하기 버튼에 가리지 않게 여백 추가 */
  padding-bottom: 100px;
`;

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
  margin-bottom: 20px;
`;

S.QuestionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${h7Medium}
  /* color: ${({ theme }) => theme.PALETTE.neutral.black.secondary}; */
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

S.ReportBtn = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

// 답변갯수, 좋아요, 알림받는 창
S.AlarmBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 50px;
`;

S.AnswerCn = styled.div`
  ${h5Bold}
  display: flex;
  align-items: center;
  gap: 10px;

  span:first-child {
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  }

  span:last-child {
    color: ${({ theme }) => theme.PALETTE.primary.purple.main}; /* 숫자 보라색 */
  }
`;

S.LikeAndAlarm = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  ${h8Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

S.Like = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;



  img {
    width: 12px;
    height: 10px;
  }

`;


S.PostLikeText = styled.span`
  transition: color 0.2s ease;
  color: ${({ $liked, theme }) =>
    $liked
      ? theme.PALETTE.primary.purple.main   /* 좋아요 누른 상태 */
      : theme.PALETTE.neutral.black.main};  /*  기본 상태 */
`;

S.Alarm = styled.div`
display: flex;
  align-items: center;
  gap: 4px;

  img {
    width: 10px;
    height: 12px;
  }
`;

S.ToggleSwitch = styled.div`
  position: relative;
  width: 50px;
  height: 30px;
  border-radius: 25px;
  background-color: ${({ $on, theme }) =>
    $on ? theme.PALETTE.primary.blue.light : theme.PALETTE.neutral.gray.light}; 
  cursor: pointer;
`;

S.ToggleCircle = styled.div`
  position: absolute;
  top: 2px;
  left: ${({ $on }) => ($on ? "22px" : "2px")}; /* ✅ 오른쪽/왼쪽 이동 */
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #ffff;
`;


/* 답변 섹션 */
S.AnswerSection = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;



S.AnswerCard = styled.div`
  position: relative; 
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.white.dark};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

S.AnswerTop = styled.div`
  display: flex;  
  align-items: center;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  border-radius: 8px;
  padding: 10px;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 25px;
`;

S.UserInfo = styled.div`
  display: flex;
  align-items: center; 
  gap: 10px;
`;


S.AnswerInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;    
  transform: translateY(3px); 
  height: 40px;                    
`;

S.AnswerProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

S.AnswerUser = styled.div`
  ${h7Bold}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  display: flex;
  gap: 6px;
  line-height: 1.2;          
`;

S.AnswerMeta = styled.div`
  ${h8Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
  display: flex;
  gap: 5px;
  
  span:last-child {
    color: ${({ theme }) => theme.PALETTE.neutral.black.main} !important;
  }
`;

S.ChooseAnswer = styled.button`
  height: 30px;
  width: 65px;
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  color: #FFFFFF;
  border-radius: 8px;
  ${h6Bold}
`;

S.AnswerContent = styled.p`
  ${h6Medium}
  margin-bottom: 30px;
  white-space: pre-wrap;   /* ⭐ 줄바꿈 반영 */
  word-break: break-word;  /* ⭐ 긴 단어 처리 */
`;
S.AnswerDate = styled.div`
  display: flex;
  ${h7Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.disable};
  gap: 6px;
  align-items: center;  
  span:nth-of-type(2) {
    cursor: pointer;
  }
  span:last-of-type{
    cursor: pointer;
     &:hover {
       text-decoration: underline;
    }
  }

  img {
    width: 18px;  
    height: 18px;
    cursor: pointer; 
    vertical-align: middle; 
  }
`;
S.AnswerLikeCount = styled.span`
  cursor: pointer;
  transition: color 0.2s ease;
  color: ${({ $liked, theme }) =>
    $liked
      ? theme.PALETTE.primary.purple.main   /* 좋아요 눌렀을 때 보라색 */
      : theme.PALETTE.neutral.black.disable};  /* 기본 검정색 */
`;


S.HamburgerButton = styled.button`
  position: absolute; 
  bottom: 20px;          
  right: 12px;        
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 0.8;
  }
`;
S.NoAnswer = styled.div`
  text-align: center;
  margin-top: 30px;
  color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
`;

// S.BackButton = styled.div`
//   margin-top: 60px;
//   text-align: center;
//   a {
//     ${h6Bold}
//     color: ${({ theme }) => theme.PALETTE.primary.purple.main};
//     text-decoration: none;
//   }
// `;

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


/* 모달 */
S.ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  ${flexCenter}
  z-index: 999;
`;

S.ModalBox = styled.div`
  width: 320px;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  border-radius: 10px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
`;

S.ModalTitle = styled.h3`
  ${h4Bold}
  margin-bottom: 12px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

S.ModalDesc = styled.p`
  ${h6Medium}
  color: ${({ theme }) => theme.PALETTE.primary.red.main};
  line-height: 1.5;
  margin-bottom: 24px;
`;

S.ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

S.CancelBtn = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.lightGray};
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  ${h7Bold}
  cursor: pointer;
`;

S.ConfirmBtn = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  color: white;
  ${h7Bold}
  cursor: pointer;
`;

/* 수정/삭제 메뉴 */
S.AnswerMenu = styled.ul`
  position: absolute;
  top: 189px;
  right: 24px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  border-radius: 10px;
  list-style: none;
  padding: 8px 0;
  width: 100px;
  z-index: 20;

  li {
    padding: 10px 15px;
    cursor: pointer;
    ${h7Bold}
    color: ${({ theme }) => theme.PALETTE.neutral.black.main};

    &:hover {
      background-color: ${({ theme }) => theme.PALETTE.primary.red.lightGray};
    }
  }
`;

/* 삭제 모달 배경 */
S.HamModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  ${flexCenter}
  z-index: 999;
`;

/* 삭제 모달 박스 */
S.HamModalBox = styled.div`
background-color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  width: 320px;
  border-radius: 10px;
  padding: 30px 25px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

/* 모달 제목 */
S.HamModalTitle = styled.div`
  ${h4Bold}
  margin-bottom: 50px;
  margin-top: 20px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

/* 모달 설명 */
S.HamModalDesc = styled.div`
  ${h8Medium}
  color: ${({ theme }) => theme.PALETTE.primary.red.main};
  line-height: 1.5;
  margin-bottom: 24px;
`;

/* 버튼 영역 */
S.HamModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

/* 취소 버튼 */
S.HamCancelBtn = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.lightGray};
  ${h7Bold}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  cursor: pointer;
`;

/* 확인 버튼 */
S.HamConfirmBtn = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  color: white;
  ${h7Bold}
  cursor: pointer;
`;

/* 신고 모달 배경 */
S.ReportOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  ${flexCenter}
  z-index: 999;
`;

/* 신고 모달 박스 */
S.ReportBox = styled.div`
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  width: 320px;
  border-radius: 10px;
  padding: 30px 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: relative;
`;

/* 제목 */
S.ReportTitle = styled.div`
  ${h4Bold}
  margin-bottom: 12px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* 닫기 버튼 */
S.CloseBtn = styled.div`
  cursor: pointer;
  img{
    width: 20px;
    height: 20px;
  }
`;

/* 설명 */
S.ReportDesc = styled.div`
  ${h6Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  line-height: 1.4;
  margin-bottom: 16px;

  span {
    color: ${({ theme }) => theme.PALETTE.primary.red.main};
    ${h7Medium}
  }
`;

/* 드롭다운 */
S.ReportSelect = styled.select`
  width: 100%;
  height: 42px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  margin-bottom: 20px;
  padding: 0 10px;
  ${h7Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.main};
`;

/* 신고 버튼 */
S.ReportSubmit = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  ${h6Bold}
  cursor: pointer;
`;

S.AnswerWriteButton = styled.button`
  position: fixed; 
  bottom: 40px; 
  left: 50%;
  transform: translateX(-50%); /* 가로 중앙 정렬 */
  width: 200px;
  height: 56px;
  width: 424px;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  ${h5Bold}
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);


  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary.purple.dark};
   
  }

  z-index: 998; 
`;

//////////////////////////////////////////////
S.AnswerLikeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

S.AnswerLikeImg = styled.img`
  width: 16px;
  height: 16px;
`;

S.AnswerLikeNum = styled.span`
  ${h7Medium}
  transition: color 0.2s ease;
  color: ${({ $liked, theme }) =>
    $liked ? theme.PALETTE.primary.purple.main : theme.PALETTE.neutral.black.disable};
`;


export default S;
