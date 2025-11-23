// src/pages/community/post/postlist/PostList.jsx
import React from "react";
import S from "./style";
import {
  getFileDisplayUrl,
  getFileDisplayUrlFromPathAndName,
} from "../../../../utils/fileUtils";

const DEFAULT_PROFILE_IMAGE = "/assets/images/defalutpro.svg";

/** 🔥 글쓴이 프로필 이미지 URL 만들기 */
const buildAuthorProfileImg = (post) => {
  const author = post.author || {};

  // 1) path 후보들: post 루트 + author 둘 다 커버
  const path =
    post.userThumbnailUrl ||
    post.authorThumbnailUrl ||
    author.userThumbnailUrl ||
    author.authorThumbnailUrl ||
    post.profilePath ||
    author.profilePath ||
    "";

  // 2) name 후보들
  const name =
    post.userThumbnailName ||
    post.authorThumbnailName ||
    author.userThumbnailName ||
    author.authorThumbnailName ||
    post.profileName ||
    author.profileName ||
    "";

  // 3) 예전 구조: 한 필드에 전체 경로 or 파일명만 들어오는 경우
  const legacyRaw =
    author.profileImg ||
    post.profileImg ||
    post.profileUrl ||
    author.profileUrl ||
    post.userThumbnailUrl || // img/1.jpg 같은 옛날 패턴일 수도 있음
    "";

  // (1) path/name도 없고 legacyRaw도 없으면 → 기본 이미지
  if (
    (!path || path === "/default" || path === "null" || path === "undefined") &&
    !legacyRaw
  ) {
    return DEFAULT_PROFILE_IMAGE;
  }

  // (2) path + name 둘 다 있으면 → 우리가 만든 util 사용
  if (path && name) {
    // 예: path="img/", name="1.jpg" → "img/1.jpg" → /file/display?fileName=...
    return (
      getFileDisplayUrlFromPathAndName(path, name) || DEFAULT_PROFILE_IMAGE
    );
  }

  // (3) path만 있거나 legacyRaw만 있을 때
  const raw = legacyRaw || path;
  if (!raw) return DEFAULT_PROFILE_IMAGE;

  // 외부 URL / assets 경로면 그대로 사용
  if (raw.startsWith("http") || raw.startsWith("/assets")) {
    return raw;
  }

  // "/uploads/xxx" / "uploads/xxx" / "/img/1.jpg" 같은 것들 정리
  let fileName = raw;
  if (fileName.startsWith("/uploads/")) {
    fileName = fileName.replace("/uploads/", "");
  } else if (fileName.startsWith("uploads/")) {
    fileName = fileName.replace("uploads/", "");
  }
  if (fileName.startsWith("/")) {
    fileName = fileName.slice(1);
  }

  // 최종적으로 /file/display?fileName=... 형태로 변환
  return getFileDisplayUrl(fileName);
};

/** 🔥 댓글 작성자 프로필 이미지 URL */
const buildCommentProfileImg = (c) => {
  const author = c.author || {};

  const path =
    c.userThumbnailUrl ||
    c.authorThumbnailUrl ||
    author.userThumbnailUrl ||
    author.authorThumbnailUrl ||
    "";

  const name =
    c.userThumbnailName ||
    c.authorThumbnailName ||
    author.userThumbnailName ||
    author.authorThumbnailName ||
    "";

  const legacyRaw =
    author.profileImg ||
    c.profileImg ||
    c.profileUrl ||
    c.userThumbnailUrl ||
    "";

  if (
    (!path || path === "/default" || path === "null" || path === "undefined") &&
    !legacyRaw
  ) {
    return DEFAULT_PROFILE_IMAGE;
  }

  if (path && name) {
    return (
      getFileDisplayUrlFromPathAndName(path, name) || DEFAULT_PROFILE_IMAGE
    );
  }

  const raw = legacyRaw || path;
  if (!raw) return DEFAULT_PROFILE_IMAGE;

  if (raw.startsWith("http") || raw.startsWith("/assets")) {
    return raw;
  }

  let fileName = raw;
  if (fileName.startsWith("/uploads/")) {
    fileName = fileName.replace("/uploads/", "");
  } else if (fileName.startsWith("uploads/")) {
    fileName = fileName.replace("uploads/", "");
  }
  if (fileName.startsWith("/")) {
    fileName = fileName.slice(1);
  }

  return getFileDisplayUrl(fileName);
};

/** 날짜 → 상대시간 */
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

/** 댓글 베스트 선택 */
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

/** 댓글 수 표기 */
const getReplyCount = (post) =>
  post?.commentsCount ??
  (Array.isArray(post?.answers) ? post.answers.length : 0) ??
  0;

/** ✅ 공용 PostList 컴포넌트
 *  - props.posts : [{ postId, postTitle, postContent, postLangTag, views, createdAt, author, ... }]
 *  - props.loading : 불러오는 중 여부
 *  - props.linkTo : 상세 링크 prefix (기본 "/post")
 */
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

        const authorName =
          post.userNickname ||
          post.userName ||
          post.author?.name ||
          post.author?.userNickname ||
          post.author?.nickname ||
          "";

        const profileImgSrc =
          post.author?.profileImg || buildAuthorProfileImg(post);

        return (
          <S.Link to={`${linkTo}/${post.postId}`} key={post.postId}>
            <S.Row>
              {/* 언어/타입 태그 */}
              <S.Tag lang={post.postLangTag}>{post.postLangTag}</S.Tag>

              {/* 제목/내용/메타 정보 */}
              <S.QuestionInfo>
                <S.QuestionTitle>{post.postTitle}</S.QuestionTitle>
                <S.QuestionPreview>{post.postContent}</S.QuestionPreview>

                <S.MetaBlock>
                  <S.ListMetaRow>
                    <S.MetaWrap>
                      <S.ProfileImg
                        src={profileImgSrc || DEFAULT_PROFILE_IMAGE}
                        alt={authorName}
                        onError={(e) => {
                          e.currentTarget.src = DEFAULT_PROFILE_IMAGE;
                        }}
                      />
                      {authorName && (
                        <>
                          <S.AuthorName>{authorName}</S.AuthorName>
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

                  {/* 베스트 댓글 영역 */}
                  {topCmt && (
                    <S.TopCommentRow>
                      <S.ProfileImg
                        src={
                          topCmt.author?.profileImg ||
                          buildCommentProfileImg(topCmt) ||
                          DEFAULT_PROFILE_IMAGE
                        }
                        alt={
                          topCmt.author?.name ||
                          topCmt.nickname ||
                          topCmt.userName ||
                          "user"
                        }
                        onError={(e) => {
                          e.currentTarget.src = DEFAULT_PROFILE_IMAGE;
                        }}
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
      })}
    </S.ListWrap>
  );
};

export default PostList;
