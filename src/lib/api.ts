import Api from "./customAxios";
import {
  GetCategoriesResponse,
  GetCommentsResponse,
  GetPostInfoResponse,
  GetPostsResponse,
  GetProfileResponse,
  GetTempPostsResponse,
  LoginResponse,
  ResponseType
} from "interface/IResponse";
import { AxiosResponse, CancelToken } from "axios";
import { ICommentParamsDTO, IPostParmsDTO, IReplyParamsDTO } from "interface/IPost";
import queryString from "query-string";
import { setToken } from "./token";

export const category = {
  getCategoryList: async () => {
    const { data }: AxiosResponse<GetCategoriesResponse> = await Api.get(`/api/v1/category/`);

    return data.data;
  },
  createCategory: async (name: string) => {
    const body = {
      name: name
    };

    const { data } = await Api.post("/api/v1/category/", body);

    return data;
  },
  modifyCategory: async (category_idx: number, name: string) => {
    const { data }: AxiosResponse<ResponseType> = await Api.put(
      `/api/v1/category/${category_idx}`,
      { name: name }
    );

    return data;
  },
  modifyOrderNumber: async (category_idx: number, order_number: number) => {
    console.log(order_number);
    const body = {
      idx: category_idx,
      order_number: order_number
    };

    const { data } = await Api.put("/api/v1/category/order", body);

    return data;
  },
  deleteCategory: async (category_idx: number) => {
    const { data } = await Api.delete(`/api/v1/category/${category_idx}`);

    return data;
  }
};

export const post = {
  getPosts: async (params: IPostParmsDTO, cancelToken?: CancelToken) => {
    const { data }: AxiosResponse<GetPostsResponse> = await Api.get(
      queryString.stringifyUrl({ url: "/api/v1/post/", query: { ...params } }),
      { cancelToken }
    );

    let value = {
      ...data.data,
      notfound: false
    };

    if (params.page === 1 && !data.data.posts.length) {
      value.notfound = true;
    }

    return value;
  },
  getHitPosts: async () => {
    const { data }: AxiosResponse<GetPostsResponse> = await Api.get(
      queryString.stringifyUrl({ url: "/api/v1/post/", query: { page: 1, limit: 5, order: "HIT" } })
    );

    return data.data.posts;
  },
  getTempPosts: async (cancelToken?: CancelToken) => {
    const { data }: AxiosResponse<GetTempPostsResponse> = await Api.get(`/api/v1/post/temp`, {
      cancelToken
    });

    return data.data.posts;
  },
  getSearchPosts: async (query: string, cancelToken?: CancelToken) => {
    const { data }: AxiosResponse<GetTempPostsResponse> = await Api.get(
      queryString.stringifyUrl({ url: "/api/v1/post/search", query: { query } }),
      { cancelToken }
    );

    return data.data.posts;
  },
  getPost: async (idx: number, cancelToken?: CancelToken) => {
    const { data }: AxiosResponse<GetPostInfoResponse> = await Api.get(`/api/v1/post/${idx}`, {
      cancelToken
    });

    return data.data;
  },
  deletePost: async (idx: number) => {
    const { data }: AxiosResponse<ResponseType> = await Api.delete(`/api/v1/post/${idx}`, {});

    return data;
  }
};

export const comment = {
  getComments: async (post: number, cancelToken?: CancelToken) => {
    const { data }: AxiosResponse<GetCommentsResponse> = await Api.get(
      queryString.stringifyUrl({ url: "/api/v1/comment/", query: { post } }),
      { cancelToken }
    );

    return data.data.comments;
  },
  createComment: async (params: ICommentParamsDTO, cancelToken?: CancelToken) => {
    const { data }: AxiosResponse<ResponseType> = await Api.post("/api/v1/comment", params, {
      cancelToken
    });

    return data;
  },
  createReply: async (params: IReplyParamsDTO, cancelToken?: CancelToken) => {
    const { data }: AxiosResponse<ResponseType> = await Api.post("/api/v1/reply", params, {
      cancelToken
    });

    return data;
  },
  modifyComment: async (commentIdx: number, content: string) => {
    const { data }: AxiosResponse<ResponseType> = await Api.put(`/api/v1/comment/${commentIdx}`, {
      content
    });

    return data;
  },
  modifyReply: async (replyIdx: number, content: string) => {
    const { data }: AxiosResponse<ResponseType> = await Api.put(`/api/v1/reply/${replyIdx}`, {
      content
    });

    return data;
  },
  deleteComment: async (commentIdx: number) => {
    const { data }: AxiosResponse<ResponseType> = await Api.delete(`/api/v1/comment/${commentIdx}`);

    return data;
  },
  deleteReply: async (replyIdx: number) => {
    const { data }: AxiosResponse<ResponseType> = await Api.delete(`/api/v1/reply/${replyIdx}`);

    return data;
  }
};

export const user = {
  getUserInfo: async () => {
    const { data }: AxiosResponse<GetProfileResponse> = await Api.get(`/api/v1/profile/my`);

    return data.data.user;
  },
  tryLogin: async (accessToken: string) => {
    const { data }: AxiosResponse<LoginResponse> = await Api.post("/api/v1/auth/login", {
      accessToken: accessToken
    });

    setToken(data.data.access_token);

    return data.data;
  }
};
