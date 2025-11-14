import { SearchResultContext } from 'context/SearchResultContext';
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './style';
import PostList from '../community/post/postlist/PostList';
import QuestionList from '../community/question/questionlist/questionlistdata/QuestionList';
import QuizList from '../quiz/quizlist/QuizList';
import NoResult from './Components/NoResult';
import UserResult from './Components/UserResult';
import FriendStyle from '../mypage/friend/style';

// QuestionList용 날짜 포맷 함수
const formatDate = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = (now - date) / 1000;
  if (isNaN(date)) return dateString;
  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;
  return `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
};

// 게시글 매핑 함수 (PostList와 QuestionList 모두 사용)
const mapPost = (p) => ({
  postId: p.id ?? p.postId,
  id: p.id ?? p.postId, // QuestionList도 지원
  postTitle: p.postTitle ?? p.title ?? "",
  postContent: p.postContent ?? p.content ?? "",
  postLangTag: p.postType ?? p.quizLanguage ?? p.lang ?? "OPEN",
  postType: p.postType ?? p.quizLanguage ?? p.lang ?? "OPEN", // QuestionList도 지원
  views: p.postViewCount ?? p.viewCount ?? p.views ?? 0,
  postViewCount: p.postViewCount ?? p.viewCount ?? p.views ?? 0, // QuestionList도 지원
  createdAt:
    p.postCreateAt ??
    p.createdAt ??
    p.created ??
    p.createdDate ??
    p.createAt ??
    null,
  postCreateAt: // QuestionList도 지원
    p.postCreateAt ??
    p.createdAt ??
    p.created ??
    p.createdDate ??
    p.createAt ??
    null,
  author: {
    id: p.userId ?? p.authorId ?? null,
    name:
      p.userNickname ??
      p.authorNickname ??
      p.userName ??
      p.username ??
      p.user_email ??
      null,
    profileImg: p.userThumbnailUrl ?? p.authorProfile ?? null,
  },
  userId: p.userId ?? p.authorId ?? null, // QuestionList도 지원
  userNickname: p.userNickname ?? p.authorNickname ?? p.userName ?? null, // QuestionList도 지원
  userThumbnailUrl: p.userThumbnailUrl ?? p.authorProfile ?? null, // QuestionList도 지원
  commentsCount: p.commentCount ?? p.commentsCount ?? p.answersCount ?? 0,
  commentCount: p.commentCount ?? p.commentsCount ?? p.answersCount ?? 0, // QuestionList도 지원
  comments: Array.isArray(p.comments) ? p.comments : [],
  answers: Array.isArray(p.answers) ? p.answers : [],
});

const SearchResult = () => {
  const navigate = useNavigate();
  const { state } = useContext(SearchResultContext);
  const { search, openPosts, questionPosts, quizzes, users } = state;
  const totalCount = openPosts.length + questionPosts.length + quizzes.length + users.length;

  // 북마크 기능
  const [bookMarkId, setBookMarkId] = useState([]);
  
  useEffect(() => {
    const session = sessionStorage.getItem("bookMarkId");
    if (session != null) {
      const parse = JSON.parse(session);
      if (Array.isArray(parse)) {
        setBookMarkId(parse.map((data) => Number(data)));
      }
    }
  }, []);

  const clickBookmark = (bookMarkId) => {
    const id = Number(bookMarkId);
    setBookMarkId((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      sessionStorage.setItem("bookMarkId", JSON.stringify(next));
      return next;
    });
  };

  // 각 카테고리별 최대 3개만 표시
  const displayQuestionPosts = useMemo(() => {
    return questionPosts.slice(0, 3).map(mapPost);
  }, [questionPosts]);

  const displayOpenPosts = useMemo(() => {
    return openPosts.slice(0, 3).map(mapPost);
  }, [openPosts]);

  const displayQuizzes = useMemo(() => {
    return quizzes.slice(0, 10);
  }, [quizzes]);

  // UserResult 컴포넌트가 기대하는 형식으로 사용자 데이터 매핑
  const displayUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];
    const sliced = users.slice(0, 3);
    // UserResult 컴포넌트가 기대하는 형식으로 변환
    return sliced.map((user) => ({
      id: user.id || user.userId,
      userId: user.userId || user.id,
      userNickname: user.userNickname || user.userName || '익명',
      userProfile: user.userThumbnailUrl || user.userProfile || "/assets/images/defalutpro.svg",
      userLever: user.userLevel || user.userLever || user.level || 1,
      followerCount: user.followerCount || user.followCount || 0,
      isFollow: user.isFollow || false,
    }));
  }, [users]);

  // 3개 단위로 잘라주는 유틸 (FriendContainer와 동일)
  const chunkBy = (arr, size) => {
    if (!Array.isArray(arr) || size <= 0) return [arr];
    const res = [];
    for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
    return res;
  };

  // 3개씩 묶어서 UserResult 여러 번 호출 (FriendContainer와 동일한 방식)
  const userRows = useMemo(() => {
    return chunkBy(displayUsers, 3);
  }, [displayUsers]);

  return (
    <S.LayOutWrap>
      {totalCount ? (
        <S.ResultWrap>
          {/* 문제둥지 (토론) */}
          {questionPosts.length > 0 && (
            <S.LayOut>
              <S.SearchCategoryWrap>
                <S.SearchResultCategoryLeft>
                  <span>문제둥지</span>
                  <span className="blue">{questionPosts.length}</span>
                </S.SearchResultCategoryLeft>
                <S.SearchResultCategoryRight>
                  <S.CleanLink to={`/search/question-post?search=${encodeURIComponent(search)}`}>
                    <span>+</span>
                    <span>더보기</span>
                  </S.CleanLink>
                </S.SearchResultCategoryRight>
              </S.SearchCategoryWrap>
              
              {/* QuestionList 컴포넌트 사용 */}
              <S.ListWrapWithMargin>
                <QuestionList
                  posts={displayQuestionPosts}
                  loading={false}
                  formatDate={formatDate}
                />
              </S.ListWrapWithMargin>
            </S.LayOut>
          )}

          {/* 훈련장 (퀴즈) */}
          {quizzes.length > 0 && (
            <S.LayOut>
              <S.SearchCategoryWrap>
                <S.SearchResultCategoryLeft>
                  <span>훈련장</span>
                  <span className="blue">{quizzes.length}</span>
                </S.SearchResultCategoryLeft>
                <S.SearchResultCategoryRight>
                  <S.CleanLink to={`/search/quiz?search=${encodeURIComponent(search)}`}>
                    <span>+</span>
                    <span>더보기</span>
                  </S.CleanLink>
                </S.SearchResultCategoryRight>
              </S.SearchCategoryWrap>
              
              {/* QuizList 컴포넌트 사용 */}
              <S.QuizListContainerWithMargin>
                <QuizList
                  quizs={displayQuizzes}
                  loading={false}
                  toggleBookmark={clickBookmark}
                  bookMarkId={bookMarkId}
                  quizTotalCount={quizzes.length}
                  showPagination={false}
                />
              </S.QuizListContainerWithMargin>
            </S.LayOut>
          )}

          {/* 열린둥지 (자유) */}
          {openPosts.length > 0 && (
            <S.LayOut>
              <S.SearchCategoryWrap>
                <S.SearchResultCategoryLeft>
                  <span>열린둥지</span>
                  <span className="blue">{openPosts.length}</span>
                </S.SearchResultCategoryLeft>
                <S.SearchResultCategoryRight>
                  <S.CleanLink to={`/search/open-post?search=${encodeURIComponent(search)}`}>
                    <span>+</span>
                    <span>더보기</span>
                  </S.CleanLink>
                </S.SearchResultCategoryRight>
              </S.SearchCategoryWrap>
              
              {/* PostList 컴포넌트 사용 */}
              <S.ListWrapWithMargin>
                <PostList
                  posts={displayOpenPosts}
                  loading={false}
                  linkTo="/post"
                />
              </S.ListWrapWithMargin>
            </S.LayOut>
          )}

          {/* 친구 */}
          {users.length > 0 && (
            <S.LayOut>
              <S.SearchCategoryWrap>
                <S.SearchResultCategoryLeft>
                  <span>친구</span>
                  <span className="blue">{users.length}</span>
                </S.SearchResultCategoryLeft>
                <S.SearchResultCategoryRight>
                  <S.CleanLink to={`/search/follow?search=${encodeURIComponent(search)}`}>
                    <span>+</span>
                    <span>더보기</span>
                  </S.CleanLink>
                </S.SearchResultCategoryRight>
              </S.SearchCategoryWrap>
              
              {/* FriendContainer와 동일한 레이아웃 사용 */}
              <FriendStyle.Section>
                {userRows.map((row, idx) => (
                  <FriendStyle.StripHeader key={`row-${idx}`}>
                    <UserResult datas={row} search={search} count={users.length} />
                  </FriendStyle.StripHeader>
                ))}
              </FriendStyle.Section>
            </S.LayOut>
          )}
        </S.ResultWrap>
      ) : (
        <NoResult />
      )}
    </S.LayOutWrap>
  );
};

export default SearchResult;
