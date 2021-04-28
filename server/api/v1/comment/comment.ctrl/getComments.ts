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
        idx: postIdx
      }
    });

    if (!post || (user && !user.is_admin && post.is_temp)) {
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

    interface replyListType extends Reply {
      fk_user_name?: string;
      fk_user_is_deleted?: boolean;
      fk_user_is_admin?: boolean;
    }

    interface commentListType extends Comment {
      replies?: replyListType[];
      reply_count?: number;
      fk_user_name?: string;
      fk_user_is_deleted?: boolean;
      fk_user_is_admin?: boolean;
    }

    const commentRepo = getRepository(Comment);
    const comments: commentListType[] = await commentRepo.find(commentOptions);

    for (let i in comments) {
      const userRepo = getRepository(User);
      const commentUser: User = await userRepo.findOne({
        idx: comments[i].fk_user_idx
      });

      comments[i].fk_user_name = commentUser.is_deleted ? "삭제된 유저입니다." : commentUser.name;
      comments[i].fk_user_is_deleted = commentUser.is_deleted;
      comments[i].fk_user_is_admin = commentUser.is_admin;

      if (comments[i].is_private) {
        if (user) {
          if (user.idx !== comments[i].fk_user_idx && !user.is_admin) {
            comments[i].content = "비밀 댓글입니다.";
            delete comments[i].fk_user_idx;
            delete comments[i].fk_user_name;
            delete comments[i].user;
            delete comments[i].fk_user_is_admin;
          }
        } else {
          comments[i].content = "비밀 댓글입니다.";
          delete comments[i].fk_user_idx;
          delete comments[i].fk_user_name;
          delete comments[i].user;
          delete comments[i].fk_user_is_admin;
        }
      }

      const replyRepo = getRepository(Reply);
      const [replies, reply_count]: [replyListType[], number] = await replyRepo.findAndCount({
        where: {
          comment: comments[i]
        }
      });

      comments[i].replies = replies;
      comments[i].reply_count = reply_count;

      for (let i in replies) {
        const replyUser: User = await userRepo.findOne({
          idx: replies[i].fk_user_idx
        });

        replies[i].fk_user_is_admin = replyUser.is_admin;
        replies[i].fk_user_name = replyUser.is_deleted ? "삭제된 유저입니다." : replyUser.name;
        replies[i].fk_user_is_deleted = replyUser.is_deleted;

        if (replies[i].is_private) {
          if (user) {
            if (user.idx !== replies[i].fk_user_idx && !user.is_admin) {
              replies[i].content = "비밀 댓글입니다.";
              delete replies[i].user;
              delete replies[i].fk_user_idx;
              delete replies[i].fk_user_name;
              delete replies[i].fk_user_is_admin;
            }
          } else {
            replies[i].content = "비밀 댓글입니다.";
            delete replies[i].user;
            delete replies[i].fk_user_idx;
            delete replies[i].fk_user_name;
            delete replies[i].fk_user_is_admin;
          }
        }
      }
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
