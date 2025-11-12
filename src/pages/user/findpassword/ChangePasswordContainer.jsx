import React from "react";
import S from "./style";
import Su from "../style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

const ChangePasswordContainer = ({ stepFour }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const invalidColor = theme.PALETTE.primary.red.main;
  const validColor = theme.PALETTE.primary.green.main;

  const renderPasswordCheck = (condition, text) => (
    <S.LiPasswordException
      style={{
        color: condition ? validColor : invalidColor,
      }}>
      {text}
    </S.LiPasswordException>
  );

  return (
    <div>
      <div>
        <Su.InputNameWrapper>
          <Su.InputName>비밀번호 재설정</Su.InputName>
        </Su.InputNameWrapper>

        <Su.InputWrapper>
          <Su.Input
            type={isEyeOpen ? "text" : "password"}
            placeholder="비밀번호를 입력하세요"
            {...register("password", {
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
          <Su.AlertText>
            {errors.passwordConfirm.message?.toString()}
          </Su.AlertText>
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
    </div>
  );
};

export default ChangePasswordContainer;
