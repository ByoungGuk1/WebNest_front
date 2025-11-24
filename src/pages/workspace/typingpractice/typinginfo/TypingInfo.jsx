import React, { useContext, useEffect, useState } from 'react';
import S from '../style';
import RunningTime from './RunningTime';
import RunningTyping from './RunningTyping';
import RunningAccuracy from './RunningAccuracy';
import { TypingContext } from 'context/TypingContext';
import { useSelector } from "react-redux";



// 🔥 프로필 이미지 URL 생성 함수
const getProfileUrl = (path, name) => {
  if (!name) return "/assets/images/chicken.png";

  const cleanPath = (path || "/img/")
    .replace(/^\//, "")
    .replace(/\/$/, "");

  const cleanName = name.replace(/^\//, "");

  return `${process.env.REACT_APP_BACKEND_URL}/file/display?fileName=${cleanPath}/${cleanName}`;
};


const TypingInfo = () => {

  const {state, actions } = useContext(TypingContext)
  const { typingList, currentTypingId, isShort } = state;
  const { setCurrentTypingId } = actions;
  const titles = typingList.map(({title}) => title)
  const [selectTitle, setSelectTitle] = useState("")
  const { currentUser } = useSelector((state) => state.user);


  // 모달 핸들러
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const handleDropdownMenu = () => setShowDropdownMenu(!showDropdownMenu)
  const handleSelectTitle = (i) => { 
    setSelectTitle(titles[i])
  }

  useEffect(() => {
    if(titles != []){
      setSelectTitle(titles[currentTypingId])
    }
  }, [state])

  return (
    <S.MyInfo>
      <S.MyInfoInner>
        <S.SelectTitle>글선택</S.SelectTitle>

        {/* 선택된 값 표시 영역 */}
        <S.DropdownBox onClick={handleDropdownMenu}>
          <span>{selectTitle}</span>
          <S.Arrow ><img src="/assets/images/downarrow.svg" alt="화살표" /></S.Arrow>
        </S.DropdownBox>

        {showDropdownMenu ? (
          <S.DropdownMenu>
              {titles.map((title, i) => (
              <S.DropdownItem key={i} onClick={() => {
                handleSelectTitle(i)
                setCurrentTypingId(i)
                setShowDropdownMenu(false)
              }}>{title} 
              </S.DropdownItem>
              ))}
          </S.DropdownMenu>
        ) : (
          <></>
        )}

        <S.ModeOption>
          {isShort === "short" ? "짧은 글 연습" : "긴 글 연습"}
        </S.ModeOption>

        <S.MyCharacter>
          {/* <img src="/assets/images/chicken.png" alt="캐릭터" /> */}
          <img
            src={getProfileUrl(
              currentUser?.userThumbnailUrl,
              currentUser?.userThumbnailName
            )}
            alt="프로필 이미지"
            onError={(e) => {
              e.currentTarget.src = "/assets/images/chicken.png";
            }}
          />

          {/* <S.CharacterName>만렙코더</S.CharacterName> */}
          {/* <S.CharacterName>
            {currentUser?.nickname || "Guest"}
          </S.CharacterName> */}
          <S.CharacterName>
            {currentUser?.userNickname || "Guest"}
          </S.CharacterName>

        </S.MyCharacter>

        <S.ProgressTitle>현재 진행도</S.ProgressTitle>

        <RunningTime />
        <RunningTyping />
        <RunningAccuracy />

      </S.MyInfoInner>
    </S.MyInfo>
  );
};

export default TypingInfo;