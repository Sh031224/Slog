import { ICategory } from "./ICategory";
import { IComment, IPost, IPostInfo, IReply } from "./IPost";

export type ResponseType = {
  status: number;
  message: string;
};

export interface GetRepliesResponse extends ResponseType {
  data: {
    replies: IReply[];
  };
}

export interface LoginResponse extends ResponseType {
  data: {
    access_token: string;
  };
}

export interface GetCategoriesResponse extends ResponseType {
  data: {
    categories: ICategory[];
  };
}

export interface GetCommentsCountResponse extends ResponseType {
  data: {
    total_count: number;
  };
}

export interface GetCommentsResponse extends ResponseType {
  data: {
    comments: IComment[];
  };
}

export interface GetTempPostsResponse extends ResponseType {
  data: {
    posts: IPost[];
  };
}

export interface GetPostsResponse extends ResponseType {
  data: {
    posts: IPost[];
    total: number;
  };
}

export interface GetPostInfoResponse extends ResponseType {
  data: {
    post: IPostInfo;
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

export interface UploadFilesResponse {
  status: number;
  message: string;
  data: {
    files: string[];
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
