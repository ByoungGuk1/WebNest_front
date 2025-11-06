/* PostListContainer */
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import S from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

/* 상대시간 유틸 */
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
  if (day < 7) return `${day}일`;
  const mon = Math.floor(day / 30);
  if (mon < 12) return `${mon}개월`;
  const y = Math.floor(mon / 12);
  return `${y}년`;
};

/* 인기 댓글 고르기 (best > 좋아요순 > 첫 댓글) */
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

const PostListContainer = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 7;

  const prevRef = useRef(null);
  const nextRef = useRef(null);
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

  // ✅ 조회수 기준 상위 8개
  const popularPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 8);

  // ✅ 페이지네이션 계산
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  // ✅ 페이지 이동
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePageClick = (num) => setCurrentPage(num);

  // ✅ 페이지 바뀔 때 스크롤
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
              <S.PageTitle>열린 둥지</S.PageTitle>
              <S.PageDesc>모르는 문제를 함께 올리고 답변을 받아보세요.</S.PageDesc>
            </div>
            <S.Illust src="/assets/images/chicks.png" alt="문제둥지 일러스트" />
          </S.BannerInner>
        </S.Banner>
      </S.BannerWrap>

      {/* ⚪ 인기 질문 Swiper */}
      <S.Container>
        {/* 왼쪽 화살표 */}
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
            slidesOffsetBefore={0}
            slidesOffsetAfter={0}
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
                <S.PopularCard>
                  <S.PopularTitle>{post.postTitle}</S.PopularTitle>
                  <S.PopularPreview>{post.postContent}</S.PopularPreview>
                  <S.Info>
                    <S.MetaWrap>
                      <S.ProfileImg
                        src={
                          post.author?.profileImg ||
                          "/assets/images/defaultpro.svg"
                        }
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
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ✅ 오른쪽 흐릿한 효과 유지 */}
          <S.GradientRight />
        </S.PopularWrap>

        {/* 오른쪽 화살표 */}
        <S.ArrowBtn ref={nextRef} className="right">
          <img src="/assets/icons/rightarrow.svg" alt="오른쪽" />
        </S.ArrowBtn>
      </S.Container>

      {/* 정렬 + 글쓰기 버튼 */}
      <S.SortWrap>
        <S.Select>
          <select>
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
          currentPosts.map((post) => {
            const created =
              post.createdAt ||
              post.created_at ||
              post.regDate ||
              post.created ||
              post.createdDate;

            const topCmt = getTopComment(post);

            return (
              <S.Link to={`/question/${post.postId}`} key={post.postId}>
                <S.Row>
                  <S.Tag lang={post.postLangTag}>{post.postLangTag}</S.Tag>

                  <S.QuestionInfo>
                    <S.QuestionTitle>{post.postTitle}</S.QuestionTitle>
                    <S.QuestionPreview>{post.postContent}</S.QuestionPreview>

                    {/* ▼ 메타+인기댓글을 하나의 wrap으로 */}
                    <S.MetaBlock>
                      {/* ① 메타 한 줄 (작성자 · 시간 · 조회수 / 댓글수) */}
                      <S.ListMetaRow>
                        <S.MetaWrap>
                          <S.ProfileImg
                            src={
                              post.author?.profileImg ||
                              "/assets/images/c"
                            }
                            alt={post.author?.name || "익명"}
                          />
                          <span>{post.author?.name || "익명"}</span>
                          <b>·</b>
                          <span>{toRelativeTime(created)}</span>
                          <b>·</b>
                          <span>조회 {post.views ?? 0}</span>
                        </S.MetaWrap>

                        <S.Response>
                          <img src="/assets/icons/talktalk.svg" alt="댓글" />
                          {post.answers?.length ?? 0}
                        </S.Response>
                      </S.ListMetaRow>

                      {/* ② 인기 댓글 (있을 때만) */}
                      {topCmt && (
                        <S.TopCommentRow>
                          <S.ProfileImg
                            src={
                              topCmt.author?.profileImg ||
                              topCmt.profileImg ||
                              "/assets/images/chicks.png"
                            }
                            alt={
                              topCmt.author?.name ||
                              topCmt.nickname ||
                              topCmt.userName ||
                              "익명"
                            }
                          />
                          <S.TopCmtName>
                            {topCmt.author?.name ||
                              topCmt.nickname ||
                              topCmt.userName ||
                              "익명"}
                          </S.TopCmtName>
                          <S.TopCmtContent title={topCmt.content || topCmt.text || topCmt.body || topCmt.comment || ""}>
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
          })
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

export default PostListContainer;
