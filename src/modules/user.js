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
<<<<<<< HEAD
  currentUser: {
    userEmail: "test123@gmail.com",
    userName: "홍길동",
    userNickname: "만렙코더더",
    // ...
  },
=======
  currentUser: null,
>>>>>>> 7e1c2a7be9a961d6c64a82153dc057829fbb5af8
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
