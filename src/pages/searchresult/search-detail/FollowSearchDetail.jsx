import React, { useContext, useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SearchResultContext } from 'context/SearchResultContext';
import S from '../style';
import UserResult from '../Components/UserResult';
import FriendStyle from '../../mypage/friend/style';

// 3개 단위로 잘라주는 유틸 (UserResult가 내부에서 top3만 그려도 우회)
const chunkBy = (arr, size) => {
  if (!Array.isArray(arr) || size <= 0) return [arr];
  const res = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
};

const FollowSearchDetail = () => {
  const location = useLocation();
  const { state } = useContext(SearchResultContext);
  const { search, users } = state;

  // 무한 스크롤을 위한 상태
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef(null);
  const itemsPerPage = 10;

  // 사용자 데이터 매핑 (UserResult 컴포넌트가 기대하는 형식으로 변환)
  const mappedUsers = useMemo(() => {
    return users.map((user) => ({
      id: user.id || user.userId,
      userId: user.userId || user.id,
      userNickname: user.userNickname || user.userName || '익명',
      userProfile: user.userThumbnailUrl || user.userProfile || "/assets/images/defalutpro.svg",
      userLever: user.userLevel || user.userLever || user.level || 1,
      followerCount: user.followerCount || user.followCount || 0,
      isFollow: user.isFollow || false,
    }));
  }, [users]);

  // 페이지별 데이터 로드
  useEffect(() => {
    const startIndex = 0;
    const endIndex = page * itemsPerPage;
    setDisplayedUsers(mappedUsers.slice(startIndex, endIndex));
  }, [mappedUsers, page]);

  // 무한 스크롤 옵저버
  const observerCallback = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        if (displayedUsers.length < mappedUsers.length) {
          setIsLoading(true);
          setTimeout(() => {
            setPage((prev) => prev + 1);
            setIsLoading(false);
          }, 300);
        }
      }
    },
    [displayedUsers.length, mappedUsers.length, isLoading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerCallback]);

  // 3개씩 묶어서 UserResult 여러 번 호출 (각 호출은 내부적으로 top3만 그림)
  const rows = chunkBy(displayedUsers, 3);

  return (
    <S.LayOutWrap>
      <S.LayOut>
        <S.SearchCategoryWrap>
          <S.SearchResultCategoryLeft>
            <span>친구</span>
            <span className="blue">{users.length}</span>
          </S.SearchResultCategoryLeft>
        </S.SearchCategoryWrap>

        {/* UserResult 컴포넌트 사용 (마이페이지와 동일한 레이아웃) */}
        <FriendStyle.Section>
          {/* UserResult의 상단 파란 strip은 스타일로 숨김 */}
          {rows.map((row, idx) => (
            <FriendStyle.StripHeader key={`row-${idx}`}>
              <UserResult datas={row} search={search} count={users.length} />
            </FriendStyle.StripHeader>
          ))}
        </FriendStyle.Section>

        {/* 무한 스크롤 트리거 */}
        {displayedUsers.length < mappedUsers.length && (
          <S.InfiniteScrollTrigger ref={observerTarget}>
            {isLoading && <div>로딩 중...</div>}
          </S.InfiniteScrollTrigger>
        )}
      </S.LayOut>
    </S.LayOutWrap>
  );
};

export default FollowSearchDetail;
