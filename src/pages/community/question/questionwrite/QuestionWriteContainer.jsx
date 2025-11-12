import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import S from "./style";
import { useSelector } from "react-redux"; // ✅ 추가

const QuestionWriteContainer = () => {
  const { questionId } = useParams(); // 게시글 ID
  const [currentPost, setCurrentPost] = useState(null);
  const [comment, setComment] = useState(""); // ✅ 답변 입력값
  const [postLikeCount, setPostLikeCount] = useState(0);
  const navigate = useNavigate();

  // ✅ Redux에서 로그인 유저 정보 가져오
    const user = useSelector((state) => state.user)
    const {currentUser, isLogin } = user;
    const { id } = currentUser

  console.log("현재 로그인 유저 정보:", currentUser);
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

  /* 게시글 불러오기 */
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`http://localhost:10000/post/get-post/${questionId}`);
        if (!res.ok) throw new Error("게시글 불러오기 실패");
        const data = await res.json();
        setCurrentPost(data.data || data);
        setPostLikeCount(data.data?.postViewCount || 0);
      } catch (err) {
        console.error("데이터 로드 에러:", err);
      }
    };
    loadData();
  }, [questionId]);

  // ✅ 답변 등록 버튼 클릭
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

    const commentData = {
      postId: questionId, // 현재 게시글 ID
      userId: currentUser.id, // 로그인한 사용자 ID
      commentDescription: comment, // 입력한 답변 내용
      commentCreateAt: new Date().toISOString()
    };

     console.log(commentData);
    try {
      const response = await fetch("http://localhost:10000/comment/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) throw new Error("서버 응답 실패");

      alert("답변이 성공적으로 등록되었습니다!");
      setComment(""); // 입력창 초기화
      navigate(`/question/${questionId}`); 
    } catch (error) {
      console.error("답변 등록 실패:", error);
      alert("답변 등록 중 오류가 발생했습니다.");
    }
  };

  const { postTitle, postContent, postCreateAt, postViewCount, userNickname } =
    currentPost || {};  



  return (
    <>
      <S.PurpleBannerWrap>
        <S.PurpleBanner>
          <S.PurpleBannerInner>
            <div>
              <S.PurplePageTitle>문제 둥지</S.PurplePageTitle>
              <S.PurplePageDesc>모르는 문제를 함께 올리고 답변을 받아보세요.</S.PurplePageDesc>
            </div>
            <S.PurpleIllust src="/assets/images/chickens.png" alt="문제둥지 일러스트" />
          </S.PurpleBannerInner>
        </S.PurpleBanner>
      </S.PurpleBannerWrap>

      <S.ContentWrap>
        <S.QuestionWrap>
          <S.QuestionTitle>{postTitle}</S.QuestionTitle>
          <S.QuestionerInfo>
            <S.LeftBox>
              <S.ProfileImgA
                src={currentUser.userThumbnailUrl || "/assets/images/defalutpro.svg"} // ✅ 로그인 유저 프로필
                alt={currentUser.userNickname || "익명"}
              />
              <span>{currentUser.userNickname || "익명"}</span>
            </S.LeftBox>
          </S.QuestionerInfo>
          <S.QuestionContent>{postContent}</S.QuestionContent>

          <S.QuestionInfo>
            <S.QuestionMetaWrap>
              <span>{toRelativeTime(postCreateAt)}</span>
              <b>·</b>
              <span>좋아요 0</span>
              <b>·</b>
              <span>조회 {postViewCount || 0}</span>
            </S.QuestionMetaWrap>
          </S.QuestionInfo>
        </S.QuestionWrap>

        {/* ✅ 답변 작성 영역 */}
        <S.Container>
          <S.ResponseCard>
            <S.InfoAndWrite>
              <S.ResponseBanner>
                <S.ProfileImg
                  src={currentUser.userThumbnailUrl || "/assets/images/defalutpro.svg"} // ✅ 로그인 프로필
                  alt="프로필"
                />
                <S.ResponserInfo>
                  <div>{currentUser.userNickname || "익명"}님,</div>
                  <div>정보를 공유해 주세요.</div>
                </S.ResponserInfo>
              </S.ResponseBanner>

              {/* ✅ 버튼 */}
              <S.ButtonWrap onClick={handleSubmitComment}>
                답변등록
              </S.ButtonWrap>
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

            {/* ✅ 답변 입력창 */}
            <S.InputResponse
              placeholder={`답변 작성 시 서비스 운영정책을 지켜주세요.\n이상한말쓰지말고 제대로 작성하세요. 매너 지켜요. 욕 안돼요.\n못한다고 잔소리 안됩니다. `}
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
