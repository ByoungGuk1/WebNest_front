import React from "react";
import { Outlet } from "react-router-dom";
import S from "./style";
import ChessBoard from "./chessboard/ChessBoard";

const ConcaveContainer = () => {
  return (
    <>
      <S.Wrap>
        <ChessBoard />
      </S.Wrap>
      <Outlet />
    </>
  );
};

export default ConcaveContainer;
