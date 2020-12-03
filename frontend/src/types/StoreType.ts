import CategoryStore from "stores/CategoryStore";
import CommentStore from "stores/CommentStore";
import PostStore from "stores/PostStore";
import UserStore from "stores/UserStore";

type StoreType = {
  store: {
    CategoryStore: CategoryStore;
    CommentStore: CommentStore;
    PostStore: PostStore;
    UserStore: UserStore;
  };
};

export default StoreType;
