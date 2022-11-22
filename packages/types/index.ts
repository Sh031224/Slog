/**
 * include null and undefined from T
 */
export type Nullable<T> = T | null | undefined;

/**
 * default api response type
 */
export type ApiResponse = {
  status: number;
  message: string;
};

/**
 * post type enum "external" | "default"
 */
export enum PostType {
  EXTERNAL = "EXTERNAL",
  DEFAULT = "DEFAULT"
}

/**
 * type = "external" post DTO
 */
export type ExternalPostDTO = {
  type: PostType.EXTERNAL;
  title: string;
  content?: string;
  categoryIdx: number;
  thumbnail: Nullable<string>;
  description: string;
  isTemp: boolean;
  externalUrl: string;
};

/**
 * type = "default" post DTO
 */
export type DefaultPostDTO = {
  type: PostType.DEFAULT;
  title: string;
  content: string;
  categoryIdx: number;
  thumbnail: Nullable<string>;
  description: string;
  isTemp: boolean;
  externalUrl: Nullable<string>;
};

/**
 * create or update post DTO
 */
export type PostDTO = ExternalPostDTO | DefaultPostDTO;

export type GetPostsOrder = "hit" | "latest";

/**
 * get Posts Params
 */
export type GetPostsParams = {
  order?: GetPostsOrder;
  category?: number;
  isTemp?: boolean;
  title?: string;
  page: number;
  limit: number;
};
