import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      페이지를 찾을 수 없습니다.😎
      <Link to={"/"}>메인으로</Link>
    </div>
  );
};

export default NotFound;
