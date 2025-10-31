import React from 'react';
import { Link } from 'react-router-dom';

const MyTestMainContainer = () => {
  return (
    <div>
      메인 컨테이너
      <div>
        <Link to={"/docs"}>documentation</Link>
      </div>
    </div>
  );
};

export default MyTestMainContainer;