import { createReducer } from "typesafe-actions";
import { SET_SERVER_RENDERED } from "./actions";
import { ServerState, ServerAction } from "./types";

export const serverInitialState: ServerState = {
  isServerRendered: false
};

export default createReducer<ServerState, ServerAction>(serverInitialState, {
  [SET_SERVER_RENDERED]: (state, action) => ({
    isServerRendered: true
  })
});
