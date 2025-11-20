import React, { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S from './style';
import { h4Bold, h7Bold, h7Light, h7Medium, h9Bold } from '../../../styles/common';
import { getFileDisplayUrl } from '../../../utils/fileUtils';
import { getFileDisplayUrlFromPathAndName } from "../../../utils/fileUtils";

const DEFAULT_PROFILE_IMAGE = "/assets/images/defalutpro.svg";

const Follower = () => {
  const { followers, following, refreshData } = useOutletContext();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [followUI, setFollowUI] = useState({});
  const [followerCounts, setFollowerCounts] = useState({}); // 각 사용자의 팔로워 수 저장
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 팔로워 데이터가 없거나 배열이 아닌 경우 처리
  const followerList = Array.isArray(followers) ? followers : [];
  const followingList = Array.isArray(following) ? following : [];

  // 팔로잉 목록에서 userId를 Set으로 변환하여 빠른 조회 가능하게 함
  const followingUserIds = useMemo(() => {
    return new Set(followingList.map(f => f.userId || f.id));
  }, [followingList]);

  // 사용자 ID 추출 함수
  const getId = (user) => {
    return user?.followerId || user?.userId || user?.id || user?.userSeq || user?.userNo;
  };

  // 각 팔로워의 팔로워 수를 가져오는 useEffect
  useEffect(() => {
    const fetchFollowerCounts = async () => {
      if (followerList.length === 0) return;

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      const counts = {};
      const promises = followerList.map(async (user) => {
        const userId = getId(user);
        if (!userId) return;

        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/private/follows/${userId}/count`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              credentials: "include",
            }
          );

          if (response.ok) {
            const result = await response.json();
            counts[userId] = result?.data || 0;
          } else {
            counts[userId] = 0;
          }
        } catch (error) {
          console.error(`팔로워 수 조회 실패 (userId: ${userId}):`, error);
          counts[userId] = 0;
        }
      });

      await Promise.all(promises);
      setFollowerCounts(counts);
    };

    fetchFollowerCounts();
  }, [followerList]); // followerList가 변경될 때마다 실행

  // 페이지네이션 계산
  const totalPages = Math.max(1, Math.ceil(followerList.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFollowers = followerList.slice(startIndex, endIndex);

  // 팔로우 토글 함수
  const toggleFollow = async (user, currentIsFollow) => {
    const userId = getId(user);
    const newFollowState = !currentIsFollow;

    // 낙관적 업데이트
    setFollowUI(prev => ({ ...prev, [userId]: newFollowState }));

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        setFollowUI(prev => ({ ...prev, [userId]: currentIsFollow }));
        return;
      }

      if (!currentUser?.id) {
        alert("사용자 정보를 불러올 수 없습니다.");
        setFollowUI(prev => ({ ...prev, [userId]: currentIsFollow }));
        return;
      }

      if (newFollowState) {
        // 팔로우 추가
        // 팔로워 목록에서 user.followerId는 나를 팔로우한 사람의 ID
        // 현재 사용자가 그 사람을 팔로우하려면:
        // userId: user.followerId (팔로우 받을 사람)
        // followerId: currentUser.id (팔로우 하는 사람)
        const targetUserId = user.followerId || user.userId || user.id;
        
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/follows/follow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
          body: JSON.stringify({
            userId: targetUserId,
            followerId: currentUser.id,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`팔로우 실패: ${errorText}`);
        }
      } else {
        // 팔로우 삭제
        // 팔로워 목록에서 언팔로우할 때는 현재 사용자가 그 사람을 팔로우하는 관계를 찾아야 함
        // following 목록에서 해당 사용자의 followId를 찾음
        const targetUserId = user.followerId || user.userId || user.id;
        const followRelation = followingList.find(f => (f.userId || f.id) === targetUserId);
        const followId = followRelation?.id;

        if (followId) {
          // followId로 삭제
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/follows/delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
            body: JSON.stringify(followId),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`언팔로우 실패: ${errorText}`);
          }
        } else {
          // followId가 없는 경우 userId와 followerId로 삭제 시도
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/follows/remove`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
            body: JSON.stringify({
              id: null, // id가 없으므로 null
              userId: targetUserId,
              followerId: currentUser.id,
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`언팔로우 실패: ${errorText}`);
          }
        }
      }

      // 데이터 새로고침
      if (refreshData) {
        refreshData();
      }
    } catch (error) {
      console.error("팔로우 토글 오류:", error);
      // 실패 시 원래 상태로 복구
      setFollowUI(prev => ({ ...prev, [userId]: currentIsFollow }));
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <S.FollowerContainer>
      {currentFollowers.length === 0 ? (
        <S.EmptyMessage>팔로워가 없습니다.</S.EmptyMessage>
      ) : (
        <>
          <S.FollowerList>
            {currentFollowers.map((user) => {
              const userId = getId(user);
              // 팔로우 상태 확인: UI 상태 > 팔로잉 목록 확인 > 기본값 false
              const isFollow = (userId in followUI) 
                ? followUI[userId] 
                : followingUserIds.has(userId);

              // 팔로워 목록에서 사용자 정보 추출
                const nickname = user.followerNickname || user.userNickname || user.nickname || "익명";
                const level = user.followerLevel || user.userLevel || user.level || 1;

                // API에서 가져온 팔로워 수를 사용, 없으면 기본값 0
                const followerCount =
                  followerCounts[userId] !== undefined
                    ? followerCounts[userId]
                    : (user.followerCount || 0);

                // ✅ 1) 새 구조: path + name
                const thumbnailPath =
                  user.followerThumbnailUrl ||
                  user.userThumbnailUrl ||
                  user.profilePath || "";

                const thumbnailName =
                  user.followerThumbnailName ||
                  user.userThumbnailName ||
                  user.profileName || "";

                // ✅ 2) 구 구조: 한 필드에 전체 경로가 들어있는 경우 대비
                const legacyRaw =
                  user.followerThumbnailUrl ||
                  user.userThumbnailUrl ||
                  user.profileUrl ||
                  "";

                // ✅ 3) 최종 프로필 이미지 URL 계산
                let profileUrl;

                // (1) 기본 이미지 조건
                if (
                  !thumbnailPath ||
                  thumbnailPath === "" ||
                  thumbnailPath === "/default" ||
                  thumbnailPath === "null" ||
                  thumbnailPath === "undefined"
                ) {
                  profileUrl = DEFAULT_PROFILE_IMAGE;
                }
                // (2) 외부 URL / assets 경로인 경우 그대로 사용
                else if (
                  thumbnailPath.startsWith("http") ||
                  thumbnailPath.startsWith("/assets")
                ) {
                  profileUrl = thumbnailPath;
                }
                // (3) 새 구조: 경로 + 파일명이 모두 있을 때
                else if (thumbnailPath && thumbnailName) {
                  profileUrl =
                    getFileDisplayUrlFromPathAndName(thumbnailPath, thumbnailName) ||
                    DEFAULT_PROFILE_IMAGE;
                }
                // (4) 구 구조: path 하나에 전체 경로가 들어있는 경우 (ex: '2025/11/18/uuid_ara.jpg', 'uploads/ara.jpg')
                else if (legacyRaw) {
                  let fileName = legacyRaw;

                  if (fileName.startsWith("/uploads/")) {
                    fileName = fileName.replace("/uploads/", "");
                  } else if (fileName.startsWith("uploads/")) {
                    fileName = fileName.replace("uploads/", "");
                  }

                  profileUrl = getFileDisplayUrl(fileName);
                } else {
                  profileUrl = DEFAULT_PROFILE_IMAGE;
                }

                const levelImageUrl = `/assets/images/test-grade/grade${level}.png`;

console.log("팔로워 썸네일", {
  followerThumbnailUrl: user.followerThumbnailUrl,
  followerThumbnailName: user.followerThumbnailName,
  userThumbnailUrl: user.userThumbnailUrl,
  userThumbnailName: user.userThumbnailName,
  profileUrl,
});


              return (
                <div key={userId}>
                  <S.FollowerItem>
                    <S.FollowerLeft>
                      <S.FollowerAvatar>
                        <img src={profileUrl} alt="" />
                      </S.FollowerAvatar>
                      <S.LevelBadge className="lv">
                        <img src={levelImageUrl} className="lvImg" alt="" />
                        <span>Lv {level === 10 ? "X" : level}</span>
                      </S.LevelBadge>
                      <p>{nickname}</p>
                      <span className="follower">팔로워: </span>
                      <span className="count">
                        {followerCount > 1000 ? (followerCount / 1000).toFixed(1) + "k" : followerCount}
                      </span>
                    </S.FollowerLeft>
                    {isFollow ? (
                      <S.FollowingButton
                        as="button"
                        type="button"
                        onClick={() => toggleFollow(user, isFollow)}
                      >
                        <span>팔로잉</span>
                      </S.FollowingButton>
                    ) : (
                      <S.FollowButton
                        as="button"
                        type="button"
                        onClick={() => toggleFollow(user, isFollow)}
                      >
                        <span>팔로우</span>
                      </S.FollowButton>
                    )}
                  </S.FollowerItem>
                </div>
              );
            })}
          </S.FollowerList>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <S.Pagination>
              <S.PaginationButton 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </S.PaginationButton>
              {Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 10) {
                  pageNum = i + 1;
                } else {
                  if (currentPage <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 4) {
                    pageNum = totalPages - 9 + i;
                  } else {
                    pageNum = currentPage - 4 + i;
                  }
                }
                return (
                  <S.PaginationNumber
                    key={pageNum}
                    $active={currentPage === pageNum}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </S.PaginationNumber>
                );
              })}
              <S.PaginationButton 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </S.PaginationButton>
            </S.Pagination>
          )}
        </>
      )}
      
    </S.FollowerContainer>
  );
};

export default Follower;
