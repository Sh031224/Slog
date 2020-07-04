import { Response, Request } from "express";
import { getRepository } from "typeorm";
import { validateModify } from "../../../../lib/validation/notice";
import logger from "../../../../lib/logger";
import User from "../../../../entity/User";
import Notice from "../../../../entity/Notice";

export default async (req: Request, res: Response) => {
  if (!validateModify(req, res)) return;
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[PUT] 검증 오류.", "idx is NaN");
    res.status(400).json({
      message: "검증 오류."
    });
    return;
  }

  type RequestBody = {
    title: string;
    content: string;
  };
  const { title, content }: RequestBody = req.body;

  try {
    const noticeRepo = getRepository(Notice);
    const notice: Notice = await noticeRepo.findOne({
      where: {
        idx
      }
    });

    if (!notice) {
      logger.red("[PUT] 공지 없음");
      res.status(404).json({
        message: "공지 없음."
      });
      return;
    }

    notice.title = title || notice.title;
    notice.content = content || notice.content;
    noticeRepo.save(notice);

    logger.green("[PUT] 공지 변경 성공.");
    res.status(200).json({
      message: "공지 변경 성공."
    });
  } catch (err) {
    logger.red("[PUT] 공지 변경 서버 오류.", err.message);
    res.status(500).json({
      message: "서버 오류."
    });
  }
};
