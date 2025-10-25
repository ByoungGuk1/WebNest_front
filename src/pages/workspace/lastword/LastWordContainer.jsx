import React from "react";

import { Outlet } from "react-router-dom";

const LastWordContainer = () => {
  return (
    <div>
      <h1>끝말잇기 게임 페이지😎</h1>
      <Outlet />
    </div>
  );
};

export default LastWordContainer;
