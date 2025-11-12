import S from "./style";
import Su from "../style";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const FindPasswordContainer = () => {

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isSendVerificationCode, setIsSendVerificationCode] = useState(false)
  const [handleModifyPasswordForm, setHandleModifyPasswordForm] = useState(false);
  const [errorCount, setErrorCount] = useState(0)

  const {
    watch,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const phoneRegex = /^010\d{8}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const userPhoneValue = watch("userPhone", "")

  // user phone을 감시
  useEffect(() => {
    let isTest = phoneRegex.test(userPhoneValue)
    setIsPhoneValid(isTest)
    if(!isTest){ setIsSendVerificationCode(false) }
  }, [userPhoneValue])
  
  const sendVerificationCode = () => {
    console.log("인증번호 발송 로직")
    // 발송 상태 true 변경
    setIsSendVerificationCode(true)
  }

  const confirmVerificationCode = () => {
    const expressionCode = getValues("confirmKey");
    const authenticationCode = "1234";

    let isValid = expressionCode === authenticationCode;
    if(!isValid) { 
      setErrorCount(errorCount + 1)
      console.log(errorCount)
      if(errorCount + 1 >= 3){
        alert("처음부터 다시 인증해주세요.😥")
        setIsSendVerificationCode(false)
        setErrorCount(0)
        return;
      }
      alert("인증 코드를 확인해주세요.😎")
      return;
    }

    // 비밀번호 변경 로직으로 변경
    setHandleModifyPasswordForm(true)
    console.log("인증번호 입력 확인 후 입력한 코드와 일치하는지 여부 확인 후 맞으면 true")
  }

  const handleSubmitButton = handleSubmit(
    async (data) => {
      const { password, passwordConfirm, confirmKey, ...formData } = data;
  });

  return (
    <Su.ContentContainer>
      <Su.LogoWrapper>
        <Su.LogoGrean>Web</Su.LogoGrean>
        <Su.LogoBlue>Nest</Su.LogoBlue>
      </Su.LogoWrapper>
      <div>
        <S.FindPwForm onSubmit={handleSubmitButton}>
          <S.FindLinkWrapper>
            <S.FindLink to="/find-id">아이디 찾기</S.FindLink>
            <S.FindLink to="/sign-in">로그인하기</S.FindLink>
          </S.FindLinkWrapper>
          { !handleModifyPasswordForm ? (
            <>
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
                  {...register("userPhone", {
                    required: "전화 번호를 입력하세요.",
                    pattern: {
                      value: phoneRegex,
                      message: "전화 번호 형식이 올바르지 않습니다.",
                    },
                    setValueAs: (v) => (v ? v.replace(/\D/g, "") : ""),
                  })}
                />
              </Su.InputWrapper>
              {errors?.userPhone?.type === "required" && (
                <Su.AlertText>전화번호를 입력하세요.</Su.AlertText>
              )}
              {errors?.userPhone?.type === "pattern" && (
                <Su.AlertText>전화번호 양식에 맞게 입력해주세요.</Su.AlertText>
              )}

              { isPhoneValid ? (
                <S.SendPhoneWrapper>
                  <Su.InputNameWrapper>
                    <Su.InputName>휴대폰 인증</Su.InputName>
                    <Su.InputEssential>(필수)</Su.InputEssential>
                  </Su.InputNameWrapper>
                  <Su.InputExplanation>
                  </Su.InputExplanation>
                  { !isSendVerificationCode ? (
                    <>
                      <Su.Button type="button" onClick={sendVerificationCode}>
                        인증 번호 발송
                      </Su.Button>
                      <S.PhoneVerification>
                        <button type="button">
                          전화 번호 수정하기
                        </button>
                      </S.PhoneVerification>
                    </>
                  ) : (
                    <>
                      <Su.InputExplanation>
                        휴대폰으로 전송된 키를 입력해주세요.
                      </Su.InputExplanation>
                      <Su.InputWrapper>
                        <Su.Input
                          type="text"
                          placeholder="인증 키"
                          {...register("confirmKey")}
                        />
                      </Su.InputWrapper>
                      <Su.Button type="button" onClick={confirmVerificationCode}>인증 번호 확인</Su.Button>
                      <S.PhoneVerification>
                        <button type="button">
                          인증 키 재전송
                        </button>
                        <button type="button">
                          전화번호 수정하기
                        </button>
                      </S.PhoneVerification>
                    </>
                  )}
                </S.SendPhoneWrapper>
              ) : <></>}
              <div>
                {errors.confirmKey && (
                  <Su.AlertText>
                    {errors.confirmKey.message?.toString()}
                  </Su.AlertText>
                )}
              </div>
            </>
          ): (
            <>
            
            {/* 만들려고 했던 비밀번호 변경 폼 */}


            </>
          )}
        </S.FindPwForm>
      </div>
    </Su.ContentContainer>
  );
};

export default FindPasswordContainer;
