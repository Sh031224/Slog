import { Request, Response } from "express";
import { getRepository } from "typeorm";
import logger from "../../../../lib/logger";
import Notice from "../../../../entity/Notice";

export default async (req: Request, res: Response) => {
  try {
    const noticeRepo = getRepository(Notice);
    const notices: Notice[] = await noticeRepo.find({
      order: {
        created_at: "DESC"
      }
    });

    logger.green("[GET] 공지 목록 조회 성공.");
    res.status(200).json({
      message: "공지 목록 조회 성공.",
      data: {
        notices
      }
    });
  } catch (err) {
    logger.red("[GET] 공지 목록 조회 서버 오류.", err.message);
    res.status(500).json({
      message: "서버 오류."
    });
  }
};
