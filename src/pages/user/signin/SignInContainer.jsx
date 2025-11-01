import S from "./style";
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

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({ mode: "onChange" });

  const handleSumbmitForm = handleSubmit(async (data) => {
    const { ...member } = data;

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

  return (
    <div>
      <S.ContentContainer>
        <S.LogoWrapper>
          <S.logo_grean>Web</S.logo_grean>
          <S.logo_blue>Nest</S.logo_blue>
        </S.LogoWrapper>

        <S.LoginForm onSubmit={handleSumbmitForm}>
          <S.InputWrapper>
            <S.Input
              type="text"
              placeholder="아이디를 입력하세요"
              name="memberEmail"
              {...register("memberEmail", {
                required: true,
                pattern: {
                  value: emailRegex,
                },
              })}
            />
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Input
              type={isEyeOpen ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              name="memberPassword"
              {...register("memberPassword", {
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
          </S.InputWrapper>
          <S.CheckBoxLabel>
            <S.CheckBox type="checkbox" />
            로그인 상태 유지
          </S.CheckBoxLabel>
          <S.Button disabled={isSubmitting}>
            <img src="/assets/icons/loginIcon.png" />
            <span>로그인</span>
          </S.Button>
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
      </S.ContentContainer>
    </div>
  );
};

export default SignInContainer;
