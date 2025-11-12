import React from "react";
import S from "./style";
import { Link } from "react-router-dom";

const QuestionList = ({ posts, loading, formatDate }) => {
  if (loading) return <p>불러오는 중...</p>;

  if (!posts.length) return <p>게시글이 없습니다.</p>;

  return (
    <S.ListWrap>
      {posts.map((post) => (
        <S.Link to={`/question/${post.id}`} key={post.id} style={{ textDecoration: "none" }}>
          <S.Row>
            <S.Tag lang={post.postType || "JS"}>{post.postType || "JS"}</S.Tag>

            <S.QuestionInfo>
              <S.QuestionTitle>{post.postTitle}</S.QuestionTitle>
              <S.QuestionPreview>{post.postContent}</S.QuestionPreview>

              <S.QuestionMetaWrap>
                <S.QuestionProfileImg
                  src="/assets/images/defalutpro.svg"
                  alt="익명"
                />
                <span>사용자 #{post.userId}</span>
                <b>·</b>
                <span>{formatDate(post.postCreateAt)}</span>
                <b>·</b>
                <span>조회 {post.postViewCount || 0}</span>
                <b>·</b>
                <img src="/assets/icons/talktalk.svg" alt="댓글" />
                <span>{post.commentCount ?? 0}</span> {/*  댓글 수 표시 */}
              </S.QuestionMetaWrap>
            </S.QuestionInfo>
          </S.Row>
        </S.Link>
      ))}
    </S.ListWrap>
  );
};

export default QuestionList;
