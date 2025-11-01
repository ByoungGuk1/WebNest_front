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
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/oauth2/success?key=${key}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) return;
      const datas = await response.json();
      localStorage.setItem("accessToken", datas.data.accessToken);
      dispatch(setUserStatus(true));
      navigate("/");
    };

    getAccessToken();
  }, [serachParams]);
  return <></>;
};

export default OauthSuccess;
