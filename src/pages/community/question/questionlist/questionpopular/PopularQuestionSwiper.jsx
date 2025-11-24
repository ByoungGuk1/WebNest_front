import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import S from "./style";


// 🔥 프로필 이미지 URL 생성 함수
const getProfileUrl = (path, name) => {
  if (!name) return "/assets/images/defalutpro.svg";

  const cleanPath = (path || "/img/")
    .replace(/^\//, "")
    .replace(/\/$/, "");

  const cleanName = name.replace(/^\//, "");

  return `${process.env.REACT_APP_BACKEND_URL}/file/display?fileName=${cleanPath}/${cleanName}`;
};


const PopularQuestionSwiper = ({ popularPosts = [] }) => {
  // Swiper Navigation 설정용 Ref
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
            popularPosts.map((post) => {
              // 🔥 DB에서 받아온 path + name
              const profilePath = post.userThumbnailUrl;   // "/img/"
              const profileName = post.userThumbnailName;  // "5.jpg"

              // 🔥 최종 이미지 URL 생성
              const profileImgSrc = getProfileUrl(profilePath, profileName);

              return (
                <SwiperSlide key={post.id}>
                  <S.Link to={`/question/${post.id}`}>
                    <S.PopularCard>
                      <S.PopularTitle>{post.postTitle}</S.PopularTitle>
                      <S.PopularPreview>{post.postContent}</S.PopularPreview>

                      <S.Info>
                        <S.MetaWrap>
                          <S.ProfileImg
                            src={profileImgSrc}
                            alt={post.userNickname || "익명"}
                            onError={(e) => {
                              e.currentTarget.src = "/assets/images/defalutpro.svg";
                            }}
                          />

                          <span>{post.userNickname}</span>
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
              );
            })
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
