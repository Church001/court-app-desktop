import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";

import axios from 'axios';
import { SHOW_LOADER, HIDE_LOADER } from "./redux/Constants";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log('[nodeHttp]: start');
  store.dispatch({
    type: SHOW_LOADER
  });
  return config;
}, function (error) {
  // Do something with request error
  store.dispatch({
    type: HIDE_LOADER
  });
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  store.dispatch({
    type: HIDE_LOADER
  });
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  store.dispatch({
    type: HIDE_LOADER
  });
  return Promise.reject(error);
});

export const axiosWrapper = axios;

export default store;
