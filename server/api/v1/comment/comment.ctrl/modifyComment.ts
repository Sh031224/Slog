import { Response } from "express";
import AuthRequest from "../../../../type/AuthRequest";
import { getRepository } from "typeorm";
import { validateModify } from "../../../../lib/validation/comment";
import logger from "../../../../lib/logger";
import User from "../../../../entity/User";
import Comment from "../../../../entity/Comment";
import Post from "../../../../entity/Post";

export default async (req: AuthRequest, res: Response) => {
  if (!validateModify(req, res)) return;

  const user: User = req.user;
  const idx: number = Number(req.params.idx);
  if (isNaN(idx)) {
    logger.yellow("[PUT] 검증 오류.", "idx is NaN");
    res.status(400).json({
      status: 400,
      message: "검증 오류."
    });
    return;
  }

  type RequestBody = {
    content: string;
  };

  const { content }: RequestBody = req.body;

  try {
    const commentReo = getRepository(Comment);
    const comment: Comment = await commentReo.findOne({
      where: {
        idx
      }
    });

    if (!comment) {
      logger.yellow("[PUT] 댓글 없음.");
      res.status(404).json({
        status: 404,
        message: "댓글 없음."
      });
      return;
    }

    if (comment.fk_user_idx !== user.idx) {
      logger.yellow("[PUT] 권한 없음.");
      res.status(403).json({
        status: 403,
        message: "권한 없음."
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
      logger.yellow("[PUT] 글 없음.");
      res.status(404).json({
        status: 404,
        message: "글 없음."
      });
      return;
    }

    comment.content = content;
    await commentReo.save(comment);

    logger.green("[PUT] 댓글 수정 성공.");
    res.status(200).json({
      status: 200,
      message: "댓글 수정 성공."
    });
    return;
  } catch (err) {
    logger.red("[PUT] 댓글 수정 서버 오류.", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
