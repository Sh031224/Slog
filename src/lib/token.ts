import Cookies from "js-cookie";
import Api from "./customAxios";

export const setToken = (value: string) => {
  Api.defaults.headers["access_token"] = value;

  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 30);

  Cookies.set("access_token", value, { expires, path: "/" });
};

export const getToken = (): string | undefined => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return Api.defaults.headers.Cookie || "";
  } else {
    return Cookies.get("access_token") || "";
  }
};

export const removeToken = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    Api.defaults.headers.Cookie = "";
  } else {
    Cookies.remove("access_token");
  }
};
