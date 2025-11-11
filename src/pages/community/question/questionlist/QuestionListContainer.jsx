import { useEffect, useState, useRef } from "react";
import S from "./style";
import PopularQuestionSwiper from "components/postswiper/PopularQuestionSwiper";
import { useNavigate } from "react-router-dom";

const QuestionListContainer = () => {
  const [posts, setPosts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const postsPerPage = 7;
  const [sortOption, setSortOption] = useState("최신글");
  const [loading, setLoading] = useState(true); // ✅ 로딩 상태 추가

  // const prevRef = useRef(null);
  // const nextRef = useRef(null);
  // const navigate = useNavigate();

  // ✅ 날짜 포맷 함수
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

  // ✅ 게시글 데이터 가져오기 + 댓글 수 병합
  useEffect(() => {
  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:10000/post/question");
      if (!response.ok) throw new Error("문제둥지 데이터 불러오기 실패");
      const data = await response.json();
      const rawData = Array.isArray(data.data) ? data.data : data;

      const postsWithComments = await Promise.all(
        rawData.map(async (post) => {
          try {
            const commentRes = await fetch(`http://localhost:10000/comment/${post.id}`);
            if (!commentRes.ok) throw new Error("댓글 불러오기 실패");
            const commentData = await commentRes.json();
            const commentCount = Array.isArray(commentData.data)
              ? commentData.data.length
              : 0;

            return { ...post, commentCount };
          } catch (e) {
            console.error(`❌ 댓글 로드 실패 (postId: ${post.id})`, e);
            return { ...post, commentCount: 0 };
          }
        })
      );

      setPosts(postsWithComments);
    } catch (error) {
      console.error("❌ 데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };
  getPosts();
}, []);


  // ✅ 정렬 로직
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOption === "조회순") {
      if (b.postViewCount !== a.postViewCount)
        return b.postViewCount - a.postViewCount;
      return new Date(b.postCreateAt) - new Date(a.postCreateAt);
    } else if (sortOption === "댓글순") {
      const diff = (b.commentCount || 0) - (a.commentCount || 0);
      if (diff !== 0) return diff;
      return new Date(b.postCreateAt) - new Date(a.postCreateAt);
    } else {
      return new Date(b.postCreateAt) - new Date(a.postCreateAt);
    }
  });

  // ✅ 인기 게시글 (조회수 상위 8개)
  const popularPosts = [...posts]
    .sort((a, b) => b.postViewCount - a.postViewCount)
    .slice(0, 8);

  // ✅ 페이지네이션
  // const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  // const indexOfLast = currentPage * postsPerPage;
  // const indexOfFirst = indexOfLast - postsPerPage;
  // const currentPosts = sortedPosts.slice(indexOfFirst, indexOfLast);

  // const handlePrev = () => {
  //   if (currentPage > 1) setCurrentPage(currentPage - 1);
  // };
  // const handleNext = () => {
  //   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  // };
  // const handlePageClick = (num) => setCurrentPage(num);
  // const handleSortChange = (e) => {
  //   setSortOption(e.target.value);
  //   setCurrentPage(1);
  // };

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "auto" });
  // }, [currentPage]);

  return (
    <>
      {/* 🟣 상단 배너 */}
      <S.BannerWrap>
        <S.Banner>
          <S.BannerInner>
            <div>
              <S.PageTitle>문제 둥지</S.PageTitle>
              <S.PageDesc>
                모르는 문제를 함께 올리고 답변을 받아보세요.
              </S.PageDesc>
            </div>
            <S.Illust src="/assets/images/chickens.png" alt="문제둥지 일러스트" />
          </S.BannerInner>
        </S.Banner>
      </S.BannerWrap>

      {/* ⚪ 인기 질문 Swiper */}
      <PopularQuestionSwiper
        popularPosts={popularPosts}
        prevRef={prevRef}
        nextRef={nextRef}
      />

      {/* 정렬 + 글쓰기 버튼 */}
      <S.SortWrap>
        <S.Select>
          <select value={sortOption} onChange={handleSortChange}>
            <option>최신글</option>
            <option>조회순</option>
            <option>댓글순</option>
          </select>
        </S.Select>
        <S.WriteButton onClick={() => navigate("/question/write")}>
          글쓰기
        </S.WriteButton>
      </S.SortWrap>

      {/* 🟢 질문 리스트 */}
      <S.ListWrap>
        {loading ? (
          <p>불러오는 중...</p>
        ) : currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <S.Link to={`/question/${post.id}`} key={post.id}>
              <S.Row>
                <S.Tag lang={post.postType}>{post.postType}</S.Tag>
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
                    <span>{post.commentCount || 0}</span>
                  </S.QuestionMetaWrap>
                </S.QuestionInfo>
              </S.Row>
            </S.Link>
          ))
        ) : (
          <p>게시글이 없습니다.</p>
        )}
      </S.ListWrap>

      {/* 페이지네이션 */}
      {/* <S.Pagination>
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
          disabled={currentPage === totalPages}
        >
          <img src="/assets/icons/pnrightarrow.svg" alt="다음 페이지" />
        </S.PageArrow>
      </S.Pagination> */}
    </>
  );
};

export default QuestionListContainer;
