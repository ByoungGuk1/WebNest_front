import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import S from "./style";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignInContainer = () => {
  let isEyeOpen = false;
  return (
    <div>
      <S.ContentContainer>
        <S.LogoWrapper>
          <S.logo_grean>Web</S.logo_grean>
          <S.logo_blue>Nest</S.logo_blue>
        </S.LogoWrapper>

        <S.LoginForm>
          <S.InputWrapper>
            <S.Input placeholder="아이디를 입력하세요" />
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Input placeholder="비밀번호를 입력하세요" />
            <S.passwordEye>
              <FontAwesomeIcon
                icon={isEyeOpen ? faEye : faEyeSlash}
                size="lg"
              />
            </S.passwordEye>
          </S.InputWrapper>
          <S.CheckBoxLabel>
            <S.CheckBox type="checkbox" />
            로그인 상태 유지
          </S.CheckBoxLabel>
          <S.Button>
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
            <S.OAuthLink to="/sign-up">
              <img src="/assets/icons/googleicon.png" />
            </S.OAuthLink>
            <S.OAuthLink to="/sign-up">
              <img src="/assets/icons/kakaoicon.png" />
            </S.OAuthLink>
            <S.OAuthLink to="/sign-up">
              <img src="/assets/icons/navericon.png" />
            </S.OAuthLink>
          </S.OAuthLinkWrapper>
        </S.OAuthLinkContainer>
      </S.ContentContainer>
    </div>
  );
};

export default SignInContainer;
