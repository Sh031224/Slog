import { Response, Request } from "express";
import { getRepository } from "typeorm";
import { validateCreate } from "../../../../lib/validation/post";
import logger from "../../../../lib/logger";
import Category from "../../../../entity/Category";
import Post from "../../../../entity/Post";

export default async (req: Request, res: Response) => {
  if (!validateCreate(req, res)) return;

  type RequestBody = {
    title: string;
    content: string;
    category_idx: number;
    thumbnail: string;
  };

  const body: RequestBody = req.body;

  try {
    const categoryRepo = getRepository(Category);
    const category: Category = await categoryRepo.findOne({
      where: {
        idx: body.category_idx
      }
    });

    if (!category) {
      logger.yellow("[POST] 글 생성 카테고리 없음.");
      res.status(404).json({
        message: "해당 카테고리 없음."
      });
      return;
    }

    const postRepo = getRepository(Post);
    const post = new Post();

    post.title = body.title;
    post.content = body.content;
    post.thumbnail = body.thumbnail;
    post.category = category;
    await postRepo.save(post);

    logger.green("[POST] 글 생성 성공.");
    res.status(200).json({
      message: "글 생성 성공."
    });
  } catch (err) {
    logger.red("POST] 글 생성 서버 오류.", err.message);
    res.status(500).json({
      message: "서버 오류."
    });
  }
};
