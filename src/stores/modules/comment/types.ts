import * as actions from "./actions";
import { Comment } from "types/post";
import { ActionType } from "typesafe-actions";
import { AxiosError } from "axios";
import { ResponseType } from "types/response";

export type CommentAction = ActionType<typeof actions>;

export type CommentState = {
  loading: boolean;
  error: AxiosError<ResponseType> | null;
  data: {
    comments: Comment[];
  };
};
