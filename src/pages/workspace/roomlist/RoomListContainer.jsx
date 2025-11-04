import React from "react";
import { Link, Outlet } from "react-router-dom";
import S from "./style";
import useDropDown from "../../../hooks/useDropDown";

const RoomListContainer = () => {

  const [selectOpen, selectRef, selectHandler] = useDropDown();
  const [defficultOpen, defficultRef, defficultHandler] = useDropDown();

  return (
    <S.GameRoomBackGround>
      <div>
        <S.GameRoomToggleWrap>
          <S.GameRoomToggle><span><S.IconCircle><img src="/assets/icons/plus2.png" /></S.IconCircle>방 만들기</span></S.GameRoomToggle>
          <S.GameRoomToggle><span><S.IconCircle><img src="/assets/icons/flash.png" /></S.IconCircle>빠른 입장</span></S.GameRoomToggle>
          <S.DropConatiner ref={defficultRef}>
            <S.ButtonWrap>
              <S.GameRoomToggle onClick={defficultHandler}><span><S.IconCircle><img src="/assets/icons/star.png" /></S.IconCircle>중급</span></S.GameRoomToggle>
              {defficultOpen && (
                <S.DropDownMenu>
                  <span><S.IconCircle><img src="/assets/icons/star.png" /></S.IconCircle>초급</span>
                  <span><S.IconCircle><img src="/assets/icons/star.png" /></S.IconCircle>중급</span>
                  <span><S.IconCircle><img src="/assets/icons/star.png" /></S.IconCircle>중상급</span>
                  <span ><S.IconCircle ><img src="/assets/icons/star.png" /></S.IconCircle>상급</span>
                  <span ><S.IconCircle><img src="/assets/icons/star.png" /></S.IconCircle>최상급</span>
                </S.DropDownMenu>
              )}
            </S.ButtonWrap>
          </S.DropConatiner>
          <S.GameRoomToggle><span><S.IconCircle><img src="/assets/icons/people.png" /></S.IconCircle>개인전</span></S.GameRoomToggle>
          <S.GameRoomToggle><span><S.IconCircle><img src="/assets/icons/computer.png" /></S.IconCircle>게임방</span></S.GameRoomToggle>
        </S.GameRoomToggleWrap>
        {/* <Link to={`/workspace/rooms/${1}`}>방1</Link>
        <Link to={`/workspace/rooms/${2}`}>방2</Link>
        <Link to={`/workspace/rooms/${3}`}>방3</Link>
        <Link to={`/workspace/rooms/${4}`}>방4</Link>
        <Link to={`/workspace/rooms/${5}`}>방5</Link> */}



        <S.SearchWrap>

          <S.LeftWrap>
            <S.LeftInput placeholder="친구 찾기">
            </S.LeftInput>
            <img src="/assets/icons/search.png" />
          </S.LeftWrap>

          <S.RightWrap>
            <S.RightArrayWrap>
              <span>최신순</span><S.IconBox><img src="/assets/icons/Symbol.svg" /></S.IconBox>
            </S.RightArrayWrap>
            <S.RightRefreshWrap>
              <span>목록 새로고침</span><S.IconBox><img src="/assets/icons/Refresh.svg" /></S.IconBox>
            </S.RightRefreshWrap>
            <S.RightInput placeholder="방 번호 또는 제목을 입력하세요"/>
            <img className="lastImg"src="/assets/icons/search.png" />
          </S.RightWrap>
        </S.SearchWrap>
      </div>
    </S.GameRoomBackGround>
  );
};

export default RoomListContainer;
