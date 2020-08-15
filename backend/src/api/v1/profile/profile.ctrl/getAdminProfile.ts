import { Request, Response } from "express";
import logger from "../../../../lib/logger";
import User from "../../../../entity/User";
import { getRepository } from "typeorm";

export default async (req: Request, res: Response) => {
  try {
    const userRepo = getRepository(User);
    const user: User = await userRepo.findOne({
      where: {
        is_admin: true
      }
    });

    if (!user) {
      logger.yellow("[GET] 프로필 없음.");
      res.status(404).json({
        status: 404,
        message: "프로필 없음.",
        data: {
          user
        }
      });
    }

    delete user.fcm;
    delete user.fcm_allow;
    delete user.id;

    logger.green("[GET] 프로필 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "프로필 조회 성공.",
      data: {
        user
      }
    });
  } catch (err) {
    logger.red("[GET] 프로필 조회 서버 오류.");
    res.status(500).json({
      status: 500,
      message: "프로필 조회 서버 오류."
    });
  }
};
