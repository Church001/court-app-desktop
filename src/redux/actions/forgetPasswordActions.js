import { axiosWrapper as axios } from '../../store';
import { toast } from 'react-toastify';
import { ForgotPassword } from "../../utils/utils";
import {FORGOT_PASSWORD, GET_ERRORS} from "../Constants"

export const forgotPassword = (userData, history) => async dispatch => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json', 
  }

  try {
    const response = await axios.post(ForgotPassword, userData, {
      "heades": headers
    });

    const data = response.data;
    dispatch(setForgotPassword(data));
    history.push("/login");
  } catch (error) {
    if (error.response) {
      const { message } = error.response.data;

      dispatch({
        type: GET_ERRORS,
        payload: message
      })
    } else {
      toast('An error occured. Please try again.');
    }
  }
}

export const setForgotPassword = data => {
  return {
    type: FORGOT_PASSWORD,
    payload: data,
  }
}