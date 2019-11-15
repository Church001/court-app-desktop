import { axiosWrapper as axios } from '../../store';
import { LoginEndpoint, RegisterEndpoint, UserLogoutEndpoint, BASE_URL } from "../../utils/utils";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_CURRENT_PROFILE,

  // for logout
  SET_SUBSCRIPTIONS,
  SET_SUPPORT_THREADS,
  SET_SUPPORT_THREAD_MESSAGES,
  SET_ALL_REPORTS,
  SET_FAVORITES,
  SET_READ_LATER_REPORTS
} from "../Constants";

// Register user
export const registerUser = (userData, history) => async dispatch => {
  try {
    const response = await axios.post(RegisterEndpoint, userData);

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
};


// Login - Get User Token
// create a bound action creator that automatically dispatches:
export const loginUser = (userData, history) => async dispatch => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  try {
    const response = await axios.post(LoginEndpoint, userData, {
      "headers": headers
    });

    // console.log("return",res);
    // Save to local storage
    const { token } = response.data;
    // Set token to local storage
    localStorage.setItem("jwtToken", token);
    // Set token to Auth Header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current User
    dispatch(setCurrentUser(decoded));
    //Navigate a user to Login Page
    history.push("/dashboard");
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
};

export const resetUserPassword = (data) => async dispatch => {
  const token = localStorage.getItem("jwtToken");
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  const { id, password_old, password, password_confirmation } = data;

  try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}api/users/${id}/password/reset`,
      data: { password_old, password, password_confirmation }
    });

    const { status } = response;

    if (status === 200) {
      const { message } = response.data;

      toast(message);
    }
  } catch (error) {
    if (error.response) {
      const { message } = error.response.data;

      toast(message);
    } else {
      toast('An error occured. Please try again.');
    }
  }
}

// Log Out User
export const logoutUser = (history) => async dispatch => {
  const token = localStorage.getItem("jwtToken");
  console.log({helllooooooos: token});

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer '+token

  }

  try {
    const response = await axios.post(UserLogoutEndpoint, {
      "headers": headers
    });

    // Remove token from localstorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for futere requests
    setAuthToken(false);
    // Set current user to {} which will set is authenticated to false
    dispatch(setCurrentUser({}));
    dispatch(clearCurrentProfile({}));
    dispatch({
      type: SET_SUBSCRIPTIONS,
      payload: {
        subscriptions: []
      }
    });
    dispatch({
      type: SET_SUPPORT_THREADS,
      payload: {
        threads: []
      }
    });
    dispatch({
      type: SET_SUPPORT_THREAD_MESSAGES,
      payload: {
        messages: []
      }
    });
    dispatch({
      type: SET_ALL_REPORTS,
      payload: {
        reports: []
      }
    });
    dispatch({
      type: SET_FAVORITES,
      payload: {
        favorites: []
      }
    });
    dispatch({
      type: SET_READ_LATER_REPORTS,
      payload: {
        readLaterReports: []
      }
    });
    history.push('/');
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
};

// Set Logged in user
export const clearCurrentProfile = decoded => {
  return {
    type: CLEAR_CURRENT_PROFILE,
    payload: decoded
  };
};

// Set Logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
