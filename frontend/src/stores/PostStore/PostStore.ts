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
import { CreatePostType, CreateTempPostType, ModifyPostType, PostParmsType, PostType } from "types/PostType";

@autobind
class PostStore {
  @observable
  posts: PostType[] = [];

  @observable
  total: number = 0;

  @observable
  page: number = 1;

  @observable
  hitPosts: PostType[] = [];

  @action
  handlePage = (page: number) => {
    this.page = page;
  };

  @action
  handleTotal = (total: number) => {
    this.total = total;
  };

  @action
  handlePosts = async (query: PostParmsType): Promise<GetPostsResponse> => {
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

    return response;
  };

  @action
  handleTempPosts = async (): Promise<GetPostsResponse> => {
    const response: GetPostsResponse = await Post.GetTempPosts();
    this.posts = response.data.posts;

    return response;
  };

  @action
  handleHitPosts = async (query: PostParmsType): Promise<GetPostsResponse> => {
    const response: GetPostsResponse = await Post.GetPostList(query);
    if (query.page > 1) {
      response.data.posts.map((post: PostType) => {
        this.hitPosts.push(post);
      });
    } else {
      this.hitPosts = response.data.posts;
    }

    return response;
  };

  @action
  handlePostSearch = async (query: string): Promise<GetPostsResponse> => {
    const response: GetPostsResponse = await Post.GetPostSearch(query);

    this.posts = response.data.posts;

    return response;
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
    const response: GetPostInfoResponse = await Post.GetPostInfo(idx);

    return response;
  };

  @action
  getPostCommentCount = async (idx: number): Promise<GetPostCommentCountResponse> => {
    const response: GetPostCommentCountResponse = await Post.GetPostCommentCount(idx);

    return response;
  };

  @action
  uploadFiles = async (files: File[]): Promise<UploadFilesResponse> => {
    const response: UploadFilesResponse = await Post.UploadFiles(files);

    return response;
  };

  @action
  createTempPost = async (
    title: string,
    description: string,
    content: string,
    thumbnail: string,
    category_idx: number
  ): Promise<CreateTempPostResponse> => {
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

    return response;
  };

  @action
  modifyPost = async (post_idx: number, body: ModifyPostType): Promise<ResponseType> => {
    const response = await Post.ModifyPost(post_idx, body);

    return response;
  };

  @action
  createPost = async (body: CreatePostType): Promise<ResponseType> => {
    const response = await Post.CreatePost(body);

    return response;
  };

  @action
  deletePost = async (post_idx: number): Promise<ResponseType> => {
    const response = await Post.DeletePost(post_idx);

    return response;
  };
}

export default PostStore;
