import S from "./style";
import Su from "../style";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router-dom";

const FindIdContainer = () => {
  const navigate = useNavigate();
  const [showPhoneSendForm, setShowPhoneSendForm] = useState(true);
  const [showPhoneSend, setShowPhoneSend] = useState(false);
  const [showPhoneVerify, setShowPhoneVerify] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [foundEmails, setFoundEmails] = useState([]);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const phoneRegex = /^010\d{8}$/;

  const handleSumbmitForm = handleSubmit(async (data) => {
    const fetching = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/find-email`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        method: "POST",
      }
    ).catch(() => {
      redirect("/find-id");
    });

    if (!fetching.ok) {
      throw new Error("failed");
    }

    const result = await fetching.json();
    setFoundEmails(result.data);
  });

  const checkPhone = () => {
    if (errors?.userPhone?.type === "required") {
      return <Su.AlertText>전화 번호를 입력하세요.</Su.AlertText>;
    }
    if (errors?.userPhone?.type === "pattern") {
      return <Su.AlertText>전화 번호 양식에 맞게 입력해주세요.</Su.AlertText>;
    }
    return null;
  };

  const handlePhoneBlur = async (e) => {
    const phone = e.target.value;
    await trigger("userPhone");
    if (phoneRegex.test(phone)) {
      setShowPhoneSend(true);
    } else {
      setShowPhoneSend(false);
      setShowPhoneVerify(false);
      setShowResult(false);
    }
  };

  const stepOne = () => {
    setShowPhoneSendForm(true);
    setShowPhoneSend(false);
    setShowPhoneVerify(false);
    setShowResult(false);
  };

  const stepTwo = async () => {
    const validPhone = await trigger("userPhone");
    if (!validPhone) return;
    setShowPhoneSendForm(true);
    setShowPhoneSend(false);
    setShowPhoneVerify(true);
    setShowResult(false);
  };

  const stepThree = () => {
    setShowPhoneSendForm(false);
    setShowPhoneSend(false);
    setShowPhoneVerify(false);
    setShowResult(true);
  };

  return (
    <>
      <Su.ContentContainer>
        <Su.LogoWrapper>
          <Su.LogoGrean>Web</Su.LogoGrean>
          <Su.LogoBlue>Nest</Su.LogoBlue>
        </Su.LogoWrapper>

        <div style={{ display: showPhoneSendForm ? "block" : "none" }}>
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
              <Su.Input
                type="text"
                placeholder="이름"
                {...register("userName")}
              />
            </Su.InputWrapper>

            <Su.InputNameWrapper>
              <Su.InputName>본인 확인 전화 번호</Su.InputName>
              <Su.InputEssential>(필수)</Su.InputEssential>
            </Su.InputNameWrapper>
            <Su.InputExplanation>
              가입 시 작성한 이름과 전화 번호를 정확하게 입력하지 않으면 번호가
              발송되지 않습니다.
            </Su.InputExplanation>

            <Su.InputWrapper>
              <Su.Input
                type="tel"
                placeholder="01012345678"
                readOnly={showPhoneSend || showPhoneVerify}
                {...register("userPhone", {
                  required: "전화 번호를 입력하세요.",
                  pattern: {
                    value: phoneRegex,
                    message: "전화 번호 형식이 올바르지 않습니다.",
                  },
                  setValueAs: (v) => (v ? v.replace(/\D/g, "") : ""),
                })}
                onBlur={handlePhoneBlur}
              />
            </Su.InputWrapper>

            {checkPhone()}

            <S.SendPhoneWrapper
              style={{ display: showPhoneSend ? "block" : "none" }}
            >
              <Su.InputNameWrapper>
                <Su.InputName>전화 번호 인증</Su.InputName>
                <Su.InputEssential>(필수)</Su.InputEssential>
              </Su.InputNameWrapper>
              <Su.InputExplanation>
                전화 번호로 전송된 키를 입력해주세요.
              </Su.InputExplanation>
              <Su.Button type="button" onClick={stepTwo}>
                인증 번호 발송
              </Su.Button>
              <S.PhoneVerification>
                <button type="button" onClick={stepOne}>
                  전화 번호 수정하기
                </button>
              </S.PhoneVerification>
            </S.SendPhoneWrapper>

            <div style={{ display: showPhoneVerify ? "block" : "none" }}>
              <Su.InputNameWrapper>
                <Su.InputName>전화 번호 인증</Su.InputName>
                <Su.InputEssential>(필수)</Su.InputEssential>
              </Su.InputNameWrapper>
              <Su.InputExplanation>
                전화 번호로 전송된 키를 입력해주세요.
              </Su.InputExplanation>
              <Su.InputWrapper>
                <Su.Input type="text" placeholder="인증 키" />
              </Su.InputWrapper>
              <Su.Button type="submit" onClick={stepThree}>
                인증 번호 확인
              </Su.Button>
              <S.PhoneVerification>
                <button type="button" onClick={stepTwo}>
                  인증 키 재전송
                </button>
                <button type="button" onClick={stepOne}>
                  전화 번호 수정하기
                </button>
              </S.PhoneVerification>
            </div>
          </S.FindIdForm>
        </div>

        <div style={{ display: showResult ? "block" : "none" }}>
          <S.FoundResult>
            조회된 아이디는
            {foundEmails && foundEmails.length > 0 ? (
              foundEmails.map((foundEmail, idx) => (
                <span key={idx}>
                  {idx > 0 && ", "}
                  {foundEmail}
                </span>
              ))
            ) : (
              <span></span>
            )}
            입니다.
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
