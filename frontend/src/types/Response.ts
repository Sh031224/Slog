import CommentType from "./CommentType";
import { PostInfoType } from "./PostType";
import ReplyType from "./ReplyType";

export type ResponseType = {
  status: number;
  message: string;
};

export interface GetRepliesResponse extends ResponseType {
  status: number;
  message: string;
  data: {
    replies: ReplyType[];
  };
}

export interface GetCommentsResponse extends ResponseType {
  data: {
    comments: CommentType[];
  };
}

export interface GetPostsResponse extends ResponseType {
  data: {
    total?: number;
    posts: PostInfoType[];
  };
}

export interface GetPostInfoResponse extends ResponseType {
  data: {
    post: PostInfoType;
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

export interface GetPostInfoResponse extends ResponseType {
  data: {
    post: PostInfoType;
  };
}

export interface CreateTempPostResponse extends ResponseType {
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
