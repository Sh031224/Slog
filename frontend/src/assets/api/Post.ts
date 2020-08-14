import axios from "axios";
import { server } from "../../config/index.json";

interface PostParmsType {
  page: number;
  limit: number;
  order?: string;
  category?: number;
}

interface CreateTempPostType {
  title: string;
  description: string | null;
  content: string | null;
  thumbnail: string | null;
  category_idx: number | null;
}

interface CreatePostType {
  title: string;
  description: string;
  content: string;
  thumbnail: string | null;
  category_idx: number;
}

interface ModifyPostType {
  title: string;
  description: string | null;
  content: string | null;
  thumbnail: string | null;
  category_idx?: number;
  is_temp?: boolean;
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

  async UploadFiles(files: File[]) {
    try {
      const url = `${server}/api/v1/upload`;

      const formData = new FormData();
      formData.append("files", files[0]);

      const { data } = await axios.post(url, formData);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async CreateTempPost(body: CreateTempPostType) {
    try {
      const url = `${server}/api/v1/post/temp`;

      const { data } = await axios.post(url, body);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async CreatePost(body: CreatePostType) {
    try {
      const url = `${server}/api/v1/post`;

      const { data } = await axios.post(url, body);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async ModifyPost(post_idx: number, body: ModifyPostType) {
    try {
      const url = `${server}/api/v1/post/${post_idx}`;

      const { data } = await axios.put(url, body);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async DeletePost(post_idx: number) {
    try {
      const url = `${server}/api/v1/post/${post_idx}`;

      const { data } = await axios.delete(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new PostList();
