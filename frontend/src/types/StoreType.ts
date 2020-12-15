import CategoryStore from "stores/CategoryStore";
import CommentStore from "stores/CommentStore";
import HistoryStore from "stores/HistoryStore";
import PostStore from "stores/PostStore";
import UserStore from "stores/UserStore";

type StoreType = {
  store: {
    CategoryStore: CategoryStore;
    CommentStore: CommentStore;
    PostStore: PostStore;
    UserStore: UserStore;
    HistoryStore: HistoryStore;
  };
};

export default StoreType;
