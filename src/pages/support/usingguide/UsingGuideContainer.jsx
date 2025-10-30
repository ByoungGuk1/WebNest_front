import React from "react";
import { Outlet } from "react-router-dom";

const UsingGuideContainer = () => {
  return (
    <div>
      <h1>Using Guide Container</h1>
      <Outlet />
    </div>
  );
};

export default UsingGuideContainer;
