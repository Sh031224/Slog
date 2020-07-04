import { Request, Response } from "express";
import { getRepository } from "typeorm";
import logger from "../../../../lib/logger";
import Notice from "../../../../entity/Notice";

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
    const noticeRepo = getRepository(Notice);
    const notice: Notice = await noticeRepo.findOne({
      where: {
        idx: idx
      }
    });

    logger.green("[GET] 공지 조회 성공.");
    res.status(200).json({
      message: "공지 조회 성공.",
      data: {
        notice
      }
    });
  } catch (err) {
    logger.red("[GET] 공지 조회 서버 오류.", err.message);
    res.status(500).json({
      message: "서버 오류."
    });
  }
};
