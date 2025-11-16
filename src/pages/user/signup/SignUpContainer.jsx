import S from "./style";
import Su from "../style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";

const SignUp = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isSendVerificationCode, setIsSendVerificationCode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const invalidColor = theme.PALETTE.primary.red.main;
  const validColor = theme.PALETTE.primary.green.main;

  const phoneRegex = /^010\d{8}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
  const userPhoneValue = watch("userPhone", "");

  const hasNumber = /\d/.test(passwordValue);
  const hasSpecial = /[!@#]/.test(passwordValue);
  const hasMinLen = passwordValue.length >= 8;

  // 전화번호 유효성 감시
  useEffect(() => {
    const isTest = phoneRegex.test(userPhoneValue);
    setIsPhoneValid(isTest);
    if (!isTest) {
      setIsSendVerificationCode(false);
      setShowChangePassword(false);
      setIsPhoneVerified(false);
    }
  }, [userPhoneValue]);

  const renderPasswordCheck = (condition, text) => (
    <S.LiPasswordException
      style={{
        color: condition ? validColor : invalidColor,
      }}>
      {text}
    </S.LiPasswordException>
  );

  const confirmPassword = () =>
    errors.passwordConfirm?.type === "matchPassword" ? (
      <Su.AlertText>비밀번호가 일치하지 않습니다.</Su.AlertText>
    ) : null;

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
      setIsSendVerificationCode(false);
      setIsPhoneVerified(true);
      setShowChangePassword(true);
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const { passwordConfirm, confirmKey, ...formData } = data;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/register`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "회원가입에 실패했습니다.");
        return;
      }

      alert(result.message || "회원가입이 완료되었습니다.");
      navigate("/sign-in");
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  const onError = () => {
    alert("입력값을 다시 확인해주세요!");
  };

  return (
    <div>
      <Su.ContentContainer>
        <Su.LogoWrapper>
          <Su.LogoGrean>Web</Su.LogoGrean>
          <Su.LogoBlue>Nest</Su.LogoBlue>
        </Su.LogoWrapper>

        <S.SignupForm onSubmit={handleSubmit(onSubmit, onError)}>
          <Su.InputNameWrapper>
            <Su.InputName>이름</Su.InputName>
            <Su.InputEssential>(필수)</Su.InputEssential>
          </Su.InputNameWrapper>
          <Su.InputWrapper>
            <Su.Input
              type="text"
              placeholder="이름"
              {...register("userName", { required: "이름을 입력해주세요." })}
            />
          </Su.InputWrapper>
          {errors.userName && (
            <Su.AlertText>{errors.userName.message}</Su.AlertText>
          )}

          <Su.InputNameWrapper>
            <Su.InputName>이메일</Su.InputName>
            <Su.InputEssential>(필수)</Su.InputEssential>
          </Su.InputNameWrapper>
          <Su.InputWrapper>
            <Su.Input
              type="text"
              placeholder="이메일"
              {...register("userEmail", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: emailRegex,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
            />
          </Su.InputWrapper>
          {errors.userEmail && (
            <Su.AlertText>{errors.userEmail.message}</Su.AlertText>
          )}

          <Su.InputNameWrapper>
            <Su.InputName>전화번호</Su.InputName>
            <Su.InputEssential>(필수)</Su.InputEssential>
          </Su.InputNameWrapper>
          <Su.InputExplanation>
            가입 시 사용할 전화번호를 입력해주세요.
          </Su.InputExplanation>
          <Su.InputWrapper>
            <Su.Input
              type="tel"
              placeholder="01012345678"
              readOnly={isSendVerificationCode}
              {...register("userPhone", {
                required: "전화번호를 입력하세요.",
                pattern: {
                  value: phoneRegex,
                  message: "전화번호 형식이 올바르지 않습니다.",
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

          {isPhoneValid && !isPhoneVerified && (
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
                        setIsPhoneVerified(false);
                        setShowChangePassword(false);
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
                        setIsPhoneVerified(false);
                        setShowChangePassword(false);
                        setErrorCount(0);
                      }}>
                      전화번호 수정하기
                    </button>
                  </S.PhoneVerification>
                </>
              )}
            </S.SendPhoneWrapper>
          )}

          {showChangePassword && (
            <div>
              <Su.InputNameWrapper>
                <Su.InputName>비밀번호</Su.InputName>
                <Su.InputEssential>(필수)</Su.InputEssential>
              </Su.InputNameWrapper>
              <Su.InputWrapper>
                <Su.Input
                  type={isEyeOpen ? "text" : "password"}
                  placeholder="비밀번호"
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
                <Su.AlertText>{errors.userPassword.message}</Su.AlertText>
              )}
              {renderPasswordCheck(hasNumber, "숫자를 포함해야 합니다.")}
              {renderPasswordCheck(
                hasSpecial,
                "특수문자를 포함해야 합니다. (!@#)"
              )}
              {renderPasswordCheck(
                hasMinLen,
                "비밀번호는 8자 이상이어야 합니다."
              )}

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
                <Su.AlertText>{errors.passwordConfirm.message}</Su.AlertText>
              )}

              <Su.InputNameWrapper>
                <Su.InputName>생일</Su.InputName>
                <Su.InputEssential>(선택)</Su.InputEssential>
              </Su.InputNameWrapper>
              <Su.InputWrapper>
                <Su.Input
                  type="date"
                  {...register("userBirthday", {
                    setValueAs: (v) => (v === "" ? null : v),
                  })}
                />
              </Su.InputWrapper>
              {errors.userBirthday && (
                <Su.AlertText>{errors.userBirthday.message}</Su.AlertText>
              )}

              <S.Space60px />
              <Su.Button type="submit">가입하기</Su.Button>
            </div>
          )}
        </S.SignupForm>
      </Su.ContentContainer>
    </div>
  );
};

export default SignUp;
