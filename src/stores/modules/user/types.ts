import * as actions from "./actions";
import { ActionType } from "typesafe-actions";
import { AxiosError } from "axios";
import { User } from "types/user";
import { ResponseType } from "types/response";

export type UserAction = ActionType<typeof actions>;

export type UserState = {
  loading: boolean;
  error: AxiosError<ResponseType> | null;
  data: {
    user: User;
    login: boolean;
  };
};
