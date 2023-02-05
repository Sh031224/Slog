export type CommentDto = {
  content: string;
  isPrivate?: boolean;
  parentIdx?: number;
};

export type UpdateCommentDto = Omit<CommentDto, "parentIdx">;
