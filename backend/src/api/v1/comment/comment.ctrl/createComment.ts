import { Response } from "express";
import AuthRequest from "../../../../type/AuthRequest";
import { validateCreate } from "../../../../lib/validation/comment";
import User from "../../../../entity/User";
import { getRepository } from "typeorm";
import Post from "../../../../entity/Post";
import logger from "../../../../lib/logger";
import Comment from "../../../../entity/Comment";
import * as admin from "firebase-admin";

export default async (req: AuthRequest, res: Response) => {
  if (!validateCreate) return;

  const user: User = req.user;
  type RequestBody = {
    content: string;
    post_idx: number;
    is_private: boolean;
  };

  const data: RequestBody = req.body;

  try {
    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        idx: data.post_idx
      }
    });

    if (!post) {
      logger.yellow("[POST] 글 없음.");
      res.status(404).json({
        status: 404,
        message: "글 없음."
      });
      return;
    }

    const coommentRepo = getRepository(Comment);
    const comment: Comment = new Comment();

    comment.is_private = data.is_private;
    comment.content = data.content;
    comment.user = user;
    comment.post = post;

    await coommentRepo.save(comment);

    const userRepo = getRepository(User);
    const adminUser: User = await userRepo.findOne({
      where: {
        is_admin: true
      }
    });

    if (adminUser.fcm_allow && adminUser.fcm) {
      const message = {
        webpush: {
          notification: {
            title: `${user.name}님께서 댓글을 남겼습니다.`,
            click_action: `http://localhost:3000/post/${post.idx}`
          }
        },
        data: {
          score: "850",
          time: "2:45"
        },
        token: adminUser.fcm
      };

      admin.messaging().send(message);
    }

    logger.green("[POST] 댓글 생성 성공.");
    res.status(200).json({
      status: 200,
      message: "댓글 생성 성공."
    });
    return;
  } catch (err) {
    logger.red("[POST] 댓글 생성 서버 오류.", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
