// src/pages/community/post/postlist/PostListContainer.jsx 
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
const API_BASE = (process.env.REACT_APP_BACKEND_URL || "http://localhost:10000").replace(
  /\/+$/,
  ""
);
const POSTS_ENDPOINT = "/post/open"; // 열린둥지 전체 조회
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
    c.isBest ??
    c.best ??
    c.selected ??
    false,
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

/* 댓글 베스트 선택 */
const getTopComment = (post) => {
  const comments = post?.comments || post?.answers || [];
  if (!Array.isArray(comments) || comments.length === 0) return null;

  const byBest =
    comments.find((c) => c?.isBest || c?.best || c?.selected) || null;
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

/* =========================
   🔥 컴포넌트
   ========================= */
const PostListContainer = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  /* 정렬: latest | comment | popular */
  const [sortBy, setSortBy] = useState("latest");

  const postsPerPage = 7;

  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const navigate = useNavigate();

  /* 🔌 열린둥지 전체 조회 */
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
  const totalPages = useMemo(
    () => Math.ceil(sortedPosts.length / postsPerPage),
    [sortedPosts.length]
  );
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirst, indexOfLast);

  /* 🔁 현재 페이지에 보이는 게시글에만 댓글 주입 */
  useEffect(() => {
    if (!currentPosts || currentPosts.length === 0) return;

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
            signal: ac.signal,
          });
          if (!res.ok) {
            console.warn("[Comments] HTTP", res.status, "for post", p.postId);
            return { postId: p.postId, comments: [], count: 0 };
          }

          const json = await res.json();
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

        setPosts((prev) =>
          prev.map((p) => {
            const r = results.find((x) => x.postId === p.postId);
            return r
              ? {
                  ...p,
                  comments: r.comments,
                  answers: r.comments,
                  commentsCount: r.count,
                }
              : p;
          })
        );
      } catch (e) {
        if (e.name !== "AbortError")
          console.error("[Comments] fetch error:", e);
      }
    })();

    return () => ac.abort();
  }, [currentPosts]);

  /* 인기 카드(조회수 기준) */
  const popularPosts = useMemo(
    () =>
      [...posts].sort((a, b) => (b?.views ?? 0) - (a?.views ?? 0)).slice(0, 8),
    [posts]
  );

  // Loop 모드를 위한 슬라이드 복제 (최소 8개 필요: slidesPerView 3.6 * 2)
  const loopSlides = useMemo(() => {
    if (popularPosts.length === 0) return [];
    if (popularPosts.length >= 8) return popularPosts;
    
    // 슬라이드가 부족하면 복제하여 최소 8개 이상 만들기
    const duplicated = [];
    while (duplicated.length < 8) {
      duplicated.push(...popularPosts);
    }
    return duplicated.slice(0, Math.max(8, popularPosts.length * 2));
  }, [popularPosts]);

  // 페이지 이동
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  const handlePageClick = (num) => setCurrentPage(num);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentPage]);

  // Swiper 네비게이션 버튼 연결 및 업데이트
  useEffect(() => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current.swiper;
    if (swiper && prevRef.current && nextRef.current) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
      // loop 모드 업데이트
      swiper.update();
    }
  }, [loopSlides]);

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
            <S.Illust src="/assets/images/chicks.png" alt="열린둥지 일러스트" />
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
            ref={swiperRef}
            modules={[Navigation]}
            slidesPerView={3.6}
            spaceBetween={12}
            loop={loopSlides.length >= 8}
            loopAdditionalSlides={loopSlides.length >= 8 ? 2 : 0}
            slidesPerGroup={1}
            centeredSlides={false}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            className="popularSwiper"
          >
            {loopSlides.length > 0 ? (
              loopSlides.map((post, index) => (
                <SwiperSlide key={`${post.postId}-${index}`}>
                  <S.Link to={`/post/${post.postId}`}>
                    <S.PopularCard>
                      <S.PopularTitle>{post.postTitle}</S.PopularTitle>

                      <S.PopularPreview>{post.postContent}</S.PopularPreview>

                      <S.Info>
                        <S.MetaWrap>
                          <S.ProfileImg
                            src={post.author?.profileImg || "/assets/images/defalutpro.svg"}
                            alt={post.author?.name || ""}
                          />
                          {post.author?.name && (
                            <>
                              <span>{post.author.name}</span>
                              <b>·</b>
                            </>
                          )}
                          <span>조회 {post.views}</span>
                        </S.MetaWrap>

                        <S.Response>
                          <img src="/assets/icons/talktalk.svg" alt="댓글" />
                          {post.commentsCount}
                        </S.Response>
                      </S.Info>
                    </S.PopularCard>
                  </S.Link>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <S.PopularCard>
                  <S.PopularTitle>인기 게시글이 없습니다.</S.PopularTitle>
                  <S.PopularPreview>아직 조회된 글이 없어요 🐣</S.PopularPreview>
                </S.PopularCard>
              </SwiperSlide>
            )}

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
            onChange={(v) => {
              setSortBy(v);
              setCurrentPage(1);
            }}
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
        {/* 필요하면 /post/write 로 바꿔도 됨 */}
        <S.WriteButton onClick={() => navigate("/question/write")}>
          글쓰기
        </S.WriteButton>
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
                  {/* 게시글 상단 태그 */}
                  <S.Tag lang={post.postLangTag}>{post.postLangTag}</S.Tag>

                  <S.QuestionInfo>
                    <S.QuestionTitle>{post.postTitle}</S.QuestionTitle>
                    <S.QuestionPreview>{post.postContent}</S.QuestionPreview>

                    <S.MetaBlock>
                      <S.ListMetaRow>
                        <S.MetaWrap>
                          <S.ProfileImg
                            src={
                              post.author?.profileImg ||
                              "/assets/images/defalutpro.svg"
                            }
                            alt={post.author?.name || ""}
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
                              "/assets/images/defalutpro.svg"
                            }
                            alt={
                              topCmt.author?.name ||
                              topCmt.nickname ||
                              topCmt.userName ||
                              "user"
                            }
                          />
                          <S.TopCmtName>
                            {topCmt.author?.name ||
                              topCmt.nickname ||
                              topCmt.userName ||
                              "user"}
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
                          {(topCmt.isBest ||
                            topCmt.best ||
                            topCmt.selected) && (
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

      {/* 페이지네이션 */}
      <S.Pagination>
        <S.PageArrow
          className="left"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <img src="/assets/icons/pnleftarrow.svg" alt="이전 페이지" />
        </S.PageArrow>

        {Array.from({ length: totalPages }, (_, i) => (
          <S.PageButton
            key={i + 1}
            $active={currentPage === i + 1}
            onClick={() => handlePageClick(i + 1)}
          >
            {i + 1}
          </S.PageButton>
        ))}

        <S.PageArrow
          className="right"
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <img src="/assets/icons/pnrightarrow.svg" alt="다음 페이지" />
        </S.PageArrow>
      </S.Pagination>
    </>
  );
};

export default PostListContainer;
