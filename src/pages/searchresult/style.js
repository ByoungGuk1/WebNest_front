import styled from "styled-components";
import { h4Medium, h5Medium } from "../../styles/common";

const S = {}

S.Test = styled.div`
  width: 1160px;
  height: 190px;
  background-color: yellow;
`
S.ResultWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 42px;
`
S.InputWrap = styled.div`
  width: 920px;
  height: 74px;
  border-bottom: 1px solid #7255EE;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 108px;
  & input{
    border: none;
    width: 95%;
    height: 85%;
    outline: none;
    ${h5Medium}
  }
`
S.Text = styled.div`
  width: calc(1160px / 6);
  height: 92px;
  display: flex;
  justify-content: center;
  align-items: center;
  & span{
    color: #2F96FD;
  }
  & button {
    width: 100%;
    height: 100%;
  }
`
S.TextWrap = styled.div`
  width: 1160px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > a {
    text-decoration: none;
    color: #121212;
  }

  .border-bottom {
    border-bottom: 1px solid #D9d9d9;
  }

  .active {
    border-bottom: 3px solid #7255EE;
  }
`
  export default S;
