import React from "react";
import { Outlet } from "react-router-dom";

const CommunityBannerLayout = () => {
  return (
    <div>
      <h1>Community Banner Container</h1>
      <Outlet />
    </div>
  );
};

export default CommunityBannerLayout;
