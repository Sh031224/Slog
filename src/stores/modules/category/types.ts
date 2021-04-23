import * as actions from "./actions";
import { ActionType } from "typesafe-actions";
import { AxiosError } from "axios";
import { ICategory } from "interface/ICategory";

export type CategoryAction = ActionType<typeof actions>;

export interface ICategoryState {
  loading: boolean;
  error: AxiosError | null;
  data: {
    categories: ICategory[];
    total: number;
  };
}
