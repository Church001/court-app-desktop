import { axiosWrapper as axios } from '../../store';
import { toast } from 'react-toastify';

import {
  GET_SUBSCRIPTIONS,
  SET_SUBSCRIPTIONS,
  SET_PLANS
} from '../Constants';

axios.defaults.baseURL = 'https://courtofappealreportsnigeria.com/api';

export const getUserSubscriptions = (userId) => async dispatch => {
  const token = localStorage.getItem('jwtToken');

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await axios.get(`/users/${userId}/subscriptions`, { headers });
    
    dispatch({
      type: SET_SUBSCRIPTIONS,
      payload: {
        subscriptions: response.data.data
      }
    });
  } catch (error) {
    if (error.response) {
      const { message } = error.response.data;

      toast(message);
    } else {
      toast('An error occured. Please try again.');
    }
  }
}

export const getPlans = () => async dispatch => {
  const token = localStorage.getItem('jwtToken');

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await axios.get(`/plans`, { headers });

    dispatch({
      type: SET_PLANS,
      payload: {
        plans: response.data.data
      }
    });
  } catch (error) {
    if (error.response) {
      const { message } = error.response.data;

      toast(message);
    } else {
      toast('An error occured. Please try again.');
    }
  }
}