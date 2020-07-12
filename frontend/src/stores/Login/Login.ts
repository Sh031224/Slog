import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import Login from "../../assets/api/Login";

@autobind
class LoginStore {
  @observable login = false;

  @action
  handleAirQuality = async (access_token: string) => {
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
}

export default LoginStore;
