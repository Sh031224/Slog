import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Profile from "../../assets/api/Profile";

@autobind
class CategoryStore {
  @observable admin = false;

  @observable userName = "";

  @action handleUser = async (access_token: string) => {
    try {
      const response = await Profile.GetProfile(access_token);

      if (!response) {
        this.admin = false;
      } else {
        this.admin = response.data.user.is_admin;
        this.userName = response.data.user.name;

        return new Promise((resolve, reject) => {
          resolve(response);
        });
      }
    } catch (error) {
      this.admin = false;
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };

  @action haldleAdminFalse = () => {
    this.admin = false;
  };
}

export default CategoryStore;
