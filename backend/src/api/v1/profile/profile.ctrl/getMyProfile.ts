import { Response } from "express";
import AuthRequest from "../../../../type/AuthRequest";
import logger from "../../../../lib/logger";
import User from "../../../../entity/User";

export default async (req: AuthRequest, res: Response) => {
  let user: User = req.user;

  try {
    logger.green("[GET] 프로필 조회 성공.");
    res.status(200).json({
      message: "프로필 조회 성공.",
      data: {
        user
      }
    });
  } catch (err) {
    logger.red("[GET] 프로필 조회 서버 오류.");
    res.status(500).json({
      message: "프로필 조회 서버 오류."
    });
  }
};
