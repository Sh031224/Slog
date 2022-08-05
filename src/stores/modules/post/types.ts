import * as actions from "./actions";
import { Post, PostInfo } from "types/post";
import { ActionType } from "typesafe-actions";
import { AxiosError } from "axios";
import { ResponseType } from "types/response";

export type PostAction = ActionType<typeof actions>;

export type PostState = {
  loading: boolean;
  error: AxiosError<ResponseType> | null;
  data: {
    post: PostInfo;
    hitPosts: Post[];
  };
};
