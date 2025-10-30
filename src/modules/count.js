import { createAction, handleActions } from "redux-actions";

const INCREASE = "count/INCREASE";
const INCREASE_VALUE = "count/INCREASE_VALUE";
const DECREASE = "count/DECREASE";

// action
export const increase = createAction(INCREASE);
export const increaseValue = createAction(INCREASE_VALUE);
export const decrease = createAction(DECREASE);

// state
const initialState = {
  number: 0,
};

const count = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
    [INCREASE_VALUE]: (state, action) => ({
      number: state.number + action.payload,
    }),
  },
  initialState
);

export default count;
