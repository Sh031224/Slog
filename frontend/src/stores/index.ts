import CategoryStore from "./CategoryStore";
import PostStore from "./PostStore";
import UserStore from "./UserStore";
import CommentStore from "./CommentStore";
import "mobx-react-lite/batchingForReactDom";
import HistoryStore from "./HistoryStore";

const stores = {
  PostStore: new PostStore(),
  CategoryStore: new CategoryStore(),
  UserStore: new UserStore(),
  CommentStore: new CommentStore(),
  HistoryStore: new HistoryStore()
};

export default stores;
