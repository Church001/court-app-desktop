// import isEmpty from "../../validation/is-empty";
import {
  FORGOT_PASSWORD,
} from "../Constants";

const initialState = {
  forgotPwd: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPwd: action.payload
      };
    default:
      return state;
  }
}
