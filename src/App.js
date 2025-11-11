import { ThemeProvider } from 'styled-components';
import './App.css';
import GlobalStyle from './styles/global';
import theme from './styles/theme';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { SearchResultProvider } from 'context/SearchResultContext';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserStatus } from 'modules/user';

function App() {

  // 최초 한 번 접속 시 토큰 유무 확인후 데이터 요청
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem("accessToken")
  const reduxData = useSelector((state) => state.user)
  
  useEffect(() => {
    if(accessToken){
      const getProfile = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/users/me`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
          method: "GET"
        })

        if(!response.ok) throw new Error(`getProfile Authorization Error`)
        const datas = await response.json()
        const profile = await datas.data
        dispatch(setUser(profile))
        dispatch(setUserStatus(true))
      }

      getProfile()
        .catch((error) => {
          console.log("토큰 만료 로직 추후 작성")
        })
    }
    
  }, [accessToken])
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <SearchResultProvider>
        <GlobalStyle />
        <RouterProvider router={router}/>
        </SearchResultProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
