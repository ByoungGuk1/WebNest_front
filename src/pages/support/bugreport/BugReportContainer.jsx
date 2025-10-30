import React from "react";
import { Outlet } from "react-router-dom";

const BugReportContainer = () => {
  return (
    <div>
      <h1>Bug Report Page</h1>
      <Outlet />
    </div>
  );
};

export default BugReportContainer;
