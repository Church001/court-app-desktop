import { axiosWrapper as axios } from '../../store';
import React from 'react';

import { toast } from 'react-toastify';

import {
  SET_SUPPORT_THREADS,
  SET_SUPPORT_THREAD_MESSAGES
} from '../Constants';

axios.defaults.baseURL = 'https://courtofappealreportsnigeria.com/api';

export const getUserSupportThreads = (userId) => async dispatch => {
  const token = localStorage.getItem('jwtToken');
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await axios.get(`/users/${userId}/support`, { headers });

    dispatch({
      type: SET_SUPPORT_THREADS,
      payload: {
        threads: response.data.data
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

export const getThreadMessages = (threadId) => async dispatch => {
  const token = localStorage.getItem('jwtToken');
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await axios.get(`/support/${threadId}/messages`, { headers });

    dispatch({
      type: SET_SUPPORT_THREAD_MESSAGES,
      payload: {
        messages: response.data.data
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

export const createNewThread = (data, history) => async dispatch => {
  const token = localStorage.getItem('jwtToken');
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await axios({
      method: 'post',
      url: '/support',
      data
    });

    const { status } = response;

    if (status === 201) { // created successfully
      toast('Ticket created successfully.');
      history.push('/dashboard/support');
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

export const createNewMessageInThread = (data) => async dispatch => {
  const token = localStorage.getItem('jwtToken');
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  try {
    const response = await axios({
      method: 'post',
      url: `/support/${data.thread_id}/messages`,
      data
    });

    const threadResponse = await axios.get(`/support/${data.thread_id}/messages`, { headers });
    
    dispatch({
      type: SET_SUPPORT_THREAD_MESSAGES,
      payload: {
        messages: threadResponse.data.data
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