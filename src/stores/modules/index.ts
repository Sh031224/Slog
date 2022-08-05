import { AnyAction, CombinedState, combineReducers } from "redux";
import category, { CategoryState } from "./category";
import common, { CommonState } from "./common";
import user, { UserState } from "./user";
import { HYDRATE } from "next-redux-wrapper";
import server, { ServerState } from "./server";
import post, { PostState } from "./post";
import comment, { CommentState } from "./comment";

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

type State = {
  server: ServerState;
  category: CategoryState;
  common: CommonState;
  user: UserState;
  post: PostState;
  comment: CommentState;
};
