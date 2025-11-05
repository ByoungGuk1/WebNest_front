import S from "./style";
import Su from "../style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";

const FindPasswordContainer = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [showPasswordSendForm, setShowPasswordSendForm] = useState(true);
  const [showEmailSend, setShowEmailSend] = useState(false);
  const [showEmailVerify, setShowEmailVerify] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showResult, setShowResult] = useState(false);

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

  const handleSubmitForm = handleSubmit(async (data) => {
    fetch("url", { body: JSON.stringify(data) });
  });

  const checkEmail = () => {
    if (errors?.email?.type === "required")
      return <Su.AlertText>이메일을 입력하세요.</Su.AlertText>;
    if (errors?.email?.type === "pattern")
      return <Su.AlertText>이메일 양식에 맞게 입력해주세요.</Su.AlertText>;
    return null;
  };

  const renderPasswordCheck = (condition, text) => (
    <S.LiPasswordException
      style={{
        color: condition ? validColor : invalidColor,
      }}
    >
      {text}
    </S.LiPasswordException>
  );

  const handleEmailBlur = async (e) => {
    const email = e.target.value;
    await trigger("email");
    if (emailRegex.test(email)) setShowEmailSend(true);
    else {
      setShowEmailSend(false);
      setShowEmailVerify(false);
      setShowChangePassword(false);
      setShowResult(false);
    }
  };

  const stepOne = () => {
    setShowPasswordSendForm(true);
    setShowEmailSend(false);
    setShowEmailVerify(false);
    setShowChangePassword(false);
    setShowResult(false);
  };

  const stepTwo = async () => {
    const validEmail = await trigger("email");
    if (!validEmail) return;
    setShowPasswordSendForm(true);
    setShowEmailSend(false);
    setShowEmailVerify(true);
    setShowChangePassword(false);
    setShowResult(false);
  };

  const stepThree = () => {
    setShowPasswordSendForm(false);
    setShowEmailSend(false);
    setShowEmailVerify(false);
    setShowChangePassword(true);
    setShowResult(false);
  };

  const stepFour = () => {
    const passwordConfirm = getValues("passwordConfirm");
    if (
      !hasNumber ||
      !hasSpecial ||
      !hasMinLen ||
      passwordConfirm !== getValues("password")
    )
      return;
    setShowPasswordSendForm(false);
    setShowEmailSend(false);
    setShowEmailVerify(false);
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
        <S.FindLinkWrapper>
          <S.FindLink to="/find-id">아이디 찾기</S.FindLink>
          <S.FindLink to="/sign-in">로그인하기</S.FindLink>
        </S.FindLinkWrapper>

        <S.FindPwForm onSubmit={handleSubmitForm}>
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
        </S.FindPwForm>
      </div>

      <div style={{ display: showChangePassword ? "block" : "none" }}>
        <Su.InputNameWrapper>
          <Su.InputName>비밀번호 재설정</Su.InputName>
        </Su.InputNameWrapper>

        <Su.InputWrapper>
          <Su.Input
            type={isEyeOpen ? "text" : "password"}
            placeholder="비밀번호를 입력하세요"
            {...register("password", {
              required: true,
              pattern: { value: passwordRegex },
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

        {renderPasswordCheck(hasNumber, "숫자를 포함해야 합니다.")}
        {renderPasswordCheck(hasSpecial, "특수문자를 포함해야 합니다. (!@#)")}
        {renderPasswordCheck(
          hasMinLen,
          "비밀번호가 너무 짧습니다. 비밀번호는 8글자 이상이어야 합니다."
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
              required: "비밀번호 확인은 필수입니다.",
              validate: (value) =>
                value === getValues("password") ||
                "비밀번호가 일치하지 않습니다.",
            })}
          />
        </Su.InputWrapper>

        {errors.passwordConfirm && (
          <Su.AlertText>{errors.passwordConfirm.message}</Su.AlertText>
        )}

        <S.Space60px />
        <Su.Button type="button" onClick={stepFour}>
          변경하기
        </Su.Button>
      </div>

      <div style={{ display: showResult ? "block" : "none" }}>
        <S.FoundResult>
          비밀번호가 변경되었습니다.
          <Su.Button type="button" onClick={() => navigate("/sign-in")}>
            로그인하러 가기
          </Su.Button>
        </S.FoundResult>
      </div>
    </Su.ContentContainer>
  );
};

export default FindPasswordContainer;
