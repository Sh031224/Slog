import * as actions from "./actions";
import { IComment } from "interface/IPost";
import { ActionType } from "typesafe-actions";
import { AxiosError } from "axios";
import { ResponseType } from "interface/IResponse";

export type CommentAction = ActionType<typeof actions>;

export interface ICommentState {
  loading: boolean;
  error: AxiosError<ResponseType> | null;
  data: {
    comments: IComment[];
  };
}
