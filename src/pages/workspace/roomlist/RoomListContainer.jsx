import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import S from "./style";
import useDropDown from "../../../hooks/useDropDown";
import theme from "../../../styles/theme";
import { h9Bold } from "../../../styles/common";
import LevelOne from "../../user/grade/level1/LevelOne";

const RoomListContainer = () => {

  const [selectOpen, selectRef, selectHandler] = useDropDown();
  const [defficultOpen, defficultRef, defficultHandler] = useDropDown();
  const [users, setUsers] = useState(null);
  const currentExp = 523;
  const maxExp = 1000;
  const expPercent = (currentExp / maxExp) * 100;
  console.log(expPercent)
  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await fetch("/json_server/gamelist/user.json")
      if (!response.ok) throw new Error("게임리스트 오류");
      const jsonUsers = await response.json();
      const targetUser = jsonUsers?.users?.find((user) => user.userName == "만렙코더")
      setUsers(targetUser);
    }
    getCurrentUser()
      .then((res) => {
        console.log(res)
      })
      .catch(console.err)
  }, [])
  console.log(users)
  return (
    <S.GameRoomBackGround>
      <div>
        {/* 게임방 상단 토글 */}
        <S.GameRoomToggleWrap>
          <S.GameRoomToggle><S.IconCircle><img src="/assets/icons/plus2.png" /></S.IconCircle><span spanWrap>방 만들기</span></S.GameRoomToggle>
          <S.GameRoomToggle><S.IconCircle><img src="/assets/icons/flash.png" /></S.IconCircle><span>빠른 입장</span></S.GameRoomToggle>
          <S.DropConatiner ref={defficultRef}>
            <S.ButtonWrap>
              <S.GameRoomToggle onClick={defficultHandler}><S.IconCircle><img src="/assets/icons/star.png" /></S.IconCircle><span>중급</span></S.GameRoomToggle>
              {defficultOpen && (
                <S.DropDownMenu>
                  <span><S.IconCircle><img src="/assets/icons/star.png" /></S.IconCircle>초급</span>
                  <span><S.IconCircle><img src="/assets/icons/star.png" /></S.IconCircle>중급</span>
                  <span><S.IconCircle><img src="/assets/icons/star.png" /></S.IconCircle>중상급</span>
                  <span><S.IconCircle ><img src="/assets/icons/star.png" /></S.IconCircle>상급</span>
                  <span><S.IconCircle><img src="/assets/icons/star.png" /></S.IconCircle>최상급</span>
                </S.DropDownMenu>
              )}
            </S.ButtonWrap>
          </S.DropConatiner>
          <S.GameRoomToggle><S.IconCircle><img src="/assets/icons/people.png" /></S.IconCircle><span>개인전</span></S.GameRoomToggle>
          <S.GameRoomToggle><S.IconCircle><img src="/assets/icons/computer.png" /></S.IconCircle><span>게임방</span></S.GameRoomToggle>
        </S.GameRoomToggleWrap>
        {/* <Link to={`/workspace/rooms/${1}`}>방1</Link>
        <Link to={`/workspace/rooms/${2}`}>방2</Link>
        <Link to={`/workspace/rooms/${3}`}>방3</Link>
        <Link to={`/workspace/rooms/${4}`}>방4</Link>
        <Link to={`/workspace/rooms/${5}`}>방5</Link> */}


        {/* 중앙에  왼쪽 친구찾기검색바, 오른쪽 방 검색, 정렬버튼 */}
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
            <S.RightInput placeholder="방 번호 또는 제목을 입력하세요" />
            <img className="lastImg" src="/assets/icons/search.png" />
          </S.RightWrap>
        </S.SearchWrap>
        {/* 게임방리스트 왼쪽 유저 인터페이스(친구창, 유저카드) */}
        <S.LeftInterFaceWrap>
          <S.LeftFriendWrap>
            <span>맞팔로우를 통해 친구를 < br />사귀어보세요</span>
          </S.LeftFriendWrap>
          {users && (
            <S.LeftUserCardWrap>
              {/* 유저카드헤더 */}
              <S.LeftUserHeaderWrap>
                <span><img src="/assets/icons/usericon.svg" />내정보</span>
                <div>
                  <span><img src="/assets/icons/trophy.png" />업적</span>
                  <span><img src="/assets/icons/fire.png" /> {users.streak}</span>
                </div>
                <span><img src="/assets/icons/setting.svg" /></span>
              </S.LeftUserHeaderWrap>
              {/* 유저카드바디 */}
              <S.LeftUserMainWrap>
                <S.UserProfileImgWrap>
                  <img src="/assets/images/chicken.png" />
                </S.UserProfileImgWrap>
                <S.LeftUserMainTextWrap>
                  <S.LeftUserCardName>
                    {users.userName}
                  </S.LeftUserCardName>
                  <S.UserInfoWrap>
                    <S.UserInfoRow>
                      <S.UserInfoTitle>레벨</S.UserInfoTitle>
                      <S.UserInfoContent level>LV {users.userLevel}</S.UserInfoContent>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoTitle>기술</S.UserInfoTitle>
                      <S.UserInfoContent>{users.mainSkill}</S.UserInfoContent>
                    </S.UserInfoRow>
                    <S.UserInfoRow>
                      <S.UserInfoTitle>승리</S.UserInfoTitle>
                      <S.UserInfoContent>{users.wins}승</S.UserInfoContent>
                    </S.UserInfoRow>
                  </S.UserInfoWrap>

                </S.LeftUserMainTextWrap>
              </S.LeftUserMainWrap>
              {/* 유저카드푸터 */}
              <S.LeftUserCheerUp>
                <p>{users.statusMessage}</p>
              </S.LeftUserCheerUp>
              <S.ExpBarWrap>
                <S.ExpBarFill style={{ width: `${(users.userExp / maxExp) * 100}%` }} />
              </S.ExpBarWrap>
              <S.ExpText>{users.userExp} / {maxExp}</S.ExpText>
            </S.LeftUserCardWrap>
          )}
        </S.LeftInterFaceWrap>


      </div>
    </S.GameRoomBackGround>
  );
};

export default RoomListContainer;
