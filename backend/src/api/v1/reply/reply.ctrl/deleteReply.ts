import { Response } from "express";
import AuthRequest from "../../../../type/AuthRequest";
import User from "../../../../entity/User";
import logger from "../../../../lib/logger";
import { getRepository } from "typeorm";
import Reply from "../../../../entity/Reply";
import Post from "../../../../entity/Post";

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[DELETE] 검증 오류.", "idx is NaN");
    res.status(400).json({
      status: 400,
      message: "검증 오류."
    });
    return;
  }

  try {
    const replyRepo = getRepository(Reply);
    const reply: Reply = await replyRepo.findOne({
      where: {
        idx
      }
    });

    if (!reply) {
      logger.yellow("[DELETE] 답글 없음.");
      res.status(404).json({
        status: 404,
        message: "답글 없음."
      });
      return;
    }

    if (reply.fk_user_idx !== user.idx && (!user || !user.is_admin)) {
      logger.yellow("[DELETE] 권한 없음.");
      res.status(403).json({
        status: 403,
        message: "권한 없음."
      });
      return;
    }

    const commentRepo = getRepository(Comment);
    const comment: Comment = await commentRepo.findOne({
      where: {
        idx: reply.fk_comment_idx
      }
    });

    if (!comment) {
      logger.yellow("[DELETE] 댓글 없음.");
      res.status(403).json({
        status: 404,
        message: "댓글 없음."
      });
      return;
    }

    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        idx: comment.fk_post_idx
      }
    });

    if (!post) {
      logger.yellow("[DELETE] 글 없음.");
      res.status(404).json({
        status: 404,
        message: "글 없음."
      });
      return;
    }

    await replyRepo.remove(reply);

    comment.replies_count -= 1;
    await commentRepo.save(comment);

    post.comment_count -= 1;
    await postRepo.save(post);

    logger.green("[DELETE] 답글 삭제 성공.");
    res.status(200).json({
      status: 200,
      message: "답글 삭제 성공."
    });
  } catch (err) {
    logger.red("[DELETE] 답글 삭제 서버 오류.", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
    return;
  }
};
