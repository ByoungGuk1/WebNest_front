import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import S from "./style";
import AnswerLikeButton from "components/like/AnswerLikeButton";

const QuestionReadContainer = () => {
  const { questionId } = useParams();
  const [posts, setPosts] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const navigate = useNavigate();

  // 신고 관련 state
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportTarget, setReportTarget] = useState(null); // "post" or "answer"
  const [targetId, setTargetId] = useState(null); // 신고 대상 ID

  // 신고 버튼 클릭
  const handleReportClick = (type, id) => {
    setReportTarget(type);
    setTargetId(id);
    setReportReason("");
    setIsReportOpen(true);
  };

  // 신고창 닫기
  const handleCloseReport = () => setIsReportOpen(false);

  // 신고 완료
  const handleReportSubmit = () => {
    if (!reportReason) return alert("신고 사유를 선택해주세요!");
    if (reportTarget === "post") {
      alert(`게시글(ID: ${targetId})이 신고되었습니다.\n사유: ${reportReason}`);
    } else {
      alert(`답변(ID: ${targetId})이 신고되었습니다.\n사유: ${reportReason}`);
    }
    setIsReportOpen(false);
  };

  // 햄버거 메뉴 열림 상태
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (answerId) => {
    navigate(`/question/${questionId}/write`);
  };
  const handleWriteAnswer = () => {
    navigate(`/question/${questionId}/write`);
  };

  const handleDelete = (id) => {
    setOpenMenuId(null);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    alert("답변이 삭제되었습니다.");
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  /* 🟣 게시글 좋아요 관련 */
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(0);

  /* 답변 좋아요 관련 */
  const [likedAnswers, setLikedAnswers] = useState({});

  /* 알림 토글 */
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const toggleAlarm = () => setIsAlarmOn((prev) => !prev);

  /* 채택 모달 상태 */
  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);

  const handlePostLike = () => {
    setIsPostLiked((prev) => !prev);
    setPostLikeCount((prev) => (isPostLiked ? prev - 1 : prev + 1));
  };

  const handleAnswerLike = (answerId) => {
    setLikedAnswers((prev) => {
      const isLiked = !prev[answerId];
      return { ...prev, [answerId]: isLiked };
    });
  };

  const handleChooseClick = () => {
    setIsChooseModalOpen(true);
  };

  const handleConfirmChoose = () => {
    setIsChooseModalOpen(false);
    alert("답변이 채택되었습니다! 🎉");
  };

  const handleCancelChoose = () => {
    setIsChooseModalOpen(false);
  };

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
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:10000/post/get-post/${questionId}`);
        if (!response.ok) throw new Error("서버 응답 실패");
        const data = await response.json();
        const postData = data.data || data;

        setCurrentPost(postData);
        setPosts([postData]);
        setPostLikeCount(postData.postViewCount || 0);
      } catch (err) {
        console.error(" 게시글 불러오기 에러:", err);
        setCurrentPost(null);
      }
    };
    fetchPost();
  }, [questionId]);

  if (!posts)
    return <S.LoadingMsg>게시글을 불러오는 중...</S.LoadingMsg>;
  if (!currentPost)
    return <S.NotFoundMsg>해당 게시글을 찾을 수 없습니다.</S.NotFoundMsg>;

  // 백엔드 DTO 필드명에 맞게 수정
  const {
    id,
    postTitle,
    postContent,
    postCreateAt,
    postViewCount,
    userNickname,
    postType,
    answers,
  } = currentPost;

  return (
    <>
      {/* 배너 */}
      <S.BannerWrap>
        <S.Banner>
          <S.BannerInner>
            <div>
              <S.PageTitle>문제 둥지</S.PageTitle>
              <S.PageDesc>모르는 문제를 함께 올리고 답변을 받아보세요.</S.PageDesc>
            </div>
            <S.Illust src="/assets/images/chickens.png" alt="문제둥지 일러스트" />
          </S.BannerInner>
        </S.Banner>
      </S.BannerWrap>

      {/* 질문 본문 */}
      <S.ContentWrap>
        <S.QuestionWrap>
          <S.QuestionTitle>{postTitle}</S.QuestionTitle>

          <S.QuestionerInfo>
            <S.LeftBox>
              <S.ProfileImg
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
            <S.ReportBtn onClick={() => handleReportClick("post", id)}>
              신고하기
            </S.ReportBtn>
          </S.QuestionInfo>
        </S.QuestionWrap>

        {/* 상단 알림 + 좋아요 */}
        <S.AlarmBox>
          <S.AnswerCn>
            <span>답변</span>
            <span>{answers?.length || 0}</span>
          </S.AnswerCn>

          <S.LikeAndAlarm>
            <S.Like onClick={handlePostLike}>
              <img
                src={
                  isPostLiked
                    ? "/assets/icons/heartfull.svg"
                    : "/assets/icons/heart.svg"
                }
                alt="하트"
              />
              <S.PostLikeText $liked={isPostLiked}>좋아요</S.PostLikeText>
            </S.Like>

            <S.Alarm>
              <img src="/assets/images/header/bell.png" alt="종" />
              새 답변알림
            </S.Alarm>

            <S.ToggleSwitch
              onClick={() => setIsAlarmOn((p) => !p)}
              $on={isAlarmOn}
            >
              <S.ToggleCircle $on={isAlarmOn} />
            </S.ToggleSwitch>
          </S.LikeAndAlarm>
        </S.AlarmBox>

        {/* 답변 리스트 */}
        {answers && answers.length > 0 ? (
          <S.AnswerSection>
            {answers.map((ans) => (
              <S.AnswerCard key={ans.id}>
                <S.AnswerTop>
                  <S.UserInfo>
                    <S.AnswerProfile
                      src={ans.responder?.profileImg || "/assets/images/defalutpro.svg"}
                      alt={ans.responder?.userName || "익명"}
                    />
                    <S.AnswerInnerBox>
                      <S.AnswerUser>
                        <span>{ans.responder?.userName || "익명"}</span>
                        <span>Lv.{ans.userLevel}</span>
                      </S.AnswerUser>
                      <S.AnswerMeta>
                        <span>팔로워</span>
                        <span>{ans.followers}명</span>
                      </S.AnswerMeta>
                    </S.AnswerInnerBox>
                  </S.UserInfo>

                  <S.ChooseAnswer onClick={handleChooseClick}>
                    <span>채택</span>
                  </S.ChooseAnswer>
                </S.AnswerTop>

                <S.AnswerContent>{ans.comment}</S.AnswerContent>

                <S.AnswerDate>
                  <span>{toRelativeTime(ans.createAt)}</span>
                  <b>·</b>
                  <AnswerLikeButton
                    isLiked={likedAnswers[ans.id]}
                    likeCount={ans.likes + (likedAnswers[ans.id] ? 1 : 0)}
                    onToggleLike={() => handleAnswerLike(ans.id)}
                  />
                  <b>·</b>
                  <span onClick={() => handleReportClick("answer", ans.id)}>신고</span>
                </S.AnswerDate>

                <S.HamburgerButton onClick={() => toggleMenu(ans.id)}>
                  <img src="/assets/icons/hamburgerbutton.svg" alt="메뉴" />
                </S.HamburgerButton>

                {openMenuId === ans.id && (
                  <S.AnswerMenu>
                    <li onClick={() => handleEdit(ans.id)}>수정하기</li>
                    <li onClick={() => handleDelete(ans.id)}>삭제하기</li>
                  </S.AnswerMenu>
                )}
              </S.AnswerCard>
            ))}
          </S.AnswerSection>
        ) : (
          <S.NoAnswer>아직 답변이 없습니다 😥</S.NoAnswer>
        )}
      </S.ContentWrap>

      <S.AnswerWriteButton onClick={handleWriteAnswer}>
        답변하기
      </S.AnswerWriteButton>
    </>
  );
};

export default QuestionReadContainer;
