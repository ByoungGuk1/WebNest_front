import React, { useState } from "react";

import * as S from "./style";

const MyPostContainer = () => {
  // ✅ 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(5); // 임시 값. 실제 totalCount로 계산해서 교체하세요.


  // ✅ 페이지 이동
  const goPage = (page) => {
    const next = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(next);
    // 필요시 여기서 목록 재조회
    // fetchMyPosts({ page: next, size: 10 });
  };



  return (
    <div>
      <toggle></toggle>
  

    </div>
  );
};

export default MyPostContainer;
