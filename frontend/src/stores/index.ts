import CategoryStore from "./CategoryStore";
import LoginStore from "./LoginStore";
import PostStore from "./PostStore";
import UserStore from "./UserStore";

const stores: object = {
  LoginStore: new LoginStore(),
  PostStore: new PostStore(),
  CategoryStore: new CategoryStore(),
  UserStore: new UserStore()
};

export default stores;
