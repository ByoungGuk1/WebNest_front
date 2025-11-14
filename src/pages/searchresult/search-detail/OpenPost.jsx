import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { SearchResultContext } from "context/SearchResultContext";
import PostListStyle from "../../community/post/postlist/style";
import S from "../style";

// PostListContainer와 동일한 날짜 포맷 함수
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

// 댓글 베스트 선택
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

// 댓글 수 표기
const getReplyCount = (post) =>
  post?.commentsCount ??
  (Array.isArray(post?.answers) ? post.answers.length : 0) ??
  0;

// 게시글 매핑 함수
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
  comments: Array.isArray(p.comments) ? p.comments : [],
  answers: Array.isArray(p.answers) ? p.answers : [],
});

const OpenPost = () => {
  const location = useLocation();
  const { state } = useContext(SearchResultContext);
  const { search, openPosts } = state;

  // 무한 스크롤을 위한 상태
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef(null);
  const itemsPerPage = 10;

  // 게시글 매핑
  const mappedPosts = React.useMemo(() => {
    return openPosts.map(mapPost);
  }, [openPosts]);

  // 페이지별 데이터 로드
  useEffect(() => {
    const startIndex = 0;
    const endIndex = page * itemsPerPage;
    setDisplayedPosts(mappedPosts.slice(startIndex, endIndex));
  }, [mappedPosts, page]);

  // 무한 스크롤 옵저버
  const observerCallback = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        if (displayedPosts.length < mappedPosts.length) {
          setIsLoading(true);
          setTimeout(() => {
            setPage((prev) => prev + 1);
            setIsLoading(false);
          }, 300);
        }
      }
    },
    [displayedPosts.length, mappedPosts.length, isLoading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerCallback]);

  return (
    <S.LayOutWrap>
      <S.LayOut>
        <S.SearchCategoryWrap>
          <S.SearchResultCategoryLeft>
            <span>열린둥지</span>
            <span className="blue">{openPosts.length}</span>
          </S.SearchResultCategoryLeft>
        </S.SearchCategoryWrap>

        {/* PostListContainer와 동일한 리스트 레이아웃 */}
        <S.ListWrapWithMargin>
          <PostListStyle.ListWrap>
        {displayedPosts.map((post) => {
          const created = post.createdAt;
          const topCmt = getTopComment(post);

          return (
            <PostListStyle.Link to={`/post/${post.postId}`} key={post.postId}>
              <PostListStyle.Row>
                <PostListStyle.Tag lang={post.postLangTag}>
                  {post.postLangTag}
                </PostListStyle.Tag>

                <PostListStyle.QuestionInfo>
                  <PostListStyle.QuestionTitle>{post.postTitle}</PostListStyle.QuestionTitle>
                  <PostListStyle.QuestionPreview>{post.postContent}</PostListStyle.QuestionPreview>

                  <PostListStyle.MetaBlock>
                    <PostListStyle.ListMetaRow>
                      <PostListStyle.MetaWrap>
                        <PostListStyle.ProfileImg
                          src={post.author?.profileImg || "/assets/images/defalutpro.svg"}
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
                      </PostListStyle.MetaWrap>

                      <PostListStyle.Response>
                        <img src="/assets/icons/talktalk.svg" alt="댓글" />
                        {getReplyCount(post)}
                      </PostListStyle.Response>
                    </PostListStyle.ListMetaRow>

                    {topCmt && (
                      <PostListStyle.TopCommentRow>
                        <PostListStyle.ProfileImg
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
                        <PostListStyle.TopCmtName>
                          {topCmt.author?.name ||
                            topCmt.nickname ||
                            topCmt.userName ||
                            "user"}
                        </PostListStyle.TopCmtName>
                        <PostListStyle.TopCmtContent
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
                        </PostListStyle.TopCmtContent>
                        {(topCmt.isBest || topCmt.best || topCmt.selected) && (
                          <PostListStyle.BestBadge>best</PostListStyle.BestBadge>
                        )}
                      </PostListStyle.TopCommentRow>
                    )}
                  </PostListStyle.MetaBlock>
                </PostListStyle.QuestionInfo>
              </PostListStyle.Row>
            </PostListStyle.Link>
          );
        })}
          </PostListStyle.ListWrap>
        </S.ListWrapWithMargin>

        {/* 무한 스크롤 트리거 */}
        {displayedPosts.length < mappedPosts.length && (
          <S.InfiniteScrollTrigger ref={observerTarget}>
            {isLoading && <div>로딩 중...</div>}
          </S.InfiniteScrollTrigger>
        )}
      </S.LayOut>
    </S.LayOutWrap>
  );
};

export default OpenPost;
