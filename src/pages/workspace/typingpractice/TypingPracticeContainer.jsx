import React, { useContext, useEffect, useState } from "react";
import S from "./style";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ResultModal from "./typingresult/ResultModal";
import TypingInfo from "./typinginfo/TypingInfo";
import { TypingContext } from "context/TypingContext";

const TypingPracticeContainer = () => {

  // 모달 핸들러
  const navigate = useNavigate();
  const {state, actions} = useContext(TypingContext)
  const { typingList, isShowModal, language, isShort} = state;
  const { handleShowModal, setIsShowModal, setLanguage, setIsShort} = actions;

  return (
    <>
    <S.Main>
       {/* 상단 옵션 영역 */}
      <S.Option>
        <S.ModeSelect>
          { isShort ? (
            <S.ModeButton
              onClick={() => {
                setIsShort("long")
              }}
            >
              긴 글 연습
            </S.ModeButton>
          ) : (
            <S.ModeButton
              onClick={() => {
                setIsShort("short")
              }}
            >
              짧은 글 연습
            </S.ModeButton>
          )}
        </S.ModeSelect>

        <S.LanguageSelect>
          <S.ToggleWrapper>
            <S.ToggleButton />
            <span className="ko" onClick={() => setLanguage("한국어")}>한국어</span>
            <span className="en" onClick={() => setLanguage("영어")}>ENG</span>
          </S.ToggleWrapper>
        </S.LanguageSelect>
      </S.Option>

      <S.TypingAll>
        <TypingInfo />

        <Outlet />
        </S.TypingAll>
        {/* 오른쪽 아래 버튼 */}
        <S.StopPracticeButton onClick={() => navigate("/workspace/rooms")}>
          타자연습<br />그만하기
        </S.StopPracticeButton>

      </S.Main>

      {/* 모달 */}
      {isShowModal ? <ResultModal /> : <></>}
    </>
  );
};

export default TypingPracticeContainer;
