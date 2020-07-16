import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Profile from "../../assets/api/Profile";

@autobind
class CategoryStore {
  @observable admin = false;

  @action handleUser = async () => {
    try {
      const response = await Profile.GetProfile();

      this.admin = response.data.user.is_admin;

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };
}

export default CategoryStore;
