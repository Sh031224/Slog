import CategoryStore from "./CategoryStore";
import LoginStore from "./LoginStore";
import PostStore from "./PostStore";
import UserStore from "./UserStore";
import CommentStore from "./CommentStore";

const stores: object = {
  LoginStore: new LoginStore(),
  PostStore: new PostStore(),
  CategoryStore: new CategoryStore(),
  UserStore: new UserStore(),
  CommentStore: new CommentStore()
};

export default stores;
