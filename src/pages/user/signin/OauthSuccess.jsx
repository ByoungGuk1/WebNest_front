import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setUserStatus } from "../../../modules/user";

const OauthSuccess = () => {
  const [serachParams] = useSearchParams();
  const key = serachParams.get("key");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!key) {
      return;
    }

    const getAccessToken = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/auth/oauth2/success?key=${key}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          const result = await response.json();
          alert(result.message || "OAuth 인증에 실패했습니다.");
          navigate("/sign-in");
          return;
        }

        const datas = await response.json();
        const accessToken = datas.data?.accessToken;
        
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          dispatch(setUserStatus(true));
          navigate("/");
        } else {
          alert("토큰을 받아오지 못했습니다.");
          navigate("/sign-in");
        }
      } catch (error) {
        console.error("OAuth 인증 오류:", error);
        alert("OAuth 인증 중 오류가 발생했습니다.");
        navigate("/sign-in");
      }
    };

    getAccessToken();
  }, [serachParams, dispatch, navigate]);
  return <></>;
};

export default OauthSuccess;
