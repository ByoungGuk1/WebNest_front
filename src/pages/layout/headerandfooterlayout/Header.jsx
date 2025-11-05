import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import S from './style';

const Header = () => {

  const BACKURL = "qwer"
  const alarmCount = 3;

  const [openNotice, setOpenNotice] = useState(false);
  const [queryString, setQuery] = useState("");
  const navigate = useNavigate();
  // const token = localStorage.getItem("access_token");
  const token = 123;
  const onLogout = () => {
    // 필요시 refresh_token, 유저 상태도 함께 정리
    localStorage.removeItem("access_token");
  };
  const onSubmit = (e) => {
    navigate(`/search?search=${(queryString.trim())}`);
  }
  
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
  useEffect (() => {
    // db에서 알림 개수 가져와서 위에 포지션으로 박아둔다.
    // 1. 디비에 요청 = 유저 아이디를 보내고, 
    // 2. 백엔드에서 해당 유저에 있는 알림 카운트 + 알림 내용들을 보내준다.
    // 3. 화면에서 알림 카운트를 받아서 -> 알람 위에 포지션 놓기 0
    // 4. 알림 내용을 내부 html 로 처리 한다. 0
    const response = async () => {
      const user = await fetch (`${BACKURL}`, {
        method :"POST",
        body : JSON.stringify(token)
      })
      .then((res) => res.json())
      // 백에서 리턴해주는 값에 따라 다름 ;; 그 url 로 바로 받아오면 될듯
      .then((resp) =>{
        const profileURL = resp
      })
      // 에러 핸들러 유저 요청 응답 못 받았을 때 
      .catch()
    }
  })

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
          
          {token != null ? (
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
                <S.log_out> <span>로그아웃</span></S.log_out>
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