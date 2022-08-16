import { Response } from "express";
import AuthRequest from "../../../../type/AuthRequest";
import logger from "../../../../lib/logger";
import sitemap from "../../../../sitemap/sitemap";
import rss from "../../../../rss/rss";

export default async (req: AuthRequest, res: Response) => {
  try {
    await Promise.all([sitemap(), rss()]);

    logger.green("[POST] rss 재생성 성공.");
    res.status(200).json({
      status: 200,
      message: "rss 재생성 성공."
    });
  } catch (err) {
    logger.red("rss 재생성 서버 오류.", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
