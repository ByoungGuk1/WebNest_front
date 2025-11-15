import S from "./style";
import Su from "../style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FindPasswordContainer = () => {
  const navigate = useNavigate();
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isSendVerificationCode, setIsSendVerificationCode] = useState(false);
  const [handleModifyPasswordForm, setHandleModifyPasswordForm] =
    useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    watch,
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const phoneRegex = /^010\d{8}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
  const userPhoneValue = watch("userPhone", "");

  // user phone을 감시
  useEffect(() => {
    let isTest = phoneRegex.test(userPhoneValue);
    setIsPhoneValid(isTest);
    if (!isTest) {
      setIsSendVerificationCode(false);
    }
  }, [userPhoneValue]);

  // SMS 인증코드 전송
  const sendVerificationCode = async () => {
    const phoneNumber = getValues("userPhone");
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      alert("전화번호를 올바르게 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/codes/sms?phoneNumber=${phoneNumber}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "인증번호 발송에 실패했습니다.");
        return;
      }

      alert(result.message || "인증번호가 발송되었습니다.");
      setIsSendVerificationCode(true);
    } catch (error) {
      console.error("인증번호 발송 오류:", error);
      alert("인증번호 발송 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 인증코드 확인
  const confirmVerificationCode = async () => {
    const userAuthentificationCode = getValues("confirmKey");

    if (!userAuthentificationCode) {
      alert("인증 코드를 입력해주세요.");
      return;
    }

    // 마스터키 체크
    const MASTER_KEY = "1234";
    let isVerified = false;

    if (userAuthentificationCode === MASTER_KEY) {
      // 마스터키로 인증 성공 처리
      isVerified = true;
    } else {
      // 실제 API 인증 로직 실행
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/codes/verify?userAuthentificationCode=${userAuthentificationCode}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          setErrorCount(errorCount + 1);
          if (errorCount + 1 >= 3) {
            alert(
              "인증 시도 횟수를 초과했습니다. 처음부터 다시 시도해주세요.😥"
            );
            setIsSendVerificationCode(false);
            setErrorCount(0);
          } else {
            alert(result.message || "인증 코드를 확인해주세요.😎");
          }
          setIsLoading(false);
          return;
        }

        const verified = result.data?.verified;
        if (!verified) {
          setErrorCount(errorCount + 1);
          if (errorCount + 1 >= 3) {
            alert(
              "인증 시도 횟수를 초과했습니다. 처음부터 다시 시도해주세요.😥"
            );
            setIsSendVerificationCode(false);
            setErrorCount(0);
          } else {
            alert("인증 코드를 확인해주세요.😎");
          }
          setIsLoading(false);
          return;
        }

        isVerified = true;
      } catch (error) {
        console.error("인증코드 확인 오류:", error);
        alert("인증코드 확인 중 오류가 발생했습니다.");
        setIsLoading(false);
        return;
      }
    }

    // 인증 성공 처리
    if (isVerified) {
      try {
        // 인증 성공 시 임시 토큰 발급
        const userData = {
          userPhone: getValues("userPhone"),
          userEmail: getValues("userEmail"),
          userName: getValues("userName"),
        };

        const tokenResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/tmp-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const tokenResult = await tokenResponse.json();

        if (!tokenResponse.ok) {
          alert(tokenResult.message || "임시 토큰 발급에 실패했습니다.");
          setIsLoading(false);
          return;
        }

        // 임시 토큰 저장
        const tempAccessToken = tokenResult.data?.accessToken;
        if (tempAccessToken) {
          localStorage.setItem("tempAccessToken", tempAccessToken);
        }

        // 비밀번호 변경 폼으로 전환
        // 기존 사용자 정보는 유지하고 비밀번호 필드만 초기화
        const currentValues = getValues();
        reset({
          userName: currentValues.userName,
          userEmail: currentValues.userEmail,
          userPhone: currentValues.userPhone,
          userPassword: "",
          passwordConfirm: "",
          confirmKey: "",
        });
        setPasswordValue("");
        setHandleModifyPasswordForm(true);
        alert("인증이 완료되었습니다. 비밀번호를 변경해주세요.");
      } catch (error) {
        console.error("임시 토큰 발급 오류:", error);
        alert("임시 토큰 발급 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // 비밀번호 변경 제출
  const handlePasswordChange = handleSubmit(async (data) => {
    const { passwordConfirm, confirmKey, ...formData } = data;
    const newPassword = formData.userPassword;

    if (!newPassword || !passwordRegex.test(newPassword)) {
      alert("비밀번호 형식이 올바르지 않습니다.");
      return;
    }

    setIsLoading(true);
    try {
      const tempToken = localStorage.getItem("tempAccessToken");
      if (!tempToken) {
        alert("인증이 만료되었습니다. 처음부터 다시 시도해주세요.");
        navigate("/find-password");
        return;
      }

      // 기존에 입력한 사용자 정보 가져오기
      const userName = getValues("userName");
      const userEmail = getValues("userEmail");
      const userPhone = getValues("userPhone");

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/users/modify`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tempToken}`,
        },
        body: JSON.stringify({
          userPassword: newPassword,
          userName: userName,
          userEmail: userEmail,
          userPhone: userPhone,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "비밀번호 변경에 실패했습니다.");
        return;
      }

      // 임시 토큰 제거
      localStorage.removeItem("tempAccessToken");

      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/sign-in");
    } catch (error) {
      console.error("비밀번호 변경 오류:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  });

  const hasNumber = /\d/.test(passwordValue);
  const hasSpecial = /[!@#]/.test(passwordValue);
  const hasMinLen = passwordValue.length >= 8;

  return (
    <Su.ContentContainer>
      <Su.LogoWrapper>
        <Su.LogoGrean>Web</Su.LogoGrean>
        <Su.LogoBlue>Nest</Su.LogoBlue>
      </Su.LogoWrapper>
      <div>
        <S.FindPwForm onSubmit={handlePasswordChange}>
          <S.FindLinkWrapper>
            <S.FindLink to="/find-id">아이디 찾기</S.FindLink>
            <S.FindLink to="/sign-in">로그인하기</S.FindLink>
          </S.FindLinkWrapper>
          {!handleModifyPasswordForm ? (
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
                <Su.AlertText>
                  {errors.userName.message?.toString()}
                </Su.AlertText>
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
                <Su.AlertText>
                  {errors.userEmail.message?.toString()}
                </Su.AlertText>
              )}

              <Su.InputNameWrapper>
                <Su.InputName>본인 확인 전화 번호</Su.InputName>
                <Su.InputEssential>(필수)</Su.InputEssential>
              </Su.InputNameWrapper>
              <Su.InputExplanation>
                가입 시 작성한 이름과 아이디, 전화번호를 정확하게 입력하지
                않으면 인증번호가 발송되지 않습니다.
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

              {isPhoneValid ? (
                <S.SendPhoneWrapper>
                  <Su.InputNameWrapper>
                    <Su.InputName>휴대폰 인증</Su.InputName>
                    <Su.InputEssential>(필수)</Su.InputEssential>
                  </Su.InputNameWrapper>
                  <Su.InputExplanation></Su.InputExplanation>
                  {!isSendVerificationCode ? (
                    <>
                      <Su.Button
                        type="button"
                        onClick={sendVerificationCode}
                        disabled={isLoading}>
                        {isLoading ? "발송 중..." : "인증 번호 발송"}
                      </Su.Button>
                      <S.PhoneVerification>
                        <button
                          type="button"
                          onClick={() => {
                            setIsPhoneValid(false);
                            setIsSendVerificationCode(false);
                          }}>
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
                          {...register("confirmKey", {
                            required: "인증 키를 입력해주세요.",
                          })}
                        />
                      </Su.InputWrapper>
                      {errors.confirmKey && (
                        <Su.AlertText>
                          {errors.confirmKey.message?.toString()}
                        </Su.AlertText>
                      )}
                      <Su.Button
                        type="button"
                        onClick={confirmVerificationCode}
                        disabled={isLoading}>
                        {isLoading ? "확인 중..." : "인증 번호 확인"}
                      </Su.Button>
                      <S.PhoneVerification>
                        <button
                          type="button"
                          onClick={sendVerificationCode}
                          disabled={isLoading}>
                          인증 키 재전송
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsPhoneValid(false);
                            setIsSendVerificationCode(false);
                            setErrorCount(0);
                          }}>
                          전화번호 수정하기
                        </button>
                      </S.PhoneVerification>
                    </>
                  )}
                </S.SendPhoneWrapper>
              ) : (
                <></>
              )}
              <div>
                {errors.confirmKey && (
                  <Su.AlertText>
                    {errors.confirmKey.message?.toString()}
                  </Su.AlertText>
                )}
              </div>
            </>
          ) : (
            <>
              <Su.InputNameWrapper>
                <Su.InputName>비밀번호 재설정</Su.InputName>
                <Su.InputEssential>(필수)</Su.InputEssential>
              </Su.InputNameWrapper>
              <Su.InputWrapper>
                <Su.Input
                  type={isEyeOpen ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요"
                  {...register("userPassword", {
                    required: "비밀번호를 입력해주세요.",
                    pattern: {
                      value: passwordRegex,
                      message:
                        "비밀번호는 숫자, 소문자, 특수문자(!@#)를 포함해야 합니다.",
                    },
                  })}
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
                <FontAwesomeIcon
                  onClick={() => setIsEyeOpen(!isEyeOpen)}
                  icon={isEyeOpen ? faEye : faEyeSlash}
                  size="lg"
                  style={{ marginRight: "20px", cursor: "pointer" }}
                />
              </Su.InputWrapper>
              {errors.userPassword && (
                <Su.AlertText>
                  {errors.userPassword.message?.toString()}
                </Su.AlertText>
              )}
              <div style={{ marginLeft: "20px", marginTop: "8px" }}>
                <div
                  style={{
                    color: hasNumber ? "#00d674" : "#ff4320",
                    fontSize: "14px",
                  }}>
                  {hasNumber ? "✓" : "✗"} 숫자를 포함해야 합니다.
                </div>
                <div
                  style={{
                    color: hasSpecial ? "#00d674" : "#ff4320",
                    fontSize: "14px",
                  }}>
                  {hasSpecial ? "✓" : "✗"} 특수문자를 포함해야 합니다. (!@#)
                </div>
                <div
                  style={{
                    color: hasMinLen ? "#00d674" : "#ff4320",
                    fontSize: "14px",
                  }}>
                  {hasMinLen ? "✓" : "✗"} 비밀번호는 8자 이상이어야 합니다.
                </div>
              </div>

              <Su.InputNameWrapper>
                <Su.InputName>비밀번호 확인</Su.InputName>
                <Su.InputEssential>(필수)</Su.InputEssential>
              </Su.InputNameWrapper>
              <Su.InputWrapper>
                <Su.Input
                  type="password"
                  placeholder="비밀번호 확인"
                  {...register("passwordConfirm", {
                    required: "비밀번호를 다시 입력해주세요.",
                    validate: {
                      matchPassword: (value) =>
                        value === getValues("userPassword") ||
                        "비밀번호가 일치하지 않습니다.",
                    },
                  })}
                />
              </Su.InputWrapper>
              {errors.passwordConfirm && (
                <Su.AlertText>
                  {errors.passwordConfirm.message?.toString()}
                </Su.AlertText>
              )}

              <Su.Button
                type="button"
                onClick={handlePasswordChange}
                disabled={isLoading}>
                {isLoading ? "변경 중..." : "비밀번호 변경하기"}
              </Su.Button>
            </>
          )}
        </S.FindPwForm>
      </div>
    </Su.ContentContainer>
  );
};

export default FindPasswordContainer;
