import React, { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S from './style';
import { h4Bold, h7Bold, h7Light, h7Medium, h9Bold } from '../../../styles/common';
import { getFileDisplayUrl, getFileDisplayUrlFromPathAndName } from '../../../utils/fileUtils';

const DEFAULT_PROFILE_IMAGE = "/assets/images/defalutpro.svg"; // ✅ 공통 기본 이미지

const Following = () => {
  const { following, refreshData } = useOutletContext();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [followUI, setFollowUI] = useState({});
  const [followerCounts, setFollowerCounts] = useState({}); // 각 사용자의 팔로워 수 저장
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 팔로잉 데이터가 없거나 배열이 아닌 경우 처리
  const followingList = Array.isArray(following) ? following : [];


  // 사용자 ID 추출 함수
  const getId = (user) => {
    return user?.userId || user?.id || user?.userSeq || user?.userNo;
  };

  // 각 팔로잉 사용자의 팔로워 수를 가져오는 useEffect
  useEffect(() => {
    const fetchFollowerCounts = async () => {
      if (followingList.length === 0) return;

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      const counts = {};
      const promises = followingList.map(async (user) => {
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
  }, [followingList]); // followingList가 변경될 때마다 실행

  // 페이지네이션 계산
  const totalPages = Math.max(1, Math.ceil(followingList.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFollowing = followingList.slice(startIndex, endIndex);

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
        // 팔로잉 목록에서 user.userId는 내가 팔로우한 사람의 ID
        const targetUserId = user.userId || user.id;
        
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
        // 팔로우 삭제 (언팔로우)
        // 팔로잉 목록에서 user.id는 팔로우 관계의 ID일 수도 있음
        const followId = user.id;

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
          const targetUserId = user.userId || user.id;
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
      {currentFollowing.length === 0 ? (
        <S.EmptyMessage>팔로잉이 없습니다.</S.EmptyMessage>
      ) : (
        <>
          <S.FollowerList>
            {currentFollowing.map((user) => {
    




              const userId = getId(user);
              // 팔로우 상태 확인: UI 상태 > 기본값 true (팔로잉 목록이므로 이미 팔로우한 상태)
              const isFollow = (userId in followUI) 
                ? followUI[userId] 
                : true;

              // 팔로잉 목록에서 사용자 정보 추출
              const nickname = user.userNickname || user.nickname || "익명";
              const level = user.userLevel || user.level || 1;

              // API에서 가져온 팔로워 수를 사용, 없으면 기본값 0
              const followerCount =
                followerCounts[userId] !== undefined
                  ? followerCounts[userId]
                  : (user.followerCount || 0);

              // ✅ 프로필 이미지 경로 계산 (path + name 우선)
              const thumbnailPath =
                user.userThumbnailUrl ||
                user.profilePath ||
                "";

              const thumbnailName =
                user.userThumbnailName ||
                user.profileName ||
                "";

              const legacyRaw =
                user.profileUrl ||
                "";

              let profileUrl;

              if (
                !thumbnailPath ||
                thumbnailPath === "" ||
                thumbnailPath === "/default" ||
                thumbnailPath === "null" ||
                thumbnailPath === "undefined"
              ) {
                profileUrl = DEFAULT_PROFILE_IMAGE;
              } else if (
                thumbnailPath.startsWith("http") ||
                thumbnailPath.startsWith("/assets")
              ) {
                profileUrl = thumbnailPath;
              } else if (thumbnailPath && thumbnailName) {
                profileUrl =
                  getFileDisplayUrlFromPathAndName(thumbnailPath, thumbnailName) ||
                  DEFAULT_PROFILE_IMAGE;
              } else if (legacyRaw) {
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

              return (
                <div key={userId}>
                  <S.FollowerItem>
                    <S.FollowerLeft>
                      <S.FollowerAvatar>
                        <img
                          src={profileUrl}
                          alt={`${nickname} 프로필`}
                          onError={(e) => {
                            e.currentTarget.src = DEFAULT_PROFILE_IMAGE;
                          }}
                        />
                      </S.FollowerAvatar>

                      <S.LevelBadge className="lv">
                        <img src={levelImageUrl} className="lvImg" alt="" />
                        <span>Lv {level === 10 ? "X" : level}</span>
                      </S.LevelBadge>

                      <p>{nickname}</p>
                      <span className="follower">팔로워 : </span>
                      <span className="count">
                        {followerCount > 1000
                          ? (followerCount / 1000).toFixed(1) + "k"
                          : followerCount}
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

export default Following;
