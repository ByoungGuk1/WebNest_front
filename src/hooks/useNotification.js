import { useCallback } from 'react';

const API_BASE = (process.env.REACT_APP_BACKEND_URL || "http://localhost:10000").replace(/\/+$/, "");

/**
 * 알림 관련 hooks
 * 팔로우, 좋아요, 댓글, 답글 등에서 백엔드로 알림을 전송하는 함수들을 제공합니다.
 */
const useNotification = () => {
  /**
   * 백엔드로 알림 요청을 보내는 공통 함수
   * @param {string} endpoint - 알림 API 엔드포인트
   * @param {object} payload - 알림 데이터
   * @returns {Promise<Response>}
   */
  const sendNotification = useCallback(async (endpoint, payload) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.warn("알림 전송 실패: 로그인이 필요합니다.");
        return null;
      }

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`알림 전송 실패: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("알림 전송 중 오류:", error);
      return null;
    }
  }, []);

  /**
   * 1. 팔로우 알림 전송
   * @param {number} followedUserId - 팔로우 받은 사용자 ID (알림 받을 사용자)
   * @param {number} followerUserId - 팔로우 한 사용자 ID (현재 로그인한 사용자, 알림 보낸 사용자)
   */
  const sendFollowNotification = useCallback(async (followedUserId, followerUserId) => {
    if (!followedUserId || !followerUserId) {
      console.warn("팔로우 알림 전송 실패: 사용자 ID가 필요합니다.");
      return;
    }

    // 본인을 팔로우하는 경우 알림 전송하지 않음
    if (followedUserId === followerUserId) {
      return;
    }

    const payload = {
      followedUserId,
      followerUserId,
    };

    return await sendNotification("/private/notification/follow/insert", payload);
  }, [sendNotification]);

  /**
   * 2. 게시글 댓글 알림 전송
   * @param {number} postId - 게시글 ID
   * @param {number} postAuthorId - 게시글 작성자 ID (알림 받을 사용자)
   * @param {number} userId - 댓글 작성자 ID (현재 로그인한 사용자, 알림 보낸 사용자)
   * @param {string} postTitle - 게시글 제목
   * @param {string} postNotificationAction - 알림 액션 타입 ("New Comment" 또는 "New Like")
   */
  const sendPostCommentNotification = useCallback(async (postId, postAuthorId, userId, postTitle, postNotificationAction = "New Comment") => {
    if (!postId || !postAuthorId || !userId) {
      console.warn("게시글 댓글 알림 전송 실패: 필요한 정보가 부족합니다.");
      return;
    }

    // 본인 게시글에 댓글 다는 경우 알림 전송하지 않음
    if (postAuthorId === userId) {
      return;
    }

    const payload = {
      postId,
      userId, // 댓글 작성자 ID
      postNotificationAction: postNotificationAction || "New Comment",
      postTitle: postTitle || "",
    };

    return await sendNotification("/private/notification/post/insert", payload);
  }, [sendNotification]);

  /**
   * 3. 게시글 좋아요 알림 전송
   * @param {number} postId - 게시글 ID
   * @param {number} postAuthorId - 게시글 작성자 ID (알림 받을 사용자)
   * @param {number} userId - 좋아요 한 사용자 ID (현재 로그인한 사용자, 알림 보낸 사용자)
   * @param {string} postTitle - 게시글 제목
   */
  const sendPostLikeNotification = useCallback(async (postId, postAuthorId, userId, postTitle) => {
    if (!postId || !postAuthorId || !userId) {
      console.warn("게시글 좋아요 알림 전송 실패: 필요한 정보가 부족합니다.");
      return;
    }

    // 본인 게시글에 좋아요 누르는 경우 알림 전송하지 않음
    if (postAuthorId === userId) {
      return;
    }

    const payload = {
      postId,
      userId, // 좋아요 한 사용자 ID
      postNotificationAction: "New Like",
      postTitle: postTitle || "",
    };

    return await sendNotification("/private/notification/post/insert", payload);
  }, [sendNotification]);

  /**
   * 4. 댓글 답글 알림 전송
   * @param {number} commentId - 댓글 ID (답글을 달 댓글)
   * @param {number} userId - 답글 작성자 ID (현재 로그인한 사용자, 알림 보낸 사용자)
   * @param {number} postId - 게시글 ID
   * @param {string} commentNotificationAction - 알림 액션 타입 ("New Comment" 또는 "New Like")
   */
  const sendCommentReplyNotification = useCallback(async (commentId, userId, postId, commentNotificationAction = "New Comment") => {
    if (!commentId || !userId) {
      console.warn("댓글 답글 알림 전송 실패: 필요한 정보가 부족합니다.");
      return;
    }

    const payload = {
      commentId,
      userId, // 답글 작성자 ID
      postId: postId || null,
      commentNotificationAction: commentNotificationAction || "New Comment",
    };

    return await sendNotification("/private/notification/comment/insert", payload);
  }, [sendNotification]);

  /**
   * 5. 댓글 좋아요 알림 전송
   * @param {number} commentId - 댓글 ID
   * @param {number} userId - 좋아요 한 사용자 ID (현재 로그인한 사용자, 알림 보낸 사용자)
   * @param {number} postId - 게시글 ID
   */
  const sendCommentLikeNotification = useCallback(async (commentId, userId, postId) => {
    if (!commentId || !userId) {
      console.warn("댓글 좋아요 알림 전송 실패: 필요한 정보가 부족합니다.");
      return;
    }

    const payload = {
      commentId,
      userId, // 좋아요 한 사용자 ID
      postId: postId || null,
      commentNotificationAction: "New Like",
    };

    return await sendNotification("/private/notification/comment/insert", payload);
  }, [sendNotification]);

  return {
    sendFollowNotification,
    sendPostCommentNotification,
    sendPostLikeNotification,
    sendCommentReplyNotification,
    sendCommentLikeNotification,
  };
};

export default useNotification;
