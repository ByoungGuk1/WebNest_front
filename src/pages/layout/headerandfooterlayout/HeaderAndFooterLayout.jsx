import React from "react";
import { Link, Outlet } from "react-router-dom";
import S from './style'
import Header from "./Header";
import Footer from "./Footer";

const HeaderAndFooterLayout = () => {
  return (
    <div>
      <Header></Header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HeaderAndFooterLayout;
