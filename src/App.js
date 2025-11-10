import { ThemeProvider } from 'styled-components';
import './App.css';
import GlobalStyle from './styles/global';
import theme from './styles/theme';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { SearchResultProvider } from 'context/SearchResultContext';

function App() {
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
