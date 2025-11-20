import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import S from "./style";
import { useSelector } from "react-redux";

/** 🔧 백엔드 연동용 상수 */
const API_BASE = (process.env.REACT_APP_BACKEND_URL || "http://localhost:10000").replace(/\/+$/, "");
const GET_POST = (id, userId) => `${API_BASE}/post/get-post/${id}?userId=${userId}`;
const GET_POST_NO_VIEW = (id, userId) => `${API_BASE}/post/get-post-no-view/${id}?userId=${userId}`;
const GET_COMMENTS = (postId, userId) => `${API_BASE}/comment/${postId}${userId ? `?userId=${userId}` : ''}`;
const TOGGLE_POST_LIKE = (postId, userId) => `${API_BASE}/post/like?postId=${postId}&userId=${userId}`;
const CREATE_COMMENT_LIKE = `${API_BASE}/commentLike/commentlike`;
const DELETE_COMMENT_LIKE = `${API_BASE}/commentLike/remove`;
const DELETE_COMMENT = `${API_BASE}/comment/remove`;
const CHOOSE_COMMENT = `${API_BASE}/comment/choose`;

const QuestionReadContainer = () => {
  const { questionId } = useParams();
  const [posts, setPosts] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [comments, setComments] = useState([]); // 백엔드 댓글 데이터
  const navigate = useNavigate();
  const [deleteTargetId, setDeleteTargetId] = useState(null); // ✅ 삭제할 답변 id 저장
  const location = useLocation();
  const noViewIncrease = location.state?.noViewIncrease;
  const [selectedCommentId, setSelectedCommentId] = useState(null);  //방금 추가

 // ✅ Redux에서 로그인 유저 정보 가져오기
  const user = useSelector((state) => state.user)
  const {currentUser, isLogin } = user;
  // const { id } = currentUser
  // 로그인 유저 id (이름 충돌 피하기!)
  const { id: currentUserId } = currentUser;

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
      const response = await fetch(DELETE_COMMENT, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(deleteTargetId), // 백엔드에서 Long id로 받음
      });

      if (!response.ok) throw new Error("삭제 실패");

      alert("답변이 삭제되었습니다.");

      // ✅ UI에서 해당 댓글 제거
      setComments((prev) => prev.filter((c) => c.id !== deleteTargetId));
      // 좋아요 관련 상태도 제거
      setLikedAnswers((prev) => {
        const copy = { ...prev };
        delete copy[deleteTargetId];
        return copy;
      });
      setAnswerLikeCounts((prev) => {
        const copy = { ...prev };
        delete copy[deleteTargetId];
        return copy;
      });
      setAnswerLikeIds((prev) => {
        const copy = { ...prev };
        delete copy[deleteTargetId];
        return copy;
      });

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

  // const handlePostLike = () => {
  //   setIsPostLiked((prev) => !prev);
  //   setPostLikeCount((prev) => (isPostLiked ? prev - 1 : prev + 1));
  // };
  const handlePostLike = async () => {
    if (!isLogin) return alert("로그인이 필요합니다!");

    const willLike = !isPostLiked;
    setIsPostLiked(willLike);
    setPostLikeCount((prev) => prev + (willLike ? 1 : -1));

    try {
      const res = await fetch(TOGGLE_POST_LIKE(questionId, currentUserId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        throw new Error(errorText || "게시글 좋아요 실패");
      }

      const data = await res.json();
      const result = data?.data || data;

      // 백엔드에서 반환하는 실제 상태로 업데이트
      if (result && typeof result === "object") {
        if (typeof result.liked === "boolean") {
          setIsPostLiked(result.liked);
        }
        if (typeof result.likeCount === "number") {
          setPostLikeCount(result.likeCount);
        }
      }
    } catch (e) {
      // 실패 시 롤백
      setIsPostLiked(!willLike);
      setPostLikeCount((prev) => prev - (willLike ? 1 : -1));
      console.error("좋아요 처리 실패:", e);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };


  // 답변 좋아요 ID 저장 (삭제용)
  const [answerLikeIds, setAnswerLikeIds] = useState({});

  //좋아요
  const handleAnswerLike = async (commentId, postId) => {
    if (!isLogin) return alert("로그인이 필요합니다!");

    const cid = Number(commentId);
    const currentlyLiked = !!likedAnswers[cid];
    const willLike = !currentlyLiked;

    // UI 먼저 토글 (낙관적 업데이트)
    setLikedAnswers((prev) => ({ ...prev, [cid]: willLike }));
    setAnswerLikeCounts((prev) => ({
      ...prev,
      [cid]: (prev[cid] || 0) + (willLike ? 1 : -1),
    }));

    try {
      if (willLike) {
        // ✅ 좋아요 추가
        const res = await fetch(CREATE_COMMENT_LIKE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            userId: currentUserId,
            commentId: cid,
          }),
        });

        if (!res.ok) {
          const errorText = await res.text().catch(() => "");
          throw new Error(errorText || "댓글 좋아요 추가 실패");
        }

        // 응답에서 like id 추출 후 저장
        const json = await res.json();
        const data = json?.data ?? json?.result ?? json;
        if (data && typeof data === "object") {
          const likeId = data.newCommentLikeId ?? data.id ?? data.likeId ?? null;
          if (likeId != null) {
            setAnswerLikeIds((prev) => ({ ...prev, [cid]: likeId }));
          }
        }

        // 좋아요 수 최신화
        try {
          const countRes = await fetch(`${API_BASE}/commentLike/${cid}`);
          if (countRes.ok) {
            const countJson = await countRes.json();
            const count = typeof countJson === "number" ? countJson : (countJson?.data ?? 0);
            setAnswerLikeCounts((prev) => ({ ...prev, [cid]: count }));
          }
        } catch (e) {
          console.error("좋아요 수 조회 실패", e);
        }
      } else {
        // ✅ 좋아요 삭제
        const likeId = answerLikeIds[cid];
        if (!likeId) {
          // 삭제할 row의 ID 모르면 롤백
          setLikedAnswers((prev) => ({ ...prev, [cid]: currentlyLiked }));
          setAnswerLikeCounts((prev) => ({
            ...prev,
            [cid]: (prev[cid] || 0) - 1,
          }));
          alert("댓글 좋아요 정보를 찾을 수 없습니다. 새로고침 후 다시 시도해주세요.");
          return;
        }

        const res = await fetch(DELETE_COMMENT_LIKE, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            id: likeId,
            userId: currentUserId,
            commentId: cid,
          }),
        });

        if (!res.ok) {
          const errorText = await res.text().catch(() => "");
          throw new Error(errorText || "댓글 좋아요 삭제 실패");
        }

        // 삭제 성공 시, ID 맵에서 제거
        setAnswerLikeIds((prev) => {
          const copy = { ...prev };
          delete copy[cid];
          return copy;
        });

        // 좋아요 수 최신화
        try {
          const countRes = await fetch(`${API_BASE}/commentLike/${cid}`);
          if (countRes.ok) {
            const countJson = await countRes.json();
            const count = typeof countJson === "number" ? countJson : (countJson?.data ?? 0);
            setAnswerLikeCounts((prev) => ({ ...prev, [cid]: count }));
          }
        } catch (e) {
          console.error("좋아요 수 조회 실패", e);
        }
      }
    } catch (e) {
      // 실패하면 UI 롤백
      setLikedAnswers((prev) => ({ ...prev, [cid]: currentlyLiked }));
      setAnswerLikeCounts((prev) => ({
        ...prev,
        [cid]: (prev[cid] || 0) + (willLike ? -1 : 1),
      }));
      console.error("답변 좋아요 오류:", e);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };





  // const handleChooseClick = () => {
  //   setIsChooseModalOpen(true);
  // };

  const handleChooseClick = (commentId) => {
    setSelectedCommentId(commentId);
    setIsChooseModalOpen(true);
  };


  // const handleConfirmChoose = () => {
  //   setIsChooseModalOpen(false);
  //   alert("답변이 채택되었습니다! 🎉");
  // };

  const handleConfirmChoose = async () => {
    try {
      const res = await fetch(CHOOSE_COMMENT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ commentId: selectedCommentId })
      });

      if (!res.ok) throw new Error("채택 실패");

      // UI 업데이트
      setComments((prev) =>
        prev.map((c) =>
          c.id === selectedCommentId ? { ...c, commentIsAccept: 1 } : c
        )
      );

      setIsChooseModalOpen(false);
      alert("답변이 채택되었습니다!");
    } catch (e) {
      console.error(e);
      alert("채택 처리 중 오류가 발생했습니다.");
    }
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

  useEffect(() => {
    const safeUserId = currentUserId ?? 0;

    const loadData = async () => {
      try {
        const apiUrl = noViewIncrease
          ? GET_POST_NO_VIEW(questionId, safeUserId)
          : GET_POST(questionId, safeUserId);

        const postRes = await fetch(apiUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!postRes.ok) throw new Error("게시글 조회 실패");

        const postData = await postRes.json();
        const post = postData.data || postData;

        setIsPostLiked(post.liked ?? false);
        setPostLikeCount(post.postLikeCount ?? 0);
        setCurrentPost(post);
        setPosts([post]);

        // 댓글 조회
        const commentRes = await fetch(GET_COMMENTS(questionId, safeUserId), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!commentRes.ok) throw new Error("댓글 조회 실패");

        const commentData = await commentRes.json();
        const commentList = Array.isArray(commentData.data)
          ? commentData.data
          : Array.isArray(commentData)
          ? commentData
          : [];

        console.log(" 댓글 리스트:", commentList);
        setComments(commentList);

        // 댓글 좋아요 상태/개수/ID 맵
        const likedMap = {};
        const countMap = {};
        const likeIdMap = {};

        for (const c of commentList) {
          // liked는 boolean 또는 int(COUNT 결과)일 수 있음
          const isLiked = c.liked === true || c.liked === 1 || (typeof c.liked === 'number' && c.liked > 0);
          likedMap[c.id] = isLiked;
          countMap[c.id] = c.likeCount ?? 0;
          
          // 좋아요가 있으면 좋아요 ID 저장
          if (isLiked && c.likeId) {
            likeIdMap[c.id] = c.likeId;
          }
        }

        setLikedAnswers(likedMap);
        setAnswerLikeCounts(countMap);
        setAnswerLikeIds((prev) => ({ ...prev, ...likeIdMap })); // 기존 ID와 병합

        } catch (err) {
          console.error("로드 오류:", err);
          alert("데이터를 불러오는 중 오류가 발생했습니다.");
        }
        
    };

    loadData();
  }, [questionId, noViewIncrease, currentUserId]);


