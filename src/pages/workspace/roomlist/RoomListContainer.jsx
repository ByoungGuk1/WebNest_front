import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import S from "./style";
import useDropDown from "../../../hooks/useDropDown";
import theme from "../../../styles/theme";
import { h9Bold } from "../../../styles/common";
import LevelOne from "../../user/grade/level1/LevelOne";
import HeaderToggle from "./headertoggle/HeaderToggle";
import MiddleSearchBar from "./middlesearchbar/MiddleSearchBar";
import LeftUserInterface from "./leftuserinterface/LeftUserInterface";
import RoomList from "./RoomList";

console.log('MiddleSearchBar =>', MiddleSearchBar);

const RoomListContainer = () => {

  return (
    // 백그라운드 이미지지
    <S.GameRoomBackGround>
      <div>
        {/* 게임방 상단 토글 */}
        <HeaderToggle />
        <S.LayoutWrapper>
          {/* 게임방리스트 왼쪽 유저 인터페이스(친구창, 유저카드) */}
          <MiddleSearchBar />
          <S.ListWrapper >
            {/* 중앙에  왼쪽 친구찾기검색바, 오른쪽 방 검색, 정렬버튼 */}
            <LeftUserInterface />
            {/* 채팅방 목록 */}
            <S.RoomListWrapper>
              <RoomList />
            </S.RoomListWrapper>
          </S.ListWrapper>
        </S.LayoutWrapper>
      </div>
    </S.GameRoomBackGround>
  );
};

export default RoomListContainer;
