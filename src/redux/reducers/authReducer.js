import isEmpty from "../../validation/is-empty";
import {
  SET_CURRENT_USER,
  SHOW_LOADER,
  HIDE_LOADER,
  // CLEAR_CURRENT_PROFILE
} from "../Constants";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case HIDE_LOADER:
      return { ...state, loading: false }
    case SHOW_LOADER:
      return { ...state, loading: true }
    default:
      return state;
  }
}
