import React from "react";
import S from "pages/community/question/questionread/style";

const AnswerLikeButton = ({ isLiked, likeCount, onToggleLike }) => {
  return (
    <>
      <img
        src={isLiked ? "/assets/icons/heartfull.svg" : "/assets/icons/greyheart.svg"}
        alt="좋아요"
        onClick={onToggleLike}
      />
      <S.AnswerLikeCount $liked={isLiked} onClick={onToggleLike}>
        {likeCount}
      </S.AnswerLikeCount>
    </>
  );
};


export default AnswerLikeButton;
