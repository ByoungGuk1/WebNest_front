import React from "react";
import { Outlet } from "react-router-dom";

const QuestionAndAnswerContainer = () => {
  return (
    <div>
      <h1>Question And Answer Container</h1>
      <Outlet />
    </div>
  );
};

export default QuestionAndAnswerContainer;
