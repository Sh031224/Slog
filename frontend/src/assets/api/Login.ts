import axios from "axios";
import { server } from "../../config/index.json";

class Login {
  async TryLogin(access_token: string) {
    const url = `${server}/api/v1/auth/login`;
    const body = {
      access_token: access_token
    };

    const { data } = await axios.post(url, body);

    return data;
  }
}

export default new Login();
