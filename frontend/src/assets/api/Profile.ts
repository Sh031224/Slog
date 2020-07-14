import axios from "axios";
import { server } from "../../config/index.json";

class Profile {
  async GetProfile(idx?: number) {
    try {
      let url = `${server}/api/v1/profile/`;

      if (idx) {
        url += idx;
      } else {
        url += "my";
      }

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Profile();
