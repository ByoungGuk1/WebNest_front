import React from "react";
import { Outlet } from "react-router-dom";

const CustomerBannerLayout = () => {
  return (
    <div>
      <h1>Customer Banner Page</h1>
      <Outlet />
    </div>
  );
};

export default CustomerBannerLayout;
