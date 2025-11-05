import S from "./style";
import Su from "../style";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FindIdContainer = () => {
  const name = "홍길동";
  const navigate = useNavigate();
  const [showEmailSendForm, setShowEmailSendForm] = useState(true);
  const [showEmailSend, setShowEmailSend] = useState(false);
  const [showEmailVerify, setShowEmailVerify] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSumbmitForm = handleSubmit(async (data) => {
    fetch("url", {
      body: JSON.stringify(data),
    });
  });

  const checkEmail = () => {
    if (errors?.email?.type === "required") {
      return <Su.AlertText>이메일을 입력하세요.</Su.AlertText>;
    }
    if (errors?.email?.type === "pattern") {
      return <Su.AlertText>이메일 양식에 맞게 입력해주세요.</Su.AlertText>;
    }
    return null;
  };

  const handleEmailBlur = async (e) => {
    const email = e.target.value;
    await trigger("email");
    if (emailRegex.test(email)) {
      setShowEmailSend(true);
    } else {
      setShowEmailSend(false);
      setShowEmailVerify(false);
      setShowResult(false);
    }
  };

  const stepOne = () => {
    setShowEmailSendForm(true);
    setShowEmailSend(false);
    setShowEmailVerify(false);
    setShowResult(false);
  };

  const stepTwo = async () => {
    const validEmail = await trigger("email");
    if (!validEmail) return;
    setShowEmailSendForm(true);
    setShowEmailSend(false);
    setShowEmailVerify(true);
    setShowResult(false);
  };

  const stepThree = () => {
    setShowEmailSendForm(false);
    setShowEmailSend(false);
    setShowEmailVerify(false);
    setShowResult(true);
  };

  return (
    <>
      <Su.ContentContainer>
        <Su.LogoWrapper>
          <Su.LogoGrean>Web</Su.LogoGrean>
          <Su.LogoBlue>Nest</Su.LogoBlue>
        </Su.LogoWrapper>

        <div style={{ display: showEmailSendForm ? "block" : "none" }}>
          <S.FindLinkWrapper>
            <S.FindLink to="/sign-in">로그인하기</S.FindLink>
            <S.FindLink to="/find-password">비밀번호 찾기</S.FindLink>
          </S.FindLinkWrapper>

          <S.FindIdForm onSubmit={handleSumbmitForm}>
            <Su.InputNameWrapper>
              <Su.InputName>이름</Su.InputName>
              <Su.InputEssential>(필수)</Su.InputEssential>
            </Su.InputNameWrapper>
            <Su.InputWrapper>
              <Su.Input type="text" placeholder="이름" />
            </Su.InputWrapper>

            <Su.InputNameWrapper>
              <Su.InputName>본인 확인 이메일</Su.InputName>
              <Su.InputEssential>(필수)</Su.InputEssential>
            </Su.InputNameWrapper>
            <Su.InputExplanation>
              가입 시 작성한 이름과 아이디, 이메일을 정확하게 입력하지 않으면
              메일이 발송되지 않습니다.
            </Su.InputExplanation>

            <Su.InputWrapper>
              <Su.Input
                type="text"
                placeholder="이메일"
                readOnly={showEmailSend || showEmailVerify}
                {...register("email", {
                  required: true,
                  pattern: { value: emailRegex },
                })}
                onBlur={handleEmailBlur}
              />
            </Su.InputWrapper>

            {checkEmail()}

            <S.SendEmailWrapper
              style={{ display: showEmailSend ? "block" : "none" }}
            >
              <Su.InputNameWrapper>
                <Su.InputName>이메일 인증</Su.InputName>
                <Su.InputEssential>(필수)</Su.InputEssential>
              </Su.InputNameWrapper>
              <Su.InputExplanation>
                이메일로 전송된 키를 입력해주세요.
              </Su.InputExplanation>
              <Su.Button type="button" onClick={stepTwo}>
                인증 메일 발송
              </Su.Button>
              <S.EmailVerification>
                <button type="button" onClick={stepOne}>
                  이메일 수정하기
                </button>
              </S.EmailVerification>
            </S.SendEmailWrapper>

            <div style={{ display: showEmailVerify ? "block" : "none" }}>
              <Su.InputNameWrapper>
                <Su.InputName>이메일 인증</Su.InputName>
                <Su.InputEssential>(필수)</Su.InputEssential>
              </Su.InputNameWrapper>
              <Su.InputExplanation>
                이메일로 전송된 키를 입력해주세요.
              </Su.InputExplanation>
              <Su.InputWrapper>
                <Su.Input type="text" placeholder="인증 키" />
              </Su.InputWrapper>
              <Su.Button type="button" onClick={stepThree}>
                인증 메일 확인
              </Su.Button>
              <S.EmailVerification>
                <button type="button" onClick={stepTwo}>
                  인증 키 재전송
                </button>
                <button type="button" onClick={stepOne}>
                  이메일 수정하기
                </button>
              </S.EmailVerification>
            </div>
          </S.FindIdForm>
        </div>

        <div style={{ display: showResult ? "block" : "none" }}>
          <S.FoundResult>
            회원님의 아이디는 '{name}'입니다.
            <Su.Button type="button" onClick={() => navigate("/sign-in")}>
              로그인하러 가기
            </Su.Button>
            <S.FindLink to="/find-password">비밀번호 찾기</S.FindLink>
          </S.FoundResult>
        </div>
      </Su.ContentContainer>
    </>
  );
};

export default FindIdContainer;
