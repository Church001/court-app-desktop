import { axiosWrapper as axios } from '../store';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    var access_token = "JWT " + token;
    
    axios.defaults.headers.common["access_token"] = access_token;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["access_token"];
    delete axios.defaults.headers.common['Authorization'];
  }
};
export default setAuthToken;
