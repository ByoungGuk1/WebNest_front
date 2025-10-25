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

// Auth Page
import SignInContainer from "../pages/auth/signin/SignInContainer";
import SignUpContainer from "../pages/auth/signup/SignUpContainer";
import FindIdContainer from "../pages/auth/findid/FindIdContainer";
import FindPasswordContainer from "../pages/auth/findpassword/FindPasswordContainer";

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
      },
      {
        path: "/search",
        element: <SearchResultContainer />,
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
        path: "/question",
        element: <QuestionListContainer />,
      },
      {
        path: "/question/:questionId",
        element: <QuestionReadContainer />,
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
        path: "rooms/:roomId",
        element: <MultiWorkspaceContainer />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
