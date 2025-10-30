import React from "react";
import { Outlet } from "react-router-dom";

const PostReadContainer = () => {
  return (
    <div>
      <h1>PostReadContainer</h1>
      <Outlet />
    </div>
  );
};

export default PostReadContainer;
