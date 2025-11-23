import React, { useContext, useEffect, useState } from "react";
import S from "./style";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ResultModal from "./typingresult/ResultModal";
import TypingInfo from "./typinginfo/TypingInfo";
import { TypingContext } from "context/TypingContext";

const TypingPracticeContainer = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {state, actions} = useContext(TypingContext)
  const { typingList, isShowModal, language, isShort} = state;
  const { handleShowModal, setIsShowModal, setLanguage, setIsShort} = actions;

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
        <Outlet key={state.currentTypingId + "-" + state.finalResult} />

      </S.TypingAll>
      <S.StopPracticeButton onClick={() => navigate("/workspace/rooms")}>
        타자연습<br />그만하기
      </S.StopPracticeButton>

      </S.Main>

      {isShowModal ? <ResultModal /> : <></>}
    </>
  );
};

export default TypingPracticeContainer;
