import S from "./style";
import Su from "../style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUserStatus } from "../../../modules/user";
import { useState } from "react";

const SignInContainer = () => {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [showEmailSend, setShowEmailSend] = useState(false);
  const [showEmailVerify, setShowEmailVerify] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({ mode: "onChange" });

  const handleSumbmitForm = handleSubmit(async (data) => {
    const { ...member } = data;
    console.log(data);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(member),
    })
      .then((res) => res.json())
      .then(({ message, data }) => {
        let accessToken = data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        dispatch(setUserStatus(true));
        navigate("/");
      });
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const handleEmailBlur = async (e) => {
    await trigger("email");
  };

  const alreadyLogin = () => {
    if (isLogin) {
      navigate("/");
    }
  };

  return (
    <div>
      {alreadyLogin()}
      <Su.ContentContainer>
        <Su.LogoWrapper>
          <Su.LogoGrean>Web</Su.LogoGrean>
          <Su.LogoBlue>Nest</Su.LogoBlue>
        </Su.LogoWrapper>

        <S.LoginForm onSubmit={handleSumbmitForm}>
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
          <Su.InputWrapper>
            <Su.Input
              type={isEyeOpen ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              name="userPassword"
              {...register("userPassword", {
                required: true,
                pattern: {
                  value: passwordRegex,
                },
              })}
            />
            <FontAwesomeIcon
              onClick={() => setIsEyeOpen(!isEyeOpen)}
              icon={isEyeOpen ? faEye : faEyeSlash}
              size="lg"
              style={{
                marginRight: "20px",
                cursor: "pointer",
              }}
            />
          </Su.InputWrapper>
          <Su.Div>
            <Su.CheckBoxLabel>
              <Su.CheckBox type="checkbox" />
              로그인 상태 유지
            </Su.CheckBoxLabel>
          </Su.Div>
          <Su.Button disabled={isSubmitting}>
            <img src="/assets/icons/loginIcon.png" />
            <span>로그인</span>
          </Su.Button>
        </S.LoginForm>

        <S.UserPageLINK>
          <S.UserLink to="/sign-up">회원가입</S.UserLink>
          <S.UserLink to="/find-id">아이디 찾기</S.UserLink>
          <S.UserLink to="/find-password">비밀번호 찾기</S.UserLink>
        </S.UserPageLINK>

        <S.OAuthLinkContainer>
          <p>sns 계정으로 간편하게 시작하기</p>
          <S.OAuthLinkWrapper>
            <S.OAuthLink to="http://localhost:10000/oauth2/authorization/google">
              <img src="/assets/icons/googleicon.png" />
            </S.OAuthLink>
            <S.OAuthLink to="http://localhost:10000/oauth2/authorization/kakao">
              <img src="/assets/icons/kakaoicon.png" />
            </S.OAuthLink>
            <S.OAuthLink to="http://localhost:10000/oauth2/authorization/naver">
              <img src="/assets/icons/navericon.png" />
            </S.OAuthLink>
          </S.OAuthLinkWrapper>
        </S.OAuthLinkContainer>
      </Su.ContentContainer>
    </div>
  );
};

export default SignInContainer;
