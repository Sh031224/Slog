import * as actions from "./actions";
import { ActionType } from "typesafe-actions";
import { AxiosError } from "axios";
import { IUser } from "interface/IUser";
import { ResponseType } from "interface/IResponse";

export type UserAction = ActionType<typeof actions>;

export interface IUserState {
  loading: boolean;
  error: AxiosError<ResponseType> | null;
  data: {
    user: IUser;
    login: boolean;
  };
}
