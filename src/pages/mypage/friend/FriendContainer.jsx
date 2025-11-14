import React from "react";
import S from "./style";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";


const FriendContainer = () => {

  // 컨테이너는 바로 컴포넌트에게 값을 넘긴다.
  const {questionPosts, ...myData} = useOutletContext();

  return (
    <S.Page>
      {/* 레이아웃과 UserResult 묶음 사이 여백 */}
      <S.Section>
        <NavLink to={"/my-page/friend/follower"}>팔로워</NavLink>
        <NavLink to={"/my-page/friend/following"}>팔로잉</NavLink>
        <Outlet context={{...myData}} />
      </S.Section>
    </S.Page>
  );
};

export default FriendContainer;
