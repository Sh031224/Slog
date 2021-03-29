import axios from "axios";
import { server } from "../../config/index.json";

class Profile {
  async GetProfile(access_token: string, idx?: number) {
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
  }

  async FcmToken(token: string) {
    const url = `${server}/api/v1/auth/fcm`;

    const { data } = await axios.post(url, { token: token });

    return data;
  }

  async GetAdminProfile() {
    const url = `${server}/api/v1/profile/admin`;

    const { data } = await axios.get(url);

    return data;
  }
}

export default new Profile();
