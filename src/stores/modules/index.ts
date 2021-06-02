import { AnyAction, CombinedState, combineReducers } from "redux";
import category, { ICategoryState } from "./category";
import common, { ICommonState } from "./common";
import user, { IUserState } from "./user";
import { HYDRATE } from "next-redux-wrapper";
import server, { IServerState } from "./server";
import post, { IPostState } from "./post";
import comment, { ICommentState } from "./comment";

const rootReducer = (state: State | undefined, action: AnyAction): CombinedState<State> => {
  switch (action.type) {
    case HYDRATE:
      if (state.server.isServerRendered) {
        return { ...state };
      }
      return { ...state, ...action.payload, server: { isServerRendered: true } };
    default: {
      const combineReducer = combineReducers({
        server,
        category,
        common,
        user,
        post,
        comment
      });
      return combineReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

interface State {
  server: IServerState;
  category: ICategoryState;
  common: ICommonState;
  user: IUserState;
  post: IPostState;
  comment: ICommentState;
}
