import { Response, Request } from "express";
import { getRepository } from "typeorm";
import { validateCreate } from "../../../../lib/validation/post";
import logger from "../../../../lib/logger";
import Category from "../../../../entity/Category";
import Post from "../../../../entity/Post";
import sitemap from "../../../../sitemap/sitemap";

export default async (req: Request, res: Response) => {
  if (!validateCreate(req, res)) return;

  type RequestBody = {
    title: string;
    content: string;
    category_idx: number;
    thumbnail: string;
    description: string;
  };

  const body: RequestBody = req.body;

  try {
    const postRepo = getRepository(Post);
    const post = new Post();
    if (body.category_idx) {
      const categoryRepo = getRepository(Category);
      const category: Category = await categoryRepo.findOne({
        where: {
          idx: body.category_idx
        }
      });

      if (!category) {
        logger.yellow("[POST] 글 생성 카테고리 없음.");
        res.status(404).json({
          status: 404,
          message: "해당 카테고리 없음."
        });
        return;
      }
      post.category = category;
    }

    post.title = body.title;
    post.content = body.content;
    post.thumbnail = body.thumbnail;
    post.description = body.description;

    await postRepo.save(post);

    sitemap();

    logger.green("[POST] 글 생성 성공.");
    res.status(200).json({
      status: 200,
      message: "글 생성 성공."
    });
  } catch (err) {
    logger.red("POST] 글 생성 서버 오류.", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
