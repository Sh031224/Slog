import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import Post from "../../assets/api/Post";
import {
  CreateTempPostResponse,
  GetPostCommentCountResponse,
  GetPostInfoResponse,
  GetPostsResponse,
  ResponseType,
  UploadFilesResponse
} from "types/Response";
import {
  CreatePostType,
  CreateTempPostType,
  ModifyPostType,
  PostParmsType,
  PostType
} from "types/PostType";

@autobind
class PostStore {
  @observable
  posts: PostType[] = [];

  @observable
  hitPosts: PostType[] = [];

  @action
  handlePosts = async (query: PostParmsType): Promise<GetPostsResponse> => {
    try {
      const response: GetPostsResponse = await Post.GetPostList(query);
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
  handleTempPosts = async (): Promise<GetPostsResponse> => {
    try {
      const response: GetPostsResponse = await Post.GetTempPosts();

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
  handleHitPosts = async (query: PostParmsType): Promise<GetPostsResponse> => {
    try {
      const response: GetPostsResponse = await Post.GetPostList(query);
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
  handlePostSearch = async (query: string): Promise<GetPostsResponse> => {
    try {
      const response: GetPostsResponse = await Post.GetPostSearch(query);

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
  modifyPost = async (
    post_idx: number,
    body: ModifyPostType
  ): Promise<ResponseType> => {
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
  createPost = async (body: CreatePostType): Promise<ResponseType> => {
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
  deletePost = async (post_idx: number): Promise<ResponseType> => {
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
