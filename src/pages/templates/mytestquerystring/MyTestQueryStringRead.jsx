import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

const MyTestQueryStringRead = () => {

  // query-string
  const [searchParams] = useSearchParams()
  // .get("key")
  const id = searchParams.get("id")
  
  return (
    <div>
      {id}번의 게시글의 내용을 가져온다. fetch 또는 props
      <div>
        <Link to={"/docs/url-parameter"}>목록으로</Link>
      </div>
    </div>
  );
};

export default MyTestQueryStringRead;