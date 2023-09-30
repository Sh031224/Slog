export type CreateCommentParams = {
  commentId?: number;
  postId: number;
  content: string;
  isPrivate: boolean;
};

export type CommentHandlerParams = {
  content: string;
  isPrivate: boolean;
};

export type CommentType = {
  id: number;
  content: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
    isAdmin: boolean;
  };
  Reply: {
    id: number;
    content: string;
    isPrivate: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: {
      id: string;
      name: string | null;
      image: string | null;
      isAdmin: boolean;
    };
  }[];
};
