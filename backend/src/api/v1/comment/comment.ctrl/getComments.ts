import { Response } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import logger from "../../../../lib/logger";
import Post from "../../../../entity/Post";
import Comment from "../../../../entity/Comment";
import AuthRequest from "../../../../type/AuthRequest";
import User from "../../../../entity/User";

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
  const postIdx = req.query.post;

  try {
    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        idx: postIdx,
        is_temp: false
      }
    });

    if (!post) {
      logger.yellow("[GET] 글 없음");
      res.status(404).json({
        status: 404,
        message: "글 없음."
      });
      return;
    }

    const commentOptions: FindManyOptions = {
      where: {
        post
      }
    };

    const commentRepo = getRepository(Comment);
    const comments: Comment[] = await commentRepo.find(commentOptions);

    const count: number = post.comment_count;

    comments.map((comment) => {
      if (comment.is_private) {
        if (user) {
          if (user.idx !== comment.fk_user_idx) {
            comment.content = "비밀 댓글입니다.";
          }
        } else {
          comment.content = "비밀 댓글입니다.";
        }
      }
    });

    logger.green("[GET] 댓글 목록 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "댓글 목록 조회 성공.",
      data: {
        count,
        comments
      }
    });
  } catch (err) {
    logger.red("[GET] 댓글 목록 조회 서버 오류", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
