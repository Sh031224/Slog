import { createReducer } from "typesafe-actions";
import {
  CLEAR_ERROR,
  CREATE_COMMENT,
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_SUCCESS,
  CREATE_REPLY,
  CREATE_REPLY_FAILURE,
  CREATE_REPLY_SUCCESS,
  DELETE_COMMENT,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_REPLY,
  DELETE_REPLY_FAILURE,
  DELETE_REPLY_SUCCESS,
  GET_COMMENTS,
  GET_COMMENTS_FAILURE,
  GET_COMMENTS_SUCCESS
} from "./actions";
import { CommentAction, CommentState } from "./types";

export const commentInitialState: CommentState = {
  loading: false,
  error: null,
  data: {
    comments: []
  }
};

export default createReducer<CommentState, CommentAction>(commentInitialState, {
  [GET_COMMENTS]: (state, action) => ({
    ...state,
    loading: true,
    error: null
  }),
  [GET_COMMENTS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: {
      comments: action.payload
    }
  }),
  [GET_COMMENTS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: {
      comments: []
    }
  }),
  [CREATE_COMMENT]: (state, action) => ({
    ...state,
    error: null
  }),
  [CREATE_COMMENT_SUCCESS]: (state, action) => ({
    ...state,
    error: null
  }),
  [CREATE_COMMENT_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [CREATE_REPLY]: (state, action) => ({
    ...state,
    error: null
  }),
  [CREATE_REPLY_SUCCESS]: (state, action) => ({
    ...state,
    error: null
  }),
  [CREATE_REPLY_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [DELETE_COMMENT]: (state, action) => ({
    ...state,
    error: null
  }),
  [DELETE_COMMENT_SUCCESS]: (state, action) => ({
    ...state,
    error: null
  }),
  [DELETE_COMMENT_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [DELETE_REPLY]: (state, action) => ({
    ...state,
    error: null
  }),
  [DELETE_REPLY_SUCCESS]: (state, action) => ({
    ...state,
    error: null
  }),
  [DELETE_REPLY_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [CLEAR_ERROR]: (state, action) => ({
    ...state,
    error: null
  })
});
