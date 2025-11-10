// src/pages/community/post/postlist/PostListContainer.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import S from "./style";
import Pagination from "./components/Pagination";
import ThreeDropDown from "../../../../components/dropdown/ThreeDropDown";

const POSTS_PER_PAGE = 7;

/** 상대 시간 */
const toRelativeTime = (dateLike) => {
  if (!dateLike) return "";
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "";
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

/** 서버 → 프런트 매핑 */
const mapPost = (p) => ({
  postId: p.id ?? p.postId,
  postTitle: p.postTitle ?? p.title ?? "",
  postContent: p.postContent ?? p.content ?? "",
  postLangTag: p.postType ?? p.lang ?? "OPEN",
  views: p.postViewCount ?? p.viewCount ?? p.views ?? 0,
  createdAt: p.postCreateAt ?? p.createdAt ?? p.created ?? p.createdDate,
  authorNickname: p.userNickname ?? p.authorNickname ?? null,
  authorProfile: p.userThumbnailUrl ?? p.authorProfile ?? null,
  commentsCount: p.commentCount ?? p.commentsCount ?? p.answersCount ?? 0,
  topComment: p.topComment ?? null,
});

/** 클라 정렬 */
const sortClient = (arr, sortBy) => {
  const copy = [...arr];
  if (sortBy === "popular") {
    return copy.sort((a, b) => (b?.views ?? 0) - (a?.views ?? 0));
  }
  if (sortBy === "comment") {
    return copy.sort((a, b) => (b?.commentsCount ?? 0) - (a?.commentsCount ?? 0));
  }
  // latest
  return copy.sort((a, b) => {
    const ad = new Date(a.createdAt ?? 0).getTime();
    const bd = new Date(b.createdAt ?? 0).getTime();
    return bd - ad;
  });
};

/** URL 쿼리 → 필터 */
const getFiltersFromQuery = (search, fallback) => {
  const qs = new URLSearchParams(search);
  const page = Number(qs.get("page")) || fallback.currentPage;
  const size = Number(qs.get("size")) || fallback.size;
  const sort = qs.get("sort") || fallback.sortBy;     // latest | comment | popular
  const board = (qs.get("board") || fallback.board).toLowerCase(); // open | question
  return { page, size, sort, board };
};

const PostListContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest"); // latest | comment | popular
  const [board, setBoard] = useState("open");      // open | question
  const [loading, setLoading] = useState(false);

  /** 목록 호출 (GET /post/open | /post/question) */
  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const filters = getFiltersFromQuery(location.search, {
          currentPage,
          size: POSTS_PER_PAGE,
          sortBy,
          board,
        });

        // 상태 동기화
        setCurrentPage(filters.page || 1);
        setSortBy(filters.sort || "latest");
        setBoard(filters.board || "open");

        const base = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "");
        const path = filters.board === "question" ? "/question" : "/post";
        const res = await fetch(`${base}${path}`, {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          setItems([]);
          setTotalPages(1);
          return;
        }

        const json = await res.json();
        // 이 엔드포인트는 배열(List<PostResponseDTO>)을 바로 반환
        const list = Array.isArray(json) ? json : (Array.isArray(json?.data) ? json.data : []);
        const mapped = list.map(mapPost);
        const sorted = sortClient(mapped, filters.sort);

        setItems(sorted);
        const pages = Math.max(1, Math.ceil(sorted.length / (filters.size || POSTS_PER_PAGE)));
        setTotalPages(pages);
      } catch (err) {
        console.error(err);
        setItems([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
    // board/sort/page는 URL 쿼리로만 트리거
  }, [location.search]);

  // 드롭다운 변경 → URL 쿼리 갱신
  const onChangeSort = (v) => {
    const qs = new URLSearchParams(location.search);
    qs.set("sort", v);
    qs.set("page", "1");
    navigate({ search: qs.toString() }, { replace: false });
  };

  // 페이지 이동 → URL 쿼리 갱신
  const goPage = (p) => {
    const qs = new URLSearchParams(location.search);
    qs.set("page", String(p));
    navigate({ search: qs.toString() }, { replace: false });
  };

  // 현재 페이지 슬라이싱
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const pageItems = items.slice(start, end);

  return (
    <>
      <S.SortWrap>
        <div className="dd-ctrl">
          <ThreeDropDown
            value={sortBy}
            onChange={onChangeSort}
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

      <S.ListWrap>
        {loading ? (
          <p>불러오는 중...</p>
        ) : pageItems.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          pageItems.map((post) => (
            <S.Link to={`/post/${post.postId}`} key={post.postId}>
              <S.Row>
                {post.postLangTag && (
                  <S.Tag lang={post.postLangTag}>{post.postLangTag}</S.Tag>
                )}

                <S.QuestionInfo>
                  <S.QuestionTitle>{post.postTitle}</S.QuestionTitle>
                  <S.QuestionPreview>{post.postContent}</S.QuestionPreview>

                  <S.MetaBlock>
                    <S.ListMetaRow>
                      <S.MetaWrap>
                        {post.authorProfile && (
                          <S.ProfileImg src={post.authorProfile} alt="작성자" />
                        )}
                        {post.authorNickname && <span>{post.authorNickname}</span>}
                        {post.authorNickname && <b>·</b>}
                        {post.createdAt && <span>{toRelativeTime(post.createdAt)}</span>}
                        <b>·</b>
                        <span>조회 {post.views ?? 0}</span>
                      </S.MetaWrap>

                      <S.Response>
                        <img src="/assets/icons/talktalk.svg" alt="댓글" />
                        {post.commentsCount ?? 0}
                      </S.Response>
                    </S.ListMetaRow>

                    {post.topComment && (
                      <S.TopCommentRow>
                        {post.topComment.profileImg && (
                          <S.ProfileImg src={post.topComment.profileImg} alt="댓글 작성자" />
                        )}
                        {post.topComment.nickname && (
                          <S.TopCmtName>{post.topComment.nickname}</S.TopCmtName>
                        )}
                        {post.topComment.content && (
                          <S.TopCmtContent title={post.topComment.content}>
                            {post.topComment.content}
                          </S.TopCmtContent>
                        )}
                        {post.topComment.best && <S.BestBadge>best</S.BestBadge>}
                      </S.TopCommentRow>
                    )}
                  </S.MetaBlock>
                </S.QuestionInfo>
              </S.Row>
            </S.Link>
          ))
        )}
      </S.ListWrap>

      <Pagination
        current={currentPage}
        total={totalPages}
        onPrev={() => goPage(Math.max(1, currentPage - 1))}
        onNext={() => goPage(Math.min(totalPages, currentPage + 1))}
        onPage={(n) => goPage(n)}
      />
    </>
  );
};

export default PostListContainer;
