import type { CommentDto } from "@slog/types/api/comment";

import Comment from "@/models/entity/comment";
import type User from "@/models/entity/user";
import ForbiddenError from "@/models/error/forbidden-error";
import NotFoundError from "@/models/error/not-found-error";
import CommentRepository from "@/repositories/comment-repository";

export default class CommentService {
  private commentRepository: CommentRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
  }

  create = (user: User, body: CommentDto) => {
    const comment = new Comment();

    comment.content = body.content;
    comment.isPrivate = body.isPrivate ?? false;
    comment.parentIdx = body.parentIdx;
    comment.userIdx = user.idx;

    return this.commentRepository.save(comment);
  };

  get = async (user: User | undefined, postIdx: number) => {
    const comments = await this.commentRepository.findByPostIdx(postIdx);

    if (!user || !user.isAdmin) {
      return comments.map((comment) => ({
        ...comment,
        content: comment.isPrivate ? "비밀 댓글 입니다." : comment.content
      }));
    }

    return comments;
  };

  update = async (user: User, idx: number, body: CommentDto) => {
    const comment = await this.commentRepository.findByIdx(idx);

    if (!comment) throw new NotFoundError(`${idx} is not found.`);

    if (user.idx !== comment.userIdx) throw new ForbiddenError(`Cannot update: ${idx}`);

    comment.content = body.content;
    comment.isPrivate = body.isPrivate ?? false;

    return this.commentRepository.save(comment);
  };

  delete = async (user: User, idx: number) => {
    const comment = await this.commentRepository.findByIdx(idx);

    if (!comment) throw new NotFoundError(`${idx} is not found.`);

    if (user.idx !== comment.userIdx) throw new ForbiddenError(`Cannot delete: ${idx}`);

    return this.commentRepository.delete(comment);
  };
}
