import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Questionpagenation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 7;

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const navigate = useNavigate();
  // ✅ 페이지네이션
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePageClick = (num) => setCurrentPage(num);
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentPage]);

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