import S from "./style";
import Su from "../style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";

const SignUp = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [showEmailSend, setShowEmailSend] = useState(false);
  const [showEmailVerify, setShowEmailVerify] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const invalidColor = theme.PALETTE.primary.red.main;
  const validColor = theme.PALETTE.primary.green.main;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const hasNumber = /\d/.test(passwordValue);
  const hasSpecial = /[!@#]/.test(passwordValue);
  const hasMinLen = passwordValue.length >= 8;

  const renderPasswordCheck = (condition, text) => (
    <S.LiPasswordException
      style={{
        color: condition ? validColor : invalidColor,
      }}
    >
      {text}
    </S.LiPasswordException>
  );

  const confirmPassword = () =>
    errors.passwordConfirm?.type === "matchPassword" ? (
      <Su.AlertText>비밀번호가 일치하지 않습니다.</Su.AlertText>
    ) : null;

  const handleEmailBlur = async (e) => {
    const email = e.target.value;
    await trigger("email");
    if (emailRegex.test(email)) setShowEmailSend(true);
    else {
      setShowEmailSend(false);
      setShowEmailVerify(false);
      setShowChangePassword(false);
    }
  };

  const stepTwo = async () => {
    const validEmail = await trigger("email");
    if (!validEmail) return;
    setShowEmailSend(false);
    setShowEmailVerify(true);
    setShowChangePassword(false);
  };

  const stepThree = () => {
    setShowEmailSend(false);
    setShowEmailVerify(false);
    setShowChangePassword(true);
  };

  const onSubmit = async (data) => {
    const { passwordConfirm, emailKey, ...formData } = data;
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/register`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          return res.json().then(({ message }) => {
            alert(message);
          });
        }
        return res.json();
      })
      .then(({ message }) => {
        alert(message);
        navigate("/sign-in");
      })
      .catch((e) => {
        console.log("err : " + e);
      });
  };

  const onError = (errors) => {
    console.log("유효성 에러:", errors);
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
            <Su.InputName>전화번호</Su.InputName>
            <Su.InputEssential>(필수)</Su.InputEssential>
          </Su.InputNameWrapper>
          <Su.InputWrapper>
            <Su.Input
              type="tel"
              placeholder="01012345678"
              {...register("userPhone", {
                required: "전화번호를 입력해주세요.",
                pattern: {
                  value: /^010\d{8}$/,
                  message: "전화번호 형식이 올바르지 않습니다.",
                },
              })}
            />
          </Su.InputWrapper>
          {errors.userPhone && (
            <Su.AlertText>{errors.userPhone.message}</Su.AlertText>
          )}

          <Su.InputNameWrapper>
            <Su.InputName>이메일</Su.InputName>
            <Su.InputEssential>(필수)</Su.InputEssential>
          </Su.InputNameWrapper>
          <Su.InputWrapper>
            <Su.Input
              type="text"
              placeholder="이메일"
              readOnly={showEmailSend || showEmailVerify}
              {...register("userEmail", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: emailRegex,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
              onBlur={handleEmailBlur}
            />
          </Su.InputWrapper>
          {errors.userEmail && (
            <Su.AlertText>{errors.userEmail.message}</Su.AlertText>
          )}

          {showEmailSend && (
            <S.SendEmailWrapper>
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
            </S.SendEmailWrapper>
          )}

          {showEmailVerify && (
            <div>
              <Su.InputNameWrapper>
                <Su.InputName>인증 키 입력</Su.InputName>
              </Su.InputNameWrapper>
              <Su.InputWrapper>
                <Su.Input
                  type="text"
                  placeholder="인증 키"
                  {...register("emailKey", {
                    required: "인증 키를 입력해주세요.",
                  })}
                />
              </Su.InputWrapper>
              {errors.emailKey && (
                <Su.AlertText>{errors.emailKey.message}</Su.AlertText>
              )}
              <Su.Button type="button" onClick={stepThree}>
                인증 확인
              </Su.Button>
            </div>
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
                <Su.InputEssential>(필수)</Su.InputEssential>
              </Su.InputNameWrapper>
              <Su.InputWrapper>
                <Su.Input
                  type="date"
                  {...register("userBirthday", {
                    required: "생일을 선택해주세요.",
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
