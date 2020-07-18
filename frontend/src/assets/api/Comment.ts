import axios from "axios";
import { server } from "../../config/index.json";

class CategoryList {
  async GetComments(post_idx: number) {
    try {
      const url = `${server}/api/v1/comment?post=${post_idx}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new CategoryList();
