import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserStatus } from "../modules/user";

const useGetUserData = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const isLogin = useSelector((state) => state.user.isLogin);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      dispatch(setUserStatus(false));
      return;
    }

    const getUserData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/private/users/me`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (res.status === 401 || res.status === 204) {
        dispatch(setUserStatus(false));
        return;
      }

      const result = await res.json();
      const userData = result?.data ?? result;

      if (userData && userData.id != null) {
        dispatch(setUser(userData));
        dispatch(setUserStatus(true));
      } else {
        dispatch(setUserStatus(false));
      }

      return userData;
    };

    getUserData();
  }, [dispatch, token]);

  return { currentUser, isLogin };
};

export default useGetUserData;
