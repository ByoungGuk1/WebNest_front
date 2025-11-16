import React, { useEffect, useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S from './style';
import UserResult from '../../searchresult/Components/UserResult';

const Following = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const myData = useOutletContext();
  const [loading, setLoading] = useState(true);

  // MyPageContainer에서 받은 데이터 사용
  const followingData = useMemo(() => {
    return myData?.following || [];
  }, [myData]);

  // UserResult 컴포넌트가 기대하는 형식으로 변환
  const formattedFollowing = useMemo(() => {
    if (!Array.isArray(followingData)) return [];
    
    return followingData.map((follow) => ({
      id: follow.userId || follow.id,
      userId: follow.userId || follow.id,
      userNickname: follow.userNickname || '익명',
      userProfile: follow.userThumbnailUrl || "/assets/images/defalutpro.svg",
      userLever: follow.userLevel || 1,
      followerCount: 0, // 팔로워 수는 별도로 조회 필요시 추가
      isFollow: true, // 팔로잉 중인 사용자
      followId: follow.id, // 언팔로우 시 사용할 follow id
    }));
  }, [followingData]);

  useEffect(() => {
    if (myData !== null && myData !== undefined) {
      setLoading(false);
    }
  }, [myData]);

  const fetchFollowing = async () => {
    // MyPageContainer의 데이터 새로고침 함수 호출
    if (myData?.refreshData) {
      await myData.refreshData();
    }
  };

  // 3개씩 묶어서 표시
  const chunkBy = (arr, size) => {
    if (!Array.isArray(arr) || size <= 0) return [arr];
    const res = [];
    for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
    return res;
  };

  const followingRows = chunkBy(formattedFollowing, 3);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <S.Section>
      {followingRows.length > 0 ? (
        followingRows.map((row, index) => (
          <S.StripHeader key={index}>
            <UserResult datas={row} search="" onFollowChange={fetchFollowing} />
          </S.StripHeader>
        ))
      ) : (
        <div>팔로잉 중인 사용자가 없습니다.</div>
      )}
    </S.Section>
  );
};

export default Following;