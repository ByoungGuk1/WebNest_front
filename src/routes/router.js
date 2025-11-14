import { createBrowserRouter } from "react-router-dom";

// Layout
import HeaderAndFooterLayout from "../pages/layout/headerandfooterlayout/HeaderAndFooterLayout";
import OnlyHeaderLayout from "../pages/layout/onlyheaderlayout/OnlyHeaderLayout";

// Pages
import NotFound from "../pages/notfound/NotFound";

// Main Page
import MainContainer from "../pages/main/MainContainer";

// My Page
import MyPageContainer from "../pages/mypage/MyPageContainer";

// user Page
import SignInContainer from "../pages/user/signin/SignInContainer";
import SignUpContainer from "../pages/user/signup/SignUpContainer";
import FindIdContainer from "../pages/user/findid/FindIdContainer";
import FindPasswordContainer from "../pages/user/findpassword/FindPasswordContainer";
import OauthSuccess from "../pages/user/signin/OauthSuccess";

// Quiz Page
import QuizContainer from "../pages/quiz/QuizContainer";

// Serch Page
import SearchResultContainer from "../pages/searchresult/SearchResultContainer";

// Community Page
import PostListContainer from "../pages/community/post/postlist/PostListContainer";
import PostReadContainer from "../pages/community/post/postread/PostReadContainer";
import QuestionListContainer from "../pages/community/question/questionlist/QuestionListContainer";
import QuestionReadContainer from "../pages/community/question/questionread/QuestionReadContainer";

// single workspace
import SingleWorkspaceContainer from "../pages/workspace/singleworkspace/SingleWorkspaceContainer";

