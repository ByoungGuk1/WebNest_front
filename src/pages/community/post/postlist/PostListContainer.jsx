import React from "react";
import { Link, Outlet } from "react-router-dom";

const PostListContainer = () => {
  return (
    <div>
      <h1>PostListContainer</h1>
      <Link to={`/post/${1}`}>일반 게시글1</Link>
      <Link to={`/post/${2}`}>일반 게시글2</Link>
      <Link to={`/post/${3}`}>일반 게시글3</Link>
      <Link to={`/post/${4}`}>일반 게시글4</Link>
      <Link to={`/post/${5}`}>일반 게시글5</Link>
    </div>
  );
};

export default PostListContainer;
