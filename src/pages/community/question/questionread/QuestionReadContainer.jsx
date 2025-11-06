import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import S from "./style";

const QuestionReadContainer = () => {
  const { questionId } = useParams();
  const [posts, setPosts] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);

    // ✅ 알림버튼 상태 추가
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const toggleAlarm = () => setIsAlarmOn((prev) => !prev);


  //원래 있던애
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/json_server/question/post.json");
        if (!response.ok) throw new Error("데이터 불러오기 실패");

        const data = await response.json();
        setPosts(data.posts);

        const foundPost = data.posts.find(
          (item) => item.postId === Number(questionId) // ✅ 수정된 부분
        );
        setCurrentPost(foundPost);
      } catch (err) {
        console.error("❌ fetch 에러:", err);
      }
    };

    fetchPosts();
  }, [questionId]);

  if (!posts)
    return <S.LoadingMsg>게시글을 불러오는 중...</S.LoadingMsg>;

  if (!currentPost)
    return <S.NotFoundMsg>해당 게시글을 찾을 수 없습니다.</S.NotFoundMsg>;

  const { postTitle, postContent, createdAt, likes, views, author, answers } =
    currentPost;

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

      {/* 🟡 질문 본문 */}
      <S.ContentWrap>
        <S.QuestionWrap>
          <S.QuestionTitle>{postTitle}</S.QuestionTitle>

          <S.QuestionerInfo>
            <S.LeftBox>
              <S.ProfileImg
                src={author?.profileImg || "/assets/images/defalutpro.svg"}
                alt={author?.name || "익명"}
              />
              <span>{author?.name || "익명"}</span>
            </S.LeftBox>
            <S.FollowButton>
              {/* <img src="/assets/icons/plus_white.svg" alt="plus" /> */}
              팔로우
            </S.FollowButton>
          </S.QuestionerInfo>

          <S.QuestionContent>{postContent}</S.QuestionContent>

          <S.QuestionInfo>
            <S.QuestionMetaWrap>
              <span>{createdAt}</span>
              <b>·</b>
              <span>좋아요 {likes || 0}</span>
              <b>·</b>
              <span>조회 {views || 0}</span>
            </S.QuestionMetaWrap>
            <S.ReportBtn>신고하기</S.ReportBtn>
          </S.QuestionInfo>
        </S.QuestionWrap>

        {/* 답변갯수, 좋아요, 알림받는 창 */}
        <S.AlarmBox>
          <S.AnswerCn>
            <span>답변</span>
            <span>{currentPost?.answers?.length || 0}</span>
          </S.AnswerCn>
          <S.LikeAndAlarm>
            <S.Like src="/assets/images/heart.svg" alt="하트">좋아요</S.Like>
            <S.Alarm src="/assets/images/header/bell.svg" alt="종">새 답변알림</S.Alarm>
            {/* ✅ 토글 버튼 */}
            <S.ToggleSwitch onClick={toggleAlarm} $on={isAlarmOn}>
              <S.ToggleCircle $on={isAlarmOn} />
            </S.ToggleSwitch>
          </S.LikeAndAlarm>
        </S.AlarmBox>

        {/* 🟢 답변 리스트 */}
        {answers && answers.length > 0 ? (
          <S.AnswerSection>
            <S.AnswerTitle>댓글 {answers.length}</S.AnswerTitle>
            {answers.map((ans, idx) => (
              <S.AnswerCard key={idx}>
                <S.AnswerTop>
                  <S.AnswerProfile
                    src={ans.responder.profileImg}
                    alt={ans.responder.userName}
                  />
                  <div>
                    <S.AnswerUser>{ans.responder.userName}</S.AnswerUser>
                    <S.AnswerMeta>
                      Lv.{ans.userLevel} · 팔로워 {ans.followers} · {ans.createdAt}
                    </S.AnswerMeta>
                  </div>
                </S.AnswerTop>
                <S.AnswerContent>{ans.comment}</S.AnswerContent>
              </S.AnswerCard>
            ))}
          </S.AnswerSection>
        ) : (
          <S.NoAnswer>아직 답변이 없습니다 😥</S.NoAnswer>
        )}

        {/* 목록으로 돌아가기 */}
        <S.BackButton>
          <Link to="/question">목록으로</Link>
        </S.BackButton>
      </S.ContentWrap>
    </>
  );
};

export default QuestionReadContainer;
