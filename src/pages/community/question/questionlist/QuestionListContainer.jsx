import { useEffect, useState, useRef } from "react";
import S from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const QuestionListContainer = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 7;
  const [sortOption, setSortOption] = useState("최신글"); // ✅ 정렬 상태 추가

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // ✅ 날짜 포맷 함수 (상대적 표현)
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

  // ✅ 게시글 데이터 가져오기
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/json_server/question/post.json");
      if (!response.ok) throw new Error("문제둥지에러");
      const post = await response.json();
      return post;
    };
    getPosts().then((data) => setPosts(data.posts));
  }, []);

  // ✅ 정렬된 게시글 목록
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOption === "조회순") {
      // 조회수 높은 순 → 같으면 최신순
      if (b.views !== a.views) return b.views - a.views;
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOption === "댓글순") {
      // 댓글 많은 순 → 같으면 최신순
      const diff = (b.answers?.length || 0) - (a.answers?.length || 0);
      if (diff !== 0) return diff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      // 최신순
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // ✅ 인기 게시글 (조회수 기준 상위 8개)
  const popularPosts = [...posts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);

  // ✅ 페이지네이션 계산
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirst, indexOfLast);

  // ✅ 페이지 이동
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePageClick = (num) => setCurrentPage(num);

  // ✅ 정렬 변경 시 첫 페이지로 이동
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  // ✅ 페이지 바뀔 때 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentPage]);

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
      <S.Container>
        <S.ArrowBtn ref={prevRef} className="left">
          <img src="/assets/icons/leftarrow.svg" alt="왼쪽" />
        </S.ArrowBtn>

        <S.PopularWrap>
          <Swiper
            modules={[Navigation]}
            slidesPerView={3.6}
            spaceBetween={12}
            loop={true}
            slidesPerGroup={1}
            centeredSlides={false}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
            className="popularSwiper"
          >
            {popularPosts.map((post) => (
              <SwiperSlide key={post.postId}>
                <S.Link to={`/question/${post.postId}`}>
                  <S.PopularCard>
                    <S.PopularTitle>{post.postTitle}</S.PopularTitle>
                    <S.PopularPreview>{post.postContent}</S.PopularPreview>
                    <S.Info>
                      <S.MetaWrap>
                        <S.ProfileImg
                          src={post.author?.profileImg || "/assets/images/defalutpro.svg"}
                          alt={post.author?.name || "익명"}
                        />
                        <span>{post.author?.name || "익명"}</span>
                        <b>·</b>
                        <span>조회 {post.views || 0}</span>
                      </S.MetaWrap>
                      <S.Response>
                        <img src="/assets/icons/talktalk.svg" alt="댓글" />
                        {post.answers?.length || 0}
                      </S.Response>
                    </S.Info>
                  </S.PopularCard>
                </S.Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <S.GradientRight />
        </S.PopularWrap>

        <S.ArrowBtn ref={nextRef} className="right">
          <img src="/assets/icons/rightarrow.svg" alt="오른쪽" />
        </S.ArrowBtn>
      </S.Container>

      {/* 정렬 + 글쓰기 버튼 */}
      <S.SortWrap>
        <S.Select>
          <select value={sortOption} onChange={handleSortChange}>
            <option>최신글</option>
            <option>조회순</option>
            <option>댓글순</option>
          </select>
        </S.Select>
        <S.WriteButton>글쓰기</S.WriteButton>
      </S.SortWrap>

      {/* 🟢 질문 리스트 */}
      <S.ListWrap>
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <S.Link to={`/question/${post.postId}`} key={post.postId}>
              <S.Row>
                <S.Tag lang={post.postLangTag}>{post.postLangTag}</S.Tag>
                <S.QuestionInfo>
                  <S.QuestionTitle>{post.postTitle}</S.QuestionTitle>
                  <S.QuestionPreview>{post.postContent}</S.QuestionPreview>
                  <S.QuestionMetaWrap>
                    <S.QuestionProfileImg
                      src={post.author?.profileImg || "/assets/images/defalutpro.svg"}
                      alt={post.author?.name || "익명"}
                    />
                    <span>{post.author?.name || "익명"}</span>
                    <b>·</b>
                    <span>{formatDate(post.createdAt)}</span>
                    <b>·</b>
                    <span>조회 {post.views || 0}</span>
                    <b>·</b>
                    <img src="/assets/icons/talktalk.svg" alt="댓글" />
                    <span>{post.answers?.length || 0}</span>
                  </S.QuestionMetaWrap>
                </S.QuestionInfo>
              </S.Row>
            </S.Link>
          ))
        ) : (
          <p>불러오는 중...</p>
        )}
      </S.ListWrap>

      {/* 페이지네이션 */}
      <S.Pagination>
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
      </S.Pagination>
    </>
  );
};

export default QuestionListContainer;
