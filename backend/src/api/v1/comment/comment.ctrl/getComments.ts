import { Response } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import logger from "../../../../lib/logger";
import Post from "../../../../entity/Post";
import Comment from "../../../../entity/Comment";
import AuthRequest from "../../../../type/AuthRequest";
import User from "../../../../entity/User";
import Reply from "../../../../entity/Reply";

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

    interface commentListType extends Comment {
      reply_count?: number;
    }

    const commentRepo = getRepository(Comment);
    const comments: commentListType[] = await commentRepo.find(commentOptions);

    for (let i in comments) {
      if (comments[i].is_private) {
        if (user) {
          if (user.idx !== comments[i].fk_user_idx) {
            comments[i].content = "비밀 댓글입니다.";
            delete comments[i].fk_user_idx;
            delete comments[i].fk_user_name;
            delete comments[i].user;
          }
        } else {
          comments[i].content = "비밀 댓글입니다.";
          delete comments[i].fk_user_idx;
          delete comments[i].fk_user_name;
          delete comments[i].user;
        }
      }
      const replyRepo = getRepository(Reply);
      const reply_count: number = await replyRepo.count({
        where: {
          comment: comments[i]
        }
      });

      comments[i].reply_count = reply_count;
    }

    logger.green("[GET] 댓글 목록 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "댓글 목록 조회 성공.",
      data: {
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
