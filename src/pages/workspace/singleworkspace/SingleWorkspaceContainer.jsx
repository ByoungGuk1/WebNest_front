import { Outlet, useLocation } from "react-router-dom";
import QuizReadFetch from "./quizreadfetch/QuizReadFetch";
import QuizRead from "./quizread/QuizRead";

const SingleWorkspaceContainer = () => {


  return (
    <div>
      <QuizReadFetch />
      <Outlet />
    </div>
  );
};

export default SingleWorkspaceContainer;
