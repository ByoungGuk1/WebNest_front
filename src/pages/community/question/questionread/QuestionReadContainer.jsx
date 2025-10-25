import React from "react";
import { Outlet } from "react-router-dom";

const QuestionReadContainer = () => {
  return (
    <div>
      <h1>QuestionReadContainer</h1>
      <Outlet />
    </div>
  );
};

export default QuestionReadContainer;
