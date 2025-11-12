import S from "./style";
import Su from "../style";
import ChangePasswordContainer from "./ChangePasswordContainer";

import { useState } from "react";
import { useForm } from "react-hook-form";

const FindPasswordContainer = () => {
  const [showPasswordSendForm, setShowPasswordSendForm] = useState(true);
  const [showPhoneSend, setShowPhoneSend] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPhoneVerify, setShowPhoneVerify] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const phoneRegex = /^010\d{8}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const hasNumber = /\d/.test(passwordValue);
  const hasSpecial = /[!@#]/.test(passwordValue);
  const hasMinLen = passwordValue.length >= 8;

  const handleSubmitButton = handleSubmit(
    async (data) => {
      console.log("handleSubmit 콜백 들어옴");
      const { password, passwordConfirm, confirmKey, ...formData } = data;
      console.log("formData:", formData);

      const getTempToken = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/tmp-token`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          method: "POST",
        }
      );

      if (!getTempToken.ok) {
        return;
      }

      stepThree();
    },
    (submitErrors) => {
      console.log("검증 실패:", submitErrors);
    }
  );

  const checkPhone = () => {
    if (errors?.userPhone?.type === "required")
      return <Su.AlertText>전화번호를 입력하세요.</Su.AlertText>;
    if (errors?.userPhone?.type === "pattern")
      return <Su.AlertText>전화번호 양식에 맞게 입력해주세요.</Su.AlertText>;
    return null;
  };

  const handlePhoneBlur = async (e) => {
    const phone = e.target.value;
    await trigger("userPhone");
    if (phoneRegex.test(phone)) setShowPhoneSend(true);
    else {
      setShowPhoneSend(false);
      setShowPhoneVerify(false);
      setShowChangePassword(false);
      setShowResult(false);
    }
  };

  const stepOne = () => {
    setShowPasswordSendForm(true);
    setShowPhoneSend(false);
    setShowPhoneVerify(false);
    setShowChangePassword(false);
    setShowResult(false);
  };

  const stepTwo = async () => {
    const validPhone = await trigger("userPhone");
    if (!validPhone) return;
    setShowPasswordSendForm(true);
    setShowPhoneSend(false);
    setShowPhoneVerify(true);
    setShowChangePassword(false);
    setShowResult(false);
  };

  const stepThree = () => {
    setShowPasswordSendForm(false);
    setShowPhoneSend(false);
    setShowPhoneVerify(false);
    setShowChangePassword(true);
    setShowResult(false);
  };

  const stepFour = () => {
    const passwordConfirm = getValues("passwordConfirm");
    const password = getValues("password");
    if (!hasNumber || !hasSpecial || !hasMinLen || passwordConfirm !== password)
      return;

    setShowPasswordSendForm(false);
    setShowPhoneSend(false);
    setShowPhoneVerify(false);
    setShowChangePassword(false);
    setShowResult(true);
  };

  return (
    <Su.ContentContainer>
      <Su.LogoWrapper>
        <Su.LogoGrean>Web</Su.LogoGrean>
        <Su.LogoBlue>Nest</Su.LogoBlue>
      </Su.LogoWrapper>

      <div style={{ display: showPasswordSendForm ? "block" : "none" }}>
        <S.FindPwForm onSubmit={handleSubmitButton}>
          <S.FindLinkWrapper>
            <S.FindLink to="/find-id">아이디 찾기</S.FindLink>
            <S.FindLink to="/sign-in">로그인하기</S.FindLink>
          </S.FindLinkWrapper>

          <Su.InputNameWrapper>
            <Su.InputName>이름</Su.InputName>
            <Su.InputEssential>(필수)</Su.InputEssential>
          </Su.InputNameWrapper>
          <Su.InputWrapper>
            <Su.Input
              type="text"
              placeholder="이름"
              {...register("userName", {
                required: "이름을 입력하세요.",
              })}
            />
          </Su.InputWrapper>
          {errors.userName && (
            <Su.AlertText>{errors.userName.message?.toString()}</Su.AlertText>
          )}

          <Su.InputNameWrapper>
            <Su.InputName>본인 확인 이메일</Su.InputName>
            <Su.InputEssential>(필수)</Su.InputEssential>
          </Su.InputNameWrapper>
          <Su.InputWrapper>
            <Su.Input
              type="text"
              placeholder="이메일"
              {...register("userEmail", {
                required: "이메일을 입력하세요.",
                pattern: {
                  value: emailRegex,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
            />
          </Su.InputWrapper>
          {errors.userEmail && (
            <Su.AlertText>{errors.userEmail.message?.toString()}</Su.AlertText>
          )}

          <Su.InputNameWrapper>
            <Su.InputName>본인 확인 전화 번호</Su.InputName>
            <Su.InputEssential>(필수)</Su.InputEssential>
          </Su.InputNameWrapper>
          <Su.InputExplanation>
            가입 시 작성한 이름과 아이디, 전화번호를 정확하게 입력하지 않으면
            인증번호가 발송되지 않습니다.
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
            style={{ display: showPhoneSend ? "block" : "none" }}>
            <Su.InputNameWrapper>
              <Su.InputName>휴대폰 인증</Su.InputName>
              <Su.InputEssential>(필수)</Su.InputEssential>
            </Su.InputNameWrapper>
            <Su.InputExplanation>
              휴대폰으로 전송된 키를 입력해주세요.
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
              <Su.InputName>휴대폰 인증</Su.InputName>
              <Su.InputEssential>(필수)</Su.InputEssential>
            </Su.InputNameWrapper>
            <Su.InputExplanation>
              휴대폰으로 전송된 키를 입력해주세요.
            </Su.InputExplanation>
            <Su.InputWrapper>
              <Su.Input
                type="text"
                placeholder="인증 키"
                {...register("confirmKey", {
                  // required: "인증 키를 입력하세요.",
                })}
              />
            </Su.InputWrapper>
            {errors.confirmKey && (
              <Su.AlertText>
                {errors.confirmKey.message?.toString()}
              </Su.AlertText>
            )}

            <Su.Button type="submit">인증 번호 확인</Su.Button>

            <S.PhoneVerification>
              <button type="button" onClick={stepTwo}>
                인증 키 재전송
              </button>
              <button type="button" onClick={stepOne}>
                전화번호 수정하기
              </button>
            </S.PhoneVerification>
          </div>
        </S.FindPwForm>
      </div>

      {/* <ChangePasswordContainer
        stepFour={stepFour}
        setPasswordValue={setPasswordValue}
        showResult={showResult}
        register={register}
        handleSubmit={handleSubmit}
        trigger={trigger}
        getValues={getValues}
        style={{ display: showChangePassword ? "block" : "none" }}
      /> */}
    </Su.ContentContainer>
  );
};

export default FindPasswordContainer;
