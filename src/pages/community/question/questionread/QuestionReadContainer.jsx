import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import S from "./style";

const QuestionReadContainer = () => {
  const { questionId } = useParams();
  const [posts, setPosts] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const navigate = useNavigate();
    // 🟥 신고 관련 state
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportTarget, setReportTarget] = useState(null); // "post" or "answer"
  const [targetId, setTargetId] = useState(null); // 신고 대상 ID

  // 🟧 신고 버튼 클릭
  const handleReportClick = (type, id) => {
    setReportTarget(type);
    setTargetId(id);
    setReportReason(""); // ✅ 신고 사유 초기화!
    setIsReportOpen(true);
  };

  // 🟩 신고창 닫기
  const handleCloseReport = () => setIsReportOpen(false);

  // 🟦 신고 완료
  const handleReportSubmit = () => {
    if (!reportReason) return alert("신고 사유를 선택해주세요!");

    if (reportTarget === "post") {
      alert(`게시글(ID: ${targetId})이 신고되었습니다.\n사유: ${reportReason}`);
    } else {
      alert(`답변(ID: ${targetId})이 신고되었습니다.\n사유: ${reportReason}`);
    }

    setIsReportOpen(false);
  };


    // 🟦 햄버거 메뉴 열림 상태
  const [openMenuId, setOpenMenuId] = useState(null);

  // 🗑 삭제 모달 열림 여부
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 🟪 햄버거 메뉴 토글 (눌렀을 때 켜졌다 꺼졌다)
  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  // ✏️ 수정하기 클릭
   const handleEdit = (answerId) => {
    navigate(`/question/${questionId}/write`); // ✅ 수정 페이지로 이동
  };
  const handleWriteAnswer = () => {
    navigate(`/question/${questionId}/write`); // ✅ 동일한 페이지로 이동
  };

  // 🗑 삭제하기 클릭
  const handleDelete = (id) => {
    // 메뉴 닫고 모달 열기
    setOpenMenuId(null);
    setIsDeleteModalOpen(true);
  };

  // ✅ 삭제 확인 버튼 클릭 시
  const handleConfirmDelete = () => {
    setIsDeleteModalOpen(false);
    alert("답변이 삭제되었습니다.");
    // ⚙️ 나중에 연결 시 백엔드 DELETE API 호출 예정
  };

  // ❌ 삭제 취소 버튼 클릭 시
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  /* 🟣 게시글 좋아요 관련 */
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(0);

  /* 🟢 답변 좋아요 관련 */
  const [likedAnswers, setLikedAnswers] = useState({});

  /* 🔔 알림 토글 */
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const toggleAlarm = () => setIsAlarmOn((prev) => !prev);

  /* 🟦 채택 모달 상태 */
  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);

  /* ✅ 게시글 좋아요 */
  const handlePostLike = () => {
    setIsPostLiked((prev) => !prev);
    setPostLikeCount((prev) => (isPostLiked ? prev - 1 : prev + 1));
  };

  /* ✅ 답변 좋아요 */
  const handleAnswerLike = (answerId) => {
    setLikedAnswers((prev) => {
      const isLiked = !prev[answerId];
      return { ...prev, [answerId]: isLiked };
    });
  };

  /* ✅ 채택 모달 열기 */
  const handleChooseClick = () => {
    setIsChooseModalOpen(true);
  };

  /* ✅ 채택 확인 */
  const handleConfirmChoose = () => {
    setIsChooseModalOpen(false);
    alert("답변이 채택되었습니다! 🎉");
  };

  /* ✅ 채택 취소 */
  const handleCancelChoose = () => {
    setIsChooseModalOpen(false);
  };

  /* ⏰ 상대 시간 포맷 */
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

  /* 📦 데이터 로드 */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/json_server/question/post.json");
        if (!response.ok) throw new Error("데이터 불러오기 실패");
        const data = await response.json();

        setPosts(data.posts);

        const foundPost = data.posts.find(
          (item) => item.postId === Number(questionId)
        );
        setCurrentPost(foundPost);
        if (foundPost) setPostLikeCount(foundPost.likes || 0);
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

  const { postTitle, postContent, createdAt, views, author, answers } =
    currentPost;

  return (
    <>
      {/* 🟣 배너 */}
      <S.BannerWrap>
        <S.Banner>
          <S.BannerInner>
            <div>
              <S.PageTitle>문제 둥지</S.PageTitle>
              <S.PageDesc>
                모르는 문제를 함께 올리고 답변을 받아보세요.
              </S.PageDesc>
            </div>
            <S.Illust
              src="/assets/images/chickens.png"
              alt="문제둥지 일러스트"
            />
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
            <S.FollowButton>팔로우</S.FollowButton>
          </S.QuestionerInfo>

          <S.QuestionContent>{postContent}</S.QuestionContent>

          {/* ✅ 게시글 하단 정보 */}
          <S.QuestionInfo>
            <S.QuestionMetaWrap>
              <span>{toRelativeTime(createdAt)}</span>
              <b>·</b>
              <span>좋아요 {postLikeCount}</span>
              <b>·</b>
              <span>조회 {views || 0}</span>
            </S.QuestionMetaWrap>
            <S.ReportBtn onClick={() => handleReportClick("post", currentPost.postId)}>
              신고하기
            </S.ReportBtn>
          </S.QuestionInfo>
        </S.QuestionWrap>

        {/* 🟪 상단 알림 + 좋아요 */}
        <S.AlarmBox>
          <S.AnswerCn>
            <span>답변</span>
            <span>{currentPost?.answers?.length || 0}</span>
          </S.AnswerCn>

          <S.LikeAndAlarm>
            {/* ✅ 게시글 좋아요 */}
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

            {/* 🔔 알림 */}
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

        {/* 🟢 답변 리스트 */}
        {answers && answers.length > 0 ? (
          <S.AnswerSection>
            {answers.map((ans) => (
              <S.AnswerCard key={ans.id}>
                <S.AnswerTop>
                  <S.UserInfo>
                    <S.AnswerProfile
                      src={ans.responder.profileImg}
                      alt={ans.responder.userName}
                    />
                    <S.AnswerInnerBox>
                      <S.AnswerUser>
                        <span>{ans.responder.userName}</span>
                        <span>Lv.{ans.userLevel}</span>
                      </S.AnswerUser>
                      <S.AnswerMeta>
                        <span>팔로워</span>
                        <span>{ans.followers}명</span>
                      </S.AnswerMeta>
                    </S.AnswerInnerBox>
                  </S.UserInfo>

                  {/* ✅ 채택 버튼 */}
                  <S.ChooseAnswer onClick={handleChooseClick}>
                    <span>채택</span>
                  </S.ChooseAnswer>
                </S.AnswerTop>

                <S.AnswerContent>{ans.comment}</S.AnswerContent>

                {/* ✅ 답변 좋아요 + 햄버거 버튼 */}
                <S.AnswerDate>
                  <span>{toRelativeTime(createdAt)}</span>
                  <b>·</b>
                  <img
                    src={
                      likedAnswers[ans.id]
                        ? "/assets/icons/heartfull.svg"
                        : "/assets/icons/greyheart.svg"
                    }
                    alt="좋아요"
                    onClick={() => handleAnswerLike(ans.id)}
                  />
                  <S.AnswerLikeCount
                    $liked={likedAnswers[ans.id]}
                    onClick={() => handleAnswerLike(ans.id)}
                  >
                    {ans.likes + (likedAnswers[ans.id] ? 1 : 0)}
                  </S.AnswerLikeCount>
                  <b>·</b>
                  <span onClick={() => handleReportClick("answer", ans.id)}>신고</span>
                </S.AnswerDate>

               {/* ⚙️ 햄버거 버튼 */}
                <S.HamburgerButton onClick={() => toggleMenu(ans.id)}>
                  <img src="/assets/icons/hamburgerbutton.svg" alt="메뉴" />
                </S.HamburgerButton>

                {/* ⚙️ 수정/삭제 메뉴 */}
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

        {/* 목록 */}
        {/* <S.BackButton>
          <Link to="/question">목록으로</Link>
        </S.BackButton> */}
      </S.ContentWrap>


      {/* 고정으로 답변하기버튼 */}
      {/* <S.AnswerWriteButton onClick={() => handleEdit(questionId)}>
        답변하기
      </S.AnswerWriteButton> */}
      <S.AnswerWriteButton onClick={handleWriteAnswer}>
        답변하기
      </S.AnswerWriteButton>


      {/* ✅ 채택 모달 */}
      {isChooseModalOpen && (
        <S.ModalOverlay>
          <S.ModalBox>
            <S.ModalTitle>채택 하시겠습니까?</S.ModalTitle>
            <S.ModalDesc>
              채택 후에는 사용자에게 포인트가 지급되며
              <br />
              취소가 불가능합니다.
            </S.ModalDesc>
            <S.ModalButtons>
              <S.CancelBtn onClick={handleCancelChoose}>취소</S.CancelBtn>
              <S.ConfirmBtn onClick={handleConfirmChoose}>확인</S.ConfirmBtn>
            </S.ModalButtons>
          </S.ModalBox>
        </S.ModalOverlay>
      )}

    {/* 삭제 */}
      {isDeleteModalOpen && (
        <S.HamModalOverlay>
          <S.HamModalBox>
            <S.HamModalTitle>정말로 삭제하시겠습니까?</S.HamModalTitle>
            <S.HamModalButtons>
              <S.HamCancelBtn onClick={handleCancelDelete}>취소</S.HamCancelBtn>
              <S.HamConfirmBtn onClick={handleConfirmDelete}>확인</S.HamConfirmBtn>
            </S.HamModalButtons>
          </S.HamModalBox>
        </S.HamModalOverlay>
      )}


      {/* 🟦 신고 모달 */}
      {isReportOpen && (
        <S.ReportOverlay>
          <S.ReportBox>
            <S.ReportTitle>
              신고하기
              <S.CloseBtn onClick={handleCloseReport}><img src="/assets/icons/x.svg" alt="x" /></S.CloseBtn>
            </S.ReportTitle>

            <S.ReportDesc>
              해당 게시물을 아래와 같은 사유로 신고합니다. <br />
              <span>허위 신고 시 운영정책에 따라 조치될 수 있습니다.</span>
            </S.ReportDesc>

            <S.ReportSelect
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            >
              <option value="">사유 선택</option>
              <option value="욕설">다른 유저에게 불쾌감을 주는 행위(욕설, 비방, 도배)</option>
              <option value="운영방해">커뮤니티 이용 및 운영 방해</option>
              <option value="버그악용">시스템(버그) 악용 및 불법 프로그램 사용/유포</option>
              <option value="불건전">불건전 명칭 또는 프로필 이미지 사용</option>
              <option value="기타">기타</option>
            </S.ReportSelect>

            <S.ReportSubmit onClick={handleReportSubmit}>신고완료</S.ReportSubmit>
          </S.ReportBox>
        </S.ReportOverlay>
      )}


    </>
  );
};

export default QuestionReadContainer;
