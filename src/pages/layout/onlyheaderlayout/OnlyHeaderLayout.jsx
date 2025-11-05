import React from "react";
import { Link, Outlet } from "react-router-dom";
import S from "./style";
import Header from "../headerandfooterlayout/Header";
import CommunityBannerLayout from "../communitybanner/CommunityBannerLayout";

const OnlyHeaderLayout = () => {
  return (
    <div>
      <Header>
        <Link to={"/quiz"}>문제 리스트</Link> | &nbsp;
        <Link to={"/workspace/rooms"}>게임</Link> | &nbsp;
        <Link to={"/post"}>일반 게시판</Link> | &nbsp;
        <Link to={"/question"}>질문 게시판</Link> | &nbsp;
        <Link to={"/my-page"}>마이페이지</Link>
      </Header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default OnlyHeaderLayout;
