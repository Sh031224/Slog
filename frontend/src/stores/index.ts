import CategoryStore from "./CategoryStore";
import PostStore from "./PostStore";
import UserStore from "./UserStore";
import CommentStore from "./CommentStore";

const stores: object = {
  PostStore: new PostStore(),
  CategoryStore: new CategoryStore(),
  UserStore: new UserStore(),
  CommentStore: new CommentStore()
};

export default stores;
