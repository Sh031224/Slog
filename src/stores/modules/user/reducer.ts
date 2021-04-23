import { createReducer } from "typesafe-actions";
import {
  GET_USERINFO,
  GET_USERINFO_FAILURE,
  GET_USERINFO_SUCCESS,
  LOGOUT,
  TRY_LOGIN,
  TRY_LOGIN_FAILURE,
  TRY_LOGIN_SUCCESS
} from "./actions";
import { IUserState, UserAction } from "./types";

export const userInitialState: IUserState = {
  loading: false,
  error: null,
  data: {
    login: false,
    user: {
      idx: 0,
      name: "",
      is_admin: false,
      created_at: new Date()
    }
  }
};

export default createReducer<IUserState, UserAction>(userInitialState, {
  [GET_USERINFO]: (state, action) => ({
    ...state,
    loading: false,
    error: null
  }),
  [GET_USERINFO_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      login: true,
      user: action.payload
    }
  }),
  [GET_USERINFO_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      login: false,
      user: {
        idx: 0,
        name: "",
        is_admin: false,
        created_at: new Date()
      }
    }
  }),
  [LOGOUT]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      login: false,
      user: {
        idx: 0,
        name: "",
        is_admin: false,
        created_at: new Date()
      }
    }
  }),
  [TRY_LOGIN]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      login: false,
      user: {
        idx: 0,
        name: "",
        is_admin: false,
        created_at: new Date()
      }
    }
  }),
  [TRY_LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      login: true
    }
  }),
  [TRY_LOGIN_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      ...state.data,
      login: false
    }
  })
});
