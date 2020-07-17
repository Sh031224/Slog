import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import Login from "../../assets/api/Login";
import Profile from "../../assets/api/Profile";

@autobind
class LoginStore {
  @observable
  login = false;

  @action
  handleLogin = async (access_token: string) => {
    try {
      const response = await Login.TryLogin(access_token);

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
  handleLoginChange = (status: boolean) => {
    this.login = status;
  };
}

export default LoginStore;