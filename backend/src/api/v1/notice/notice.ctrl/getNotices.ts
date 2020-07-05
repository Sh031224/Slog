import { Request, Response } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import logger from "../../../../lib/logger";
import Notice from "../../../../entity/Notice";

export default async (req: Request, res: Response) => {
  type RequestQuery = {
    page?: number;
    limit?: number;
  };

  const query: RequestQuery = req.query;

  if (!query.page || !query.limit) {
    logger.yellow("검증 오류", "page or limit is null");
    res.status(400).json({
      message: "검증 오류."
    });
    return;
  }

  if (query.page < 1) {
    logger.yellow("검증 오류", "page is not valid");
    res.status(400).json({
      message: "검증 오류."
    });
    return;
  }

  const queryConditions: FindManyOptions = {
    select: ["idx", "title", "content", "created_at"],
    order: null,
    skip: (query.page - 1) * query.limit,
    take: query.limit
  };

  try {
    const noticeRepo = getRepository(Notice);
    const [notices, total] = await noticeRepo.findAndCount(queryConditions);

    logger.green("[GET] 공지 목록 조회 성공.");
    res.status(200).json({
      message: "공지 목록 조회 성공.",
      data: {
        notices,
        total
      }
    });
  } catch (err) {
    logger.red("[GET] 공지 목록 조회 서버 오류.", err.message);
    res.status(500).json({
      message: "서버 오류."
    });
  }
};
