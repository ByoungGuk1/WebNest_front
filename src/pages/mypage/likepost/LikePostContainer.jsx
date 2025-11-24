import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import S from "../mypost/style";
import PostListStyle from "../../../pages/community/post/postlist/style";

/* 날짜 → 상대시간 */
const toRelativeTime = (dateLike) => {
  if (!dateLike) return "방금";
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "방금";
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "방금";
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  const day = Math.floor(h / 24);
  if (day < 7) return `${day}일 전`;
  const mon = Math.floor(day / 30);
  if (mon < 12) return `${mon}개월 전`;
  const y = Math.floor(mon / 12);
  return `${y}년 전`;
};

/* 백엔드 → 프런트 표준 구조로 매핑 */
const mapPost = (p) => ({
  // PostLikeDTO에서 postId가 실제 게시글 ID, id는 좋아요 레코드 ID이므로 postId를 우선 사용
  postId: p.postId ?? p.id,
  postTitle: p.postTitle ?? p.title ?? "",
  postContent: p.postContent ?? p.content ?? "",
  postLangTag: p.postType ?? p.lang ?? "OPEN",
  views: p.postViewCount ?? p.viewCount ?? p.views ?? 0,
  commentsCount: p.commentCount ?? p.commentsCount ?? p.answersCount ?? 0,
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
      null,
    profileImg: p.userThumbnailUrl ?? p.authorProfile ?? null,
  },
});

const LikePostContainer = () => {
  const myData = useOutletContext();
  const [postType, setPostType] = useState("OPEN"); // "OPEN" 또는 "QUESTION"

  // MyPageContainer에서 받은 데이터에서 좋아요한 게시글 추출
  const allPosts = useMemo(() => {
    const questionLikePosts = myData?.questionLikePosts ?? [];
    const openLikePosts = myData?.openLikePosts ?? [];
    return [...questionLikePosts, ...openLikePosts];
  }, [myData]);

  // postType에 따라 필터링
  const posts = useMemo(() => {
    if (!Array.isArray(allPosts)) return [];
    return allPosts
      .filter((p) => {
        const type = p.postType ?? p.lang ?? "OPEN";
        if (postType === "OPEN") {
          return type === "OPEN";
        } else {
          return type !== "OPEN";
        }
      })
      .map(mapPost)
      .filter((p) => p.postId != null);
  }, [allPosts, postType]);

  return (
    <div>
      {/* 토글 버튼 */}
      <S.BoardToggleRow>
        <S.BoardToggle>
          <S.BoardButton
            $active={postType === "OPEN"}
            onClick={() => setPostType("OPEN")}
          >
            열린둥지
          </S.BoardButton>
          <S.BoardButton
            $active={postType === "QUESTION"}
            onClick={() => setPostType("QUESTION")}
          >
            문제둥지
          </S.BoardButton>
        </S.BoardToggle>
      </S.BoardToggleRow>

      {/* 게시글 목록 */}
      {posts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          좋아요한 게시글이 없습니다.
        </div>
      ) : (
        <PostListStyle.ListWrap>
          {posts.map((post, index) => {
            const created = post.createdAt;
            const isLast = index === posts.length - 1;
            // 게시물 타입에 따라 링크 경로 결정: OPEN이면 /post/, 그 외는 /question/
            const linkPath = post.postLangTag === "OPEN" 
              ? `/post/${post.postId}` 
              : `/question/${post.postId}`;
            
            return (
              <PostListStyle.Link to={linkPath} key={post.postId}>
                <PostListStyle.Row style={isLast ? { borderBottom: 'none' } : {}}>
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
                              <span>{post.author.name}</span>
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
                          {post.commentsCount ?? 0}
                        </PostListStyle.Response>
                      </PostListStyle.ListMetaRow>
                    </PostListStyle.MetaBlock>
                  </PostListStyle.QuestionInfo>
                </PostListStyle.Row>
              </PostListStyle.Link>
            );
          })}
        </PostListStyle.ListWrap>
      )}
    </div>
  );
};

export default LikePostContainer;
