import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Profile from "../../assets/api/Profile";
import Login from "../../assets/api/Login";

@autobind
class UserStore {
  @observable admin = false;

  @observable userName = "";

  @observable login = false;

  @action
  handleLogin = async (access_token: string) => {
    try {
      const response = await Login.TryLogin(access_token);
      this.handleUser(response.data.access_token);

      if (response.status === 200) {
        this.login = true;
      }

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  handleLoginChange = (status: boolean) => {
    this.login = status;
  };

  @action handleFcm = async (token: string) => {
    try {
      const response = await Profile.FcmToken(token);

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };

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

export default UserStore;
