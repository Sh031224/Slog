import * as actions from "./actions";
import { Post } from "types/post";
import { ActionType } from "typesafe-actions";
import { AxiosError } from "axios";
import { ResponseType } from "types/response";

export type CommonAction = ActionType<typeof actions>;

export type CommonState = {
  loading: boolean;
  error: AxiosError<ResponseType> | null;
  data: {
    page: number;
    posts: Post[];
    notfound: boolean;
    total: number;
    // category === null "임시저장 글"
    // category === -1 "모든 글"
    // category === -2 "검색"
    category: number | null;
  };
};
