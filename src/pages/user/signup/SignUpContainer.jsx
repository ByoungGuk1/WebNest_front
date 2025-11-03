import S from "./style";
import Su from "../style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useForm } from "react-hook-form";
import { useState } from "react";

const SignUp = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({ mode: "onChange" });

  const handleSumbmitForm = handleSubmit(async (data) => {
    fetch("url", {
      body: JSON.stringify(data),
    });
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  return (
    <div>
      <Su.ContentContainer>
        <Su.LogoWrapper>
          <Su.LogoGrean>Web</Su.LogoGrean>
          <Su.LogoBlue>Nest</Su.LogoBlue>
        </Su.LogoWrapper>

        <S.SignupForm onSubmit={handleSumbmitForm}>
          <Su.InputNameWrapper>
            <Su.InputName>이름</Su.InputName>
            <Su.InputEssential>(필수)</Su.InputEssential>
          </Su.InputNameWrapper>
          <Su.InputWrapper>
            <Su.Input type="text" placeholder="이름" />
          </Su.InputWrapper>
          <Su.InputNameWrapper>
            <Su.InputName>전화번호</Su.InputName>
            <Su.InputEssential>(필수)</Su.InputEssential>
          </Su.InputNameWrapper>
          <Su.InputWrapper>
            <Su.Input type="select" placeholder="전화번호" />
            -
            <Su.Input type="text" placeholder="전화번호" />
            -
            <Su.Input type="text" placeholder="전화번호" />
          </Su.InputWrapper>
          <Su.InputNameWrapper>
            <Su.InputName>이메일</Su.InputName>
            <Su.InputEssential>(필수)</Su.InputEssential>
          </Su.InputNameWrapper>
          <Su.InputWrapper>
            <Su.Input type="text" placeholder="이메일" />
          </Su.InputWrapper>

          <S.SendEmailWrapper style={{ display: "block" }}>
            <Su.InputNameWrapper>
              <Su.InputName>이메일 인증</Su.InputName>
              <Su.InputEssential>(필수)</Su.InputEssential>
            </Su.InputNameWrapper>
            <Su.InputExplanation>
              이메일로 전송된 키를 입력해주세요.
            </Su.InputExplanation>
            <Su.Button type="button">인증 메일 발송</Su.Button>
          </S.SendEmailWrapper>

          <div style={{ display: "block" }}>
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
            <S.EmailVerification>
              <button type="button">인증 키 재전송</button>
              <button type="button">이메일 수정하기</button>
            </S.EmailVerification>
          </div>

          <Su.InputNameWrapper>
            <Su.InputName>비밀번호</Su.InputName>
            <Su.InputEssential>(필수)</Su.InputEssential>
          </Su.InputNameWrapper>
          <Su.InputWrapper>
            <Su.Input type="text" placeholder="비밀번호" />
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
          <S.LiPasswordException>
            알파벳을 포함해야 합니다.
          </S.LiPasswordException>
          <S.LiPasswordException>숫자를 포함해야 합니다.</S.LiPasswordException>
          <S.LiPasswordException>
            특수문자를 포함해야 합니다. (!@#$%^&*)
          </S.LiPasswordException>
          <S.LiPasswordException>
            비밀번호의 형식의 오류가 있습니다.
          </S.LiPasswordException>
          <S.LiPasswordException>
            비밀번호가 너무 짧습니다. 비밀번호는 8글자 이상이어야 합니다.
          </S.LiPasswordException>
          <Su.InputNameWrapper>
            <Su.InputName>비밀번호 확인</Su.InputName>
            <Su.InputEssential>(필수)</Su.InputEssential>
          </Su.InputNameWrapper>
          <Su.InputWrapper>
            <Su.Input type="text" placeholder="비밀번호 확인" />
          </Su.InputWrapper>
          <Su.InputNameWrapper>
            <Su.InputName>생일</Su.InputName>
            <Su.InputEssential>(필수)</Su.InputEssential>
          </Su.InputNameWrapper>
          <Su.InputWrapper>
            <Su.Input type="date" placeholder="mm/dd/yyyy" />
          </Su.InputWrapper>
          <S.Space60px />
          <Su.Button type="button">가입하기</Su.Button>
        </S.SignupForm>
      </Su.ContentContainer>
    </div>
  );
};

export default SignUp;
