import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import S from "./style";
import AnswerLikeButton from "components/like/AnswerLikeButton";

const QuestionReadContainer = () => {
  const { questionId } = useParams();
  const [posts, setPosts] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [comments, setComments] = useState([]); // 백엔드 댓글 데이터
  const navigate = useNavigate();
  const [deleteTargetId, setDeleteTargetId] = useState(null); // ✅ 삭제할 답변 id 저장
 

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

  const handleEdit = (answer) => {
    navigate(`/question/${questionId}/write`, {
      state: { commentData: answer }  // ✅ 수정할 답변 데이터 전달
    });
  };

  const handleWriteAnswer = () => {
    navigate(`/question/${questionId}/write`);
  };

  const handleDelete = (id) => {
    setDeleteTargetId(id); // 어떤 댓글을 지울지 저장
    setOpenMenuId(null);
    setIsDeleteModalOpen(true);
  };

 const handleConfirmDelete = async () => {
    try {
      // ✅ DELETE 요청 보내기
      const response = await fetch("http://localhost:10000/comment/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteTargetId), // 백엔드에서 Long id로 받음
      });

      if (!response.ok) throw new Error("삭제 실패");

      alert("답변이 삭제되었습니다.");

      // ✅ UI에서 해당 댓글 제거
      setComments((prev) => prev.filter((c) => c.id !== deleteTargetId));

      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
    } catch (error) {
      console.error("답변 삭제 오류:", error);
      alert("답변 삭제 중 오류가 발생했습니다.");
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeleteTargetId(null);
  };

  /* 게시글 좋아요 관련 */
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(0);

  /* 답변 좋아요 관련 */
  const [likedAnswers, setLikedAnswers] = useState({});
  //  좋아요 수는 { [commentId]: number } 형태로 별도 관리
  const [answerLikeCounts, setAnswerLikeCounts] = useState({});

  /* 알림 토글 */
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const toggleAlarm = () => setIsAlarmOn((prev) => !prev);

  /* 채택 모달 상태 */
  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);

  const handlePostLike = () => {
    setIsPostLiked((prev) => !prev);
    setPostLikeCount((prev) => (isPostLiked ? prev - 1 : prev + 1));
  };

  //좋아요
  const handleAnswerLike = (answerId) => {
    setLikedAnswers((prevLiked) => {
      const isLiked = !prevLiked[answerId]; // 현재 상태 반전
      setAnswerLikeCounts((prevCounts) => ({
        ...prevCounts,
        [answerId]: (prevCounts[answerId] || 0) + (isLiked ? 1 : -1), // +1 또는 -1
      }));
      return { ...prevLiked, [answerId]: isLiked }; // 토글된 상태 저장
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
    const loadData = async () => {
      try {
        const postRes = await fetch(`http://localhost:10000/post/get-post/${questionId}`);
        if (!postRes.ok) throw new Error("게시글 불러오기 실패");
        const postData = await postRes.json();

        const commentRes = await fetch(`http://localhost:10000/comment/${questionId}`);
        if (!commentRes.ok) throw new Error("댓글 불러오기 실패");
        const commentData = await commentRes.json();
        const commentList = commentData.data || [];

        // ✅ 각 댓글별 좋아요 수 불러오기
        const likeCounts = {};
        for (const comment of commentList) {
          try {
            const likeRes = await fetch(`http://localhost:10000/commentLike/${comment.id}`);
            if (likeRes.ok) {
              const likeData = await likeRes.json();
              likeCounts[comment.id] = likeData.data; // 백엔드의 likeCount 값
            } else {
              likeCounts[comment.id] = 0;
            }
          } catch {
            likeCounts[comment.id] = 0;
          }
        }

        // ✅ 초기 세팅
        setAnswerLikeCounts(likeCounts);
        setComments(commentList);
        setCurrentPost(postData.data || postData);
        setPosts([postData.data || postData]);
        setPostLikeCount(postData.data?.postViewCount || 0);
      } catch (err) {
        console.error("데이터 로드 에러:", err);
        setCurrentPost(null);
        setComments([]);
      }
    };

    loadData();
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
            <span>{comments?.length || 0}</span>
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

        {/* 백엔드 댓글 매핑 */}
        {comments && comments.length > 0 ? (
          <S.AnswerSection>
            {comments.map((ans) => (
              <S.AnswerCard key={ans.id}>
                <S.AnswerTop>
                  <S.UserInfo>
                    <S.AnswerProfile
                      src={"/assets/images/defalutpro.svg"}
                      alt={ans.userNickname || "익명"}
                    />
                    <S.AnswerInnerBox>
                      <S.AnswerUser>
                        <span>{ans.userNickname || "익명"}</span>
                      </S.AnswerUser>
                      <S.AnswerMeta>
                        <span>Level</span>
                      </S.AnswerMeta>
                    </S.AnswerInnerBox>
                  </S.UserInfo>

                  <S.ChooseAnswer onClick={handleChooseClick}>
                    <span>채택</span>
                  </S.ChooseAnswer>
                </S.AnswerTop>

                <S.AnswerContent>{ans.commentDescription}</S.AnswerContent>

                <S.AnswerDate>
                  <span>{toRelativeTime(ans.commentCreateAt)}</span>
                  <b>·</b>
                  <AnswerLikeButton
                    isLiked={likedAnswers[ans.id] || false} // 하트 색상 변경 상태
                    likeCount={answerLikeCounts[ans.id] || 0} // 실제 좋아요 수
                    onToggleLike={() => handleAnswerLike(ans.id)} // 클릭 시 토글
                  />

                  <b>·</b>
                  <span onClick={() => handleReportClick("answer", ans.id)}>신고</span>
                </S.AnswerDate>

                <S.HamburgerButton onClick={() => toggleMenu(ans.id)}>
                  <img src="/assets/icons/hamburgerbutton.svg" alt="메뉴" />
                </S.HamburgerButton>

                {openMenuId === ans.id && (
                  <S.AnswerMenu>
                    <li onClick={() => handleEdit(ans)}>수정하기</li>
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
      
      {/* 신고 모달 */}
      {isReportOpen && (
        <S.ReportOverlay>
          <S.ReportBox>
            <S.ReportTitle>
              신고하기
              <S.CloseBtn onClick={handleCloseReport}>
                <img src="/assets/icons/x.svg" alt="닫기" />
              </S.CloseBtn>
            </S.ReportTitle>

            <S.ReportDesc>
              신고 사유를 선택해주세요. <br />
              <span>* 부적절한 내용은 관리자가 확인 후 조치합니다.</span>
            </S.ReportDesc>

            <S.ReportSelect
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            >
              <option value="">신고 사유를 선택하세요</option>
              <option value="부적절한 언어 사용">부적절한 언어 사용</option>
              <option value="스팸/홍보성 글">스팸/홍보성 글</option>
              <option value="개인정보 노출">개인정보 노출</option>
              <option value="허위 정보">허위 정보</option>
              <option value="기타">기타</option>
            </S.ReportSelect>

            <S.ReportSubmit onClick={handleReportSubmit}>
              신고하기
            </S.ReportSubmit>
          </S.ReportBox>
        </S.ReportOverlay>
      )}

      {/* 채택 모달 */}
      {isChooseModalOpen && (
        <S.ModalOverlay>
          <S.ModalBox>
            <S.ModalTitle>답변을 채택하시겠습니까?</S.ModalTitle>
            <S.ModalDesc>
              채택된 답변은 수정/삭제가 불가하며<br />
              다른 답변을 채택할 수 없습니다.
            </S.ModalDesc>
            <S.ModalButtons>
              <S.CancelBtn onClick={handleCancelChoose}>취소</S.CancelBtn>
              <S.ConfirmBtn onClick={handleConfirmChoose}>채택하기</S.ConfirmBtn>
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

    </>
  );
};

export default QuestionReadContainer;
