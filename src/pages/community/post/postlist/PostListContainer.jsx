// src/pages/community/post/postlist/PostListContainer.jsx
import Pagination from "./components/Pagination";

import React, { useEffect, useState, useRef, useMemo } from "react";
import S from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

/* 최신순 드롭다운 */
import ThreeDropDown from "../../../../components/dropdown/ThreeDropDown";

/* =========================
   🔧 백엔드 연동용 상수
   ========================= */
const API_BASE = (process.env.REACT_APP_BACKEND_URL || "http://localhost:10000").replace(/\/+$/, "");
const POSTS_ENDPOINT = "/post/open";
const BUILD_URL = () => `${API_BASE}${POSTS_ENDPOINT}`;
// 댓글 API
const COMMENT_URL = (postId) => `${API_BASE}/comment/${postId}`;

/* 댓글 매핑 */
const mapComment = (c) => ({
  commentId: c.id ?? c.commentId,
  content: c.commentDescription ?? c.content ?? c.text ?? "",
  createdAt: c.commentCreateAt ?? c.createdAt ?? null,
  selected:
    (typeof c.commentIsAccept === "boolean" ? c.commentIsAccept : null) ??
    c.isBest ?? c.best ?? c.selected ?? false,
  author: {
    name: c.userNickname ?? c.authorNickname ?? c.userName ?? null,
    profileImg: c.userThumbnailUrl ?? c.authorProfile ?? null,
  },
});

/* 날짜 → 상대시간 */
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

/* 댓글 베스트 선택(배열 주는 백엔드일 때 동작) */
const getTopComment = (post) => {
  const comments = post?.comments || post?.answers || [];
  if (!Array.isArray(comments) || comments.length === 0) return null;
  const byBest = comments.find((c) => c?.isBest || c?.best || c?.selected) || null;
  if (byBest) return byBest;
  const sorted = [...comments].sort(
    (a, b) => (b?.likes ?? b?.up ?? 0) - (a?.likes ?? a?.up ?? 0)
  );
  return sorted[0] || null;
};

/* 백엔드 → 프런트 표준 구조로 매핑 */
const mapPost = (p) => ({
  postId: p.id ?? p.postId,
  postTitle: p.postTitle ?? p.title ?? "",
  postContent: p.postContent ?? p.content ?? "",
  postLangTag: p.postType ?? p.lang ?? "OPEN",
  views: p.postViewCount ?? p.viewCount ?? p.views ?? 0,
  createdAt:
    p.postCreateAt ??
    p.createdAt ??
    p.created ??
    p.createdDate ??
    p.createAt ??
    null,
  author: {
    name:
      p.userNickname ??
      p.authorNickname ??
      p.userName ??
      p.username ??
      p.user_email ??
      null,
    profileImg: p.userThumbnailUrl ?? p.authorProfile ?? null,
  },
  commentsCount: p.commentCount ?? p.commentsCount ?? p.answersCount ?? 0,
  answers: Array.isArray(p.answers)
    ? p.answers
    : Array.isArray(p.comments)
    ? p.comments
    : [],
  comments: Array.isArray(p.comments) ? p.comments : [],
});

/* 댓글 수 표기 */
const getReplyCount = (post) =>
  post?.commentsCount ??
  (Array.isArray(post?.answers) ? post.answers.length : 0) ??
  0;

