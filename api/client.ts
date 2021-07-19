import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import camelcaseKeys from "camelcase-keys";
import { refreshAccessToken } from "./auth";

let tokenRefreshInitiated: boolean = false;

const client: AxiosInstance = axios.create();

client.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

client.interceptors.request.use(function (config): AxiosRequestConfig {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
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
  const originalRequest = error.config;
  let refreshToken = localStorage.getItem("refreshToken");

  if (
    !tokenRefreshInitiated && refreshToken
    && error.response.status === 401 && !originalRequest._retry
  ) {
    originalRequest._retry = true;
    tokenRefreshInitiated = true;

    return refreshAccessToken(refreshToken)
      .then(res => {
        if (res.accessToken) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken)

          originalRequest.headers['Authorization'] = `Bearer ${res.accessToken}`;
          return client(originalRequest);
        }
      })
      .catch(err => {
        console.error("Failed to refresh access token:", err.error_description);
      })
      .finally(() => {
        tokenRefreshInitiated = false;
      })
    ;
  }

  return Promise.reject(error);
});

export default client;
