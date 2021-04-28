import * as actions from "./actions";
import { IPost, IPostInfo } from "interface/IPost";
import { ActionType } from "typesafe-actions";
import { AxiosError } from "axios";
import { ResponseType } from "interface/IResponse";

export type PostAction = ActionType<typeof actions>;

export interface IPostState {
  loading: boolean;
  error: AxiosError<ResponseType> | null;
  data: {
    post: IPostInfo;
    hitPosts: IPost[];
  };
}
