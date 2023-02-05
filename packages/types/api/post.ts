import type { Nullable } from "../utils";

export enum PostType {
  EXTERNAL = "EXTERNAL",
  DEFAULT = "DEFAULT"
}

export type ExternalPostDto = {
  type: PostType.EXTERNAL;
  title: string;
  content?: string;
  categoryIdx: number;
  thumbnail: Nullable<string>;
  description: string;
  isTemp: boolean;
  externalUrl: string;
};

export type DefaultPostDto = {
  type: PostType.DEFAULT;
  title: string;
  content: string;
  categoryIdx: number;
  thumbnail: Nullable<string>;
  description: string;
  isTemp: boolean;
  externalUrl: Nullable<string>;
};

export type PostDto = ExternalPostDto | DefaultPostDto;

export type GetPostsOrder = "hit" | "latest";

export type GetPostsParams = {
  order?: GetPostsOrder;
  category?: number;
  isTemp?: boolean;
  title?: string;
  page: number;
  limit: number;
};
