import styled from "styled-components";
import { h5Medium, h6Bold, h7Bold, h7Light, h8Bold } from '../../../styles/common'

const S = {}
// 리스트하나당 192 px height;
// 리스트 감싼 전체 컨테이너  192*3
S.postWraper = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 완성 후 보더 없애기 */
  border: 1px solid black;
`
S.postListContainer = styled.div`
  height: calc(120px * 3);
  width: 1160px;
  display: flex;
  flex-direction: column;
  & {
    ${h7Bold}
  }
`
S.postListWrap = styled.div`
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #EEE;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
S.postTextWrap = styled.div`
  background-color: white;
  height: 100;
  & .target{
    color: #00D674;
  }
`
S.resultWrap = styled.div`
  ${h5Medium}
  display: flex;
  justify-content: space-between;
  width: 1160px;
  & img{
    width: 12px;
    margin-right: 8px;
  }
  & .blue {
    color:#2F96FD ;
  }
  & a {
    text-decoration-line: none;
    color: #000;
    ${h5Medium}
  }
`
S.postTitleWrap = styled.div`
  display: row;
  & span {
    ${h6Bold}
  }
  & .target{
    color: #00D674;
  }
`
S.postUserWrap = styled.div`
  background-color: green;
  display: flex;
  flex-direction: row;
  align-items: center;
`
S.questionLayOut = styled.div`
  width: 100%;
  height: calc(192px * 3 + 120px);
  background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
S.postUserBackground = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 100%;
`
S.javaBox = styled.div`
  width: 43px;
  height: 20px;
  background-color: #00D674;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
  & {
    ${h8Bold}
    color: #fff;
  }
`
S.oracleBox = styled.div`
  width: 58px;
  height: 20px;
  background-color: #7255EE;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
  & {
    ${h8Bold}
    color: #fff;
  }
`
S.jsBox = styled.div`
  width: 24px;
  height: 20px;
  display: flex;
  margin-bottom: 4px;
  background-color: #FFC600;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  & {
    ${h8Bold}
    color: #fff;
  }
`
S.contentWrap = styled.div`
  & span{
    ${h7Light}
  }
  & .target{
    color: #00D674;
  }
`
S.resultBorder = styled.div`
  width: 100%;
  border-bottom: 2px solid #2F96FD;
  height: 60px;
`
S.plustButton = styled.div`
  background-color: #fff;
  border: none;

`
  export default S;
