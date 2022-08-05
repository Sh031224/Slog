import { Category } from "./category";
import { Comment, Post, PostInfo, Reply } from "./post";

export type ResponseType = {
  status: number;
  message: string;
};

export interface GetRepliesResponse extends ResponseType {
  data: {
    replies: Reply[];
  };
}

export interface LoginResponse extends ResponseType {
  data: {
    access_token: string;
  };
}

export interface GetCategoriesResponse extends ResponseType {
  data: {
    categories: Category[];
  };
}

export interface GetCommentsCountResponse extends ResponseType {
  data: {
    total_count: number;
  };
}

export interface GetCommentsResponse extends ResponseType {
  data: {
    comments: Comment[];
  };
}

export interface GetTempPostsResponse extends ResponseType {
  data: {
    posts: Post[];
  };
}

export interface GetPostsResponse extends ResponseType {
  data: {
    posts: Post[];
    total: number;
  };
}

export interface GetPostInfoResponse extends ResponseType {
  data: {
    post: PostInfo;
  };
}

export interface GetProfileResponse extends ResponseType {
  data: {
    user: {
      idx: number;
      name: string;
      is_admin: boolean;
      created_at: Date;
    };
  };
}

export interface UploadFilesResponse extends ResponseType {
  data: {
    files: string[];
  };
}

export interface CreatePostResponse extends ResponseType {
  data: {
    idx: number;
  };
}

export interface GetPostCommentCountResponse extends ResponseType {
  data: {
    total_count: number;
  };
}

export interface UploadFilesResponse extends ResponseType {
  data: {
    files: string[];
  };
}
