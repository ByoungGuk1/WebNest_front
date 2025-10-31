import React from "react";
import { Outlet } from "react-router-dom";

const FindPasswordContainer = () => {
  return (
    <div>
      <h1>Find Password Container</h1>
      <Outlet />
    </div>
  );
};

export default FindPasswordContainer;
