import { Response, Request } from "express";
import logger from "../../../../lib/logger";
import User from "../../../../entity/User";
import { getRepository } from "typeorm";

export default async (req: Request, res: Response) => {
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[GET] 검증 오류.", "idx is NaN");
    res.status(400).json({
      message: "검증 오류."
    });
    return;
  }

  try {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({
      where: {
        idx: idx
      }
    });

    if (!user) {
      logger.yellow("[GET] 회원 없음.");
      res.status(404).json({
        message: "회원 없음."
      });
      return;
    }

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
