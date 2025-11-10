import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import S from "pages/community/question/questionlist/style";


const PopularQuestionSwiper = ({ popularPosts, prevRef, nextRef }) => {
  useEffect(() => {
    // Swiper navigation 버튼 참조 연결
    const timeout = setTimeout(() => {
      if (prevRef.current && nextRef.current) {
        const swiperEl = document.querySelector(".popularSwiper")?.swiper;
        if (swiperEl) {
          swiperEl.params.navigation.prevEl = prevRef.current;
          swiperEl.params.navigation.nextEl = nextRef.current;
          swiperEl.navigation.init();
          swiperEl.navigation.update();
        }
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, [prevRef, nextRef]);

  return (
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
  );
};

export default PopularQuestionSwiper;
