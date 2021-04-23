import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { server } from "config/index.json";
import Cookies from "js-cookie";
import { getToken } from "./token";

const addToken = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const token = getToken();

  if (token) {
    config.headers["access_token"] = token;
  }

  return config;
};

const addTokenErrorHandle = (err: AxiosError) => {
  Cookies.remove("access_token");
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
