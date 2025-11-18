import React, { useContext, useEffect, useState } from "react";
import S from "./style";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ResultModal from "./typingresult/ResultModal";
import TypingInfo from "./typinginfo/TypingInfo";
import { TypingContext } from "context/TypingContext";

const TypingPracticeContainer = () => {

  // 모달 핸들러
  const navigate = useNavigate();
  const location = useLocation();
  const {state, actions} = useContext(TypingContext)
  const { typingList, isShowModal, language, isShort} = state;
  const { handleShowModal, setIsShowModal, setLanguage, setIsShort} = actions;

   //  URL에 따라 isShort 초기화 (새로고침 될떄 변화x)
    useEffect(() => {
      if (location.pathname.includes("long")) {
        setIsShort("long");
      } else {
        setIsShort("short");
      }
    }, [location.pathname]);

  return (
    <>
    <S.Main>
       {/* 상단 옵션 영역 */}
      <S.Option>
        <S.ModeSelect>
          {isShort === "short" ? (
            <S.ModeButton
              $active={true}
              onClick={() => {
                setIsShort("long");
                navigate("long");
              }}
            >
              긴 글 연습
            </S.ModeButton>
          ) : (
            <S.ModeButton
              $active={false}
              onClick={() => {
                setIsShort("short");
                navigate("");
              }}
            >
              짧은 글 연습
            </S.ModeButton>
          )}
        </S.ModeSelect>




        <S.LanguageSelect>
          <S.ToggleWrapper $lang={language} $isShort={isShort}>
            <S.ToggleButton $lang={language} $isShort={isShort} />


            <span
              className="ko"
              onClick={() => setLanguage("한국어")}
            >
              한국어
            </span>

            <span
              className="en"
              onClick={() => setLanguage("영어")}
            >
              ENG
            </span>
          </S.ToggleWrapper>
        </S.LanguageSelect>
      </S.Option>

      <S.TypingAll>
        <TypingInfo />

        {/* <Outlet /> */}
        <Outlet key={state.currentTypingId + "-" + state.finalResult} />




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
