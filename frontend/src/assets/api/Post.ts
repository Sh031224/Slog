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
    let url = `${server}/api/v1/post/temp`;

    const { data } = await axios.get(url);

    return data;
  }

  async GetPostList(query: PostParmsType) {
    let url = `${server}/api/v1/post/?page=${query.page}&limit=${query.limit}`;

    if (query.order) url += `&order=${query.order}`;
    if (query.category) url += `&category=${query.category}`;
    const { data } = await axios.get(url);

    return data;
  }

  async GetPostInfo(idx: number) {
    const url = `${server}/api/v1/post/${idx}`;

    const { data } = await axios.get(url);

    return data;
  }

  async GetPostCommentCount(idx: number) {
    const url = `${server}/api/v1/post/comment/${idx}`;

    const { data } = await axios.get(url);

    return data;
  }

  async GetPostSearch(query: string) {
    const url = `${server}/api/v1/post/search?query=${query}`;

    const { data } = await axios.get(url);

    return data;
  }

  async UploadFiles(files: File[]) {
    const url = `${server}/api/v1/upload`;

    const formData = new FormData();
    formData.append("files", files[0]);

    const { data } = await axios.post(url, formData);

    return data;
  }

  async CreateTempPost(body: CreateTempPostType) {
    const url = `${server}/api/v1/post/temp`;

    const { data } = await axios.post(url, body);

    return data;
  }

  async CreatePost(body: CreatePostType) {
    const url = `${server}/api/v1/post`;

    const { data } = await axios.post(url, body);

    return data;
  }

  async ModifyPost(post_idx: number, body: ModifyPostType) {
    const url = `${server}/api/v1/post/${post_idx}`;

    const { data } = await axios.put(url, body);

    return data;
  }

  async DeletePost(post_idx: number) {
    const url = `${server}/api/v1/post/${post_idx}`;

    const { data } = await axios.delete(url);

    return data;
  }
}

export default new PostList();
