import { useEffect, useState, useRef } from "react";
import QustionListBanner from "./questionbanner/QustionListBanner";
import PopularQuestionSwiper from "./questionpopular/PopularQuestionSwiper";
import QustionListSort from "./questionsort/QustionListSort";
import QuestionList from "./questionlistdata/QuestionList";
import Questionpagenation from "./questionpagenation/Questionpagenation";

const QuestionListContainer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("최신글");
  const postsPerPage = 7;

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // 날짜 포맷 함수
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

  // 게시글 + 댓글 수 병합 로직
  useEffect(() => {
    const fetchPostsWithComments = async () => {
      try {
        const res = await fetch("http://localhost:10000/post/question");
        const postData = await res.json();

        const postList = Array.isArray(postData)
          ? postData
          : Array.isArray(postData.data)
          ? postData.data
          : [];

        // 게시글마다 댓글 개수 fetch해서 병합
        const postsWithCounts = await Promise.all(
          postList.map(async (post) => {
            try {
              const commentRes = await fetch(
                `http://localhost:10000/comment/${post.id}`
              );
              if (!commentRes.ok) throw new Error("댓글 조회 실패");
              const commentData = await commentRes.json();

              const commentList = Array.isArray(commentData)
                ? commentData
                : Array.isArray(commentData.data)
                ? commentData.data
                : [];

              return { ...post, commentCount: commentList.length };
            } catch (e) {
              console.error(`댓글 조회 실패 (postId: ${post.id})`, e);
              return { ...post, commentCount: 0 };
            }
          })
        );

        console.log("병합된 데이터:", postsWithCounts);
        setPosts(postsWithCounts);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsWithComments();
  }, []);

  // 정렬 로직
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOption === "조회순") return b.postViewCount - a.postViewCount;
    if (sortOption === "댓글순")
      return (b.commentCount || 0) - (a.commentCount || 0);
    return new Date(b.postCreateAt) - new Date(a.postCreateAt);
  });

  // 인기 게시글
  const popularPosts = [...posts]
    .sort((a, b) => b.postViewCount - a.postViewCount)
    .slice(0, 8);

  // 페이지네이션
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentPage]);

  return (
    <>
      {/* 상단 배너 */}
      <QustionListBanner />

      {/* 인기 질문 Swiper */}
      <PopularQuestionSwiper
        popularPosts={popularPosts}
        prevRef={prevRef}
        nextRef={nextRef}
      />

      {/* 정렬 + 글쓰기 */}
      <QustionListSort
        sortOption={sortOption}
        onSortChange={(e) => {
          setSortOption(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* 질문 리스트 */}
      <QuestionList
        posts={currentPosts}
        loading={loading}
        formatDate={formatDate}
      />

      {/* 페이지네이션 */}
      <Questionpagenation
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default QuestionListContainer;
