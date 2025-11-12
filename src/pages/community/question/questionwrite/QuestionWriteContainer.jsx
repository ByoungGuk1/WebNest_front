import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import S from "./style";

const QuestionWriteContainer = () => {
  const { questionId } = useParams(); // URL 파라미터로 게시글 ID 받기
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [postLikeCount, setPostLikeCount] = useState(0);

  /* 상대 시간 포맷 */
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

  /* 데이터 로드 (백엔드 연동) */
  useEffect(() => {
    const loadData = async () => {
      try {
        // 게시글 데이터 불러오기
        const postRes = await fetch(
          `http://localhost:10000/post/get-post/${questionId}`
        );
        if (!postRes.ok) throw new Error("게시글 불러오기 실패");
        const postData = await postRes.json();

        // 댓글(답변) 데이터 불러오기
        const commentRes = await fetch(
          `http://localhost:10000/comment/${questionId}`
        );
        if (!commentRes.ok) throw new Error("댓글 불러오기 실패");
        const commentData = await commentRes.json();

        setCurrentPost(postData.data || postData);
        setPosts([postData.data || postData]);
        setComments(commentData.data || []);
        setPostLikeCount(postData.data?.postViewCount || 0);
      } catch (err) {
        console.error("데이터 로드 에러:", err);
        setCurrentPost(null);
        setComments([]);
      }
    };
    loadData();
  }, [questionId]);

  // 백엔드 DTO 필드명에 맞게 구조 분해   ????  뭔지모름;;
  const {
    postTitle,
    postContent,
    postCreateAt,
    postViewCount,
    userNickname,
  } = currentPost || {};


  return (
    <>
      {/* 상단 배너 */}
      <S.PurpleBannerWrap>
        <S.PurpleBanner>
          <S.PurpleBannerInner>
            <div>
              <S.PurplePageTitle>문제 둥지</S.PurplePageTitle>
              <S.PurplePageDesc>
                모르는 문제를 함께 올리고 답변을 받아보세요.
              </S.PurplePageDesc>
            </div>
            <S.PurpleIllust
              src="/assets/images/chickens.png"
              alt="문제둥지 일러스트"
            />
          </S.PurpleBannerInner>
        </S.PurpleBanner>
      </S.PurpleBannerWrap>

      {/* 질문 본문 */}
      <S.ContentWrap>
        <S.QuestionWrap>
          <S.QuestionTitle>{postTitle}</S.QuestionTitle>

          <S.QuestionerInfo>
            <S.LeftBox>
              <S.ProfileImgA
                src={"/assets/images/defalutpro.svg"}
                alt={userNickname || "익명"}
              />
              <span>{userNickname || "익명"}</span>
            </S.LeftBox>
            <S.FollowButton>팔로우</S.FollowButton>
          </S.QuestionerInfo>

          <S.QuestionContent>{postContent}</S.QuestionContent>

          {/* 게시글 하단 정보 */}
          <S.QuestionInfo>
            <S.QuestionMetaWrap>
              <span>{toRelativeTime(postCreateAt)}</span>
              <b>·</b>
              <span>좋아요 {postLikeCount}</span>
              <b>·</b>
              <span>조회 {postViewCount || 0}</span>
            </S.QuestionMetaWrap>
          </S.QuestionInfo>
        </S.QuestionWrap>

        {/* 답변 작성 영역 */}
        <S.Container>
          <S.ResponseCard>
            {/*  프로필 & 안내 */}
            <S.InfoAndWrite>
              <S.ResponseBanner>
                <S.ProfileImg
                  src="/assets/images/defalutpro.svg"
                  alt="프로필"
                />
                <S.ResponserInfo>
                  <div>뚜왈밍3냥님,</div>
                  <div>정보를 공유해 주세요.</div>
                </S.ResponserInfo>
              </S.ResponseBanner>

              {/* 버튼 */}
              <S.ButtonWrap>답변등록</S.ButtonWrap>
            </S.InfoAndWrite>

            {/* {} 코드 입력칸 */}
            <S.CodeBox>
              <S.CodeBtn>
                <S.CodeImg>
                <img src="/assets/icons/code.svg" alt="{}" />
              </S.CodeImg>
              <S.SorceCode>소스코드</S.SorceCode>
              </S.CodeBtn>
              
            </S.CodeBox>

            {/* 안내문 포함 답변 입력란 */}
            <S.InputResponse
              placeholder={`답변 작성 시 서비스 운영정책을 지켜주세요.\n이상한 말 쓰지 말고 제대로 작성하세요. 매너 지켜요.\n욕 안돼요. 못한다고 잔소리 안됩니다.`}
            />
          </S.ResponseCard>
        </S.Container>
      </S.ContentWrap>
    </>
  );
};

export default QuestionWriteContainer;
