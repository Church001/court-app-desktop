import { axiosWrapper as axios } from '../../store';
import { ProfileEndpoint } from "../../utils/utils";

import { toast } from 'react-toastify';

import { 
  GET_PROFILE, 
  GET_ERRORS 
} from "../Constants";

export const getUserProfile = () => async dispatch => {
  const token = localStorage.getItem("jwtToken")
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
  try {
    const response = await axios.get(ProfileEndpoint, { headers });
    dispatch({
      type: GET_PROFILE,
      payload: response.data.data
    });
    console.log('response profile',response.data.data)
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

export const updateUser = (data) => async dispatch => {
  const token = localStorage.getItem("jwtToken");
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  try {
    const response = await axios({
      method: 'PUT',
      url: `/users/${data.id}`,
      data
    });

    const { status } = response;

    if (status === 200) { // updated successfully
      toast('Update successful.')

      const profileResponse = await axios.get(ProfileEndpoint, { headers });

      dispatch({
        type: GET_PROFILE,
        payload: profileResponse.data.data
      })
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