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

      axios.defaults.headers.common["access_token"] = access_token;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      return false;
    }
  }
}

export default new Profile();
