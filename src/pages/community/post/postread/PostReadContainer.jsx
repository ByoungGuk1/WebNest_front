// src/pages/community/post/postread/PostReadContainer.jsx 
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import S from "./style";


/** 🔧 백엔드 연동용 상수 */
const API_BASE = (process.env.REACT_APP_BACKEND_URL || "http://localhost:10000").replace(/\/+$/, "");
const GET_OPEN_POST = (id, userId) =>
  `${API_BASE}/post/get-post/${id}?userId=${userId}`;
const GET_COMMENTS         = (id, userId) => `${API_BASE}/comment/${id}?userId=${userId}`;
const GET_COMMENT_LIKE     = (id) => `${API_BASE}/commentLike/${id}`;
const GET_SUBCOMMENTS      = (commentId) => `${API_BASE}/subcomment/get-comments/${commentId}`;
const GET_SUBCOMMENT_LIKE  = (id) => `${API_BASE}/subcommentLike/${id}`;

const CREATE_COMMENT       = `${API_BASE}/comment/write`;      // 댓글 작성
const UPDATE_COMMENT       = `${API_BASE}/comment/modify`;     // 댓글 수정
const CREATE_SUBCOMMENT    = `${API_BASE}/subcomment/write`;   // 대댓글 작성
const DELETE_SUBCOMMENT    = `${API_BASE}/subcomment/remove`; // 대댓글 삭제

<<<<<<< HEAD
/** ✅ 좋아요 토글(백엔드 규약에 맞게 필요시 경로 수정) */
const TOGGLE_POST_LIKE       = (postId, userId) => `${API_BASE}/post/like?postId=${postId}&userId=${userId}`;             // POST
const TOGGLE_COMMENT_LIKE    = (commentId, postId, userId) => `${API_BASE}/commentLike/toggle?commentId=${commentId}&postId=${postId}&userId=${userId}`; // POST
=======
/** ✅ 좋아요 토글(백엔드 규약에 맞게 수정) */
const TOGGLE_POST_LIKE       = (postId, userId) => `${API_BASE}/post/like?postId=${postId}&userId=${userId}`; // POST (Query Parameter)
const CREATE_COMMENT_LIKE    = `${API_BASE}/commentLike/commentlike`; // POST (body에 { userId, postId, commentId })
const DELETE_COMMENT_LIKE    = `${API_BASE}/commentLike/remove`; // DELETE (body에 { id, userId, commentId })
>>>>>>> 3b329b764f60db19c9a77771ec4cc1535d5630fb

/** ✅ 대댓글 작성 */
const CREATE_SUBCOMMENT = `${API_BASE}/subcomment/write`; // POST (body에 { userId, commentId, subcommentDescription, subcommentCreateAt })

/** ✅ 대댓글 좋아요 토글 (POST /subcommentLike/subcommentlike, body: { userId, subcommentId }) */
const TOGGLE_SUBCOMMENT_LIKE = `${API_BASE}/subcommentLike/subcommentlike`;
/** ✅ 대댓글 좋아요 삭제 (DELETE /subcommentLike/remove, body: { id, userId, subcommentId }) */
const DELETE_SUBCOMMENT_LIKE = `${API_BASE}/subcommentLike/remove`;

/** ✅ 대댓글 좋아요 localStorage 키 유틸 */
const SUBCOMMENT_LIKE_STORAGE_KEY_PREFIX = "subcommentLikes_";

const getSubcommentLikeStorageKey = (userId) =>
  `${SUBCOMMENT_LIKE_STORAGE_KEY_PREFIX}${userId}`;

const loadStoredSubcommentLikes = (userId) => {
  if (!userId || typeof window === "undefined") {
    return { liked: {}, ids: {} };
  }
  try {
    const raw = window.localStorage.getItem(getSubcommentLikeStorageKey(userId));
    if (!raw) return { liked: {}, ids: {} };
    const parsed = JSON.parse(raw);
    return {
      liked: parsed.liked && typeof parsed.liked === "object" ? parsed.liked : {},
      ids: parsed.ids && typeof parsed.ids === "object" ? parsed.ids : {},
    };
  } catch (e) {
    console.error("loadStoredSubcommentLikes error", e);
    return { liked: {}, ids: {} };
  }
};

const saveStoredSubcommentLikes = (userId, likedMap, idMap) => {
  if (!userId || typeof window === "undefined") return;
  try {
    const payload = JSON.stringify({ liked: likedMap, ids: idMap });
    window.localStorage.setItem(getSubcommentLikeStorageKey(userId), payload);
  } catch (e) {
    console.error("saveStoredSubcommentLikes error", e);
  }
};

