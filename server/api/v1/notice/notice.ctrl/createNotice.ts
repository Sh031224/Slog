import { Response, Request } from "express";
import { getRepository } from "typeorm";
import { validateCreate } from "../../../../lib/validation/notice";
import logger from "../../../../lib/logger";
import User from "../../../../entity/User";
import Notice from "../../../../entity/Notice";

export default async (req: Request, res: Response) => {
  if (!validateCreate(req, res)) return;

  type RequestBody = {
    title: string;
    content: string;
  };
  const { title, content }: RequestBody = req.body;

  try {
    const noticeRepo = getRepository(Notice);

    const notice = new Notice();
    notice.title = title;
    notice.content = content;

    await noticeRepo.save(notice);

    logger.green("[POST] 공지 생성 성공.");
    res.status(200).json({
      status: 200,
      message: "공지 생성 성공."
    });
  } catch (err) {
    logger.red("[POST] 공지 생성 서버 오류.", err.message);
    return res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
