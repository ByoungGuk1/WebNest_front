import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom"; 
import S from "./style";
import { useSelector } from "react-redux";

/** 🔧 백엔드 연동용 상수 */
const API_BASE = (process.env.REACT_APP_BACKEND_URL || "http://localhost:10000").replace(/\/+$/, "");
const GET_POST_NO_VIEW = (id, userId) => `${API_BASE}/post/get-post-no-view/${id}?userId=${userId}`;
const WRITE_COMMENT = `${API_BASE}/comment/write`;
const MODIFY_COMMENT = `${API_BASE}/comment/modify`;

const QuestionWriteContainer = () => {
  const { questionId } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation(); 
  const { commentData } = location.state || {}; 

  const [currentPost, setCurrentPost] = useState(null);
  const [comment, setComment] = useState(commentData?.commentDescription || ""); //  기존 내용 세팅
  const [postLikeCount, setPostLikeCount] = useState(0);

  //  Redux에서 로그인 유저 정보 가져오기
  const user = useSelector((state) => state.user)
  const {currentUser, isLogin } = user;
  const { id } = currentUser

  /* 게시글 불러오기 */
  // useEffect(() => {
  // // 수정일 때는 게시글 조회 필요 없음
  // // if (commentData) return;

  //   const loadData = async () => {
  //     // 조회수 증가 없는 API 사용
  //     const res = await fetch(`http://localhost:10000/post/get-post-no-view/${questionId}`);
  //     const data = await res.json();
  //     setCurrentPost(data.data || data);
  //     setPostLikeCount(data.data?.postViewCount || 0);
  //   };

  //   loadData();
  // }, [questionId, commentData]);
  useEffect(() => {
    if (!questionId || !id) return;

    const loadData = async () => {
      try {
        const res = await fetch(GET_POST_NO_VIEW(questionId, id), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!res.ok) throw new Error("게시글 조회 실패");

        const data = await res.json();
        const post = data.data || data;
        setCurrentPost(post);
        setPostLikeCount(post.postViewCount || 0);
      } catch (error) {
        console.error("게시글 조회 오류:", error);
        alert("게시글을 불러오는 중 오류가 발생했습니다.");
      }
    };

    loadData();
  }, [questionId, id]);



  //  답변 등록 / 수정 버튼 클릭
  const handleSubmitComment = async () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
      return;
    }

    if (!comment.trim()) {
      alert("답변 내용을 입력해주세요!");
      return;
    }

    try {
      //  수정 모드일 경우 PUT 요청
      if (commentData) {
        const updatedComment = {
          id: commentData.id,
          commentId: commentData.id,
          postId: commentData.postId,
          userId: commentData.userId,
          commentDescription: comment,
        };

        const response = await fetch(MODIFY_COMMENT, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedComment),
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => "");
          throw new Error(errorText || "수정 실패");
        }
        alert("답변이 수정되었습니다!");
      } else {
        //  새 답변 등록일 경우 POST 요청
        const newComment = {
          postId: Number(questionId),
          userId: currentUser.id,
          commentDescription: comment,
          commentIsAccept: false,
          commentCreateAt: new Date(),
        };

        const response = await fetch(WRITE_COMMENT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(newComment),
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => "");
          throw new Error(errorText || "등록 실패");
        }
        alert("답변이 등록되었습니다!");
      }

      setComment("");

      // 상세페이지로 돌아갈 때 조회수 증가 금지
      navigate(`/question/${questionId}`, { state: { noViewIncrease: true } });

    } catch (error) {
      console.error("답변 처리 중 오류:", error);
      alert("답변 처리 중 오류가 발생했습니다.");
    }
  };

  const { postTitle, postContent, postCreateAt, postViewCount } =
    currentPost || {};

  return (
    <>
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

      <S.ContentWrap>
        <S.QuestionWrap>
          <S.QuestionTitle>{postTitle}</S.QuestionTitle>
          <S.QuestionerInfo>
            <S.LeftBox>
              <S.ProfileImgA
                src={
                  currentUser.userThumbnailUrl || "/assets/images/defalutpro.svg"
                }
                alt={currentUser.userNickname || "익명"}
              />
              <span>{currentUser.userNickname || "익명"}</span>
            </S.LeftBox>
          </S.QuestionerInfo>
          <S.QuestionContent>{postContent}</S.QuestionContent>

          <S.QuestionInfo>
            <S.QuestionMetaWrap>
              <span>{new Date(postCreateAt).toLocaleDateString()}</span>
              <b>·</b>
              <span>좋아요 0</span>
              <b>·</b>
              <span>조회 {postViewCount || 0}</span>
            </S.QuestionMetaWrap>
          </S.QuestionInfo>
        </S.QuestionWrap>

        {/*  답변 입력 영역 (그대로 유지) */}
        <S.Container>
          <S.ResponseCard>
            <S.InfoAndWrite>
              <S.ResponseBanner>
                <S.ProfileImg
                  src={
                    currentUser.userThumbnailUrl ||
                    "/assets/images/defalutpro.svg"
                  }
                  alt="프로필"
                />
                <S.ResponserInfo>
                  <div>{currentUser.userNickname || "익명"}님,</div>
                  <div>정보를 공유해 주세요.</div>
                </S.ResponserInfo>
              </S.ResponseBanner>

              {/*  기존 버튼 그대로 유지 */}
              <S.ButtonWrap onClick={handleSubmitComment}>답변등록</S.ButtonWrap>
            </S.InfoAndWrite>

            {/* <S.CodeBox>
              <S.CodeBtn>
                <S.CodeImg>
                  <img src="/assets/icons/code.svg" alt="{}" />
                </S.CodeImg>
                <S.SorceCode>소스코드</S.SorceCode>
              </S.CodeBtn>
            </S.CodeBox> */}

            {/*  답변 입력창 (기존 유지, 단 초기값만 수정됨) */}
            <S.InputResponse
              placeholder={`답변 작성 시 서비스 운영정책을 지켜주세요.\n이상한말쓰지말고 제대로 작성하세요. 매너 지켜요. 욕 안돼요.\n못한다고 잔소리 안됩니다.`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </S.ResponseCard>
        </S.Container>
      </S.ContentWrap>
    </>
  );
};

export default QuestionWriteContainer;
