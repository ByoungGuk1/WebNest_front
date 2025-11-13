import styled from "styled-components";
import { flexBeetweenRow } from "styles/common";

const S = {};

S.Wrapper = styled.div`
  width: 1440px;
  height: 100vh;
  margin: 0 auto;
  border: solid 1px #d9d9d9;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

S.MenuWrapper = styled.div`
  border: solid 1px #d9d9d9;
  display: flex;
  justify-content: right;
`;

S.MenuLayout = styled.div`
  display: flex;
  justify-content: right;

  & > div {
    width: 300px;
    border: solid 1px #d9d9d9;
  }
`;

S.Content = styled.div`
width: 1040px;
`;

S.ChattingLayout = styled.div`
  width: 320px;
  height: 700px;
`

S.MainWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

S.CardLayout = styled.div`
  border: solid 1px #d9d9d9;
  width: 100%;
  ${flexBeetweenRow}
  justify-content: space-around;
  gap: auto;
`;

S.HelperWwrap = styled.div`
  width: 320px;
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
`
S.HelperItems = styled.div`
  width: 80px;
  height: 35px;
  background-color: #fff;
  border: #fff 0.4 1px;
   box-shadow: 0 0 20px #9585F2 0.1;

`
export default S;
