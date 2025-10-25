import React from "react";
import { Outlet } from "react-router-dom";

const MultiWorkspaceRoomContainer = () => {
  return (
    <div>
      <h1>Multi Workspace Room Page😎</h1>
      <Outlet />
    </div>
  );
};

export default MultiWorkspaceRoomContainer;
