import axios from "axios";
import { server } from "../../config/index.json";

interface PostParmsType {
  page: number;
  limit: number;
  order?: string;
  category?: number;
}

class PostList {
  async GetTempPosts() {
    try {
      let url = `${server}/api/v1/post/temp`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetPostList(query: PostParmsType) {
    try {
      let url = `${server}/api/v1/post/?page=${query.page}&limit=${query.limit}`;

      if (query.order) url += `&order=${query.order}`;
      if (query.category) url += `&category=${query.category}`;
      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetPostInfo(idx: number) {
    try {
      const url = `${server}/api/v1/post/${idx}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetPostCommentCount(idx: number) {
    try {
      const url = `${server}/api/v1/post/comment/${idx}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetPostSearch(query: string) {
    try {
      const url = `${server}/api/v1/post/search?query=${query}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new PostList();
