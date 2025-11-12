import React, { useEffect } from 'react'; 
import S from './style'; 


const Questionpagenation = ({ currentPage, totalPages, onPageChange }) => {
  //이전페이지
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  //다음페이지
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  //특정페이지클릭
  const handlePageClick = (num) => onPageChange(num);
 
  // 페이지 이동시 스크롤 맨위
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentPage]);

  // 페이지가 하나면 버튼 안 보이게
  if (totalPages <= 1) return null;

  return (
    <>
      {/* 페이지네이션 */}
      <S.Pagination>
        <S.PageArrow
          className="left"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <img src="/assets/icons/pnleftarrow.svg" alt="이전 페이지" />
        </S.PageArrow>

        {Array.from({ length: totalPages }, (_, i) => (
          <S.PageButton
            key={i + 1}
            $active={currentPage === i + 1}
            onClick={() => handlePageClick(i + 1)}
          >
            {i + 1}
          </S.PageButton>
        ))}

        <S.PageArrow
          className="right"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <img src="/assets/icons/pnrightarrow.svg" alt="다음 페이지" />
        </S.PageArrow>
      </S.Pagination>
      
    </>
  );
};

export default Questionpagenation;