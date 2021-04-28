import { createReducer } from "typesafe-actions";
import { CategoryAction, ICategoryState } from "./types";
import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_SUCCESS,
  MODIFY_CATEGORY,
  MODIFY_CATEGORY_FAILURE,
  MODIFY_CATEGORY_ORDER,
  MODIFY_CATEGORY_ORDER_FAILURE,
  MODIFY_CATEGORY_ORDER_SUCCESS,
  MODIFY_CATEGORY_SUCCESS
} from "./actions";

export const categoryInitialState: ICategoryState = {
  loading: false,
  error: null,
  data: { categories: [], total: 0 }
};

export default createReducer<ICategoryState, CategoryAction>(categoryInitialState, {
  [GET_CATEGORIES]: (state, action) => ({
    ...state,
    loading: true,
    error: null
  }),
  [GET_CATEGORIES_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload
  }),
  [GET_CATEGORIES_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      categories: [],
      total: 0
    }
  }),
  [CREATE_CATEGORY]: (state, action) => ({
    ...state,
    loading: true
  }),
  [CREATE_CATEGORY_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null
  }),
  [CREATE_CATEGORY_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
  }),
  [MODIFY_CATEGORY]: (state, action) => ({
    ...state,
    loading: true
  }),
  [MODIFY_CATEGORY_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null
  }),
  [MODIFY_CATEGORY_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
  }),
  [MODIFY_CATEGORY_ORDER]: (state, action) => ({
    ...state,
    loading: true
  }),
  [MODIFY_CATEGORY_ORDER_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null
  }),
  [MODIFY_CATEGORY_ORDER_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
  }),
  [DELETE_CATEGORY]: (state, action) => ({
    ...state,
    loading: true
  }),
  [DELETE_CATEGORY_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null
  }),
  [DELETE_CATEGORY_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
  })
});
