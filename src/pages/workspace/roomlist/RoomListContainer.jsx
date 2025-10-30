import React from "react";
import { Link, Outlet } from "react-router-dom";

const RoomListContainer = () => {
  return (
    <div>
      <h1>방 리스트</h1>
      <Link to={`/workspace/rooms/${1}`}>방1</Link>
      <Link to={`/workspace/rooms/${2}`}>방2</Link>
      <Link to={`/workspace/rooms/${3}`}>방3</Link>
      <Link to={`/workspace/rooms/${4}`}>방4</Link>
      <Link to={`/workspace/rooms/${5}`}>방5</Link>
    </div>
  );
};

export default RoomListContainer;
