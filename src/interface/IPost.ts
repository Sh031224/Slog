export interface IPostParmsDTO {
  page: number;
  limit: number;
  order?: string;
  category?: number;
}

export interface IPost {
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

export interface IPostInfo {
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
  comments: IComment[];
}

export interface IComment {
  idx: number;
  content: string;
  is_private: boolean;
  fk_user_idx?: number;
  fk_user_name?: string;
  fk_user_is_admin?: boolean;
  fk_post_idx: number;
  created_at: Date;
  updated_at: Date;
  replies: IReply[];
}

export interface IReply {
  content: string;
  is_private: boolean;
  fk_user_idx?: number;
  fk_user_name?: string;
  fk_user_is_admin?: boolean;
  fk_comment_idx: number;
  created_at: Date;
  updated_at: Date;
}

export interface IModifyPostDTO {
  title: string;
  description: string | null;
  content: string | null;
  thumbnail: string | null;
  category_idx?: number;
  is_temp?: boolean;
}

export interface ICreatePostDTO {
  title: string;
  description: string;
  content: string;
  thumbnail: string | null;
  category_idx: number;
}

export interface ICreateTempPostDTO {
  title: string;
  description: string | null;
  content: string | null;
  thumbnail: string | null;
  category_idx: number | null;
}
