import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MyTestDocs = () => {
  return (
    <div>
      <div>
        <Link to={"/"}>메인</Link>
      </div>
      <div>
        <Link to={"/docs/context"}>컨텍스트 활용</Link>
      </div>
      <div>
        <Link to={"/docs/redux"}>리덕스 활용</Link>
      </div>
      <div>
        <Link to={"/docs/url-parameter"}>Url Parameter 활용</Link>&nbsp;|&nbsp;
        <Link to={"/docs/query-string"}>Query String 활용</Link>
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default MyTestDocs;