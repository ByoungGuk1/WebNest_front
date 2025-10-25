import { createContext, useEffect, useState } from "react";

export const TestContext = createContext();

// export const PostsProvider = ({ children }) => {
//   const [posts, setPosts] = useState([]);
//   const [isUpdate, setIsUpdate] = useState(false);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const value = {
//     state: { posts: posts },
//     actions: { setPosts: setPosts },
//     refetch: { isUpdate: isUpdate, setIsUpdate: setIsUpdate },
//     erorr: { error: error },
//     loading: { loading: loading },
//   };

//   useEffect(() => {
//     const getPosts = async () => {
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/posts"
//       );
//       const posts = await response.json();
//       return posts;
//     };

//     getPosts()
//       .then((posts) => {
//         setLoading(false);
//         setPosts(posts);
//       })
//       .catch((error) => {
//         setLoading(true);
//         console.error(error);
//       });
//   }, [isUpdate]);

//   return (
//     <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
//   );
// };
