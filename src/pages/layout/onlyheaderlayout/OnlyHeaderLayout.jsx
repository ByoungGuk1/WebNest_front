import React from "react";
import { Link, Outlet } from "react-router-dom";

const OnlyHeaderLayout = () => {
  return (
    <div>
      <header>
        <Link to={"/quiz"}>문제 리스트</Link> | &nbsp;
        <Link to={"/workspace/rooms"}>게임</Link> | &nbsp;
        <Link to={"/post"}>일반 게시판</Link> | &nbsp;
        <Link to={"/question"}>질문 게시판</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default OnlyHeaderLayout;
