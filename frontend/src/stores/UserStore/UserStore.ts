import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Profile from "../../assets/api/Profile";
import Login from "../../assets/api/Login";
import { GetProfileResponse } from "types/Response";

@autobind
class UserStore {
  @observable admin: boolean = false;
  @observable login: boolean = false;
  @observable userId: number = -1;

  @action
  handleLogin = async (access_token: string) => {
    const response = await Login.TryLogin(access_token);
    this.handleUser(response.data.access_token);

    if (response.status === 200) {
      this.login = true;
    }

    return response;
  };

  @action
  handleLoginChange = (status: boolean) => {
    this.login = status;
  };

  @action handleFcm = async (token: string) => {
    const response = await Profile.FcmToken(token);

    return response;
  };

  @action handleUser = async (access_token: string): Promise<GetProfileResponse> => {
    const response: GetProfileResponse = await Profile.GetProfile(access_token);

    this.admin = response.data.user.is_admin;
    this.userId = response.data.user.idx;

    this.login = true;

    return response;
  };

  @action haldleAdminFalse = () => {
    this.admin = false;
  };
}

export default UserStore;
