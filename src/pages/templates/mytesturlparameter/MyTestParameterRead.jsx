import React from 'react';
import { Link, useParams } from 'react-router-dom';

const MyTestParameterRead = () => {

  // url-parameter
  const {id} = useParams()
  return (
    <div>
      {id}번의 게시글의 내용을 가져온다. fetch 또는 props
      <div>
        <Link to={"/docs/url-parameter"}>목록으로</Link>
      </div>
    </div>
  );
};

export default MyTestParameterRead;