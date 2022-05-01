import * as types from "../../Types";

const initialState = {
  isValideEmail: false,
};
export default function Mail(state = initialState, action) {
  const { type, payload } = action;

  switch (action.type) {
    case types.GET_VALIDATION:
      return {
        ...state,
        isValideEmail: true,
      };

    default:
      return state;
  }
}
