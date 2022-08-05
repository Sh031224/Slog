import { AxiosError } from "axios";
import { ResponseType } from "types/response";
import { User } from "types/user";
import { createAction, createAsyncAction } from "typesafe-actions";

export const GET_USERINFO = "user/GET_USERINFO" as const;
export const GET_USERINFO_SUCCESS = "user/GET_USERINFO_SUCCESS" as const;
export const GET_USERINFO_FAILURE = "user/GET_USERINFO_FAILURE" as const;

export const CREATE_FCM_TOKEN = "user/CREATE_FCM_TOKEN" as const;
export const CREATE_FCM_TOKEN_SUCCESS = "user/CREATE_FCM_TOKEN_SUCCESS" as const;
export const CREATE_FCM_TOKEN_FAILURE = "user/CREATE_FCM_TOKEN_FAILURE" as const;

export const LOGOUT = "user/LOGOUT" as const;

export const TRY_LOGIN = "user/TRY_LOGIN" as const;
export const TRY_LOGIN_SUCCESS = "user/TRY_LOGIN_SUCCESS" as const;
export const TRY_LOGIN_FAILURE = "user/TRY_LOGIN_FAILURE" as const;

export const createFcmTokenAsync = createAsyncAction(
  CREATE_FCM_TOKEN,
  CREATE_FCM_TOKEN_SUCCESS,
  CREATE_FCM_TOKEN_FAILURE
)<void, void, AxiosError<ResponseType>>();
export const getUserInfoAsync = createAsyncAction(
  GET_USERINFO,
  GET_USERINFO_SUCCESS,
  GET_USERINFO_FAILURE
)<void, User, AxiosError<ResponseType>>();

export const logout = createAction(LOGOUT)();

export const tryLoginAsync = createAsyncAction(TRY_LOGIN, TRY_LOGIN_SUCCESS, TRY_LOGIN_FAILURE)<
  void,
  void,
  AxiosError<ResponseType>
>();
