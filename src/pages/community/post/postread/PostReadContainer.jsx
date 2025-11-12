// src/pages/community/post/postread/PostReadContainer.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import S from "./style";

/** 🔧 백엔드 연동용 상수 */
const API_BASE = (process.env.REACT_APP_BACKEND_URL || "http://localhost:10000").replace(/\/+$/, "");
const GET_OPEN_POST   = (id) => `${API_BASE}/post/get-post/${id}`;
const GET_COMMENTS    = (id) => `${API_BASE}/comment/${id}`;
const GET_COMMENT_LIKE = (id) => `${API_BASE}/commentLike/${id}`;

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

/* ✅ 백엔드 DTO → 화면에서 쓰는 형태로 매핑 */
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
  likes: p.likes ?? 0,
  postType: p.postType ?? "OPEN",
  author: {
    id: p.userId ?? p.authorId ?? null,
    name: p.userNickname ?? p.userName ?? p.username ?? null,
    profileImg: p.userThumbnailUrl ?? p.authorProfile ?? null,
  },
});

const mapComment = (c) => ({
  id: c.id ?? c.commentId,
  content: c.commentDescription ?? c.content ?? c.text ?? c.body ?? "",
  createdAt: c.commentCreateAt ?? c.createdAt ?? null,
  likes: c.likes ?? 0,
  user: {
    name: c.userNickname ?? c.userName ?? "user",
    profileImg: c.userThumbnailUrl ?? "/assets/images/defalutpro.svg",
    level: c.userLevel ?? 1,
  },
});

const PostReadContainer = () => {
  // ✅ 라우터 파라미터가 :postId 또는 :id 어떤 것이든 대응
  const { postId: postIdParam, id: idParam } = useParams();
  const pid = postIdParam ?? idParam;

  /** 게시글 */
  const [post, setPost] = useState(null);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(0);

  /** 댓글 */
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [likedComments, setLikedComments] = useState({}); // { [commentId]: true }
  const [currentPage, setCurrentPage] = useState(1);
  const COMMENTS_PER_PAGE = 10;

  /** 신고(게시글/댓글 공용) */
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportTarget, setReportTarget] = useState(null); // 'post' | 'comment'
  const [targetId, setTargetId] = useState(null);

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

  /** 게시글 좋아요 */
  const togglePostLike = () => {
    setIsPostLiked((prev) => !prev);
    setPostLikeCount((prev) => (isPostLiked ? prev - 1 : prev + 1));
  };

  /** 댓글 좋아요 */
  const toggleCommentLike = (cid) => {
    setLikedComments((prev) => {
      const liked = !prev[cid];
      return { ...prev, [cid]: liked };
    });
  };

  /** 댓글 입력 */
  const handleAddComment = () => {
    const text = commentInput.trim();
    if (!text) return;

    const newComment = {
      id: Date.now(),
      user: { name: "user", profileImg: "/assets/images/defalutpro.svg", level: 1 },
      content: text,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentInput("");
    setCurrentPage(1);
  };

  /** 데이터 로드 */
  useEffect(() => {
    if (!pid) return;

    const fetchAll = async () => {
      try {
        // 게시글
        const resPost = await fetch(GET_OPEN_POST(pid));
        if (!resPost.ok) throw new Error("게시글 불러오기 실패");
        const raw = await resPost.json();
        const p = raw?.data ?? raw; // 래핑/비래핑 모두 대응
        const ui = mapPost(p);      // ✅ 화면용으로 매핑
        setPost(ui);
        setPostLikeCount(ui.likes || 0);

        // 댓글
        const resC = await fetch(GET_COMMENTS(pid));
        if (!resC.ok) throw new Error("댓글 불러오기 실패");
        const r = await resC.json();
        const list = Array.isArray(r) ? r : (Array.isArray(r?.data) ? r.data : (Array.isArray(r?.result) ? r.result : []));
        const mapped = list.map(mapComment);

        // (옵션) 댓글 좋아요 개수 병합
        const withLikeCount = await Promise.all(
          mapped.map(async (c) => {
            try {
              const r2 = await fetch(GET_COMMENT_LIKE(c.id));
              if (r2.ok) {
                const cnt = await r2.json();
                const like = typeof cnt === "number" ? cnt : (cnt?.data ?? 0);
                return { ...c, likes: like };
              }
            } catch {}
            return c;
          })
        );

        setComments(withLikeCount);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAll();
  }, [pid]);

  /** 페이지네이션 계산 */
  const pageCount = useMemo(() => Math.max(1, Math.ceil(comments.length / COMMENTS_PER_PAGE)), [comments.length]);
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
              <S.ProfileImg src={post.author?.profileImg || "/assets/images/defalutpro.svg"} alt={post.author?.name || "user"} />
              <S.AuthorName>{post.author?.name || "user"}</S.AuthorName>
            </S.AuthorBox>
            {/* 쪽지 보내기 제거 */}
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
                  <S.CommentAvatar src={c.user?.profileImg || "/assets/images/defalutpro.svg"} alt={c.user?.name || "user"} />
                </S.CommentLeft>

                <S.CommentRight>
                  <S.CommentUserRow>
                    <S.CommentUserName>{c.user?.name || "user"}</S.CommentUserName>
                    <S.CommentUserLevel>Lv.{c.user?.level ?? 1}</S.CommentUserLevel>
                  </S.CommentUserRow>

                    <S.CommentContent>{c.content}</S.CommentContent>

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
                      {(c.likes ?? 0) + (likedComments[c.id] ? 1 : 0)}
                    </S.CommentLikeCount>
                    <b>·</b>
                    <span onClick={() => openReport("comment", c.id)}>신고</span>
                  </S.CommentMetaRow>
                </S.CommentRight>
              </S.CommentItem>
            ))}
          </S.CommentList>
        )}

        {/* 하단 페이지네이션 (간단 숫자형) */}
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
              <S.CloseBtn onClick={closeReport}><img src="/assets/icons/x.svg" alt="닫기" /></S.CloseBtn>
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
