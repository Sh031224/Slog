import { Response, Request } from "express";
import { getRepository } from "typeorm";
import logger from "../../../../lib/logger";
import Notice from "../../../../entity/Notice";

export default async (req: Request, res: Response) => {
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
    const noticeRepo = getRepository(Notice);
    const notice: Notice = await noticeRepo.findOne({
      where: {
        idx
      }
    });

    if (!notice) {
      logger.yellow("[DELETE] 공지 없음");
      res.status(404).json({
        status: 404,
        message: "공지 없음."
      });
      return;
    }

    noticeRepo.remove(notice);

    logger.green("[DELETE] 공지 삭제 성공.");
    res.status(200).json({
      status: 200,
      message: "공지 삭제 성공."
    });
  } catch (err) {
    logger.red("[DELETE] 공지 삭제 서버 오류.", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
