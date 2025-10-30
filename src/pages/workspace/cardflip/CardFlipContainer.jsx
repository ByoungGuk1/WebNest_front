import React from "react";
import { Outlet } from "react-router-dom";

const CardFlipContainer = () => {
  return (
    <div>
      <h1>Game Card Flip Container</h1>
      <Outlet />
    </div>
  );
};

export default CardFlipContainer;
