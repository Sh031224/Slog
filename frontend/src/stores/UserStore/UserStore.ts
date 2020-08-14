import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Profile from "../../assets/api/Profile";
import Login from "../../assets/api/Login";

interface GetProfileResponse {
  status: number;
  message: string;
  data: {
    user: {
      idx: number;
      name: string;
      is_admin: boolean;
      created_at: Date;
    };
  };
}

@autobind
class UserStore {
  @observable admin = false;

  @observable login = false;

  @observable userId = -1;

  @observable adminId!: number;

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

  @action handleAdminProfile = async (): Promise<GetProfileResponse> => {
    try {
      const response: GetProfileResponse = await Profile.GetAdminProfile();

      this.adminId = response.data.user.idx;

      return new Promise(
        (resolve: (response: GetProfileResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action handleUser = async (
    access_token: string
  ): Promise<GetProfileResponse> => {
    try {
      const response: GetProfileResponse = await Profile.GetProfile(
        access_token
      );

      this.admin = response.data.user.is_admin;
      this.userId = response.data.user.idx;

      return new Promise(
        (resolve: (response: GetProfileResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      this.userId = -1;
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
