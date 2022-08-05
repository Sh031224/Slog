export type PostParmsDTO = {
  page: number;
  limit: number;
  order?: string;
  category?: number;
};

export type CommentParamsDTO = {
  post_idx: number;
  content: string;
  is_private: boolean;
};

export type ReplyParamsDTO = {
  comment_idx: number;
  content: string;
  is_private: boolean;
};

export type Post = {
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
};

export type PostInfo = {
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
};

export type Comment = {
  idx: number;
  content: string;
  is_private: boolean;
  fk_user_idx?: number;
  fk_user_name?: string;
  fk_user_is_admin?: boolean;
  fk_post_idx: number;
  created_at: Date;
  updated_at: Date;
  replies: Reply[];
};

export type Reply = {
  idx: number;
  content: string;
  is_private: boolean;
  fk_user_idx?: number;
  fk_user_name?: string;
  fk_user_is_admin?: boolean;
  fk_comment_idx: number;
  created_at: Date;
  updated_at: Date;
};

export type CreatePostDTO = {
  title: string;
  content: string;
  category_idx?: number | null;
  thumbnail?: string;
  description?: string;
  is_temp: boolean;
};

export type CreateTempPostDTO = {
  title: string;
  description: string | null;
  content: string | null;
  thumbnail: string | null;
  category_idx: number | null;
};
