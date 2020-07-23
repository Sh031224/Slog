import axios from "axios";
import { server } from "../../config/index.json";

class Comment {
  async GetComments(post_idx: number) {
    try {
      const url = `${server}/api/v1/comment?post=${post_idx}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async CreateComment(post_idx: number, content: string, is_private?: boolean) {
    try {
      const url = `${server}/api/v1/comment`;
      const body = {
        post_idx: post_idx,
        content: content,
        is_private: is_private
      };

      const { data } = await axios.post(url, body);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Comment();
