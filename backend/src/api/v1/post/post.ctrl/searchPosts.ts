import { Response, Request } from "express";
import { getRepository, FindManyOptions, Like } from "typeorm";
import logger from "../../../../lib/logger";
import Post from "../../../../entity/Post";
import generateURL from "../../../../lib/util/generateURL";

export default async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    const postRepo = getRepository(Post);
    const posts: Post[] = await postRepo.find({
      where: {
        title: Like(`%${query}%`),
        is_temp: false
      },
      order: {
        created_at: "DESC"
      }
    });

    posts.forEach((post: Post) => {
      if (!post.thumbnail) return;
      post.thumbnail = generateURL(req, post.idx, post.thumbnail);
    });

    logger.green("[GET] 글 검색 성공.");
    res.status(200).json({
      status: 200,
      message: "글 검색 성공.",
      data: {
        posts
      }
    });
  } catch (err) {
    logger.red("[GET] 글 검색 서버 오류.", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
