import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from 'modules/user';

const Header = () => {
  const [ notifications, setNotifications ] = useState([])
  const alarmCount = 3;
  const [openNotice, setOpenNotice] = useState(false);
  const [queryString, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const {currentUser, isLogin } = user;
  const { id } = currentUser
  const [ isOpenPostNotification, setIsOpenNotification ] = useState(false)
  const [ isOpenCommentNorification, setIsOpenCommentNorification ] = useState(false)
  const [ isOpenFollowNotification, setIsOpenFollowNotification ] = useState(false)
  // if(notifications){
  //   const { message , data} = notifications
  //   const {comments, posts , follows} = data
  // }
  
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

  useEffect(() => {
  const getNotifications = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/notification/get-notification`, {
      method: "POST",
      credentials: "include",                      
      headers: {
        "Content-Type": "application/json",        
        "Accept": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify(id),                              
    });
    if (!res.ok) throw new Error("알람 테이블 데이터 불러오기 실패");
    return res.json();
  };

  if(isLogin){
    getNotifications()
      .then((data) => setNotifications(data))
      .catch((e) => console.error(e));
  }
}, [isLogin, id]);
let post = []
let comment = []
let follow = []
if(notifications.data){
  const {data} = notifications
  const {posts, comments, follows} = data
  post = posts
  comment = comments
  follow = follows
}
const display = [
  ...post, ...comment, follow
]
const onClickToReadAllNotifications = async() => {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/notification/modify-all`, {
      method: "PUT",
      credentials: "include",                      
      headers: {
        "Content-Type": "application/json",        
        "Accept": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify(id),                              
    });
}
 const formatDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = (now - date) / 1000;

    if (isNaN(date)) return dateString;
    if (diff < 60) return "방금 전";
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;

    return `${date.getFullYear()}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
  };

const arrangeDisplay = [
  ...post.map(p => ({ ...p, type: "POST" })),
  ...comment.map(c => ({ ...c, type: "COMMENT" })),
  ...follow.map(f => ({ ...f, type: "FOLLOW" })),
].sort((a,b) => new Date(b.notificationCreateAt) - new Date(a.notificationCreateAt));

console.log(arrangeDisplay)
const notificationLists = () =>
  (arrangeDisplay ?? []).map((data, i) => {
    switch (data.type) {
      case "POST":
        return (
        <S.NotificationItemsWrap key={`post-${data.id ?? i}`}>
          <S.NotificationItems key={data}>
                <span>{formatDate(data.notificationCreateAt)}</span>
            <S.OnlyRow>
              <S.UserNameHug>{data.userNickname}</S.UserNameHug>
              <div>
                <span>님이 </span>
                <span>회원님이 올린 게시글</span><span>{data.postTitle} 에</span>
              <S.OnlyRow>
                {data.postNotificationAction == "New Reply" ? <p>새 댓글을 남겼어요</p> :<p> 좋아요를 남겼어요</p>}
              </S.OnlyRow>
              </div>
            </S.OnlyRow>
        </S.NotificationItems>
        </S.NotificationItemsWrap>)
      case "COMMENT":
        return (
        <S.NotificationItemsWrap key={`comment-${data.id ?? i}`}>
          댓글 알림
        </S.NotificationItemsWrap>)
      case "FOLLOW":
        return (
        <S.NotificationItemsWrap key={`follow-${data.id ?? i}`}>
          팔로우 알림
        </S.NotificationItemsWrap>)
      default:
        return null;
    }
  });

const postNotifications = () => {
    return post.map((posts)=>{
      return(
        <S.NotificationItems key={posts}>
                <span>{formatDate(posts.notificationCreateAt)}</span>
            <S.OnlyRow>
              <S.UserNameHug>{posts.userNickname}</S.UserNameHug>
              <div>
                <span>님이 </span>
                <span>회원님이 올린 게시글</span><span>{posts.postTitle} 에</span>
              <S.OnlyRow>
                {posts.postNotificationAction == "New Reply" ? <p>새 댓글을 남겼어요</p> :<p> 좋아요를 남겼어요</p>}
              </S.OnlyRow>
              </div>
            </S.OnlyRow>
        </S.NotificationItems>
      )
    })
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
                  <S.NotificationCategoryWrap>
                  </S.NotificationCategoryWrap>
                  <S.notice_header>
                    <span>알람</span>
                    <S.notice_handler>
                      <S.read_all onClick={onClickToReadAllNotifications}>모두 읽음</S.read_all>
                      <S.remove_all>모두 삭제</S.remove_all>
                    </S.notice_handler>
                  </S.notice_header>
                  <S.NotificationItemsWrap>
                    {notificationLists()}
                  </S.NotificationItemsWrap>
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
              <Link to={"/sign-up"}>회원가입</Link>
              <Link to={"/sign-in"}>로그인</Link>
            </S.log_out_layout>
          )}
        </S.RightWrap>
      </S.innerwrap>
      
    </S.wrap>
  );
};

export default Header;