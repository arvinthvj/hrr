import axios from 'axios';
import { loginUrl } from '../assets/constants/pageurl';
import { removeLocalStorage } from '../assets/globals';
import { store } from '../reduxStore';
import { Cookies } from 'react-cookie';

import ToastMessage from '../components/toast';
import {
  hideLoader,
  setCallRefresh,
  setLoginToken,
  setRefreshToken,
  setUserDetails,
} from '../reduxStore/appSlice';
import { tenantinActiveApiResCode700 } from '../assets/constants/config';
import { _doLogout, getExpireTimeFromToken } from '../components/commonMethod';
// const loginToken = store?.getState()?.app?.token;

const currentHost = window.location.hostname;
const hostendpoint = currentHost.split('.')[0].split('-')[1];
const BASE_URL =
  hostendpoint !== undefined
    ? `https://${hostendpoint}api.hybridhero.com/`
    : process.env.REACT_APP_API_URL;
const cookies = new Cookies();
let isRefreshing = false;
const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    Authorization:
      'Bearer ' +
      (cookies?.get('accessToken') ? cookies?.get('accessToken') : ''),
    // Authorization: 'Bearer ' + (loginToken ? loginToken : ''),
  },
});
instance.interceptors.request.use(
  function (config) {
    // const apiUrl = config.url;
    // let url = '/auth/api/refreshToken';
    // const state = store.getState();
    // const refreshToken = state.app.refreshToken;
    // const loginToken = state.app.token;
    const accessToken = cookies?.get('accessToken');

    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers.Accept = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Credentials'] = true;
    config.headers.Authorization = 'Bearer ' + (accessToken ? accessToken : '');
    // 'Bearer ' + (url == apiUrl ? refreshToken : loginToken);
    // config.headers.Authorization = "Bearer " + loginToken;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
export const refreshTokenAPI = () => {
  store.dispatch(setCallRefresh(false));
  const refreshToken = cookies?.get('accessToken');
  if (!isRefreshing) {
    isRefreshing = true;
    try {
      return axios
        .post('/auth/api/refreshToken', null, {
          baseURL: BASE_URL,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            Authorization: 'Bearer ' + (refreshToken ? refreshToken : ''), // Include the refresh token in the Authorization header
          },
        })
        .then(data => {
          let response = data?.data;
          if (response?.access_token) {            
            store.dispatch(setLoginToken(response?.access_token));
            store.dispatch(setRefreshToken(response?.refresh_token));
            getExpireTimeFromToken(response?.access_token);           
            var userDetails = store?.getState()?.app?.userDetails;
            var obj = { ...userDetails, access_token: response?.access_token };
            store.dispatch(setUserDetails(obj));
            const expires = new Date(
              Date.now() + parseInt(response?.expires_in) * 1000,
            );
            cookies.set('token', response?.access_token, { expires });
            cookies.set('accessToken', response?.access_token, {
              path: '/',
              expires,
            });            
            store.dispatch(setCallRefresh(true));
            // let orgDetail = JSON.parse(atob(response?.access_token));
            // dispatch(setOrgDetail(orgDetail));
            // return axios(originalRequest);
          }
        })
        .catch(error => {
          // _doLogout();
        });
    } catch (error) {
      // _doLogout();
    } finally {
      isRefreshing = false;
      // return axios(originalRequest);
    }
  }
};
// Add a response interceptor
instance.interceptors.response.use(undefined, function (error) {
  store.dispatch(hideLoader());
  const originalRequest = error.config;
  if (
    error == 'Error: Request failed with status code 401' ||
    error?.response?.data?.code == 401 ||
    (error?.response?.data?.code == 404 ||
      error?.response?.data?.message == 'Authorization Token not found')
  ) {
    // return refreshTokenAPI(originalRequest);
    _doLogout();
  }
  if (!error?.response) {
    // do nothing
  } else {
    if (
      error?.response?.data?.code &&
      (error?.response?.data?.code === tenantinActiveApiResCode700 ||
        (error?.response?.data?.code == '204' &&
          error?.response?.data?.message == 'Unauthorized') ||
        (error?.response?.data?.code == '204' &&
          error?.response?.data?.message == 'unauthorized') ||
        (error?.response?.data?.code == '204' &&
          error?.response?.data?.message == ''))
    ) {
      _doLogout();
    } else if (
      error?.response?.data?.code &&
      error?.response?.data?.code === 401
    ) {
      // Unauthorized and log out
      ToastMessage(
        '401',
        error.response.data.message
          ? error.response.data.message
          : 'Unauthorized',
      );
      removeLocalStorage();
      window.location.href = loginUrl;
      const errors = JSON.parse(JSON.stringify(error.response.data.errors));
      for (const i in errors) {
        ToastMessage('error', 'Error' + i);
      }
    } else {
      if (error?.response?.data?.code && error?.response?.data?.code == '500') {
        // ToastMessage("500", error.response.data.message);
        // navigateToPageNotFound(); // redirect to page not found page
      } else {
        if (error?.response?.data?.messages) {
          const errors = JSON.parse(
            JSON.stringify(error.response.data.messages),
          );
          for (const i in errors) {
            ToastMessage('error', errors[i]);
          }
        } else {
          if (Array.isArray(error?.response?.data?.message)) {
            const errors = JSON.parse(
              JSON.stringify(error.response.data.message),
            );

            for (const i in errors) {
              ToastMessage('error', errors[i]);
            }
          } else if (error?.response?.data) {
            return Promise.reject(error?.response?.data);
          } else if (error?.response?.data?.name) {
            for (let msg of error?.response?.data?.name)
              ToastMessage('error', msg);
          }
        }
      }
    }
    return Promise.reject(error);
  }
});

export default instance;
