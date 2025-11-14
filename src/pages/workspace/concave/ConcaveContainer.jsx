import React from "react";
import { Outlet } from "react-router-dom";
import ChessBoard from "./chessboard/ChessBoard";

const ConcaveContainer = () => {
  return (
    <div>
      <h1>Game Concave Page</h1>
      <ChessBoard />
      <Outlet />
    </div>
  );
};

export default ConcaveContainer;
