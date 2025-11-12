import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import S from "./style";

const PopularQuestionSwiper = ({ popularPosts = [] }) => {
  // ✅ Swiper와 네비게이션 버튼 ref를 내부에서 관리
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current.swiper;
    if (swiper && prevRef.current && nextRef.current) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, []);

  return (
    <S.Container>
      <S.ArrowBtn ref={prevRef} className="left">
        <img src="/assets/icons/leftarrow.svg" alt="왼쪽" />
      </S.ArrowBtn>

      <S.PopularWrap>
        <Swiper
          ref={swiperRef}
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
          className="popularSwiper"
        >
          {popularPosts.length > 0 ? (
            popularPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <S.Link to={`/question/${post.id}`}>
                  <S.PopularCard>
                    <S.PopularTitle>{post.postTitle}</S.PopularTitle>
                    <S.PopularPreview>{post.postContent}</S.PopularPreview>
                    <S.Info>
                      <S.MetaWrap>
                        <S.ProfileImg
                          src="/assets/images/defalutpro.svg"
                          alt="익명"
                        />
                        <span>사용자 #{post.userId}</span>
                        <b>·</b>
                        <span>조회 {post.postViewCount || 0}</span>
                      </S.MetaWrap>
                      <S.Response>
                        <img src="/assets/icons/talktalk.svg" alt="댓글" />
                        {post.commentCount || 0}
                      </S.Response>
                    </S.Info>
                  </S.PopularCard>
                </S.Link>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <S.PopularCard>
                <S.PopularTitle>인기 게시글이 없습니다.</S.PopularTitle>
                <S.PopularPreview>아직 조회된 글이 없어요 🐣</S.PopularPreview>
              </S.PopularCard>
            </SwiperSlide>
          )}
        </Swiper>
        <S.GradientRight />
      </S.PopularWrap>

      <S.ArrowBtn ref={nextRef} className="right">
        <img src="/assets/icons/rightarrow.svg" alt="오른쪽" />
      </S.ArrowBtn>
    </S.Container>
  );
};

export default PopularQuestionSwiper;
