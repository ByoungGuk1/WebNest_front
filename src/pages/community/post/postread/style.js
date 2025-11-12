import styled from "styled-components";
import {
  flexCenter,
  h3Bold,
  h4Bold,
  h5Bold,
  h6Medium,
  h6Bold,
  h7Bold,
  h7Medium,
  h8Medium,
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
  opacity: 0.9;
`;

S.Illust = styled.img`
  width: 180px;
  height: auto;
`;

/* 🟡 본문 */
S.ContentWrap = styled.div`
  width: 1160px;
  margin: 60px auto 80px;
`;

S.PostWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

S.PostTitle = styled.h1`
  ${h4Bold}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  margin-bottom: 8px;
`;

S.PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

S.AuthorBox = styled.div`
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

S.AuthorName = styled.span`
  ${h7Bold}
`;

S.HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

S.PrimaryBtn = styled.button`
  height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  ${h7Bold}
  cursor: pointer;

  &:hover{
    opacity:.95;
  }
`;

S.PostBody = styled.div`
  ${h6Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  word-break: break-word;
  margin-bottom: 20px;
`;

S.PostMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${h7Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
`;

S.MetaLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  b {
    color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
  }
`;

S.MetaRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

S.ReportBtn = styled.div`
  cursor: pointer;
  ${h7Medium}
  &:hover {
    text-decoration: underline;
  }
`;

S.Like = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  img {
    width: 12px;
    height: 10px;
  }
`;

S.LikeText = styled.span`
  transition: color .2s ease;
  color: ${({ $liked, theme }) =>
    $liked ? theme.PALETTE.primary.purple.main : theme.PALETTE.neutral.black.main};
`;

/* 🗨️ 댓글 */
S.CommentHeader = styled.div`
  margin-top: 50px;
  margin-bottom: 12px;
`;

S.CommentCount = styled.div`
  ${h5Bold}
  span{
    color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  }
`;

S.CommentWriteBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  border-radius: 10px;
  padding: 10px 12px;
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.main};
`;

S.CommentInput = styled.textarea`
  flex: 1;
  min-height: 44px;
  max-height: 160px;
  resize: vertical;
  border: none;
  outline: none;
  ${h7Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

S.CommentSubmit = styled.button`
  flex: none;
  height: 36px;
  padding: 0 16px;
  border-radius: 8px;
  border: none;
  ${h7Bold}
  background-color: ${({ theme }) => theme.PALETTE.primary.blue.main};
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  cursor: pointer;
`;

S.NoComment = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
  margin: 24px 0 0;
`;

S.CommentList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

S.CommentItem = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 10px;
`;

S.CommentLeft = styled.div``;

S.CommentRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

S.CommentAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

S.CommentUserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px; /* ✅ 요청하신 간격 6px */
`;

S.CommentUserName = styled.span`
  ${h7Bold}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

S.CommentUserLevel = styled.span`
  ${h9Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
`;

S.CommentContent = styled.div`
  ${h7Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  white-space: pre-wrap;
`;

S.CommentMetaRow = styled.div`
  ${h8Medium}
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.disable};

  img {
    width: 16px;
    height: 16px;
    cursor: pointer;
    vertical-align: middle;
  }

  span:last-of-type{
    cursor: pointer;
    &:hover{ text-decoration: underline; }
  }
`;

S.CommentLikeCount = styled.span`
  cursor: pointer;
  transition: color .2s ease;
  color: ${({ $liked, theme }) =>
    $liked ? theme.PALETTE.primary.purple.main : theme.PALETTE.neutral.black.disable};
`;

/* ◀ ▶ 페이지네이션(숫자형) */
S.Pagination = styled.div`
  ${flexCenter}
  margin-top: 28px;
  gap: 6px;
`;

S.PageBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.PALETTE.neutral.gray.light};
  background-color: ${({ $active, theme }) =>
    $active ? theme.PALETTE.primary.purple.main : theme.PALETTE.neutral.white.main};
  color: ${({ $active, theme }) =>
    $active ? theme.PALETTE.neutral.white.main : theme.PALETTE.neutral.black.main};
  ${h9Medium}
  cursor: pointer;
`;

S.LoadingMsg = styled.p`
  text-align: center;
  margin-top: 120px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

/* ⚠️ 신고 모달 */
S.ReportOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,.4);
  ${flexCenter}
  z-index: 999;
`;

S.ReportBox = styled.div`
  background-color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  width: 320px;
  border-radius: 10px;
  padding: 30px 25px;
  box-shadow: 0 4px 20px rgba(0,0,0,.15);
  position: relative;
`;

S.ReportTitle = styled.div`
  ${h4Bold}
  margin-bottom: 12px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.CloseBtn = styled.div`
  cursor: pointer;
  img{ width: 20px; height: 20px; }
`;

S.ReportDesc = styled.div`
  ${h6Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
  line-height: 1.4;
  margin-bottom: 16px;

  span{
    color: ${({ theme }) => theme.PALETTE.primary.red.main};
    ${h7Medium}
  }
`;

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

export default S;
