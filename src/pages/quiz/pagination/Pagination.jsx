import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import S from './style';

const Pagination = ({ totalCount }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const current = Number(params.get('page')) || 1;

    const countParam = (page) => {
        const maxPage = Math.max(1, Math.min(totalCount, page));
        params.set('page', String(maxPage))
        navigate({ pathname: '/quiz', search: `?${params.toString()}` });
    }

    if (totalCount <= 1) return null;

    const start = Math.max(1, current - 2);
    const end = Math.min(totalCount, start + 2);
    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    console.log("totalCount:", totalCount)
    console.log(current)

    return (
        <S.NavigateWrap>
            <S.Navigate aria-label="Pagination">
                <S.NavigateBtn leftBtn onClick={() => countParam(current - 1)} disabled={current === 1}><img src="/assets/icons/pnleftarrow.svg" alt="이전 페이지"></img></S.NavigateBtn>

                {pages.map((p) => (
                    <S.PageButton
                        key={p}
                        onClick={() => countParam(p)}
                        aria-current={p === current ? 'page' : undefined}
                        active={p === current}
                        style={p === current ? { fontWeight: 'bold' } : undefined}
                    >
                        {p}
                    </S.PageButton>
                ))}

                <S.NavigateBtn rightBtn onClick={() => countParam(current + 1)} disabled={current === totalCount}><img src="/assets/icons/pnrightarrow.svg" alt="다음 페이지"></img></S.NavigateBtn>
                {/* <button onClick={() => countParam(totalCount)} disabled={current === totalCount}>Last</button> */}
            </S.Navigate>

        </S.NavigateWrap>
    );
};

export default Pagination;