// useEffect(() => {
//   const safeUserId = currentUserId ?? 0;

//   const loadData = async () => {
//     try {
//       // 게시글 조회
//       const apiUrl = noViewIncrease
//         ? `http://localhost:10000/post/get-post-no-view/${questionId}?userId=${safeUserId}`
//         : `http://localhost:10000/post/get-post/${questionId}?userId=${safeUserId}`;

//       const postRes = await fetch(apiUrl);
//       const postData = await postRes.json();
//       const post = postData.data;

//       setIsPostLiked(post.liked);
//       setPostLikeCount(post.postLikeCount);
//       setCurrentPost(post);
//       setPosts([post]);

//       // 댓글 조회 (userId 포함)
//       const commentRes = await fetch(
//         `http://localhost:10000/comment/${questionId}?userId=${safeUserId}`
//       );
//       const commentData = await commentRes.json();
//       const commentList = commentData.data || [];
//       setComments(commentList);

//       // 댓글 좋아요 상태 + 개수
//       const likedMap = {};
//       const countMap = {};

//       for (const c of commentList) {
//         likedMap[c.id] = c.liked;
//         countMap[c.id] = c.likeCount;
//       }

//       setLikedAnswers(likedMap);
//       setAnswerLikeCounts(countMap);
//     } catch (err) {
//       console.error("로드 오류:", err);
//     }
//   };

