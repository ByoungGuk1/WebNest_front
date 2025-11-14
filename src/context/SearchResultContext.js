import { createContext, useEffect, useState } from "react";

export const SearchResultContext = createContext()

export const SearchResultProvider = ({children}) => {
  const BACKURL = "http://localhost:10000"
  const [isSearchUpdate, setIsSearchUpdate] = useState(false)
  const [search, setSearch] = useState("")
  const [openPosts, setOpenPost] = useState([])
  const [questionPosts, setQuestionPosts] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [users, setUsers] = useState([])
  const value = {
    state: {
      search: search,
      openPosts: openPosts,
      questionPosts: questionPosts,
      quizzes: quizzes,
      users: users,
      isSearchUpdate: isSearchUpdate,
    },
    actions: {
      setSearch: setSearch,
      setOpenPost: setOpenPost,
      setQuestionPosts: setQuestionPosts,
      setQuizzes: setQuizzes,
      setUsers: setUsers,
      setIsSearchUpdate: setIsSearchUpdate, 
    },
  }
  // 데이터를 요청 후 초기값을 전달하는 것도 가능하다.
  useEffect(() => {
    const trimmedSearch = search ? search.trim() : "";
    
    // 검색어가 없거나 빈 문자열이거나 2글자 미만이면 요청하지 않음
    if (!trimmedSearch || trimmedSearch.length < 2) {
      setOpenPost([]);
      setQuestionPosts([]);
      setQuizzes([]);
      setUsers([]);
      return;
    }

    const getSearchLists = async () => {
      const response = await fetch(`${BACKURL}/search?search=${encodeURIComponent(trimmedSearch)}`)
      if(!response.ok) throw new Error('getSearchLists error');
      const searchResults = await response.json();
      return searchResults
    }
      getSearchLists()
        .then((res) => {
          const {message, data} = res;
          const {openPosts, questionPosts, quizzes, users} = data;
          setOpenPost(openPosts || [])
          setQuestionPosts(questionPosts || [])
          setQuizzes(quizzes || [])
          setUsers(users || [])
        })
        .catch((error) => {
          console.log(error)
          // 에러 발생 시 빈 배열로 설정
          setOpenPost([]);
          setQuestionPosts([]);
          setQuizzes([]);
          setUsers([]);
        })

  }, [search, isSearchUpdate])

  return (
    <SearchResultContext.Provider value={value}>
      {children}
    </SearchResultContext.Provider>
  )

}