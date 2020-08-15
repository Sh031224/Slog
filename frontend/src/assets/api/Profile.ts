import axios, { AxiosResponse } from "axios";
import { server } from "../../config/index.json";

class Profile {
  async GetProfile(access_token: string, idx?: number) {
    try {
      let url = `${server}/api/v1/profile/`;

      if (idx) {
        url += idx;
      } else {
        url += "my";
      }

      const { data } = await axios.get(url, {
        headers: {
          access_token: access_token
        }
      });

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async FcmToken(token: string) {
    try {
      const url = `${server}/api/v1/auth/fcm`;

      const { data } = await axios.post(url, { token: token });

      return data;
    } catch (error) {
      return false;
    }
  }

  async GetAdminProfile() {
    try {
      const url = `${server}/api/v1/profile/admin`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      return false;
    }
  }
}

export default new Profile();