//   loadData();
// }, [questionId, noViewIncrease, currentUserId]);






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
    // postLikeCount
  } = currentPost;
  console.log(comments)
  const acceptedComment = comments.filter((comment) => {return comment.commentIsAccept})
  const unAcceptedComment = comments.filter((comment) => {return !comment.commentIsAccept})
  const display = [ ...acceptedComment ,...unAcceptedComment ]
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
        {display && display.length > 0 ? (
          <S.AnswerSection>
            {display.map((ans) => (
              <S.AnswerCard key={ans.id}>
                <S.AnswerTop $commentIsAccept={ans.commentIsAccept === 1 || ans.commentIsAccept === true}>
                  <S.UserInfo>
                    <S.AnswerProfile
                      src={ans.userThumbnailUrl}
                      alt={ans.userNickname || "익명"}
                    />
                    <S.AnswerInnerBox>
                      <S.AnswerUser>
                        <span>{ans.userNickname || "익명"}</span>
                      </S.AnswerUser>
                      <S.AnswerMeta>
                        <span>Level</span>
                        <span>{ans.userLevel}</span>
                      </S.AnswerMeta>
                    </S.AnswerInnerBox>
                    <span>
                      {ans.isAccepted ? "채택된 댓글입니다." : ""}
                    </span>
                  </S.UserInfo>

                  {/* <S.ChooseAnswer onClick={handleChooseClick}>
                    <span>채택</span>
                  </S.ChooseAnswer> */}
                  {currentUserId === currentPost.userId && !ans.commentIsAccept && (
                    <S.ChooseAnswer onClick={() => handleChooseClick(ans.id)}>
                      채택
                    </S.ChooseAnswer>
                  )}

                </S.AnswerTop>

                <S.AnswerContent>{ans.commentDescription}</S.AnswerContent>

                <S.AnswerDate>
                  <span>{toRelativeTime(ans.commentCreateAt)}</span>
                  <b>·</b>
                  

                  {/* 답글 좋아요 버튼 */}
                <S.AnswerLikeBox onClick={() => handleAnswerLike(ans.id, ans.postId)}>
                  <S.AnswerLikeImg
                    src={
                      likedAnswers[ans.id]
                        ? "/assets/icons/heartfull.svg"
                        : "/assets/icons/greyheart.svg"
                    }
                    alt="좋아요"
                  />

                  <S.AnswerLikeNum $liked={likedAnswers[ans.id]}>
                    {answerLikeCounts[ans.id] || 0}
                  </S.AnswerLikeNum>
                </S.AnswerLikeBox>


                  <b>·</b>
                  <span onClick={() => handleReportClick("answer", ans.id)}>신고</span>
                </S.AnswerDate>

                {/* <S.HamburgerButton onClick={() => toggleMenu(ans.id)}>
                  <img src="/assets/icons/hamburgerbutton.svg" alt="메뉴" />
                </S.HamburgerButton> */}
                {currentUserId === ans.userId && (
                  <S.HamburgerButton onClick={() => toggleMenu(ans.id)}>
                    <img src="/assets/icons/hamburgerbutton.svg" alt="메뉴" />
                  </S.HamburgerButton>
                )}


                {/* {openMenuId === ans.id && (
                  <S.AnswerMenu>
                    <li onClick={() => handleEdit(ans)}>수정하기</li>
                    <li onClick={() => handleDelete(ans.id)}>삭제하기</li>
                  </S.AnswerMenu>
                )} */}

                {openMenuId === ans.id && currentUserId === ans.userId && (
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
              답변을 채택한 이후 채택취소가 불가능합니다.<br />
              한 게시글에 여러 답변을 채택할 수 있습니다.
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