/** ⏰ 상대 시간 */
const toRelativeTime = (dateLike) => {
  if (!dateLike) return "방금";
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "방금";
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "방금";
  if (m < 60) return `${m}분`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간`;
  const day = Math.floor(h / 24);
  if (day < 7) return `${day}일`;
  const mon = Math.floor(day / 30);
  if (mon < 12) return `${mon}개월`;
  const y = Math.floor(mon / 12);
  return `${y}년`;
};

/* ✅ 게시글 DTO → 화면용 매퍼 */
const mapPost = (p) => ({
  id: p.id ?? p.postId,
  title: p.postTitle ?? p.title ?? "",
  content: p.postContent ?? p.content ?? "",
  createdAt:
    p.postCreateAt ??
    p.createdAt ??
    p.created ??
    p.createdDate ??
    p.createAt ??
    null,
  views: p.postViewCount ?? p.views ?? 0,
  likes: p.postLikeCount ?? p.likes ?? 0,
  liked: p.liked ?? false,
  postType: p.postType ?? "OPEN",
  author: {
    id: p.userId ?? p.authorId ?? null,
    name: p.userNickname ?? p.userName ?? p.username ?? null,
    profileImg: p.userThumbnailUrl ?? p.authorProfile ?? null,
  },
});

/* ✅ 댓글/대댓글 공용 매퍼 */
const mapComment = (c) => ({
  id: c.id ?? c.subcommentId ?? c.commentId,
  content:
    c.subcommentDescription ??
    c.commentDescription ??
    c.content ??
    c.text ??
    c.body ??
    "",
  createdAt:
    c.subcommentCreateAt ??
    c.commentCreateAt ??
    c.createdAt ??
    null,
  likes: c.likeCount ?? c.likes ?? 0,  // ✅ 백엔드에서 likeCount 반환
  liked: c.liked ?? false,              // ✅ 백엔드에서 liked 반환
  userId: c.userId ?? c.authorId ?? null,        // ✅ 작성자 id 저장
  user: {
    name: c.userNickname ?? c.userName ?? "user",
    profileImg: c.userThumbnailUrl ?? "/assets/images/defalutpro.svg",
    level: c.userLevel ?? 1,
  },
});

const PostReadContainer = () => {
  const { postId: postIdParam, id: idParam } = useParams();
  const pid = postIdParam ?? idParam;

  const navigate = useNavigate();
  const { currentUser, isLogin } = useSelector((state) => state.user);
  const userIdForRequest = currentUser?.id ?? 0;
  
  /** 게시글 */
  const [post, setPost] = useState(null);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(0);
  const [postLikePending, setPostLikePending] = useState(false);

  /** 댓글 */
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [likedComments, setLikedComments] = useState({});           // { [commentId]: true }
  const [commentLikeIds, setCommentLikeIds] = useState({});        // { [commentId]: likeId } - 삭제용
  const [commentLikePending, setCommentLikePending] = useState({}); // { [commentId]: true }

  /** ✅ 대댓글 좋아요 상태 */
  const [likedSubcomments, setLikedSubcomments] = useState({});            // { [subcommentId]: true }
  const [subcommentLikePending, setSubcommentLikePending] = useState({});  // { [subcommentId]: true }
  /** ✅ 대댓글 좋아요 row ID (백엔드에서 반환해주는 SEQ 값 저장) */
  const [subcommentLikeIds, setSubcommentLikeIds] = useState({});          // { [subcommentId]: likeId }

  const [currentPage, setCurrentPage] = useState(1);
  const COMMENTS_PER_PAGE = 10;

  /** 신고(게시글/댓글 공용) */
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportTarget, setReportTarget] = useState(null); // 'post' | 'comment'
  const [targetId, setTargetId] = useState(null);

  /** ✅ 답글 UI 상태 */
  const [replyOpenMap, setReplyOpenMap] = useState({});  // { [commentId]: boolean }
  const [replyTextMap, setReplyTextMap] = useState({});  // { [commentId]: string }

  /** ✅ 댓글 수정 UI 상태 */
  const [editingCommentId, setEditingCommentId] = useState(null);     // 어떤 댓글을 수정 중인지
  const [editingCommentText, setEditingCommentText] = useState("");   // 수정 내용

  /** ✅ 대댓글 삭제 상태 */
  const [deletingSubcommentId, setDeletingSubcommentId] = useState(null);

  /** 🔄 게시글 id 바뀔 때 댓글 좋아요 상태는 초기화 (대댓글은 localStorage로 관리) */
  useEffect(() => {
    setLikedComments({});
    setCommentLikeIds({});
    setCommentLikePending({});
  }, [pid]);

  /** 🔄 로그인된 유저 기준으로 localStorage에 저장된 대댓글 좋아요 상태 로드 */
  useEffect(() => {
    if (!isLogin || !currentUser?.id) return;
    const { liked, ids } = loadStoredSubcommentLikes(currentUser.id);
    setLikedSubcomments(liked);
    setSubcommentLikeIds(ids);
  }, [isLogin, currentUser?.id]);

  /** 💾 대댓글 좋아요 상태 변경될 때마다 localStorage에 저장 */
  useEffect(() => {
    if (!isLogin || !currentUser?.id) return;
    saveStoredSubcommentLikes(currentUser.id, likedSubcomments, subcommentLikeIds);
  }, [likedSubcomments, subcommentLikeIds, isLogin, currentUser?.id]);

  /** 신고 모달 열기/닫기 */
  const openReport = (type, id) => {
    setReportTarget(type);
    setTargetId(id);
    setReportReason("");
    setIsReportOpen(true);
  };
  const closeReport = () => setIsReportOpen(false);
  const submitReport = () => {
    if (!reportReason) return alert("신고 사유를 선택해주세요!");
    alert(`${reportTarget === "post" ? "게시글" : "댓글"}(ID: ${targetId})이 신고되었습니다.\n사유: ${reportReason}`);
    setIsReportOpen(false);
  };

  /** ✅ 게시글 좋아요 (낙관적 → 실패 시 롤백) */
  const togglePostLike = async () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
      return;
    }
    if (!post?.id || postLikePending) return;

    const willLike = !isPostLiked;
    setIsPostLiked(willLike);
    setPostLikeCount((prev) => prev + (willLike ? 1 : -1));
    setPostLikePending(true);

    try {
      const res = await fetch(TOGGLE_POST_LIKE(post.id, currentUser?.id), {
        method: "POST",
        credentials: "include",
      });
<<<<<<< HEAD
      if (!res.ok) throw new Error("post like failed");
      const data = await res.json();
      // 백엔드에서 반환하는 최신 상태로 업데이트
      if (data.data) {
        setIsPostLiked(data.data.liked);
        setPostLikeCount(data.data.likeCount);
=======
      
      if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        throw new Error(errorText || "게시글 좋아요 실패");
      }

      // ✅ 응답 파싱 및 상태 업데이트
      const data = await res.json();
      const result = data?.data || data;
      
      if (result && typeof result === "object") {
        // 백엔드에서 반환하는 실제 상태로 업데이트
        if (typeof result.liked === "boolean") {
          setIsPostLiked(result.liked);
        }
        if (typeof result.likeCount === "number") {
          setPostLikeCount(result.likeCount);
        }
>>>>>>> 3b329b764f60db19c9a77771ec4cc1535d5630fb
      }
    } catch (e) {
      // 실패 시 롤백
      setIsPostLiked(!willLike);
      setPostLikeCount((prev) => prev - (willLike ? 1 : -1));
      console.error("게시글 좋아요 오류:", e);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    } finally {
      setPostLikePending(false);
    }
  };

  /** ✅ 댓글 좋아요(낙관적 → 실패 시 롤백) */
  const toggleCommentLike = async (cid) => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
      return;
    }
    if (commentLikePending[cid]) return;

    const currentlyLiked = !!likedComments[cid];
    const willLike = !currentlyLiked;
    
    // UI 먼저 토글 (낙관적 업데이트)
    setLikedComments((prev) => ({ ...prev, [cid]: willLike }));
    setCommentLikePending((prev) => ({ ...prev, [cid]: true }));

    try {
<<<<<<< HEAD
      const res = await fetch(TOGGLE_COMMENT_LIKE(cid, post?.id || pid, currentUser?.id), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) throw new Error("comment like failed");
      
      // 백엔드에서 반환하는 최신 상태로 업데이트
      const data = await res.json();
      if (data.data) {
        setLikedComments((prev) => ({ ...prev, [cid]: data.data.liked }));
        // 댓글 좋아요 개수 업데이트
        setComments((prev) =>
          prev.map((c) =>
            c.id === cid ? { ...c, likes: data.data.likeCount } : c
          )
        );
=======
      if (willLike) {
        // ✅ 좋아요 추가
        const res = await fetch(CREATE_COMMENT_LIKE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ 
            userId: currentUser?.id,
            commentId: Number(cid)
          }),
        });
        
        if (!res.ok) {
          const errorText = await res.text().catch(() => "");
          throw new Error(errorText || "댓글 좋아요 추가 실패");
        }
        
        // 응답에서 like id 추출 후 저장
        const json = await res.json();
        const data = json?.data ?? json?.result ?? json;
        if (data && typeof data === "object") {
          const likeId = data.newCommentLikeId ?? data.id ?? data.likeId ?? null;
          if (likeId != null) {
            setCommentLikeIds((prev) => ({ ...prev, [cid]: likeId }));
          }
        }

        // 좋아요 수 최신화
        try {
          const countRes = await fetch(`${API_BASE}/commentLike/${cid}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
          if (countRes.ok) {
            const countJson = await countRes.json();
            const count = typeof countJson === "number" 
              ? countJson 
              : (countJson?.data ?? (countJson?.result ?? 0));
            setComments((prev) =>
              prev.map((c) =>
                c.id === cid ? { ...c, likes: count } : c
              )
            );
          }
        } catch (e) {
          console.error("좋아요 수 조회 실패", e);
        }
      } else {
        // ✅ 좋아요 삭제
        const likeId = commentLikeIds[cid];
        if (!likeId) {
          // 삭제할 row의 ID 모르면 롤백하고 안내
          setLikedComments((prev) => ({ ...prev, [cid]: currentlyLiked }));
          setCommentLikePending((prev) => ({ ...prev, [cid]: false }));
          alert("댓글 좋아요 정보를 찾을 수 없습니다. 새로고침 후 다시 시도해주세요.");
          return;
        }

        const res = await fetch(DELETE_COMMENT_LIKE, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ 
            id: likeId,
            userId: currentUser?.id,
            commentId: Number(cid)
          }),
        });
        
        if (!res.ok) {
          const errorText = await res.text().catch(() => "");
          throw new Error(errorText || "댓글 좋아요 삭제 실패");
        }
        
        // 삭제 성공 시, ID 맵에서 제거
        setCommentLikeIds((prev) => {
          const copy = { ...prev };
          delete copy[cid];
          return copy;
        });

        // 좋아요 수 최신화
        try {
          const countRes = await fetch(`${API_BASE}/commentLike/${cid}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
          if (countRes.ok) {
            const countJson = await countRes.json();
            const count = typeof countJson === "number" 
              ? countJson 
              : (countJson?.data ?? (countJson?.result ?? 0));
            setComments((prev) =>
              prev.map((c) =>
                c.id === cid ? { ...c, likes: count } : c
              )
            );
          }
        } catch (e) {
          console.error("좋아요 수 조회 실패", e);
        }
>>>>>>> 3b329b764f60db19c9a77771ec4cc1535d5630fb
      }
    } catch (e) {
      // 실패하면 UI 롤백
      setLikedComments((prev) => ({ ...prev, [cid]: currentlyLiked }));
      console.error(e);
      alert("댓글 좋아요 처리 중 오류가 발생했습니다.");
    } finally {
      setCommentLikePending((prev) => ({ ...prev, [cid]: false }));
    }
  };

  /** 🔁 대댓글 좋아요 수를 서버에서 다시 조회해서 comments에 반영 */
  const refreshSubcommentLikeCount = async (sid) => {
    try {
      const r = await fetch(GET_SUBCOMMENT_LIKE(sid));
      if (!r.ok) return;
      const j = await r.json();
      const cnt = typeof j === "number" ? j : (j?.data ?? 0);

      setComments((prev) =>
        prev.map((c) => ({
          ...c,
          subcomments: Array.isArray(c.subcomments)
            ? c.subcomments.map((sub) =>
                sub.id === sid ? { ...sub, likes: cnt } : sub
              )
            : c.subcomments,
        }))
      );
    } catch (e) {
      console.error("refreshSubcommentLikeCount error", e);
    }
  };

  /** ✅ 대댓글 좋아요(낙관적 토글: INSERT ↔ DELETE /remove) */
  const toggleSubcommentLike = async (sid) => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
      return;
    }
    if (subcommentLikePending[sid]) return;

    const currentlyLiked = !!likedSubcomments[sid]; // 지금 하트 상태
    const willLike = !currentlyLiked;               // 클릭 후 상태

    // UI 먼저 토글 (낙관적 업데이트: 하트)
    setLikedSubcomments((prev) => ({ ...prev, [sid]: willLike }));
    setSubcommentLikePending((prev) => ({ ...prev, [sid]: true }));

    const basePayload = {
      userId: currentUser?.id,
      subcommentId: sid,
    };

    try {
      if (willLike) {
        // ✅ 좋아요 누름 → INSERT
        const res = await fetch(TOGGLE_SUBCOMMENT_LIKE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(basePayload),
        });

        if (!res.ok) throw new Error("subcomment like insert failed");

        // 응답에서 like id 추출 후 저장
        try {
          const json = await res.json();
          const data = json?.data ?? json?.result ?? json;
          if (data && typeof data === "object") {
            const likeId =
              data.newPostId ??
              data.id ??
              data.likeId ??
              null;

            if (likeId != null) {
              setSubcommentLikeIds((prev) => ({
                ...prev,
                [sid]: likeId,
              }));
            }
          }
        } catch (e) {
          console.error("parse subcomment like insert response error", e);
        }

        // 서버 기준 최신 좋아요 수 반영
        await refreshSubcommentLikeCount(sid);
      } else {
        // ✅ 좋아요 취소 → DELETE /subcommentLike/remove
        const likeId = subcommentLikeIds[sid];

        if (!likeId) {
          // 삭제할 row의 ID 모르면 롤백하고 안내
          setLikedSubcomments((prev) => ({ ...prev, [sid]: currentlyLiked }));
          alert("대댓글 좋아요 정보를 찾을 수 없습니다. 새로고침 후 다시 시도해주세요.");
          return;
        }

        const deleteBody = {
          ...basePayload,
          id: likeId,
        };

        const res = await fetch(DELETE_SUBCOMMENT_LIKE, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(deleteBody),
        });

        if (!res.ok) throw new Error("subcomment like delete failed");

        // 삭제 성공 시, ID 맵에서 제거
        setSubcommentLikeIds((prev) => {
          const copy = { ...prev };
          delete copy[sid];
          return copy;
        });

        // 서버 기준 최신 좋아요 수 반영
        await refreshSubcommentLikeCount(sid);
      }
    } catch (e) {
      console.error(e);
      // 실패하면 UI 롤백
      setLikedSubcomments((prev) => ({ ...prev, [sid]: currentlyLiked }));
      alert("대댓글 좋아요 처리 중 오류가 발생했습니다.");
    } finally {
      setSubcommentLikePending((prev) => ({ ...prev, [sid]: false }));
    }
  };

  /** ✅ 댓글 + 대댓글 + 좋아요 수 로드 */
  const loadComments = async () => {
    const resC = await fetch(GET_COMMENTS(pid, userIdForRequest));
    if (!resC.ok) throw new Error("댓글 불러오기 실패");
    const r = await resC.json();
    const list = Array.isArray(r)
      ? r
      : Array.isArray(r?.data)
      ? r.data
      : Array.isArray(r?.result)
      ? r.result
      : [];

    const mapped = list.map(mapComment);
    
    // ✅ 댓글 좋아요 상태 초기화
    const likedMap = {};
    mapped.forEach((c) => {
      if (c.liked) {
        likedMap[c.id] = true;
      }
    });
    setLikedComments((prev) => ({ ...likedMap, ...prev })); // 기존 상태와 병합

    // ✅ 댓글 좋아요 상태 설정
    const likedMap = {};
    for (const item of list) {
      if (item.id) {
        likedMap[item.id] = Boolean(item.liked);
      }
    }
    setLikedComments(likedMap);

    const enriched = await Promise.all(
      mapped.map(async (c) => {
        const [likeCnt, subs] = await Promise.all([
<<<<<<< HEAD
          // 댓글 좋아요 수 (백엔드에서 받은 값 사용)
=======
          // 댓글 좋아요 수 (백엔드에서 이미 likeCount 반환하지만, 별도 조회로 최신화)
>>>>>>> 3b329b764f60db19c9a77771ec4cc1535d5630fb
          (async () => {
            // 백엔드에서 이미 likeCount를 반환하므로 사용
            const originalItem = list.find(item => (item.id ?? item.commentId) === c.id);
            return originalItem?.likeCount ?? c.likes ?? 0;
          })(),
          // 대댓글 목록 + 각 대댓글 좋아요 수
          (async () => {
            try {
              const rs = await fetch(GET_SUBCOMMENTS(c.id));
              if (!rs.ok) return [];
              const sj = await rs.json();
              const rawSubs = Array.isArray(sj)
                ? sj
                : Array.isArray(sj?.data)
                ? sj.data
                : Array.isArray(sj?.result)
                ? sj.result
                : [];

              const subsWithLikes = await Promise.all(
                rawSubs.map(async (sub) => {
                  const mappedSub = mapComment(sub);
                  try {
                    const lr = await fetch(GET_SUBCOMMENT_LIKE(mappedSub.id));
                    if (!lr.ok) return mappedSub;
                    const lj = await lr.json();
                    const cnt = typeof lj === "number" ? lj : (lj?.data ?? 0);
                    return { ...mappedSub, likes: cnt };
                  } catch {
                    return mappedSub;
                  }
                })
              );

              return subsWithLikes;
            } catch {
              return [];
            }
          })(),
        ]);

        return { ...c, likes: likeCnt, subcomments: subs };
      })
    );

    setComments(enriched);
  };

  /** ✅ 댓글 입력 → DB 저장 */
  const handleAddComment = async () => {
    const text = commentInput.trim();
    if (!text) return;
    if (!isLogin) {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
      return;
    }

    try {
      const now = new Date();

      const payload = {
        postId: Number(pid),         // VO.postId
        userId: currentUser?.id,     // VO.userId
        commentDescription: text,    // VO.commentDescription
        commentIsAccept: false,      // VO.commentIsAccept
        commentCreateAt: now,        // VO.commentCreateAt
      };

      const res = await fetch(CREATE_COMMENT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || "댓글 작성 실패");
      }

      setCommentInput("");
      setCurrentPage(1);
      await loadComments(); // 목록 새로고침
    } catch (e) {
      console.error(e);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  /** ✅ 댓글 수정 시작 */
  const handleStartEditComment = (comment) => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
      return;
    }
    if (!currentUser?.id || currentUser.id !== comment.userId) {
      alert("본인이 작성한 댓글만 수정할 수 있습니다.");
      return;
    }
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.content);
  };

  /** ✅ 댓글 수정 취소 */
  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentText("");
  };

  /** ✅ 댓글 수정 완료 */
  const handleUpdateComment = async (commentId) => {
    const text = editingCommentText.trim();
    if (!text) {
      alert("수정할 내용을 입력해주세요.");
      return;
    }
    if (!isLogin) {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
      return;
    }

    try {
      const payload = {
        id: Number(commentId),
        commentId: Number(commentId),
        postId: Number(pid),
        userId: currentUser?.id,
        commentDescription: text,
      };

      const res = await fetch(UPDATE_COMMENT, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || "댓글 수정 실패");
      }

      await loadComments();
      setEditingCommentId(null);
      setEditingCommentText("");
    } catch (e) {
      console.error(e);
      alert("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  /** ✅ 대댓글 작성 */
  const handleAddSubcomment = async (commentId) => {
    const text = (replyTextMap[commentId] || "").trim();
    if (!text) {
<<<<<<< HEAD
      alert("대댓글 내용을 입력해주세요.");
=======
      alert("답글 내용을 입력해주세요.");
>>>>>>> 3b329b764f60db19c9a77771ec4cc1535d5630fb
      return;
    }
    if (!isLogin) {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
      return;
    }

    try {
<<<<<<< HEAD
      const now = new Date();
      const payload = {
        commentId: Number(commentId),
        userId: currentUser?.id,
        subcommentDescription: text,
        subcommentCreateAt: now,
=======
      const payload = {
        userId: currentUser?.id,
        commentId: Number(commentId),
        subcommentDescription: text,
        subcommentCreateAt: new Date(),
>>>>>>> 3b329b764f60db19c9a77771ec4cc1535d5630fb
      };

      const res = await fetch(CREATE_SUBCOMMENT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || "대댓글 작성 실패");
      }

      setReplyTextMap((prev) => ({ ...prev, [commentId]: "" }));
      setReplyOpenMap((prev) => ({ ...prev, [commentId]: false }));
      await loadComments(); // 목록 새로고침
    } catch (e) {
      console.error(e);
      alert("대댓글 작성 중 오류가 발생했습니다.");
    }
  };

<<<<<<< HEAD
  /** ✅ 대댓글 삭제 */
  const handleDeleteSubcomment = async (subcommentId) => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
      return;
    }

    // 작성자 확인
    const subcomment = comments
      .flatMap((c) => (Array.isArray(c.subcomments) ? c.subcomments : []))
      .find((s) => s.id === subcommentId);

    if (!subcomment) {
      alert("대댓글을 찾을 수 없습니다.");
      return;
    }

    if (currentUser?.id !== subcomment.userId) {
      alert("본인이 작성한 대댓글만 삭제할 수 있습니다.");
      return;
    }

    if (!window.confirm("정말 이 대댓글을 삭제하시겠습니까?")) {
      return;
    }

    if (deletingSubcommentId === subcommentId) return;
    setDeletingSubcommentId(subcommentId);

    try {
      const res = await fetch(DELETE_SUBCOMMENT, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(subcommentId),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || "대댓글 삭제 실패");
      }

      await loadComments(); // 목록 새로고침
    } catch (e) {
      console.error(e);
      alert("대댓글 삭제 중 오류가 발생했습니다.");
    } finally {
      setDeletingSubcommentId(null);
    }
  };

=======
>>>>>>> 3b329b764f60db19c9a77771ec4cc1535d5630fb
 /** 데이터 로드 */
useEffect(() => {
  if (!pid) return;

  const fetchAll = async () => {
    try {
      // 게시글
      const resPost = await fetch(GET_OPEN_POST(pid, userIdForRequest)); // 🔧 userId 추가!
      if (!resPost.ok) throw new Error("게시글 불러오기 실패");
      const raw = await resPost.json();
      const p = raw?.data ?? raw;
      const ui = mapPost(p);
      setPost(ui);
      setPostLikeCount(ui.likes || 0);
      setIsPostLiked(ui.liked || false); // ✅ 좋아요 상태 설정

      // 댓글 + 대댓글 + 좋아요 수
      await loadComments();
    } catch (e) {
      console.error(e);
    }
  };

  fetchAll();
}, [pid, userIdForRequest]); // 🔧 userId도 dependency에 추가 (선택이지만 안전)


  /** 페이지네이션 계산 */
  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(comments.length / COMMENTS_PER_PAGE)),
    [comments.length]
  );
  const pageSlice = useMemo(() => {
    const start = (currentPage - 1) * COMMENTS_PER_PAGE;
    return comments.slice(start, start + COMMENTS_PER_PAGE);
  }, [comments, currentPage]);

  if (!post) return <S.LoadingMsg>게시글을 불러오는 중...</S.LoadingMsg>;

  return (
    <>
      {/* 배너 */}
      <S.BannerWrap>
        <S.Banner>
          <S.BannerInner>
            <div>
              <S.PageTitle>열린 둥지</S.PageTitle>
              <S.PageDesc>모든 문제를 함께 올리고 의견을 받아보세요.</S.PageDesc>
            </div>
            <S.Illust src="/assets/images/chickens.png" alt="열린둥지 일러스트" />
          </S.BannerInner>
        </S.Banner>
      </S.BannerWrap>

      {/* 본문 */}
      <S.ContentWrap>
        <S.PostWrap>
          <S.PostTitle>{post.title}</S.PostTitle>

          <S.PostHeader>
            <S.AuthorBox>
              <S.ProfileImg
                src={post.author?.profileImg || "/assets/images/defalutpro.svg"}
                alt={post.author?.name || "user"}
              />
              <S.AuthorName>{post.author?.name || "user"}</S.AuthorName>
            </S.AuthorBox>
          </S.PostHeader>

          <S.PostBody>{post.content}</S.PostBody>

          {/* 하단 메타 + 신고/좋아요 */}
          <S.PostMetaRow>
            <S.MetaLeft>
              <span>{toRelativeTime(post.createdAt)}</span>
              <b>·</b>
              <span>좋아요 {postLikeCount}</span>
              <b>·</b>
              <span>조회 {post.views ?? 0}</span>
            </S.MetaLeft>

            <S.MetaRight>
              <S.Like onClick={togglePostLike}>
                <img
                  src={isPostLiked ? "/assets/icons/heartfull.svg" : "/assets/icons/heart.svg"}
                  alt="좋아요"
                />
                <S.LikeText $liked={isPostLiked}>좋아요</S.LikeText>
              </S.Like>

              <S.ReportBtn onClick={() => openReport("post", post.id)}>신고하기</S.ReportBtn>
            </S.MetaRight>
          </S.PostMetaRow>
        </S.PostWrap>

        {/* 댓글 영역 */}
        <S.CommentHeader>
          <S.CommentCount>
            댓글 <span>{comments.length}</span>
          </S.CommentCount>
        </S.CommentHeader>

        <S.CommentWriteBox>
          <S.CommentInput
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="건강한 의견과 응원을 남겨주세요."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddComment();
              }
            }}
          />
          <S.CommentSubmit onClick={handleAddComment}>입력</S.CommentSubmit>
        </S.CommentWriteBox>

        {pageSlice.length === 0 ? (
          <S.NoComment>아직 댓글이 없습니다.</S.NoComment>
        ) : (
          <S.CommentList>
            {pageSlice.map((c) => (
              <S.CommentItem key={c.id}>
                <S.CommentLeft>
                  <S.CommentAvatar
                    src={c.user?.profileImg || "/assets/images/defalutpro.svg"}
                    alt={c.user?.name || "user"}
                  />
                </S.CommentLeft>

                <S.CommentRight>
                  <S.CommentUserRow>
                    <S.CommentUserName>{c.user?.name || "user"}</S.CommentUserName>
                    <S.CommentUserLevel>Lv.{c.user?.level ?? 1}</S.CommentUserLevel>
                  </S.CommentUserRow>

                  {/* ✅ 댓글 내용/수정 UI */}
                  {editingCommentId === c.id ? (
                    <S.ReplyBox>
                      <S.ReplyInput
                        value={editingCommentText}
                        onChange={(e) => setEditingCommentText(e.target.value)}
                        placeholder="댓글 내용을 수정해주세요."
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleUpdateComment(c.id);
                          }
                        }}
                      />
                      <S.ReplySubmit onClick={() => handleUpdateComment(c.id)}>
                        수정 완료
                      </S.ReplySubmit>
                      <S.CommentAction onClick={handleCancelEditComment}>
                        취소
                      </S.CommentAction>
                    </S.ReplyBox>
                  ) : (
                    <S.CommentContent>{c.content}</S.CommentContent>
                  )}

                  <S.CommentMetaRow>
                    <span>{toRelativeTime(c.createdAt)}</span>
                    <b>·</b>
                    <img
                      src={likedComments[c.id] ? "/assets/icons/heartfull.svg" : "/assets/icons/greyheart.svg"}
                      alt="좋아요"
                      onClick={() => toggleCommentLike(c.id)}
                    />
                    <S.CommentLikeCount
                      $liked={likedComments[c.id]}
                      onClick={() => toggleCommentLike(c.id)}
                    >
                      {c.likes ?? 0}
                    </S.CommentLikeCount>

                    {/* 답글 달기 */}
                    <b>·</b>
                    <S.CommentAction
                      onClick={() =>
                        setReplyOpenMap((prev) => ({ ...prev, [c.id]: !prev[c.id] }))
                      }
                    >
                      답글 달기
                    </S.CommentAction>

                    {/* ✅ 댓글 수정 (작성자만 노출) */}
                    {isLogin && currentUser?.id && currentUser.id === c.userId && (
                      <>
                        <b>·</b>
                        <S.CommentAction onClick={() => handleStartEditComment(c)}>
                          {editingCommentId === c.id ? "수정 중" : "수정"}
                        </S.CommentAction>
                      </>
                    )}

                    <b>·</b>
                    <S.CommentAction onClick={() => openReport("comment", c.id)}>신고</S.CommentAction>
                  </S.CommentMetaRow>

                  {/* 답글 입력창 */}
                  {replyOpenMap[c.id] && (
                    <S.ReplyBox>
                      <S.ReplyInput
                        value={replyTextMap[c.id] || ""}
                        onChange={(e) =>
                          setReplyTextMap((prev) => ({ ...prev, [c.id]: e.target.value }))
                        }
                        placeholder="이 댓글에 답글을 남겨보세요."
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleAddSubcomment(c.id);
                          }
                        }}
                      />
                      <S.ReplySubmit
                        onClick={() => handleAddSubcomment(c.id)}
                      >
                        등록
                      </S.ReplySubmit>
                    </S.ReplyBox>
                  )}

                  {/* 대댓글 리스트 */}
                  {Array.isArray(c.subcomments) && c.subcomments.length > 0 && (
                    <S.SubcommentList>
                      {c.subcomments.map((s) => (
                        <S.SubcommentItem key={s.id}>
                          <S.SubcommentLeft>
                            <S.SubcommentAvatar
                              src={s.user?.profileImg || "/assets/images/defalutpro.svg"}
                              alt={s.user?.name || "user"}
                            />
                          </S.SubcommentLeft>
                          <S.SubcommentRight>
                            <S.SubcommentUserRow>
                              <S.SubcommentUserName>{s.user?.name || "user"}</S.SubcommentUserName>
                              <S.SubcommentUserLevel>Lv.{s.user?.level ?? 1}</S.SubcommentUserLevel>
                            </S.SubcommentUserRow>
                            <S.SubcommentContent>{s.content}</S.SubcommentContent>
                            <S.SubcommentMetaRow>
                              <span>{toRelativeTime(s.createdAt)}</span>
                              <b>·</b>
                              {/* ✅ 대댓글 좋아요 */}
                              <img
                                src={
                                  likedSubcomments[s.id]
                                    ? "/assets/icons/heartfull.svg"
                                    : "/assets/icons/greyheart.svg"
                                }
                                alt="좋아요"
                                onClick={() => toggleSubcommentLike(s.id)}
                              />
                              <S.CommentLikeCount
                                $liked={likedSubcomments[s.id]}
                                onClick={() => toggleSubcommentLike(s.id)}
                              >
                                {/* 🔢 카운트는 서버 값 그대로 사용 (중복 +1 방지) */}
                                {s.likes ?? 0}
                              </S.CommentLikeCount>
                              {/* ✅ 대댓글 삭제 (작성자만 노출) */}
                              {isLogin && currentUser?.id && currentUser.id === s.userId && (
                                <>
                                  <b>·</b>
                                  <S.CommentAction
                                    onClick={() => handleDeleteSubcomment(s.id)}
                                    disabled={deletingSubcommentId === s.id}
                                  >
                                    {deletingSubcommentId === s.id ? "삭제 중..." : "삭제"}
                                  </S.CommentAction>
                                </>
                              )}
                              <b>·</b>
                              <S.CommentAction onClick={() => openReport("comment", s.id)}>
                                신고
                              </S.CommentAction>
                            </S.SubcommentMetaRow>
                          </S.SubcommentRight>
                        </S.SubcommentItem>
                      ))}
                    </S.SubcommentList>
                  )}
                </S.CommentRight>
              </S.CommentItem>
            ))}
          </S.CommentList>
        )}

        {/* 하단 페이지네이션 */}
        {pageCount > 1 && (
          <S.Pagination>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <S.PageBtn
                key={n}
                $active={n === currentPage}
                onClick={() => setCurrentPage(n)}
              >
                {n}
              </S.PageBtn>
            ))}
          </S.Pagination>
        )}
      </S.ContentWrap>

      {/* 신고 모달 */}
      {isReportOpen && (
        <S.ReportOverlay>
          <S.ReportBox>
            <S.ReportTitle>
              신고하기
              <S.CloseBtn onClick={closeReport}>
                <img src="/assets/icons/x.svg" alt="닫기" />
              </S.CloseBtn>
            </S.ReportTitle>

            <S.ReportDesc>
              해당 {reportTarget === "post" ? "게시글" : "댓글"}을(를) 아래 사유로 신고합니다. <br />
              <span>허위 신고 시 운영정책에 따라 조치될 수 있습니다.</span>
            </S.ReportDesc>

            <S.ReportSelect
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            >
              <option value="">사유 선택</option>
              <option value="욕설">다른 유저에게 불쾌감을 주는 행위(욕설, 비방, 도배)</option>
              <option value="운영방해">커뮤니티 이용 및 운영 방해</option>
              <option value="버그악용">시스템(버그) 악용 및 불법 프로그램 사용/유포</option>
              <option value="불건전">불건전 명칭 또는 프로필 이미지 사용</option>
              <option value="기타">기타</option>
            </S.ReportSelect>

            <S.ReportSubmit onClick={submitReport}>신고완료</S.ReportSubmit>
          </S.ReportBox>
        </S.ReportOverlay>
      )}
    </>
  );
};

export default PostReadContainer;
