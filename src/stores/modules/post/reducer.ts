import { createReducer } from "typesafe-actions";
import { PostState, PostAction } from ".";
import {
  CLEAR_ERROR,
  CREATE_POST,
  CREATE_POST_FAILURE,
  CREATE_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  GET_COMMENTS_COUNT,
  GET_COMMENTS_COUNT_FAILURE,
  GET_COMMENTS_COUNT_SUCCESS,
  GET_HIT_POSTS,
  GET_HIT_POSTS_FAILURE,
  GET_HIT_POSTS_SUCCESS,
  GET_POST_INFO,
  GET_POST_INFO_FAILURE,
  GET_POST_INFO_SUCCESS,
  MODIFY_POST,
  MODIFY_POST_FAILURE,
  MODIFY_POST_SUCCESS
} from "./actions";

export const postInitialState: PostState = {
  loading: false,
  error: null,
  data: {
    post: {
      idx: 0,
      title: "",
      description: "",
      content: "",
      view: 0,
      is_temp: true,
      fk_category_idx: -1,
      thumbnail: "",
      created_at: new Date(),
      updated_at: new Date(),
      comment_count: 0
    },
    hitPosts: []
  }
};

export default createReducer<PostState, PostAction>(postInitialState, {
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
  }),
  [GET_COMMENTS_COUNT]: (state, action) => ({
    ...state,
    error: null
  }),
  [GET_COMMENTS_COUNT_SUCCESS]: (state, action) => ({
    ...state,
    error: null,
    data: {
      ...state.data,
      post: {
        ...state.data.post,
        comment_count: action.payload
      }
    }
  }),
  [GET_COMMENTS_COUNT_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [CREATE_POST]: (state, action) => ({
    ...state,
    error: null
  }),
  [CREATE_POST_SUCCESS]: (state, action) => ({
    ...state,
    error: null
  }),
  [CREATE_POST_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [MODIFY_POST]: (state, action) => ({
    ...state,
    error: null
  }),
  [MODIFY_POST_SUCCESS]: (state, action) => ({
    ...state,
    error: null
  }),
  [MODIFY_POST_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  })
});
