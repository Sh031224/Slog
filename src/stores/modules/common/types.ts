import * as actions from "./actions";
import { IPost } from "interface/IPost";
import { ActionType } from "typesafe-actions";
import { AxiosError } from "axios";
import { ResponseType } from "interface/IResponse";

export type CommonAction = ActionType<typeof actions>;

export interface ICommonState {
  loading: boolean;
  error: AxiosError<ResponseType> | null;
  data: {
    page: number;
    posts: IPost[];
    notfound: boolean;
    total: number;
  };
}
