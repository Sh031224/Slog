import { RootState } from "stores/modules";
import { limit } from "config/server.json";
import { getPostsThunk, getSearchPostsThunk, getTempPostsThunk } from "stores/modules/common";
import { getUserInfoThunk } from "stores/modules/user";
import { getCategoriesThunk } from "stores/modules/category";
import { IPostParmsDTO } from "interface/IPost";
import { getToken } from "./token";
import { getHitPostsThunk, getPostInfoThunk } from "stores/modules/post";
import { getCommentsThunk } from "stores/modules/comment";

export const getPostsPromise = async (ctx: any) => {
  const { store } = ctx;
  const state: RootState = store.getState();
  const { dispatch } = store;

  if (!state.common.data.notfound && !state.common.data.posts.length && !state.common.data.total) {
    const { query } = ctx;
    const params: IPostParmsDTO = {
      page: state.common.data.page,
      limit
    };

    if (query) {
      if (Number(query.tab)) {
        params.category = Number(query.tab);
      } else if (query.temp) {
        await dispatch(getTempPostsThunk());
        return;
      } else if (query.search) {
        return dispatch(getSearchPostsThunk(query.search));
      }
    }
    await dispatch(getPostsThunk(params));
  }
};

export const getUserInfoPromise = async (ctx: any) => {
  const { store } = ctx;
  const state: RootState = store.getState();
  const { dispatch } = store;

  const { error, data } = state.user;

  if (
    (!error && !data.login && getToken() && !data.user.name) ||
    (!data.login && !data.user.name && getToken())
  ) {
    await dispatch(getUserInfoThunk());
  }
};

export const getCategoriesPromise = async (ctx: any) => {
  const { store } = ctx;
  const state: RootState = store.getState();
  const { dispatch } = store;

  if (!state.category.data.categories.length) await dispatch(getCategoriesThunk());
};

export const getPostInfoPromise = async (ctx: any) => {
  const { store } = ctx;
  const { dispatch } = store;

  if (ctx.query.idx && ctx.query.idx !== "new") {
    await dispatch(getPostInfoThunk(ctx.query.idx || 0));
  }
};

export const getHitPostsPromise = async (ctx: any) => {
  const { store } = ctx;
  const { dispatch } = store;
  const state: RootState = store.getState();

  const { hitPosts } = state.post.data;

  if (!hitPosts.length) {
    await dispatch(getHitPostsThunk());
  }
};

export const getCommentsPromise = async (ctx: any) => {
  const { store } = ctx;
  const { dispatch } = store;

  await dispatch(getCommentsThunk(ctx.query.idx || 0));
};
