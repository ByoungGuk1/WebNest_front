import React from "react";
import { Outlet } from "react-router-dom";

const SingleWorkspaceContainer = () => {
  return (
    <div>
      <h1>Single Workspace Page</h1>
      <Outlet />
    </div>
  );
};

export default SingleWorkspaceContainer;
