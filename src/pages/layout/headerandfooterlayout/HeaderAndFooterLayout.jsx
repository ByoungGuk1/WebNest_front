import React from "react";
import { Link, Outlet } from "react-router-dom";
import S from './style'
import Header from "./Header";

const HeaderAndFooterLayout = () => {
  return (
    <div>
      <Header></Header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2025 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HeaderAndFooterLayout;
