import axios, { AxiosInstance, AxiosResponse } from "axios";
import camelcaseKeys from "camelcase-keys";

const client: AxiosInstance = axios.create();

client.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

client.interceptors.response.use(function (response): AxiosResponse {
  // Any status code that lie within the range of 2xx cause this function to trigger
  return {
    ...response,
    data: camelcaseKeys(response.data, { deep: true }),
  };
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  return Promise.reject(error);
});

export default client;
