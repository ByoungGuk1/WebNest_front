import S from "./style";
import Su from "../style";

const FindIdContainer = () => {
  const name = "홍길동";
  return (
    <>
      <Su.ContentContainer>
        <Su.LogoWrapper>
          <Su.LogoGrean>Web</Su.LogoGrean>
          <Su.LogoBlue>Nest</Su.LogoBlue>
        </Su.LogoWrapper>

        <div style={{ display: "block" }}>
          <S.FindLinkWrapper>
            <S.FindLink to="/sign-in">로그인하기</S.FindLink>
            <S.FindLink to="/find-password">비밀번호 찾기</S.FindLink>
          </S.FindLinkWrapper>

          <S.FindIdForm>
            <S.InputNameWrapper>
              <S.InputName>이름</S.InputName>
              <S.InputEssential>(필수)</S.InputEssential>
            </S.InputNameWrapper>
            <Su.InputWrapper>
              <Su.Input type="text" placeholder="이름" />
            </Su.InputWrapper>
            <S.InputNameWrapper>
              <S.InputName>본인 확인 이메일</S.InputName>
              <S.InputEssential>(필수)</S.InputEssential>
            </S.InputNameWrapper>
            <S.InputExplanation>
              가입 시 작성한 이름과 아이디, 이메일을 정확하게 입력하지 않으면
              메일이 발송되지 않습니다.
            </S.InputExplanation>
            <Su.InputWrapper>
              <Su.Input type="text" placeholder="이메일" />
            </Su.InputWrapper>

            <S.SendEmailWrapper style={{ display: "none" }}>
              <S.InputNameWrapper>
                <S.InputName>이메일 인증</S.InputName>
                <S.InputEssential>(필수)</S.InputEssential>
              </S.InputNameWrapper>
              <S.InputExplanation>
                이메일로 전송된 키를 입력해주세요.
              </S.InputExplanation>
              <Su.Button>인증 메일 발송</Su.Button>
            </S.SendEmailWrapper>

            <div style={{ display: "none" }}>
              <S.InputNameWrapper>
                <S.InputName>이메일 인증</S.InputName>
                <S.InputEssential>(필수)</S.InputEssential>
              </S.InputNameWrapper>
              <S.InputExplanation>
                이메일로 전송된 키를 입력해주세요.
              </S.InputExplanation>
              <Su.InputWrapper>
                <Su.Input type="text" placeholder="인증 키" />
              </Su.InputWrapper>
              <S.EmailVerification>
                <button type="button">인증 키 재전송</button>
                <button type="button">이메일 수정하기</button>
              </S.EmailVerification>
            </div>
          </S.FindIdForm>
        </div>

        <div style={{ display: "none" }}>
          <S.FoundResult>
            회원님의 아이디는 '{name}'입니다.
            <Su.Button type="button">로그인하러 가기</Su.Button>
            <S.FindLink to="/find-password">비밀번호 찾기</S.FindLink>
          </S.FoundResult>
        </div>
      </Su.ContentContainer>
    </>
  );
};

export default FindIdContainer;
