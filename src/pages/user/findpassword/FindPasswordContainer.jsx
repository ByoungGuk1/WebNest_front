import S from "./style";
import Su from "../style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
const FindPasswordContainer = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  return (
    <div>
      <>
        <Su.ContentContainer>
          <Su.LogoWrapper>
            <Su.LogoGrean>Web</Su.LogoGrean>
            <Su.LogoBlue>Nest</Su.LogoBlue>
          </Su.LogoWrapper>

          <div style={{ display: "block" }}>
            <S.FindLinkWrapper>
              <S.FindLink to="/find-id">아이디 찾기</S.FindLink>
              <S.FindLink to="/sign-in">로그인하기</S.FindLink>
            </S.FindLinkWrapper>

            <S.FindPwForm>
              <Su.InputNameWrapper>
                <Su.InputName>이름</Su.InputName>
                <Su.InputEssential>(필수)</Su.InputEssential>
              </Su.InputNameWrapper>
              <Su.InputWrapper>
                <Su.Input type="text" placeholder="이름" />
              </Su.InputWrapper>
              <Su.InputNameWrapper>
                <Su.InputName>아이디</Su.InputName>
                <Su.InputEssential>(필수)</Su.InputEssential>
              </Su.InputNameWrapper>
              <Su.InputWrapper>
                <Su.Input type="text" placeholder="아이디" />
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
            </S.FindPwForm>
          </div>

          <div style={{ display: "block" }}>
            <Su.InputNameWrapper>
              <Su.InputName>비밀번호 재설정</Su.InputName>
            </Su.InputNameWrapper>
            <Su.InputWrapper>
              <Su.Input
                type={isEyeOpen ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
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
            <S.LiPasswordException>
              알파벳을 포함해야 합니다.
            </S.LiPasswordException>
            <S.LiPasswordException>
              숫자를 포함해야 합니다.
            </S.LiPasswordException>
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
            </Su.InputNameWrapper>
            <Su.InputWrapper>
              <Su.Input
                type={isEyeOpen ? "text" : "password"}
                placeholder="비밀번호 확인"
              />
            </Su.InputWrapper>
            <S.Space60px />
            <Su.Button type="button">변경하기</Su.Button>
          </div>

          <div style={{ display: "block" }}>
            <S.FoundResult>
              비밀번호가 변경되었습니다.
              <Su.Button type="button">로그인하러 가기</Su.Button>
            </S.FoundResult>
          </div>
        </Su.ContentContainer>
      </>
    </div>
  );
};

export default FindPasswordContainer;
