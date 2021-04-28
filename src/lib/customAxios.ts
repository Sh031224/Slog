import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { server } from "config/index.json";
import { getToken, removeToken } from "./token";

const addToken = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const token = getToken();

  if (token) {
    config.headers["access_token"] = token;
  }

  return config;
};

const addTokenErrorHandle = (err: AxiosError) => {
  removeToken();
};

const Api = axios.create({
  baseURL: server,
  timeout: 100000,
  params: {}
});

Api.defaults.headers = {
  "Cache-Control": "no-cache",
  Accept: "application/json",
  Pragma: "no-cache",
  Expires: "0"
};

Api.interceptors.request.use(addToken, addTokenErrorHandle);

export default Api;
