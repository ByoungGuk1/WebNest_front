import React from "react";
import { Outlet } from "react-router-dom";

const IntroduceContainer = () => {
  return (
    <div>
      <h1>Introduce Container</h1>
      <Outlet />
    </div>
  );
};

export default IntroduceContainer;
