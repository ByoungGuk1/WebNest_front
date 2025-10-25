import React from "react";
import { Outlet } from "react-router-dom";

const SnakePuzzleContainer = () => {
  return (
    <div>
      <h1>GameSnakePuzzle page</h1>
      <Outlet />
    </div>
  );
};

export default SnakePuzzleContainer;
