import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
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
      <h1>회원가입</h1>
      <form onSubmit={handleSumbmitForm}>
        <label>
          <p>이메일</p>
          <input
            type="text"
            placeholder="이메일 입력"
            name="email"
            {...register("email", {
              required: true,
              pattern: {
                value: emailRegex,
              },
            })}
          />
          {errors && errors?.email?.type === "required" && (
            <p>이메일을 입력하세요.</p>
          )}
          {errors && errors?.email?.type === "pattern" && (
            <p>이메일 양식에 맞게 입력해주세요.</p>
          )}
        </label>
        <label>
          <p>비밀번호</p>
          <input
            type="text"
            placeholder="비밀번호 입력"
            name="password"
            {...register("password", {
              required: true,
              pattern: {
                value: passwordRegex,
              },
            })}
          />
          {errors && errors?.password?.type === "required" && (
            <p>비밀번호를 입력하세요.</p>
          )}
          {errors && errors?.password?.type === "pattern" && (
            <p>
              소문자, 숫자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.
            </p>
          )}
        </label>
        <label>
          <p>비밀번호 확인</p>
          <input
            type="text"
            placeholder="비밀번호 확인"
            name="passwordConfirm"
            {...register("passwordConfirm", {
              required: true,
              validate: {
                matchPassword: (passwordConfirm) => {
                  const { password } = getValues();
                  console.log(
                    password,
                    passwordConfirm,
                    password === passwordConfirm
                  );
                  return password === passwordConfirm;
                },
              },
            })}
          />
          {errors && errors?.passwordConfirm?.type === "matchPassword" && (
            <p>비밀번호가 일치하지 않습니다.</p>
          )}
        </label>

        <div>
          <p>취미(선택)</p>
          <label>
            <input
              type="checkbox"
              name="hobbies"
              value={"soccer"}
              {...register("hobbies")}
            />
            <span>축구</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="hobbies"
              value={"baseball"}
              {...register("hobbies")}
            />
            <span>야구</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="hobbies"
              value={"basketball"}
              {...register("hobbies")}
            />
            <span>농구</span>
          </label>
        </div>

        <button disabled={isSubmitting}>회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
