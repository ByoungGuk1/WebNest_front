import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import S from './style';

const Pagination = ({ totalCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const current = Number(params.get('page')) || 1;

  const itemsPerPage = 10;
  const maxPageCount = Math.ceil(totalCount / itemsPerPage); 

  const countParam = (page) => {
    const newPage = Math.max(1, Math.min(maxPageCount, page)); 
    params.set('page', String(newPage));
    navigate({ pathname: '/quiz', search: `?${params.toString()}` });
  };

  if (maxPageCount <= 1) return null;

  const start = Math.max(1, current - 2);
  const end = Math.min(maxPageCount, start + 2);
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <S.NavigateWrap>
      <S.Navigate aria-label="Pagination">
        <S.NavigateBtn
          onClick={() => countParam(current - 1)}
          disabled={current === 1}
        >
          <img src="/assets/icons/pnleftarrow.svg" alt="이전 페이지" />
        </S.NavigateBtn>

        {pages.map((p) => (
          <S.PageButton
            key={p}
            onClick={() => countParam(p)}
            aria-current={p === current ? 'page' : undefined}
            $active={p === current}
            style={p === current ? { fontWeight: 'bold' } : undefined}
          >
            {p}
          </S.PageButton>
        ))}

        <S.NavigateBtn
          onClick={() => countParam(current + 1)}
          disabled={current === maxPageCount}
        >
          <img src="/assets/icons/pnrightarrow.svg" alt="다음 페이지" />
        </S.NavigateBtn>
      </S.Navigate>
    </S.NavigateWrap>
  );
};

export default Pagination;
