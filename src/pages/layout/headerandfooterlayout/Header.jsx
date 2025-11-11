import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from 'modules/user';

const Header = () => {

  const alarmCount = 3;
  const [openNotice, setOpenNotice] = useState(false);
  const [queryString, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const {currentUser, isLogin} = user;
  
  const defaultUser = {
    id: 0,
    userName: "",
    userBirthday: new Date(),
    userEmail: "",
    userPhone: "",
    userExp: 0,
    userLevel: 0,
    userThumbnailName: "",
    userThumbnailUrl: "",
    userNickname: "",
    userProvider: "",
  }

  const onLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(setUser(defaultUser))
    dispatch(setUserStatus(false))
    navigate("/sign-in")
  };
  
  const goSearch = () => {
    const search = queryString.trim();
    navigate(`/search?search=${encodeURIComponent(search)}`);
  };
  
  const enterTomove = (e) => {
    if (e.key === "Enter"){
      goSearch()
    }
  }
  const getSearch = (e) => {
    setQuery(e.target.value);
  }
  const readNotice = () => {
    setOpenNotice(open => !open);
  }

  return (
    <S.wrap>
      <S.innerwrap>
        <Link to={"/"}>
          <S.logo>
            WebNest
          </S.logo>
        </Link>
        <S.Category>
          <Link to={"/quiz"}>훈련장</Link> 
          <Link to={"/workspace/rooms"}>게임장</Link> 
          <Link to={"/post"}>열린둥지</Link> 
          <Link to={"/question"}>문제둥지</Link>
        </S.Category>
        <S.RightWrap>
          <S.search>
              <input 
                name='search' id="search" onChange={getSearch} onKeyDown={enterTomove}>
              </input>
              <button type='submit'></button>
            <button onClick={onLogout}></button>
            {/* <img src="/assets/header/search.png"></img> */}
          </S.search>
          
          { isLogin ? (
            <S.right_layout>
              <S.notification_wrap>
               <S.notification onClick={readNotice}></S.notification>
               {alarmCount > 0 ? (<S.notification_new></S.notification_new>) : (<></>)}
               {openNotice === true ? (
                <S.notice_wrap>
                  <S.notice_header>
                    <span>알람</span>
                    <S.notice_handler>
                      <S.read_all>모두 읽음</S.read_all>
                      <S.remove_all>모두 삭제</S.remove_all>
                    </S.notice_handler>
                  </S.notice_header>
                </S.notice_wrap>
              ) : <></>}
              </S.notification_wrap>
              <S.profileLayout>
                <S.profileImage>
                  {/* <img src={profileURL} ></img> */}
                  <Link to={"/my-page"}>
                    <img src='assets/images/chicken.png'></img>
                  </Link>
                </S.profileImage>
                <S.log_out onClick={onLogout}>로그아웃</S.log_out>
              </S.profileLayout>
            </S.right_layout>
          ) : (
            <S.log_out_layout>
              <Link to={"sign-up"}>회원가입</Link>
              <Link to={"sign-in"}>로그인</Link>
            </S.log_out_layout>
          )}
        </S.RightWrap>
      </S.innerwrap>
      
    </S.wrap>
  );
};

export default Header;