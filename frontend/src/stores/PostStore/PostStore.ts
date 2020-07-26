import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import Post from "../../assets/api/Post";

interface PostParmsType {
  page: number;
  limit: number;
  order?: string;
  category?: number;
}

interface PostResponseType {
  status: number;
  data: {
    total?: number;
    posts: PostType[];
  };
}

interface PostType {
  idx: number;
  title: string;
  view: number;
  comment_count: number;
  thumbnail?: string;
  description?: string;
  created_at: Date;
}

@autobind
class PostStore {
  @observable
  posts: PostType[] = [];

  @observable
  hit_posts: PostType[] = [];

  @action
  handlePosts = async (query: PostParmsType) => {
    try {
      const response: PostResponseType = await Post.GetPostList(query);
      if (query.page > 1) {
        response.data.posts.map((post: PostType) => {
          this.posts.push(post);
        });
      } else {
        this.posts = response.data.posts;
      }

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  handleHitPosts = async (query: PostParmsType) => {
    try {
      const response: PostResponseType = await Post.GetPostList(query);
      if (query.page > 1) {
        response.data.posts.map((post: PostType) => {
          this.hit_posts.push(post);
        });
      } else {
        this.hit_posts = response.data.posts;
      }

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  initPosts = () => {
    this.posts = [];
  };

  @action
  getPostLength = () => {
    return this.posts.length;
  };

  @action
  getPostInfo = async (idx: number) => {
    try {
      const response: Response = await Post.GetPostInfo(idx);

      return new Promise((resolve: (arg1: Response) => void, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };
}

export default PostStore;
