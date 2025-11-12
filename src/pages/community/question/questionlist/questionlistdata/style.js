import styled from "styled-components";
import { Link } from "react-router-dom";
import { h6Bold, h6Medium, h7Light, h8Bold } from "styles/common";
import theme from "styles/theme";

const S = {};

/* 질문 리스트 */
S.ListWrap = styled.div`
  width: 1160px;
  margin: 50px auto 0;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

S.Link = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
`;

S.Row = styled.div`
  height: 209px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.neutral.white.dark};
`; 

S.Tag = styled.div`
  color: white;
  height: 20px;
  border-radius: 4px;
  ${h8Bold}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  width: ${({ lang }) =>
    lang === "JS"
      ? "24px"
      : lang === "JAVA"
      ? "40px"
      : lang === "CSS"
      ? "33px"
      : lang === "HTML"
      ? "43px"
      : lang === "ORACLE"
      ? "54px"
      : "auto"};
  background-color: ${({ lang }) =>
    lang === "JAVA"
      ? theme.PALETTE.primary.green.main
      : lang === "JS"
      ? theme.PALETTE.primary.yellow.main
      : lang === "CSS"
      ? theme.PALETTE.primary.red.main
      : lang === "ORACLE"
      ? theme.PALETTE.primary.purple.main
      : lang === "HTML"
      ? theme.PALETTE.primary.blue.main
      : "#aaa"};
`;

S.QuestionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.QuestionTitle = styled.div`
  ${h6Bold}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

S.QuestionPreview = styled.div`
  ${h6Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  height: 60px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

/* 밑에 프로필·조회·댓글 줄 */
S.QuestionMetaWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.disabled};
  ${h7Light}
  /* margin-top: 4px; */

  b {
    font-weight: normal;
    /* color: ${({ theme }) => theme.PALETTE.neutral.gray.main}; */
    color: ${({ theme }) => theme.PALETTE.neutral.black.disabled};
  }

  img {
    width: 13px;
    height: 13px;
  }
`;

S.QuestionProfileImg = styled.img`
  width: 18px !important;
  height: 18px !important;
  border-radius: 50%;
  object-fit: cover;
  background-color: #f5f5f5;
`;

export default S;