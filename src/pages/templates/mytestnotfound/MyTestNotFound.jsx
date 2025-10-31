import React from 'react';
import { Link } from 'react-router-dom';

const MyTestNotFound = () => {
  return (
    <div>
      페이지를 찾을 수 없습니다.😅
      <Link to={"/"}>돌아가기</Link>
    </div>
  );
};

export default MyTestNotFound;