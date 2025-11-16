import S from "./style";
import Su from "../style";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router-dom";

const FindIdContainer = () => {
  const navigate = useNavigate();
  const [showPhoneSendForm, setShowPhoneSendForm] = useState(true);
  const [showPhoneSend, setShowPhoneSend] = useState(false);
  const [showPhoneVerify, setShowPhoneVerify] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [foundEmails, setFoundEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const phoneRegex = /^010\d{8}$/;

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
      setShowPhoneSend(false);
      setShowPhoneVerify(true);
    } catch (error) {
      console.error("인증번호 발송 오류:", error);
      alert("인증번호 발송 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 인증코드 확인 및 이메일 조회
  const handleSumbmitForm = handleSubmit(async (data) => {
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
        const verifyResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/codes/verify?userAuthentificationCode=${userAuthentificationCode}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const verifyResult = await verifyResponse.json();

        if (!verifyResponse.ok) {
          setErrorCount(errorCount + 1);
          if (errorCount + 1 >= 3) {
            alert(
              "인증 시도 횟수를 초과했습니다. 처음부터 다시 시도해주세요.😥"
            );
            setShowPhoneVerify(false);
            setShowPhoneSend(true);
            setErrorCount(0);
          } else {
            alert(verifyResult.message || "인증 코드를 확인해주세요.😎");
          }
          setIsLoading(false);
          return;
        }

        const verified = verifyResult.data?.verified;
        if (!verified) {
          setErrorCount(errorCount + 1);
          if (errorCount + 1 >= 3) {
            alert(
              "인증 시도 횟수를 초과했습니다. 처음부터 다시 시도해주세요.😥"
            );
            setShowPhoneVerify(false);
            setShowPhoneSend(true);
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
        // 인증 성공 시 이메일 조회
        const { confirmKey, ...formData } = data;
        const fetching = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/find-email`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          method: "POST",
        });

        if (!fetching.ok) {
          const errorResult = await fetching.json();
          alert(errorResult.message || "이메일 조회에 실패했습니다.");
          setIsLoading(false);
          return;
        }

        const result = await fetching.json();
        setFoundEmails(result.data || []);
        setIsPhoneVerified(true);
        setShowPhoneSendForm(false);
        setShowPhoneSend(false);
        setShowPhoneVerify(false);
        setShowResult(true);
      } catch (error) {
        console.error("이메일 조회 오류:", error);
        alert("이메일 조회 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  });

  const checkPhone = () => {
    if (errors?.userPhone?.type === "required") {
      return <Su.AlertText>전화 번호를 입력하세요.</Su.AlertText>;
    }
    if (errors?.userPhone?.type === "pattern") {
      return <Su.AlertText>전화 번호 양식에 맞게 입력해주세요.</Su.AlertText>;
    }
    return null;
  };

  const handlePhoneBlur = async (e) => {
    const phone = e.target.value;
    await trigger("userPhone");
    if (phoneRegex.test(phone) && !isPhoneVerified && !showPhoneVerify) {
      setShowPhoneSend(true);
    } else {
      setShowPhoneSend(false);
      if (!phoneRegex.test(phone)) {
        setShowPhoneVerify(false);
        setShowResult(false);
        setIsPhoneVerified(false);
      }
    }
  };

  const stepOne = () => {
    setShowPhoneSendForm(true);
    setShowPhoneSend(false);
    setShowPhoneVerify(false);
    setShowResult(false);
    setIsPhoneVerified(false);
  };

  return (
    <>
      <Su.ContentContainer>
        <Su.LogoWrapper>
          <Su.LogoGrean>Web</Su.LogoGrean>
          <Su.LogoBlue>Nest</Su.LogoBlue>
        </Su.LogoWrapper>

        <div style={{ display: showPhoneSendForm ? "block" : "none" }}>
          <S.FindLinkWrapper>
            <S.FindLink to="/sign-in">로그인하기</S.FindLink>
            <S.FindLink to="/find-password">비밀번호 찾기</S.FindLink>
          </S.FindLinkWrapper>

          <S.FindIdForm onSubmit={handleSumbmitForm}>
            <Su.InputNameWrapper>
              <Su.InputName>이름</Su.InputName>
              <Su.InputEssential>(필수)</Su.InputEssential>
            </Su.InputNameWrapper>
            <Su.InputWrapper>
              <Su.Input
                type="text"
                placeholder="이름"
                {...register("userName")}
              />
            </Su.InputWrapper>

            <Su.InputNameWrapper>
              <Su.InputName>본인 확인 전화 번호</Su.InputName>
              <Su.InputEssential>(필수)</Su.InputEssential>
            </Su.InputNameWrapper>
            <Su.InputExplanation>
              가입 시 작성한 이름과 전화 번호를 정확하게 입력하지 않으면 번호가
              발송되지 않습니다.
            </Su.InputExplanation>

            <Su.InputWrapper>
              <Su.Input
                type="tel"
                placeholder="01012345678"
                readOnly={showPhoneSend || showPhoneVerify || isPhoneVerified}
                {...register("userPhone", {
                  required: "전화 번호를 입력하세요.",
                  pattern: {
                    value: phoneRegex,
                    message: "전화 번호 형식이 올바르지 않습니다.",
                  },
                  setValueAs: (v) => (v ? v.replace(/\D/g, "") : ""),
                })}
                onBlur={handlePhoneBlur}
              />
            </Su.InputWrapper>

            {checkPhone()}

            <S.SendPhoneWrapper
              style={{
                display:
                  showPhoneSend && !isPhoneVerified && !showPhoneVerify
                    ? "block"
                    : "none",
              }}>
              <Su.InputNameWrapper>
                <Su.InputName>전화 번호 인증</Su.InputName>
                <Su.InputEssential>(필수)</Su.InputEssential>
              </Su.InputNameWrapper>
              <Su.InputExplanation>
                전화 번호로 인증번호를 발송하시겠습니까?
              </Su.InputExplanation>
              <Su.Button
                type="button"
                onClick={sendVerificationCode}
                disabled={isLoading}>
                {isLoading ? "발송 중..." : "인증 번호 발송"}
              </Su.Button>
              <S.PhoneVerification>
                <button type="button" onClick={stepOne}>
                  전화 번호 수정하기
                </button>
              </S.PhoneVerification>
            </S.SendPhoneWrapper>

            <div
              style={{
                display: showPhoneVerify && !isPhoneVerified ? "block" : "none",
              }}>
              <Su.InputNameWrapper>
                <Su.InputName>전화 번호 인증</Su.InputName>
                <Su.InputEssential>(필수)</Su.InputEssential>
              </Su.InputNameWrapper>
              <Su.InputExplanation>
                전화 번호로 전송된 키를 입력해주세요.
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
              <Su.Button type="submit" disabled={isLoading}>
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
                    stepOne();
                    setErrorCount(0);
                  }}>
                  전화 번호 수정하기
                </button>
              </S.PhoneVerification>
            </div>
          </S.FindIdForm>
        </div>

        <div style={{ display: showResult ? "block" : "none" }}>
          <S.FoundResult>
            조회된 아이디는
            {foundEmails && foundEmails.length > 0 ? (
              foundEmails.map((foundEmail, idx) => (
                <span key={idx}>
                  {idx > 0 && " "}
                  {foundEmail}
                </span>
              ))
            ) : (
              <span></span>
            )}
            입니다.
            <Su.Button type="button" onClick={() => navigate("/sign-in")}>
              로그인하러 가기
            </Su.Button>
            <S.FindLink to="/find-password">비밀번호 찾기</S.FindLink>
          </S.FoundResult>
        </div>
      </Su.ContentContainer>
    </>
  );
};

export default FindIdContainer;
