import React from "react";
import { Link, Outlet } from "react-router-dom";

const MyPageContainer = () => {
  return (
    <div>
      <h1>마이 페이지😎</h1>
      <div>
        <Link to={"/my-page/quiz"}>문제</Link>
        <Link to={"/my-page/post"}>게시글</Link>
        <Link to={"/my-page/follower"}>팔로워</Link>
        <Link to={"/my-page/following"}>팔로잉</Link>
        <Link to={"/my-page/grade"}>등급</Link>
        <Link to={"/my-page/modify"}>정보 수정</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MyPageContainer;
