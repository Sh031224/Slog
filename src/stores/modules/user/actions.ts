import { AxiosError } from "axios";
import { ResponseType } from "interface/IResponse";
import { IUser } from "interface/IUser";
import { createAction, createAsyncAction } from "typesafe-actions";

export const GET_USERINFO = "user/GET_USERINFO" as const;
export const GET_USERINFO_SUCCESS = "user/GET_USERINFO_SUCCESS" as const;
export const GET_USERINFO_FAILURE = "user/GET_USERINFO_FAILURE" as const;

export const LOGOUT = "user/LOGOUT" as const;

export const TRY_LOGIN = "user/TRY_LOGIN" as const;
export const TRY_LOGIN_SUCCESS = "user/TRY_LOGIN_SUCCESS" as const;
export const TRY_LOGIN_FAILURE = "user/TRY_LOGIN_FAILURE" as const;

export const getUserInfoAsync = createAsyncAction(
  GET_USERINFO,
  GET_USERINFO_SUCCESS,
  GET_USERINFO_FAILURE
)<void, IUser, AxiosError<ResponseType>>();

export const logout = createAction(LOGOUT)();

export const tryLoginAsync = createAsyncAction(TRY_LOGIN, TRY_LOGIN_SUCCESS, TRY_LOGIN_FAILURE)<
  void,
  void,
  AxiosError<ResponseType>
>();
