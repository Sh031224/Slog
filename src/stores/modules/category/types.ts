import * as actions from "./actions";
import { ActionType } from "typesafe-actions";
import { AxiosError } from "axios";
import { Category } from "types/category";

export type CategoryAction = ActionType<typeof actions>;

export type CategoryState = {
  loading: boolean;
  error: AxiosError | null;
  data: {
    categories: Category[];
    total: number;
  };
};
