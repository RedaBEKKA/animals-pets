import { GET_ADDRESS, GET_CORDINATES } from "../types/Address";

export const getAddress = (data) => {
  return {
    type: GET_ADDRESS,
    payload: data,
  };
};

export const getCordinates = (data) => {
  return {
    type: GET_CORDINATES,
    payload: data,
  };
};
