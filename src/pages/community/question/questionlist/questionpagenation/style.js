import styled from "styled-components";
import { h6Medium } from "styles/common";


const S = {};
         
/* 페이지네이션 */
S.Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin: 100px 0;
`;

S.PageArrow = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  img {
    width: 6px;
    height: 12px;
    opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  }

  &.left {
    margin-right: 45px;
  }

  &.right {
    margin-left: 45px;
  }
`;

S.PageButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? "#FFC107" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  ${h6Medium}
  cursor: pointer;

  &:hover {
    background-color: ${({ $active }) =>
      !$active ? "rgba(0,0,0,0.05)" : "#FFC107"};
  }
`;

export default S;