import { createReducer } from "typesafe-actions";
import { CommonAction, CommonState } from "./types";
import {
  CLEAR_ERROR,
  GET_POSTS,
  GET_POSTS_FAILURE,
  GET_POSTS_SUCCESS,
  GET_SEARCH_POSTS,
  GET_SEARCH_POSTS_FAILURE,
  GET_SEARCH_POSTS_SUCCESS,
  GET_TEMP_POSTS,
  GET_TEMP_POSTS_FAILURE,
  GET_TEMP_POSTS_SUCCESS,
  INCREASE_PAGE,
  RESET_PAGE
} from "./actions";
import CategoryTag from "constant/CategoryTag";

export const commonInitialState: CommonState = {
  loading: false,
  error: null,
  data: { posts: [], total: 0, notfound: false, page: 1, category: CategoryTag.All }
};

export default createReducer<CommonState, CommonAction>(commonInitialState, {
  [CLEAR_ERROR]: (state, action) => ({
    ...state,
    error: null
  }),
  [GET_POSTS]: (state, action) => {
    if (state.data.page === 1)
      return {
        ...state,
        loading: true,
        error: null,
        data: {
          posts: [],
          total: 0,
          notfound: false,
          page: 1,
          category: action.payload
        }
      };
    return {
      ...state,
      loading: true,
      error: null,
      data: {
        ...state.data,
        notfound: false,
        category: action.payload
      }
    };
  },
  [GET_POSTS_SUCCESS]: (state, action) => {
    if (state.data.page === 1)
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          ...action.payload
        }
      };

    return {
      ...state,
      loading: false,
      error: null,
      data: {
        ...state.data,
        ...action.payload,
        posts: [...state.data.posts, ...action.payload.posts]
      }
    };
  },
  [GET_POSTS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
  }),
  [INCREASE_PAGE]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      page: state.data.page + 1
    }
  }),
  [RESET_PAGE]: (state, action) => ({
    ...state,
    data: {
      ...state.data,
      page: 1
    }
  }),
  [GET_TEMP_POSTS]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      posts: [],
      total: 0,
      notfound: false,
      page: 1,
      category: CategoryTag.Temp
    }
  }),
  [GET_TEMP_POSTS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      posts: action.payload,
      total: 0,
      notfound: action.payload.length ? false : true,
      page: 1,
      category: null
    }
  }),
  [GET_TEMP_POSTS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
  }),
  [GET_SEARCH_POSTS]: (state, action) => ({
    ...state,
    loading: true,
    data: {
      ...state.data,
      posts: [],
      category: CategoryTag.Search
    }
  }),
  [GET_SEARCH_POSTS_SUCCESS]: (state, action) => {
    if (!action.payload.length) {
      return {
        ...state,
        data: {
          ...state.data,
          posts: action.payload,
          notfound: true
        },
        loading: false
      };
    }

    return {
      ...state,
      data: {
        ...state.data,
        posts: action.payload,
        notfound: false
      },
      loading: false
    };
  },
  [GET_SEARCH_POSTS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      posts: [],
      notfound: false
    }
  })
});
