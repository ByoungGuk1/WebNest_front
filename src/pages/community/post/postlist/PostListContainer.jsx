/* PostListContainer */
import Pagination from "./components/Pagination";

import React, { useEffect, useState, useRef, useMemo } from "react";     // [CHANGED] useMemo 추가
import S from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

/* [ADD] 공용 드롭다운 임포트 (경로는 상황에 맞게 조정 가능) */
import ThreeDropDown from "../../../../components/dropdown/ThreeDropDown";

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

/* 임시 더미 데이터 */
const DUMMY_POSTS = Array.from({ length: 23 }, (_, i) => {
  const idx = i + 1;
  return {
    postId: idx,
    postTitle: `더미 제목 너무 어렵다. 너무 어렵다.  ${idx}`,
    postContent:
      "코드/오류/디자인/배포 관련 더미 내용입니다. 백엔드 연동 전 임시 데이터.",
    postLangTag: ["JAVA", "ORACLE", "JS"][idx % 3],
    views: Math.floor(Math.random() * 5000) + idx * 7,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * (idx * 3)).toISOString(),
    author: {
      name: `사용자_${String(idx).padStart(2, "0")}`,
      profileImg: "/assets/images/defaultpro.svg",
    },
    answers: Array.from({ length: idx % 4 }, (_, j) => ({
      content: `더미 댓글입니다.너무 어렵다.너무 어렵다. 어디까지 길어지는 걸까요어디까지어디까지어디까지`,
      likes: Math.floor(Math.random() * 50),
      isBest: j === 0 && idx % 5 === 0,
    })),
  };
});

const PostListContainer = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  /* [ADD] 정렬 상태: latest | comment | popular */
  const [sortBy, setSortBy] = useState("latest");

  const postsPerPage = 7;

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    // TODO: 백엔드 연결 시 교체 (지금은 더미 사용)
    setPosts(DUMMY_POSTS);
  }, []);

  /* [ADD] 정렬 로직: sortBy에 따라 정렬한 배열을 메모 */
  const sortedPosts = useMemo(() => {
    const copy = [...posts];
    if (sortBy === "popular") {
      // 조회순
      return copy.sort((a, b) => (b?.views ?? 0) - (a?.views ?? 0));
    }
    if (sortBy === "comment") {
      // 댓글순 (동일 개수면 최신 우선)
      return copy.sort((a, b) => {
        const ac = a?.answers?.length ?? 0;
        const bc = b?.answers?.length ?? 0;
        if (bc !== ac) return bc - ac;
        const ad = new Date(a.createdAt ?? a.created ?? 0).getTime();
        const bd = new Date(b.createdAt ?? b.created ?? 0).getTime();
        return bd - ad;
      });
    }
    // 최신순 (기본)
    return copy.sort((a, b) => {
      const ad = new Date(a.createdAt ?? a.created ?? 0).getTime();
      const bd = new Date(b.createdAt ?? b.created ?? 0).getTime();
      return bd - ad;
    });
  }, [posts, sortBy]);

  /* [CHANGED] 페이지 슬라이싱 기준을 정렬된 목록으로 */
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirst, indexOfLast);

  const popularPosts = [...posts]
    .sort((a, b) => (b?.views ?? 0) - (a?.views ?? 0))
    .slice(0, 8);

  const handlePrev = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePageClick = (num) => setCurrentPage(num);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [currentPage]);

  return (
    <>
      {/* ...상단 배너/인기 카드 Swiper 그대로... */}

      <S.BannerWrap>
        <S.Banner>
          <S.BannerInner>
            <div>
              <S.PageTitle>열린 둥지</S.PageTitle>
              <S.PageDesc>자유롭게 이야기를 나누고 소통해보세요.</S.PageDesc>
            </div>
            <S.Illust src="/assets/images/chicks.png" alt="문제둥지 일러스트" />
          </S.BannerInner>
        </S.Banner>
      </S.BannerWrap>

      <S.Container>
        <S.ArrowBtn ref={prevRef} className="left">
          <img src="/assets/icons/leftarrow.svg" alt="왼쪽" />
        </S.ArrowBtn>

        <S.PopularWrap>
          <Swiper
            modules={[Navigation]}
            slidesPerView={3.6}
            spaceBetween={12}
            loop
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
                        src={post.author?.profileImg || "/assets/images/defaultpro.svg"}
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
          <S.GradientRight />
        </S.PopularWrap>

        <S.ArrowBtn ref={nextRef} className="right">
          <img src="/assets/icons/rightarrow.svg" alt="오른쪽" />
        </S.ArrowBtn>
      </S.Container>

      <S.SortWrap>
        {/* [REMOVE] 기존 네이티브 select */}
        {/* <S.Select> ... </S.Select> */}

        {/* [ADD] 공용 드롭다운 컴포넌트 삽입 */}
          <div className="dd-ctrl">
            <ThreeDropDown
                value={sortBy}
                onChange={(v) => { setSortBy(v); setCurrentPage(1); }}
                color={{
                  buttonBg: "#ffffff",
                  buttonFg: "#121212",
                  buttonBorder: "#DDDFE0",
                  buttonHoverBg: "#f6f6ff",
                  menuBg: "#ffffff",
                  itemFg: "#121212",
                  itemHoverBg: "#f6f6ff",
                  itemHoverFg: "#121212",
                }}
              />
          </div>



        <S.WriteButton>글쓰기</S.WriteButton>
      </S.SortWrap>

      <div>
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
              <S.Link to={`/post/${post.postId}`} key={post.postId}>
                <S.Row>
                  <S.Tag lang={post.postLangTag}>{post.postLangTag}</S.Tag>

                  <S.QuestionInfo>
                    <S.QuestionTitle>{post.postTitle}</S.QuestionTitle>
                    <S.QuestionPreview>{post.postContent}</S.QuestionPreview>

                    <S.MetaBlock>
                      <S.ListMetaRow>
                        <S.MetaWrap>
                          <S.ProfileImg
                            src={
                              post.author?.profileImg ||
                              "/assets/images/chicken.png"
                            }
                            alt={post.author?.name || "익명"}
                          />
                          <span>{post.author?.name || "익명"}</span>
                          <b>·</b>
                          <span>{toRelativeTime(created)}</span>
                          <b>·</b>
                          <span>조회 {post.views ?? 0}</span>
                          <b>·</b>
                        </S.MetaWrap>

                        <S.Response>
                          <img src="/assets/icons/talktalk.svg" alt="댓글" />
                          {post.answers?.length ?? 0}
                        </S.Response>
                      </S.ListMetaRow>

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
                              "병아리"
                            }
                          />
                          <S.TopCmtName>
                            {topCmt.author?.name ||
                              topCmt.nickname ||
                              topCmt.userName ||
                              "치킨"}
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
          })
        ) : (
          <p>불러오는 중...</p>
        )}
      </S.ListWrap>
      </div>

      <Pagination
        current={currentPage}
        total={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
        onPage={handlePageClick}
      />
    </>
  );
};

export default PostListContainer;