const PostListContainer = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  /* 정렬: latest | comment | popular */
  const [sortBy, setSortBy] = useState("latest");

  const postsPerPage = 7;

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  /* 🔌 실제 백엔드 호출 (쿠키 불필요 → credentials 제거) */
  useEffect(() => {
    const ac = new AbortController();

    const fetchPosts = async () => {
      try {
        const res = await fetch(BUILD_URL(), {
          method: "GET",
          headers: { Accept: "application/json" },
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        // 배열 / {data:[]} / {result:[]} 모두 대응
        const rows = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
          ? json.data
          : Array.isArray(json?.result)
          ? json.result
          : [];

        const mapped = rows.map(mapPost).filter((p) => p.postId != null);
        setPosts(mapped);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("[PostList] fetch error:", e);
          setPosts([]);
        }
      }
    };

    fetchPosts();
    return () => ac.abort();
  }, []);

  /* 정렬 */
  const sortedPosts = useMemo(() => {
    const copy = [...posts];
    if (sortBy === "popular") {
      return copy.sort((a, b) => (b?.views ?? 0) - (a?.views ?? 0));
    }
    if (sortBy === "comment") {
      return copy.sort((a, b) => {
        const acnt =
          a?.commentsCount ??
          (Array.isArray(a?.answers) ? a.answers.length : 0) ??
          0;
        const bcnt =
          b?.commentsCount ??
          (Array.isArray(b?.answers) ? b.answers.length : 0) ??
          0;
        if (bcnt !== acnt) return bcnt - acnt;
        const ad = new Date(a.createdAt ?? 0).getTime();
        const bd = new Date(b.createdAt ?? 0).getTime();
        return bd - ad;
      });
    }
    // latest
    return copy.sort((a, b) => {
      const ad = new Date(a.createdAt ?? 0).getTime();
      const bd = new Date(b.createdAt ?? 0).getTime();
      return bd - ad;
    });
  }, [posts, sortBy]);

  /* 페이지 슬라이싱 */
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirst, indexOfLast);

  /* 🔁 현재 페이지에 보이는 게시글에만 댓글 주입 (N+1 최소화) */
  useEffect(() => {
    if (!currentPosts || currentPosts.length === 0) return;

    // 이미 댓글이 들어간 카드(댓글 배열 or commentsCount>0)는 제외
    const targets = currentPosts.filter(
      (p) => !Array.isArray(p.comments) || p.comments.length === 0
    );
    if (targets.length === 0) return;

    const ac = new AbortController();

    (async () => {
      try {
        const tasks = targets.map(async (p) => {
          const res = await fetch(COMMENT_URL(p.postId), {
            method: "GET",
            headers: { Accept: "application/json" },
            signal: ac.signal, // 쿠키 전송 안함
          });
          if (!res.ok) {
            console.warn("[Comments] HTTP", res.status, "for post", p.postId);
            return { postId: p.postId, comments: [], count: 0 };
          }

          const json = await res.json();
          // 배열 / {data:[]} / {result:[]} 대응
          const rows = Array.isArray(json)
            ? json
            : Array.isArray(json?.data)
            ? json.data
            : Array.isArray(json?.result)
            ? json.result
            : [];

          const mapped = rows.map(mapComment);
          return { postId: p.postId, comments: mapped, count: mapped.length };
        });

        const results = await Promise.all(tasks);

        // posts 상태에 댓글/댓글수 병합
        setPosts((prev) =>
          prev.map((p) => {
            const r = results.find((x) => x.postId === p.postId);
            return r
              ? {
                  ...p,
                  comments: r.comments,
                  answers: r.comments, // 내부에서 answers도 참조하므로 동기화
                  commentsCount: r.count,
                }
              : p;
          })
        );
      } catch (e) {
        if (e.name !== "AbortError") console.error("[Comments] fetch error:", e);
      }
    })();

    return () => ac.abort();
  }, [currentPosts]);

  /* 인기 카드(조회수 기준) */
  const popularPosts = useMemo(
    () => [...posts].sort((a, b) => (b?.views ?? 0) - (a?.views ?? 0)).slice(0, 8),
    [posts]
  );

  const handlePrev = () => { if (currentPage > 1) setCurrentPage((p) => p - 1); };
  const handleNext = () => { if (currentPage < totalPages) setCurrentPage((p) => p + 1); };
  const handlePageClick = (num) => setCurrentPage(num);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [currentPage]);

  return (
    <>
      {/* 배너 */}
      <S.BannerWrap>
        <S.Banner>
          <S.BannerInner>
            <div>
              <S.PageTitle>열린 둥지</S.PageTitle>
              <S.PageDesc>자유롭게 이야기를 나누고 소통해보세요.</S.PageDesc>
            </div>
            <S.Illust src="/assets/images/chicks.png" alt="문제둥지 일러스트" />
          </S.BannerInner>
        </S.Banner>
      </S.BannerWrap>

      {/* 인기 카드 Swiper */}
      <S.Container>
        <S.ArrowBtn ref={prevRef} className="left">
          <img src="/assets/icons/leftarrow.svg" alt="왼쪽" />
        </S.ArrowBtn>

        <S.PopularWrap>
          <Swiper
            modules={[Navigation]}
            slidesPerView={3.6}
            spaceBetween={12}
            loop
            slidesPerGroup={1}
            centeredSlides={false}
            slidesOffsetBefore={0}
            slidesOffsetAfter={0}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            className="popularSwiper"
          >
            {popularPosts.map((post) => (
              <SwiperSlide key={post.postId}>
                <S.PopularCard>
                  <S.PopularTitle>{post.postTitle}</S.PopularTitle>
                  <S.PopularPreview>{post.postContent}</S.PopularPreview>
                  <S.Info>
                    <S.MetaWrap>
                      <S.ProfileImg
                        src={post.author?.profileImg || "/assets/images/defaultpro.svg"}
                        alt={post.author?.name || ""}  // 익명 표기 제거
                      />
                      {post.author?.name && (
                        <>
                          <span>{post.author?.name}</span>
                          <b>·</b>
                        </>
                      )}
                      <span>조회 {post.views || 0}</span>
                    </S.MetaWrap>
                    <S.Response>
                      <img src="/assets/icons/talktalk.svg" alt="댓글" />
                      {getReplyCount(post)}
                    </S.Response>
                  </S.Info>
                </S.PopularCard>
              </SwiperSlide>
            ))}
          </Swiper>
          <S.GradientRight />
        </S.PopularWrap>

        <S.ArrowBtn ref={nextRef} className="right">
          <img src="/assets/icons/rightarrow.svg" alt="오른쪽" />
        </S.ArrowBtn>
      </S.Container>

      {/* 정렬 / 글쓰기 */}
      <S.SortWrap>
        <div className="dd-ctrl">
          <ThreeDropDown
            value={sortBy}
            onChange={(v) => { setSortBy(v); setCurrentPage(1); }}
            color={{
              buttonBg: "#ffffff",
              buttonFg: "#121212",
              buttonBorder: "#DDDFE0",
              buttonHoverBg: "#f6f6ff",
              menuBg: "#ffffff",
              itemFg: "#121212",
              itemHoverBg: "#f6f6ff",
              itemHoverFg: "#121212",
            }}
          />
        </div>
        <S.WriteButton>글쓰기</S.WriteButton>
      </S.SortWrap>

      {/* 리스트 */}
      <S.ListWrap>
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => {
            const created =
              post.createdAt ||
              post.created_at ||
              post.regDate ||
              post.created ||
              post.createdDate;

            const topCmt = getTopComment(post);

            return (
              <S.Link to={`/post/${post.postId}`} key={post.postId}>
                <S.Row>

                  <S.QuestionInfo>
                    <S.QuestionTitle>{post.postTitle}</S.QuestionTitle>
                    <S.QuestionPreview>{post.postContent}</S.QuestionPreview>

                    <S.MetaBlock>
                      <S.ListMetaRow>
                        <S.MetaWrap>
                          <S.ProfileImg
                            src={post.author?.profileImg || "/assets/images/chicken.png"}
                            alt={post.author?.name || ""}  // 익명 표기 제거
                          />
                          {post.author?.name && (
                            <>
                              <span>{post.author?.name}</span>
                              <b>·</b>
                            </>
                          )}
                          <span>{toRelativeTime(created)}</span>
                          <b>·</b>
                          <span>조회 {post.views ?? 0}</span>
                          <b>·</b>
                        </S.MetaWrap>

                        <S.Response>
                          <img src="/assets/icons/talktalk.svg" alt="댓글" />
                          {getReplyCount(post)}
                        </S.Response>
                      </S.ListMetaRow>

                      {topCmt && (
                        <S.TopCommentRow>
                          <S.ProfileImg
                            src={
                              topCmt.author?.profileImg ||
                              topCmt.profileImg ||
                              "/assets/images/chicks.png"
                            }
                            alt={
                              topCmt.author?.name ||
                              topCmt.nickname ||
                              topCmt.userName ||
                              "병아리"
                            }
                          />
                          <S.TopCmtName>
                            {topCmt.author?.name ||
                              topCmt.nickname ||
                              topCmt.userName ||
                              "치킨"}
                          </S.TopCmtName>
                          <S.TopCmtContent
                            title={
                              topCmt.content ||
                              topCmt.text ||
                              topCmt.body ||
                              topCmt.comment ||
                              ""
                            }
                          >
                            {topCmt.content ||
                              topCmt.text ||
                              topCmt.body ||
                              topCmt.comment ||
                              ""}
                          </S.TopCmtContent>
                          {(topCmt.isBest || topCmt.best || topCmt.selected) && (
                            <S.BestBadge>best</S.BestBadge>
                          )}
                        </S.TopCommentRow>
                      )}
                    </S.MetaBlock>
                  </S.QuestionInfo>
                </S.Row>
              </S.Link>
            );
          })
        ) : (
          <p>불러오는 중...</p>
        )}
      </S.ListWrap>

      <Pagination
        current={currentPage}
        total={totalPages}
        onPrev={function(){ if (currentPage > 1) setCurrentPage((p) => p - 1); }}
        onNext={function(){ if (currentPage < totalPages) setCurrentPage((p) => p + 1); }}
        onPage={function(num){ setCurrentPage(num); }}
      />
    </>
  );
};

export default PostListContainer;
