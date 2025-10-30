import React from "react";
import { Outlet } from "react-router-dom";

const FrequentlyAskedQuestionsContainer = () => {
  return (
    <div>
      <h1>Frequently Asked Questions Container</h1>
      <Outlet />
    </div>
  );
};

export default FrequentlyAskedQuestionsContainer;
