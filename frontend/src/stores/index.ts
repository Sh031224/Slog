import CategoryStore from "./CategoryStore";
import LoginStore from "./LoginStore";
import PostStore from "./PostStore";

const stores: object = {
  LoginStore: new LoginStore(),
  PostStore: new PostStore(),
  CategoryStore: new CategoryStore()
};

export default stores;
