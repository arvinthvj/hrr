import axios from "axios";
import { loginUrl } from "../assets/constants/pageurl";
import { removeLocalStorage } from "../assets/globals";
import { store } from "../reduxStore";
import { Cookies } from "react-cookie";

import ToastMessage from "../components/toast";
import {
  hideLoader,
  setLoginToken,
  setRefreshToken,
  setUserDetails,
} from "../reduxStore/appSlice";
import { tenantinActiveApiResCode700 } from "../assets/constants/config";
import { _doLogout } from "../components/commonMethod";

const loginToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZGV2YXBpLmh5YnJpZGhlcm8uY29tL2F1dGgvYXBpL2xvZ2luIiwiaWF0IjoxNjkxNTU2MDQ5LCJleHAiOjE2OTQxNDgwNDksIm5iZiI6MTY5MTU1NjA0OSwianRpIjoiQ0p1U0cyRG1nVGlBTTVsQyIsInN1YiI6IjQzIiwicHJ2IjoiMDI1OGE2ZTA2YTk4MDAwMDMxNzRhODcxYWNkM2M4NTBkMmFlZTJmYSIsInRlbmFudF9pZCI6MzIyLCJ0ZW5hbnRfbmFtZSI6Ikh5YnJpZEhlcm8iLCJ1c2VyX2lkIjo0MywibG9jYXRpb25faWQiOjIxLCJwZXJtaXNzaW9uX2dyb3VwX2lkIjoiNyw2LDQsMiJ9.8S3NZ14qKjaCQtcd5btSxYeU2ZYejLDo7kzYPRqwN7s";
const currentHost = window.location.hostname;
const hostendpoint = currentHost.split('.')[0].split('-')[1];
const BASE_URL =
  hostendpoint !== undefined
    ? `https://${hostendpoint}api.hybridhero.com/reporting/`
    : process.env.REACT_APP_REPORTING_API_URL;
const cookies = new Cookies();
let isRefreshing = false;

const reporting_axios_instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    Authorization: "Bearer " + (loginToken ? loginToken : ""),
  },
});

reporting_axios_instance.interceptors.request.use(
  function (config) {
    const state = store.getState();
    const loginToken = state.app.token;
    config.headers["Content-Type"] = "application/json";
    config.headers.Accept = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    // config.headers["tenant_id"] = 322;
    config.headers.Authorization = "Bearer " + loginToken;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


// Add a response interceptor
reporting_axios_instance.interceptors.response.use(undefined, function (error) {
  store.dispatch(hideLoader());
  const originalRequest = error.config;
  if (
    error == "Error: Request failed with status code 401" ||
    error?.response?.data?.code == 401
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
        (error?.response?.data?.code == "204" &&
          error?.response?.data?.message == "Unauthorized") ||
        (error?.response?.data?.code == "204" &&
          error?.response?.data?.message == "unauthorized") ||
        (error?.response?.data?.code == "204" &&
          error?.response?.data?.message == ""))
    ) {
      _doLogout();
    } else if (
      error?.response?.data?.code &&
      error?.response?.data?.code === 401
    ) {
      // Unauthorized and log out
      ToastMessage(
        "401",
        error.response.data.message
          ? error.response.data.message
          : "Unauthorized"
      );
      removeLocalStorage();
      window.location.href = loginUrl;
      const errors = JSON.parse(JSON.stringify(error.response.data.errors));
      for (const i in errors) {
        ToastMessage("error", "Error" + i);
      }
    } else {
      if (error?.response?.data?.code && error?.response?.data?.code == "500") {
        ToastMessage("500", error.response.data.message);
        // navigateToPageNotFound(); // redirect to page not found page
      } else {
        if (error?.response?.data?.messages) {
          const errors = JSON.parse(
            JSON.stringify(error.response.data.messages)
          );
          for (const i in errors) {
            ToastMessage("error", errors[i]);
          }
        } else {
          if (Array.isArray(error?.response?.data?.message)) {
            const errors = JSON.parse(
              JSON.stringify(error.response.data.message)
            );

            for (const i in errors) {
              ToastMessage("error", errors[i]);
            }
          } else if (error?.response?.data) {
            return Promise.reject(error?.response?.data);
          } else if (error?.response?.data?.name) {
            for (let msg of error?.response?.data?.name)
              ToastMessage("error", msg);
          }
        }
      }
    }
    return Promise.reject(error);
  }
});

export default reporting_axios_instance;
