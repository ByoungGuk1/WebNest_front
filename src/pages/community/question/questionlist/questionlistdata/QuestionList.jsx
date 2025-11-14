import React from "react";
import S from "./style";
import { Link } from "react-router-dom";

const QuestionList = ({ posts, loading, formatDate }) => {
  if (loading) return <p>불러오는 중...</p>;

  if (!Array.isArray(posts) || posts.length === 0) return <p>게시글이 없습니다.</p>;

  return (
    <S.ListWrap>
      {posts.map((post) => {
        // postId 또는 id 둘 다 지원
        const postId = post.postId ?? post.id;
        // postType 또는 postLangTag 둘 다 지원
        const postType = post.postType ?? post.postLangTag ?? "JS";
        // postCreateAt 또는 createdAt 둘 다 지원
        const postCreateAt = post.postCreateAt ?? post.createdAt;
        // postViewCount 또는 views 둘 다 지원
        const postViewCount = post.postViewCount ?? post.views ?? 0;
        // commentCount 또는 commentsCount 둘 다 지원
        const commentCount = post.commentCount ?? post.commentsCount ?? 0;
        // userId 또는 author.id 둘 다 지원
        const userId = post.userId ?? post.author?.id ?? post.authorId;
        // author 정보
        const authorName = post.author?.name ?? post.userNickname ?? null;
        const authorProfile = post.author?.profileImg ?? post.userThumbnailUrl ?? "/assets/images/defalutpro.svg";

        return (
          <S.Link to={`/question/${postId}`} key={postId} style={{ textDecoration: "none" }}>
            <S.Row>
              <S.Tag lang={postType}>{postType}</S.Tag>

              <S.QuestionInfo>
                <S.QuestionTitle>{post.postTitle}</S.QuestionTitle>
                <S.QuestionPreview>{post.postContent}</S.QuestionPreview>

                <S.QuestionMetaWrap>
                  <S.QuestionProfileImg
                    src={authorProfile}
                    alt={authorName || "익명"}
                  />
                  {authorName ? (
                    <>
                      <span>{authorName}</span>
                      <b>·</b>
                    </>
                  ) : (
                    <>
                      <span>사용자 #{userId}</span>
                      <b>·</b>
                    </>
                  )}
                  <span>{formatDate(postCreateAt)}</span>
                  <b>·</b>
                  <span>조회 {postViewCount}</span>
                  <b>·</b>
                  <img src="/assets/icons/talktalk.svg" alt="댓글" />
                  <span>{commentCount}</span>
                </S.QuestionMetaWrap>
              </S.QuestionInfo>
            </S.Row>
          </S.Link>
        );
      })}
    </S.ListWrap>
  );
};

export default QuestionList;
