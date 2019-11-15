import { axiosWrapper as axios } from '../../store';
import {GetDivisionEndpoint, GetCategoryEndpoint} from '../../utils/utils';
import { toast } from 'react-toastify';

import {
  SET_ALL_REPORTS,
  SET_FAVORITES,
  SET_READ_LATER_REPORTS,
  SET_DIVITION,
  SET_CATEGORY,
  GET_ERRORS 

} from '../Constants';

axios.defaults.baseURL = 'https://courtofappealreportsnigeria.com/api';

export const getAllReports =  () => async dispatch => {
  const token = localStorage.getItem("jwtToken")
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.get('reports', { headers });
    
    dispatch({
      type: SET_ALL_REPORTS,
      payload: {
        reports: response.data.data
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

export const addReportToFavorite = (reportId) => async dispatch => {
  const token = localStorage.getItem("jwtToken")
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`reports/${reportId}/favorite`, { headers });

    const { status } = response;

    if (status === 201) {
      toast('Report successfully added to Favorites.');

      const reportsResponse = await axios.get('reports/favorite', { headers });

      dispatch({
        type: SET_FAVORITES,
        payload: {
          favorites: reportsResponse.data.data
        }
      });
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

export const addReportToReadLater = (reportId) => async dispatch => {
  const token = localStorage.getItem("jwtToken")
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`reports/${reportId}/future`, { headers });

    const { status } = response;

    if (status === 201) {
      toast('Report successfully added to Read Later.');

      const futureReportsResponse = await axios.get('reports/future', { headers });

      dispatch({
        type: SET_READ_LATER_REPORTS,
        payload: {
          readLaterReports: futureReportsResponse.data.data
        }
      });
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

export const removeFavoriteReport = (reportId) => async dispatch => {
  const token = localStorage.getItem("jwtToken")
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.delete(`reports/${reportId}/favorite`, { headers });

    const { status } = response;

    if (status === 204) {
      toast('Report successfully removed from Favorites.');

      const favoriteReportsResponse = await axios.get('reports/favorite', { headers });

      dispatch({
        type: SET_FAVORITES,
        payload: {
          favorites: favoriteReportsResponse.data.data
        }
      }); 
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

export const removeReadLaterReport = (reportId) => async dispatch => {
  const token = localStorage.getItem("jwtToken")
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  
  try {
    const response = await axios.delete(`reports/${reportId}/future`, { headers });

    const { status } = response;

    if (status === 204) {
      toast('Report successfully removed from Read Later.');

      const futureReportsResponse = await axios.get('reports/future', { headers })
        
      dispatch({
        type: SET_READ_LATER_REPORTS,
        payload: {
          readLaterReports: futureReportsResponse.data.data
        }
      });
    }
  } catch(error) {
    if (error.response) {
      const { message } = error.response.data;

      toast(message);
    } else {
      toast('An error occured. Please try again.');
    }
  }
}

export const getFavorites = () => async dispatch => {
  const token = localStorage.getItem("jwtToken")
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  
  try {
    const response = await axios.get('reports/favorite', { headers });
      
    dispatch({
      type: SET_FAVORITES,
      payload: {
        favorites: response.data.data
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

export const getReadLaterReports = () => async dispatch => {
  const token = localStorage.getItem("jwtToken")
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.get('reports/future', { headers });
        
    dispatch({
      type: SET_READ_LATER_REPORTS,
      payload: {
        readLaterReports: response.data.data
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

export const getDivision = () => async dispatch => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

    await axios.get(GetDivisionEndpoint, { 'headers': headers })
    .then((response) => {
      dispatch({
        type: SET_DIVITION,
        payload: response.data.data
      });
    })
    .catch (error =>{
      if (error.response) {
        const { message } = error.response.data;

        toast(message);
      } else {
        toast('An error occured. Please try again.');
      }
    })
  }

// fetch all category and add to state
export const getCategory = () => async dispatch => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  await axios.get(GetCategoryEndpoint, { 
    'headers': headers
  })
  .then((response) =>{
    console.log('hello cat is called', response.data.data)
      dispatch({
        type: SET_CATEGORY,
        payload: response.data.data
      });
    })
    .catch (error => {
    if (error.response) {
      const { message } = error.response.data;

      dispatch({
        type: GET_ERRORS,
        payload: message
      })
    } 
    else {
      toast('An error occured. Please try again.');
    }
  })
}
