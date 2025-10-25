import React from "react";
import { Link } from "react-router-dom";

const QuizContainer = () => {
  return (
    <div>
      퀴즈
      <Link to={`/workspace/quiz/${1}`}>문제1</Link>
      <Link to={`/workspace/quiz/${2}`}>문제2</Link>
      <Link to={`/workspace/quiz/${3}`}>문제3</Link>
      <Link to={`/workspace/quiz/${4}`}>문제4</Link>
      <Link to={`/workspace/quiz/${5}`}>문제5</Link>
    </div>
  );
};

export default QuizContainer;
