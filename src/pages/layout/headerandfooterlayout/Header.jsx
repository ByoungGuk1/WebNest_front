import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from 'modules/user';

const Header = () => {
  const [ notifications, setNotifications ] = useState([])
  const alarmCount = notifications.length;
  const [openNotice, setOpenNotice] = useState(false);
  const [queryString, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const {currentUser, isLogin } = user;
  const { id } = currentUser
  
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

// 모두 읽음
const readAllNotice = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/private/notification/modify-all/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      }
    );
    if (!res.ok) throw new Error("모두 읽음 실패");

    // 성공 시 화면 비우기 (낙관적 업데이트)
    setNotifications(prev => ({
      ...prev,
      data: { posts: [], comments: [], follows: [] },
    }));
  } catch (e) {
    console.error(e);
    alert("모두 읽음 처리 중 에러가 발생했습니다.");
  }
};
// 모두 삭제
const deleteAllNotice = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/private/notification/delete-all/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      }
    );
    if (!res.ok) throw new Error("모두 삭제 실패");

    setNotifications(prev => ({
      ...prev,
      data: { posts: [], comments: [], follows: [] },
    }));
  } catch (e) {
    console.error(e);
    alert("모두 삭제 처리 중 에러가 발생했습니다.");
  }
};


  const onReadOne = async (n) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const base = process.env.REACT_APP_BACKEND_URL;

    // 타입별 엔드포인트 매핑
    const pathByType = {
      POST:    "/private/notification/post/modify",
      COMMENT: "/private/notification/comment/modify",
      FOLLOW:  "/private/notification/follow/modify",
    };

    const url = `${base}${pathByType[n.type]}`;
    const res = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify(n.id),   // 백에서 Long id 받도록 했으니 그대로 보냄
    });

    if (!res.ok) throw new Error("개별 알림 읽음 처리 실패");

    alert("알림을 읽었습니다.")
    setNotifications(prev => {
      const data = prev?.data ?? {};
      const removeByType = (arr=[]) => arr.filter(v => v.id !== n.id);
      return {
        ...prev,
        data: {
          ...data,
          posts:    n.type==="POST"    ? removeByType(data.posts)    : data.posts,
          comments: n.type==="COMMENT" ? removeByType(data.comments) : data.comments,
          follows:  n.type==="FOLLOW"  ? removeByType(data.follows)  : data.follows,
        }
      };
    });

  } catch (e) {
    console.error(e);
  }
};


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

// 액션 → 문구 (댓글도 New Like == 좋아요)
const msgFromAction = (action) =>
  action === "New Like" ? "좋아요를 남겼어요" : "새 댓글을 남겼어요";

// 리스트 렌더 (레이아웃만)
const notificationLists = () =>
  (arrangeDisplay ?? []).map((n, i) => {
    const key = `${n.type}-${n.id ?? i}`;
    const timeText = formatDate?.(n.notificationCreateAt) ?? "";

    if (n.type === "FOLLOW") {
      return (
        <S.NotificationItems
          key={key}
          onClick={() => onReadOne(n)}      // ← 객체 통째로 전달
          style={{ cursor: "pointer" }}
        >
          <S.TimeText>{timeText}</S.TimeText>
          <S.OneLine>
            <span className="name">{n.userNickname}</span>
            <span className="msg">님이 회원님을 새로 팔로우했습니다.</span>
          </S.OneLine>
        </S.NotificationItems>
      );
    }

    if (n.type === "POST") {
      const tail = msgFromAction(n.postNotificationAction);
      return (
        <S.NotificationItems
          key={key}
          onClick={() => onReadOne(n)}      // ← 객체 통째로 전달
          style={{ cursor: "pointer" }}
        >
          <S.TimeText>{timeText}</S.TimeText>
          <S.OneLine>
            <span className="name">{n.userNickname}</span>
            <span className="msg">
              님이 회원님의 게시글 「{n.postTitle ?? ""}」에 {tail}
            </span>
          </S.OneLine>
        </S.NotificationItems>
      );
    }

    // COMMENT
    const tail = msgFromAction(n.commentNotificationAction);
    return (
      <S.NotificationItems
          key={key}
          onClick={() => onReadOne(n)}      // ← 객체 통째로 전달
          style={{ cursor: "pointer" }}
        >
        <S.TimeText>{timeText}</S.TimeText>
        <S.OneLine>
          <span className="name">{n.userNickname}</span>
          <span className="msg">
            님이 회원님의 댓글
            {n.postTitle ? ` 「${n.postTitle}」` : ""}에 {tail}
          </span>
        </S.OneLine>
      </S.NotificationItems>
    );
  });




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
                      <S.read_all onClick={readAllNotice}>모두 읽음</S.read_all>
                      <S.remove_all onClick={deleteAllNotice}>모두 삭제</S.remove_all>
                    </S.notice_handler>
                  </S.notice_header>
                  <S.ListBody>
                    <S.NotificationItemsWrap>{notificationLists()}</S.NotificationItemsWrap>
                  </S.ListBody>
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