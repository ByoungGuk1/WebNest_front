import styled from "styled-components";
import { h4Medium, h5Medium, h6Bold } from "../../styles/common";
import theme from "styles/theme";
import { Link } from "react-router-dom";

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
  gap: 60px;
  padding-bottom: 60px;
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
  width: calc(920px / 5);
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
S.LayOutWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
S.LayOut = styled.div`
  width: 1160px;
  margin-bottom: 40px;
  
  &:last-child {
    margin-bottom: 0;
  }
`
S.SearchResultCategoryLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  ${h5Medium}
  .blue{
    color: #2F96FD;
  }
`
S.SearchResultCategoryRight = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  ${h5Medium}
`
S.SearchCategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1160px;
  border-bottom: 2px solid #2F96FD;
  padding-bottom: 12px;
`
S.CleanLink = styled(Link)`
  text-decoration: none;
  color: #121212;
`

// 리스트 래퍼 (문제둥지, 열린둥지용)
// PostListStyle.ListWrap의 기본 margin-top: 50px를 0으로 오버라이드
S.ListWrapWithMargin = styled.div`
  margin-top: 20px;
  
  /* PostListStyle.ListWrap의 margin-top 오버라이드 */
  > div[class*="ListWrap"] {
    margin-top: 0 !important;
  }
`

// 퀴즈 리스트 컨테이너 (훈련장용)
S.QuizListContainerWithMargin = styled.div`
  margin-top: 20px;
`

// 퀴즈 헤더 셀 (왼쪽 정렬)
S.QuizHeaderCell = styled.div`
  flex: 0.6;
  text-align: left;
  padding: 8px 4px;
  font-size: 16px;
  color: #333;
`

// 퀴즈 데이터 셀 (왼쪽 정렬)
S.QuizDataCell = styled.div`
  flex: 0.6;
  text-align: left;
  padding: 8px 4px;
  font-size: 16px;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

// UserResult 컴포넌트 래퍼 (마이페이지 친구 리스트와 동일한 스타일)
S.UserResultWrapper = styled.div`
  margin-top: 20px;
  
  /* UserResult의 상단 파란 strip 헤더는 그대로 표시 */
  /* 마이페이지에서는 숨기지만, 검색 결과에서는 표시 */
`

// 무한 스크롤 트리거
S.InfiniteScrollTrigger = styled.div`
  height: 20px;
  margin: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default S;
