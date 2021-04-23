import { Response } from "express";
import AuthRequest from "../../../../type/AuthRequest";
import { getRepository } from "typeorm";
import logger from "../../../../lib/logger";
import User from "../../../../entity/User";
import Comment from "../../../../entity/Comment";

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
    const commentReo = getRepository(Comment);
    const comment: Comment = await commentReo.findOne({
      where: {
        idx
      }
    });

    if (!comment) {
      logger.yellow("[DELETE] 댓글 없음.");
      res.status(404).json({
        status: 404,
        message: "댓글 없음."
      });
      return;
    }

    if (comment.fk_user_idx !== user.idx && !user.is_admin) {
      logger.yellow("[DELETE] 권한 없음.");
      res.status(403).json({
        status: 403,
        message: "권한 없음."
      });
      return;
    }

    await commentReo.remove(comment);

    logger.green("[DELETE] 댓글 삭제 성공.");
    res.status(200).json({
      status: 200,
      message: "댓글 삭제 성공."
    });
    return;
  } catch (err) {
    logger.red("[DELETE] 댓글 삭제 오류.", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
