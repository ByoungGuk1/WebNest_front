import React, { useEffect, useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S from './style';
import UserResult from '../../searchresult/Components/UserResult';

const Follower = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const myData = useOutletContext();
  const [loading, setLoading] = useState(true);

  // MyPageContainer에서 받은 데이터 사용
  const followersData = useMemo(() => {
    return myData?.followers || [];
  }, [myData]);

  // UserResult 컴포넌트가 기대하는 형식으로 변환
  // 팔로워 리스트: followerId가 팔로워의 id, userId는 현재 사용자
  const formattedFollowers = useMemo(() => {
    if (!Array.isArray(followersData)) return [];
    
    return followersData.map((follower) => ({
      id: follower.followerId || follower.id,
      userId: follower.followerId || follower.id,
      userNickname: follower.userNickname || '익명',
      userProfile: follower.userThumbnailUrl || "/assets/images/defalutpro.svg",
      userLever: follower.userLevel || 1,
      followerCount: 0, // 팔로워 수는 별도로 조회 필요시 추가
      isFollow: false, // 팔로워는 나를 팔로우하는 사람이므로, 내가 팔로우하는지 확인 필요
      followId: follower.id, // 언팔로우 시 사용할 follow id
    }));
  }, [followersData]);

  useEffect(() => {
    if (myData !== null && myData !== undefined) {
      setLoading(false);
    }
  }, [myData]);

  const fetchFollowers = async () => {
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

  const followerRows = chunkBy(formattedFollowers, 3);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <S.Section>
      {followerRows.length > 0 ? (
        followerRows.map((row, index) => (
          <S.StripHeader key={index}>
            <UserResult datas={row} search="" onFollowChange={fetchFollowers} />
          </S.StripHeader>
        ))
      ) : (
        <div>팔로워가 없습니다.</div>
      )}
    </S.Section>
  );
};

export default Follower;