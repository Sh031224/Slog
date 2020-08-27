import { Response } from "express";
import { getRepository } from "typeorm";
import logger from "../../../../lib/logger";
import Comment from "../../../../entity/Comment";
import Post from "../../../../entity/Post";
import Reply from "../../../../entity/Reply";
import AuthRequest from "../../../../type/AuthRequest";
import User from "../../../../entity/User";

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const commentIdx = req.query.comment;

  try {
    const commentRepo = getRepository(Comment);
    const comment: Comment = await commentRepo.findOne({
      where: {
        idx: commentIdx
      }
    });

    if (!comment) {
      logger.yellow("[GET] 댓글 없음.");
      res.status(404).json({
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
      logger.yellow("[GET] 글 없음.");
      res.status(404).json({
        status: 404,
        message: "글 없음."
      });
      return;
    }

    const replyRepo = getRepository(Reply);
    const replies: Reply[] = await replyRepo.find({
      where: {
        comment
      }
    });

    replies.map((reply) => {
      if (reply.is_private) {
        if (user) {
          if (user.idx !== reply.fk_user_idx && !user.is_admin) {
            reply.content = "비밀 댓글입니다.";
            delete reply.user;
            delete reply.fk_user_idx;
            delete reply.fk_user_name;
          }
        } else {
          reply.content = "비밀 댓글입니다.";
          delete reply.user;
          delete reply.fk_user_idx;
          delete reply.fk_user_name;
        }
      }
    });

    logger.green("[GET] 답글 목록 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "답글 목록 조회 성공.",
      data: {
        replies
      }
    });
  } catch (err) {
    logger.red("[GET] 답글 목록 조회 서버 오류.", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
