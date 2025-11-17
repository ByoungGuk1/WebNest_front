import React from "react";
import S from "./style";
import { NavLink, Outlet, useOutletContext, useLocation } from "react-router-dom";


const FriendContainer = () => {
  const location = useLocation();
  const isFollower = location.pathname.includes("/follower");
  
  // 컨테이너는 바로 컴포넌트에게 값을 넘긴다.
  const {questionPosts, ...myData} = useOutletContext();

  return (
    <S.Page>
      {/* 토글 버튼 */}
      <S.BoardToggleRow>
        <S.BoardToggle>
          <S.BoardNavLink 
            to={"/my-page/friend/follower"}
            $active={isFollower}
          >
            팔로워
          </S.BoardNavLink>
          <S.BoardNavLink 
            to={"/my-page/friend/following"}
            $active={!isFollower}
          >
            팔로잉
          </S.BoardNavLink>
        </S.BoardToggle>
      </S.BoardToggleRow>
      
      {/* 레이아웃과 UserResult 묶음 사이 여백 */}
      <S.Section>
        <Outlet context={{...myData}} />
      </S.Section>
    </S.Page>
  );
};

export default FriendContainer;