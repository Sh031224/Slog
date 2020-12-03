export interface PostParmsType {
  page: number;
  limit: number;
  order?: string;
  category?: number;
}

export interface PostInfoType {
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

export interface PostType {
  idx: number;
  title: string;
  view?: number;
  comment_count?: number;
  thumbnail?: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CategoryType {
  idx: number;
  name: string;
  post_count: number;
}

export interface ModifyPostType {
  title: string;
  description: string | null;
  content: string | null;
  thumbnail: string | null;
  category_idx?: number;
  is_temp?: boolean;
}

export interface CreatePostType {
  title: string;
  description: string;
  content: string;
  thumbnail: string | null;
  category_idx: number;
}

export interface CreateTempPostType {
  title: string;
  description: string | null;
  content: string | null;
  thumbnail: string | null;
  category_idx: number | null;
}