// multi workspace
import RoomListContainer from "../pages/workspace/roomlist/RoomListContainer";
import MultiWorkspaceContainer from "../pages/workspace/multiworkspace/MultiWorkspaceContainer";
import CardFlipContainer from "../pages/workspace/cardflip/CardFlipContainer";
import ConcaveContainer from "../pages/workspace/concave/ConcaveContainer";
import LastWordContainer from "../pages/workspace/lastword/LastWordContainer";
import SnakePuzzleContainer from "../pages/workspace/snakepuzzle/SnakePuzzleContainer";
import TypingPracticeContainer from "../pages/workspace/typingpractice/TypingPracticeContainer";
import PostWriteContainer from "../pages/community/post/postwrite/PostWriteContainer";
import QuestionWriteContainer from "../pages/community/question/questionwrite/QuestionWriteContainer";
import QuestionPost from "../pages/searchresult/search-detail/QuestionPost";
import OpenPost from "../pages/searchresult/search-detail/OpenPost";
import QuizSearchDetail from "../pages/searchresult/search-detail/QuizSearchDetail";
import FollowSearchDetail from "../pages/searchresult/search-detail/FollowSearchDetail";
import WriteContainer from "pages/community/write/WriteContainer";
import SearchResult from "pages/searchresult/SearchResult";
import ShortPractice from "pages/workspace/typingpractice/shortpractice/ShortPractice";
import LongPractice from "pages/workspace/typingpractice/longpractice/LongPractice";
import FriendContainer from "pages/mypage/friend/FriendContainer";
import GradeContainer from "pages/mypage/grade/GradeContainer";
import LikePostContainer from "pages/mypage/likepost/LikePostContainer";
import ModifyContainer from "pages/mypage/modify/ModifyContainer";
import MyPostContainer from "pages/mypage/mypost/MyPostContainer";
import QuestionBookmarkContainer from "pages/mypage/questionbookmark/QuestionBookmarkContainer";
import Follower from "pages/mypage/friend/Follower";
import Following from "pages/mypage/friend/Following";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderAndFooterLayout />,
    children: [
      {
        path: "",
        element: <MainContainer />,
      },
      {
        path: "quiz",
        element: <QuizContainer />,
      },
      {
        path: "sign-in",
        element: <SignInContainer />,
      },
      {
        path: "sign-up",
        element: <SignUpContainer />,
      },
      {
        path: "find-id",
        element: <FindIdContainer />,
      },
      {
        path: "find-password",
        element: <FindPasswordContainer />,
      },
      {
        path: "my-page",
        element: <MyPageContainer />,
        children: [
          {
            path: "",
            element: <QuestionBookmarkContainer />
          },
          {
              path: "friend",
              element: <FriendContainer />,
              children: [
                {
                  path: "follower",
                  element: <Follower />
                },
                {
                  path: "following",
                  element: <Following />
                }
              ]
          },
          {
              path: "grade",
              element: <GradeContainer />
          },
          {
              path: "like",
              element: <LikePostContainer />
          },
          {
              path: "modify",
              element: <ModifyContainer />
          },
          {
              path: "my-post",
              element: <MyPostContainer />
          },
        ]
      },
      {
        path: "search",
        element: <SearchResultContainer />,
        children: [
          {
            index: true,
            element: <SearchResult />,
          },
          {
            path: "question-post",
            element: <QuestionPost />,
          },
          {
            path: "open-post",
            element: <OpenPost />,
          },
          {
            path: "quiz",
            element: <QuizSearchDetail />,
          },
          {
            path: "follow",
            element: <FollowSearchDetail />,
          },
        ],
      },
      {
        path: "/post",
        element: <PostListContainer />,
      },
      {
        path: "/post/:postId",
        element: <PostReadContainer />,
      },
      {
        path: "/post/write",
        element: <PostWriteContainer />,
      },
      {
        path: "/question",
        element: <QuestionListContainer />,
      },
      {
        path: "/question/:questionId",
        element: <QuestionReadContainer />,
      },
      {
        path: "/question/write",
        element: <WriteContainer />,
      },
      {
        path: "/question/:questionId/write",
        element: <QuestionWriteContainer />,
      },
      {
        path: "oauth2/success",
        element: <OauthSuccess />,
      },
    ],
  },
  {
    path: "workspace",
    element: <OnlyHeaderLayout />,
    children: [
      {
        path: "quiz/:quizid",
        element: <SingleWorkspaceContainer />,
      },
      {
        path: "rooms",
        element: <RoomListContainer />,
      },
      {
        path: "rooms/typing",
        element: <TypingPracticeContainer />,
        children: [
          {
            index: "true",
            element: <ShortPractice />,   // 기본 페이지
          },
          {
            path: "long",
            element: <LongPractice />,    // 긴 글 페이지
          },
        ],
      },
      {
        path: "rooms/:roomId",
        element: <MultiWorkspaceContainer />,
        children: [
          {
            path: "cardflip",
            element: <CardFlipContainer />,
          },
          {
            path: "concave",
            element: <ConcaveContainer />,
          },
          {
            path: "lastword",
            element: <LastWordContainer />,
          },
          {
            path: "snakepuzzle",
            element: <SnakePuzzleContainer />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

// import { createBrowserRouter } from "react-router-dom";
// import MyTestNotFound from "../pages/templates/mytestnotfound/MyTestNotFound";
// import MyTestLayout from "../pages/templates/mytestlayout/MyTestLayout";
// import MyTestMainContainer from "../pages/templates/mytestmain/MyTestMainContainer";
// import MyTestContextContainer from "../pages/templates/mytestcontext/MyTestContextContainer";
// import MyTestRedux from "../pages/templates/mytestredux/MyTestRedux";
// import MyTestDocs from "../pages/templates/mytestdocs/MyTestDocs";
// import MyTestParameterRead from "../pages/templates/mytesturlparameter/MyTestParameterRead";
// import MyTestParameterContainer from "../pages/templates/mytesturlparameter/MyTestParameterContainer";
// import MyTestQueryStringRead from "../pages/templates/mytestquerystring/MyTestQueryStringRead";
// import MyTestQueryStringContainer from "../pages/templates/mytestquerystring/MyTestQueryStringContainer";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MyTestLayout />,
//     children: [
//       {
//         path: "", // == index: true
//         element: <MyTestMainContainer />
//       },
//     ]
//   },
//   {
//     path: "/docs",
//     element: <MyTestDocs />,
//     children: [
//       {
//         path: "context", // == index: true
//         element: <MyTestContextContainer />
//       },
//       {
//         path: "redux", // == index: true
//         element: <MyTestRedux />
//       },
//       {
//         path: "url-parameter",
//         element: <MyTestParameterContainer />
//       },
//       {
//         path: "url-parameter/:id",
//         element: <MyTestParameterRead />
//       },
//       {
//         path: "query-string",
//         element: <MyTestQueryStringContainer />
//       },
//       {
//         path: "query-string/read",
//         element: <MyTestQueryStringRead />
//       }
//     ]
//   },
//   {
//     path: "*",
//     element: <MyTestNotFound />
//   },
// ])

// export default router;
