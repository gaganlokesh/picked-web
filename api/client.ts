import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import camelcaseKeys from "camelcase-keys";
import { refreshAccessToken } from "./auth";

let tokenRefreshInitiated: boolean = false;

const client: AxiosInstance & {
  authorization?: string;
} = axios.create();

client.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
client.defaults.withCredentials = true;

client.interceptors.request.use(function (config): AxiosRequestConfig {
  if (client.authorization) {
    config.headers["Authorization"] = `Bearer ${client.authorization}`;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
})

client.interceptors.response.use(function (response): AxiosResponse {
  // Any status code that lie within the range of 2xx cause this function to trigger
  return {
    ...response,
    data: camelcaseKeys(response.data, { deep: true }),
  };
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // TODO: Re-authenticate on 401 error using refresh token

  // const originalRequest = error.config;

  // if (
  //   !tokenRefreshInitiated && error.response.status === 401
  //   && !originalRequest._retry
  // ) {
  //   originalRequest._retry = true;
  //   tokenRefreshInitiated = true;

  //   return refreshAccessToken()
  //     .then(res => {
  //       accessToken = res.accessToken;
  //     })
  //     .finally(() => {
  //       tokenRefreshInitiated = false;
  //     })
  //   ;
  // }

  return Promise.reject(error);
});

export default client;
