import { Response } from "express";
import AuthRequest from "../../../../type/AuthRequest";
import { getRepository } from "typeorm";
import logger from "../../../../lib/logger";
import Post from "../../../../entity/Post";
import sitemap from "../../../../sitemap/sitemap";
import rss from "../../../../rss/rss";

export default async (req: AuthRequest, res: Response) => {
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
    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        idx
      }
    });

    if (!post) {
      logger.yellow("[DELETE] 글 없음.");
      res.status(404).json({
        status: 404,
        message: "글 없음."
      });
      return;
    }

    await postRepo.remove(post);

    await Promise.all([sitemap(), rss()]);

    logger.green("[DELETE] 글 삭제 성공.");
    res.status(200).json({
      status: 200,
      message: "글 삭제 성공"
    });
  } catch (err) {
    logger.red("[DELETE] 글 삭제 서버 오류.", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
