// PostList.jsx
import React from "react";
import { Link } from "react-router-dom";
import S from "./style";

// 날짜 → 상대시간
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

const PostList = ({ posts = [], loading = false, linkTo = "/post" }) => {
  if (loading) return <p>불러오는 중...</p>;

  if (!Array.isArray(posts) || posts.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

  return (
    <S.ListWrap>
      {posts.map((post) => {
        const created =
          post.createdAt ||
          post.created_at ||
          post.regDate ||
          post.created ||
          post.createdDate;

        const topCmt = getTopComment(post);

        return (
          <S.Link to={`${linkTo}/${post.postId}`} key={post.postId}>
            <S.Row>
              <S.Tag lang={post.postLangTag}>{post.postLangTag}</S.Tag>

              <S.QuestionInfo>
                <S.QuestionTitle>{post.postTitle}</S.QuestionTitle>
                <S.QuestionPreview>{post.postContent}</S.QuestionPreview>

                <S.MetaBlock>
                  <S.ListMetaRow>
                    <S.MetaWrap>
                      <S.ProfileImg
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
      })}
    </S.ListWrap>
  );
};

export default PostList;
