import styled from "styled-components"


const S = {}

  S.Wrapper = styled.div`
    width: 1440px;
    height: 100vh;
    margin: 0 auto;
    border: solid 1px #d9d9d9;
    display: flex;
    flex-direction: column;
    gap: 40px;
  `

  S.MenuWrapper = styled.div`
    border: solid 1px #d9d9d9;
    display: flex;
    justify-content: right;
    `

  S.MenuLayout = styled.div`
    display: flex;
    justify-content: right;

    & > div {
      width: 300px;
      border: solid 1px #d9d9d9;
    }
  `
  
  S.Content = styled.div`
    width: 70%;
    border: solid 1px #d9d9d9;
  `

  S.ChattingLayout = styled.div`
    border: solid 3px #d9d9d9;
    width: 320px;
    height: 700px;
  `

  S.MainWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 40px;
    flex: 1;
  `

  S.CardLayout = styled.div`
    border: solid 1px #d9d9d9;
  `

export default S;