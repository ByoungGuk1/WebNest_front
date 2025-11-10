// src/pages/community/post/postlist/style.js
import styled from "styled-components";
import { Link } from "react-router-dom";
import { h6Bold, h6Medium, h7Bold, h8Medium, h9Bold } from "../../../../styles/common";

const S = {};

/* ===================== 정렬/글쓰기 영역 ===================== */
S.SortWrap = styled.div`
  width: 1160px;
  margin: 46px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  /* 공용 드롭다운 루트 높이 보정 */
  & .dd-ctrl {
    margin: -6px 0 6px 0;
  }
`;

S.WriteButton = styled.div`
  width: 113px; 
  height: 40px;
  background-color: ${({ theme }) => theme.PALETTE.primary.purple.main};
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  ${h6Bold}
  border-radius: 10px;
  display: flex;
  justify-content: center; 
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary.purple.dark};
  }
`;

/* ===================== 리스트 ===================== */
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
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.neutral.white.dark};
  padding-bottom: 20px;
`;

S.Tag = styled.div`
  color: #fff;
  height: 20px;
  border-radius: 4px;
  ${h9Bold}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 0 6px;
  min-width: 24px;

  /* 폭과 색상은 lang과 테마에 따라 */
  width: ${({ lang }) =>
    lang === "JS" ? "24px" :
    lang === "JAVA" ? "40px" :
    lang === "CSS" ? "33px" :
    lang === "HTML" ? "43px" :
    lang === "ORACLE" ? "54px" : "auto"};

  background-color: ${({ lang, theme }) => {
    const { primary } = theme.PALETTE;
    if (lang === "JAVA") return primary.green.main;
    if (lang === "JS") return primary.yellow.main;
    if (lang === "CSS") return primary.red.main;
    if (lang === "ORACLE") return primary.purple.main;
    if (lang === "HTML") return primary.blue.main;
    return "#aaa";
  }};
`;

S.QuestionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

S.QuestionTitle = styled.div`
  ${h6Bold}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
  margin: 12px 0;
`;

S.QuestionPreview = styled.div`
  ${h6Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  margin: 0 0 12px 0;
`;

/* 메타 + (선택) 인기댓글 */
S.MetaBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 4px;
`;

S.ListMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

S.MetaWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  ${h8Medium}

  b {
    font-weight: normal;
    color: ${({ theme }) => theme.PALETTE.neutral.gray.main};
  }
`;

S.ProfileImg = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #f5f5f5;
`;

S.Response = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  ${h8Medium}
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};

  img { width: 13px; height: 13px; }
`;

S.TopCommentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding-left: 20px;
`;

S.TopCmtName = styled.span`
  ${h7Bold}
  color: ${({ theme }) => theme.PALETTE.neutral.black.main};
`;

S.TopCmtContent = styled.span`
  ${h7Bold}
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

S.BestBadge = styled.span`
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 8px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: #fff;
  ${h9Bold}
  margin-left: 6px;
`;

/* ===================== 페이지네이션 ===================== */
S.Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin: 100px 0;
  position: relative;
`;

S.PageArrow = styled.button`
  width: 32px; height: 32px;
  border: none; border-radius: 50%;
  background-color: rgba(0,0,0,0.05);
  display: flex; justify-content: center; align-items: center;
  cursor: pointer;
  transition: background-color .2s ease;

  img { width: 6px; height: 12px; }

  &:hover { background-color: rgba(0,0,0,0.1); }

  &.left { margin-right: 45px; }
  &.right { margin-left: 45px; }
`;

S.PageButton = styled.button`
  width: 32px; height: 32px;
  border: none; border-radius: 50%;
  background-color: ${({ $active }) => ($active ? "#FFC107" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  ${h6Medium}
  cursor: pointer;

  &:hover {
    background-color: ${({ $active }) => (!$active ? "rgba(0,0,0,0.05)" : "#FFC107")};
  }
`;

export default S;
