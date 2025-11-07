// src/pages/mypage/friend/FriendContainer.jsx
import React, { useEffect, useState } from "react";
import S from "./style";

// ✅ UserResult: default export만 존재 → default import로 가져오기
import UserResult from "../../searchresult/Components/UserResult";




// ✅ 3개 단위로 잘라주는 유틸 (UserResult가 내부에서 top3만 그려도 우회)
const chunkBy = (arr, size) => {
  if (!Array.isArray(arr) || size <= 0) return [arr];
  const res = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
};

// ✅ 더미 데이터
const genDummyUsers = (n = 57) => {
  const arr = [];
  for (let i = 1; i <= n; i++) {
    const level = ((i - 1) % 10) + 1;
    arr.push({
      id: i,
      profileUrl: `/assets/profiles/p${((i - 1) % 6) + 1}.png`,
      levelImageUrl: `/assets/images/level/${level}.svg`, // 퍼블릭 경로 기준 권장
      level,
      nickname: `사용자_${i.toString().padStart(2, "0")}`,
      followCount: (i * 13) % 5000,
      isFollow: i % 2 === 0,
    });
  }
  return arr;
};

const FriendContainer = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 한 페이지 10명

  useEffect(() => {
    setUsers(genDummyUsers(57));
  }, []);

  // ✅ 페이징
  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));
  const start = (currentPage - 1) * pageSize;
  const pageData = users.slice(start, start + pageSize);

  // ✅ 3개씩 묶어서 UserResult 여러 번 호출 (각 호출은 내부적으로 top3만 그림)
  const rows = chunkBy(pageData, 3);

  const goPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
  };

  return (
    <S.Page>
      {/* 레이아웃과 UserResult 묶음 사이 여백 */}
      <S.Section>
        {/* UserResult의 상단 파란 strip은 스타일로 숨김 */}
        {rows.map((row, idx) => (
          <S.StripHeader key={`row-${idx}`}>
            <UserResult datas={row} search="" count={users.length} />
          </S.StripHeader>
        ))}
      </S.Section>

 
    </S.Page>
  );
};

export default FriendContainer;
