import { Response, Request } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import logger from "../../../../lib/logger";
import Post from "../../../../entity/Post";

export default async (req: Request, res: Response) => {
  try {
    const postOption: FindManyOptions = {
      select: ["idx", "title", "description", "created_at"],
      where: {
        is_temp: true
      },
      order: {
        created_at: "DESC"
      }
    };

    const postRepo = getRepository(Post);
    const posts: Post[] = await postRepo.find(postOption);

    logger.green("임시 글 조회 성공.");
    res.status(200).json({
      message: "임시 글 조회 성공.",
      data: {
        posts
      }
    });
  } catch (err) {
    logger.green("임시 글 조회 서버 오류.", err.message);
    res.status(500).json({
      message: "서버 오류."
    });
  }
};
