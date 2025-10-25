import React from "react";
import { Outlet } from "react-router-dom";

const ConcaveContainer = () => {
  return (
    <div>
      <h1>Game Concave Page</h1>
      <Outlet />
    </div>
  );
};

export default ConcaveContainer;
