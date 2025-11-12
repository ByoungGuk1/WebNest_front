import React from 'react';
import S from "./style";
import { useNavigate } from 'react-router-dom';

const QustionListSort = ({ sortOption, onSortChange }) => {
  const navigate = useNavigate();
  return (
    <>
      <S.SortWrap>
        <S.Select>
          <select value={sortOption} onChange={onSortChange}>
            <option>최신글</option>
            <option>조회순</option>
            <option>댓글순</option>
          </select>
        </S.Select>

        <S.WriteButton onClick={() => navigate("/question/write")}>
          글쓰기
        </S.WriteButton>
      </S.SortWrap>
    </>
  );
};

export default QustionListSort;