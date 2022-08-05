import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type ServerAction = ActionType<typeof actions>;

export type ServerState = {
  isServerRendered: boolean;
};
