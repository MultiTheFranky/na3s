/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = `http://${window.location.hostname}:${
  process.env.REACT_APP_SERVER_PORT ?? 8100
}/api`;

/**
 *
 * @param config
 * @returns
 */
const REQUEST = (config: AxiosRequestConfig<any>) => {
  const user = localStorage.getItem("user");
  if (user !== "null" && user && config.headers) {
    config.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return config;
};

/**
 *
 * @param error
 */
const REQUEST_ERROR = (error: AxiosError) => {
  Promise.reject(error);
};

/**
 *
 * @param config
 * @returns
 */
const RESPONSE = (response: AxiosResponse<any, any>) => {
  return response;
};

/**
 *
 * @param error
 */
const RESPONSE_ERROR = (error: any) => {
  const originalRequest = error.config;
  if (
    error.response.status === 401 &&
    originalRequest &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  return Promise.reject(error);
};

const userAPI = axios.create({
  baseURL: `${BASE_URL}/web/user`,
});

userAPI.interceptors.request.use(REQUEST, REQUEST_ERROR);

userAPI.interceptors.response.use(RESPONSE, RESPONSE_ERROR);

const arma3serverAPI = axios.create({
  baseURL: `${BASE_URL}/arma3server`,
});

arma3serverAPI.interceptors.request.use(REQUEST, REQUEST_ERROR);

arma3serverAPI.interceptors.response.use(RESPONSE, RESPONSE_ERROR);

const steamcmdAPI = axios.create({
  baseURL: `${BASE_URL}/steamcmd`,
});

steamcmdAPI.interceptors.request.use(REQUEST, REQUEST_ERROR);

steamcmdAPI.interceptors.response.use(RESPONSE, RESPONSE_ERROR);

const systemAPI = axios.create({
  baseURL: `${BASE_URL}/system`,
});

systemAPI.interceptors.request.use(REQUEST, REQUEST_ERROR);

systemAPI.interceptors.response.use(RESPONSE, RESPONSE_ERROR);

export { userAPI, arma3serverAPI, steamcmdAPI, systemAPI };
