import axios from "axios";
import Cookies from "js-cookie";

export const setToken = (value: string) => {
  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 30);

  Cookies.set("access_token", value, { expires, path: "/" });
};

export const getToken = (): string | undefined => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return axios.defaults.headers.common["Cookie"] || "";
  } else {
    return Cookies.get("access_token") || "";
  }
};

export const removeToken = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    axios.defaults.headers.common["Cookie"] = "";
  } else {
    Cookies.remove("access_token");
  }
};
