import { createAction, handleActions } from "redux-actions";

// 타입
const SET_PREVIOUS_URL = "user/SET_PREVIOUS_URL";
const SET_USER = "user/SET_USER";
const SET_USER_STATUS = "user/USER_STATUS";

// 액션
export const setPreviousUrl = createAction(SET_PREVIOUS_URL);
export const setUser = createAction(SET_USER);
export const setUserStatus = createAction(SET_USER_STATUS);

const UserInitialValue = {
  currentUser: {
    id: 1,
    userName: "홍길동",
    userBirthday: "2020-05-05",
    userEmail: "test123@test.com",
    userPhone: "01012341234",
    userExp: "0",
    userLevel: "1",
    userThumbnailName: "default",
    userThumbnailUrl: "/default",
    userNickname: "홍길동",
    userProvider: "local",
  },
  isLogin: false,
  previousUrl: "",
};

// 리듀서
const user = handleActions(
  {
    [SET_PREVIOUS_URL]: (state, action) => ({
      ...state,
      previousUrl: action.payload,
    }),
    [SET_USER]: (state, action) => ({ ...state, currentUser: action.payload }),
    [SET_USER_STATUS]: (state, action) => ({
      ...state,
      isLogin: action.payload,
    }),
  },
  UserInitialValue
);

export default user;
