import { SearchResultContext } from 'context/SearchResultContext';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const OpenPost = () => {
  const {state, actions} = useContext(SearchResultContext) 
  const {search, isSearchUpdate, openPosts, questionPosts, quizzes, users } = state;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  return (
    <div>
      
    </div>
  );
};

export default OpenPost;