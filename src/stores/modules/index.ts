import { AnyAction, CombinedState, combineReducers } from "redux";
import category from "./category/reducer";
import common from "./common/reducer";
import user from "./user/reducer";
import server from "./server/reducer";
import post from "./post/reducer";
import comment from "./comment/reducer";
import { ICategoryState } from "./category";
import { ICommonState } from "./common";
import { IUserState } from "./user";
import { HYDRATE } from "next-redux-wrapper";
import { IServerState } from "./server";
import { IPostState } from "./post";
import { ICommentState } from "./comment";

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
