import React from "react";
import { Link, Outlet } from "react-router-dom";

const QuestionListContainer = () => {
  return (
    <div>
      <h1>QuestionListContainer</h1>
      <Link to={`/question/${1}`}>문제 질문 게시글1</Link>
      <Link to={`/question/${2}`}>문제 질문 게시글2</Link>
      <Link to={`/question/${3}`}>문제 질문 게시글3</Link>
      <Link to={`/question/${4}`}>문제 질문 게시글4</Link>
      <Link to={`/question/${5}`}>문제 질문 게시글5</Link>
    </div>
  );
};

export default QuestionListContainer;
