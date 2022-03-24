import * as types from "../../Types";

const initialState = {
  Cordinates: [],
  Adresses: "",
  check: false,
  Valide:false
};
export default function Adresses(state = initialState, action) {
  const { type, payload } = action;

  switch (action.type) {
    case types.GET_ADDRESS:
      return {
        ...state,
        Adresses: payload,
      };
    case types.GET_CORDINATES:
      return {
        ...state,
        Cordinates: payload,
        check: true,
      };
    case types.GET_DEL_ADDRESS_CORDINATES:
      return {
        ...state,
        Cordinates: "",
        Adresses: "",
        check: false,

      };
    default:
      return state;
  }
}
