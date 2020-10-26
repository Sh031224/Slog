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

interface GetPostInfoResponse {
  status: number;
  message: string;
  data: {
    post: PostInfoType;
  };
}

interface PostInfoType {
  idx: number;
  title: string;
  description: string;
  content: string;
  view: number;
  is_temp: boolean;
  fk_category_idx: number | null;
  thumbnail: string | null;
  created_at: Date;
  updated_at: Date;
  comment_count: number;
}

interface PostType {
  idx: number;
  title: string;
  view?: number;
  comment_count?: number;
  thumbnail?: string;
  description?: string;
  created_at: Date;
}

interface ModifyPostType {
  title: string;
  description: string | null;
  content: string | null;
  thumbnail: string | null;
  category_idx?: number;
  is_temp?: boolean;
}
interface CreatePostType {
  title: string;
  description: string;
  content: string;
  thumbnail: string | null;
  category_idx: number;
}

interface UploadFilesResponse {
  status: number;
  message: string;
  data: {
    files: string[];
  };
}

interface CreateTempPostType {
  title: string;
  description: string | null;
  content: string | null;
  thumbnail: string | null;
  category_idx: number | null;
}

interface CreateTempPostResponse {
  status: number;
  message: string;
  data: {
    idx: number;
  };
}

interface GetPostCommentCountResponse {
  status: number;
  message: string;
  data: {
    total_count: number;
  };
}

@autobind
class PostStore {
  @observable
  posts: PostType[] = [];

  @observable
  hitPosts: PostType[] = [];

  @action
  handlePosts = async (query: PostParmsType) => {
    try {
      const response: PostResponseType = await Post.GetPostList(query);
      if (query.page > 1) {
        if (response.data && response.data.posts) {
          const promises: Promise<void>[] = [];
          response.data.posts.map((post: PostType) => {
            promises.push(
              new Promise((resolve, reject) => {
                this.posts.push(post);
                resolve();
              })
            );
          });
          await Promise.all(promises);
        }
      } else {
        this.posts = response.data.posts;
      }

      return new Promise((resolve, _reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((_resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  handleTempPosts = async () => {
    try {
      const response: PostResponseType = await Post.GetTempPosts();

      this.posts = response.data.posts;

      return new Promise((resolve, _reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((_resolve, reject) => {
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
          this.hitPosts.push(post);
        });
      } else {
        this.hitPosts = response.data.posts;
      }

      return new Promise((resolve, _reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((_resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  handlePostSearch = async (query: string) => {
    try {
      const response: PostResponseType = await Post.GetPostSearch(query);

      this.posts = response.data.posts;

      return new Promise((resolve, _reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((_resolve, reject) => {
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
  getPostInfo = async (idx: number): Promise<GetPostInfoResponse> => {
    try {
      const response: GetPostInfoResponse = await Post.GetPostInfo(idx);

      return new Promise(
        (resolve: (response: GetPostInfoResponse) => void, _reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  getPostCommentCount = async (
    idx: number
  ): Promise<GetPostCommentCountResponse> => {
    try {
      const response: GetPostCommentCountResponse = await Post.GetPostCommentCount(
        idx
      );

      return new Promise(
        (resolve: (response: GetPostCommentCountResponse) => void, _reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  uploadFiles = async (files: File[]): Promise<UploadFilesResponse> => {
    try {
      const response: UploadFilesResponse = await Post.UploadFiles(files);

      return new Promise(
        (resolve: (response: UploadFilesResponse) => void, _reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  createTempPost = async (
    title: string,
    description: string,
    content: string,
    thumbnail: string,
    category_idx: number
  ): Promise<CreateTempPostResponse> => {
    try {
      let body: CreateTempPostType = {
        title,
        description,
        content,
        thumbnail,
        category_idx
      };

      if (description === "") {
        body.description = null;
      }
      if (content === "") {
        body.content = null;
      }
      if (thumbnail === "") {
        body.thumbnail = null;
      }
      if (category_idx === -1) {
        body.category_idx = null;
      }

      const response: CreateTempPostResponse = await Post.CreateTempPost(body);

      return new Promise(
        (resolve: (response: CreateTempPostResponse) => void, _reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  modifyPost = async (post_idx: number, body: ModifyPostType) => {
    try {
      const response = await Post.ModifyPost(post_idx, body);

      return new Promise((resolve, _reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  createPost = async (body: CreatePostType) => {
    try {
      const response = await Post.CreatePost(body);

      return new Promise((resolve, _reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  deletePost = async (post_idx: number) => {
    try {
      const response = await Post.DeletePost(post_idx);

      return new Promise((resolve, _reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((_resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };
}

export default PostStore;
