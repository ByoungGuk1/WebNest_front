import React from "react";
import { Outlet } from "react-router-dom";

const TypingPracticeContainer = () => {
  return (
    <div>
      <h1>TypingPractice page</h1>
      <Outlet />
    </div>
  );
};

export default TypingPracticeContainer;
