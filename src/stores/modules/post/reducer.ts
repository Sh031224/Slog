import { createReducer } from "typesafe-actions";
import { IPostState, PostAction } from ".";
import {
  CLEAR_ERROR,
  DELETE_POST,
  DELETE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  GET_HIT_POSTS,
  GET_HIT_POSTS_FAILURE,
  GET_HIT_POSTS_SUCCESS,
  GET_POST_INFO,
  GET_POST_INFO_FAILURE,
  GET_POST_INFO_SUCCESS
} from "./actions";

export const postInitialState: IPostState = {
  loading: false,
  error: null,
  data: {
    post: {
      idx: 0,
      title: "",
      description: "",
      content: "",
      view: 0,
      is_temp: false,
      fk_category_idx: 0,
      thumbnail: "",
      created_at: new Date(),
      updated_at: new Date(),
      comment_count: 0
    },
    hitPosts: []
  }
};

export default createReducer<IPostState, PostAction>(postInitialState, {
  [CLEAR_ERROR]: (state, action) => ({
    ...state,
    error: null
  }),
  [GET_POST_INFO]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
    data: { ...state.data, post: postInitialState.data.post }
  }),
  [GET_POST_INFO_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      post: action.payload
    }
  }),
  [GET_POST_INFO_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
  }),
  [GET_HIT_POSTS]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
    data: {
      ...state.data,
      hitPosts: []
    }
  }),
  [GET_HIT_POSTS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      ...state.data,
      hitPosts: action.payload
    }
  }),
  [GET_HIT_POSTS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
  }),
  [DELETE_POST]: (state, action) => ({
    ...state,
    error: null
  }),
  [DELETE_POST_SUCCESS]: (state, action) => ({
    ...state,
    error: null,
    data: {
      ...state.data,
      post: postInitialState.data.post
    }
  }),
  [DELETE_POST_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  })
});
