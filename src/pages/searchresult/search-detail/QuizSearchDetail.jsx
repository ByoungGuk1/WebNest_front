import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const QuizSearchDetail = () => {
  const location = useLocation();
  const [ searchLi, setSearchLi ] = useState([]);
  const [ newQuery, setNewQuery ] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search") || "";

  useEffect(() => {
  
      const getSearchLists = async () => {
        const resp = await fetch("/json_server/searchResponse/searchResponse.json")
        //   , {
        //   headers: {
        //   "Content-Type" : "application/json"
        //   },
        //   method: "POST",
        //   body: JSON.stringify(search)
        // })
        if(!resp.ok){ throw new Error("에러")}
        const searchResults = await resp.json();
        return searchResults
        // .then((res) => res.json())
        // .then((res) => setSearchLi(res))
      }
      getSearchLists()
        .then((resp) => setSearchLi(resp))
      // searchList().then((res) => res.json())
      // .then(console.log)
    },[])
    
    // searchLi << 검색 결과 담아있는 상태값
    console.log(searchLi)

  return (
    <div>
      문제 상세 페이지도착을 해쑴미당~~~
    </div>
  );
};

export default QuizSearchDetail;