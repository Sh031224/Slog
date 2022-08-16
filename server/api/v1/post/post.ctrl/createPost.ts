import { Response, Request } from "express";
import { getRepository } from "typeorm";
import { validateCreate } from "../../../../lib/validation/post";
import logger from "../../../../lib/logger";
import Category from "../../../../entity/Category";
import Post from "../../../../entity/Post";
import sitemap from "../../../../sitemap/sitemap";
import rss from "../../../../rss/rss";

export default async (req: Request, res: Response) => {
  if (!validateCreate(req, res)) return;

  type RequestBody = {
    title: string;
    content: string;
    category_idx?: number;
    thumbnail?: string;
    description?: string;
    is_temp: boolean;
  };

  const body: RequestBody = req.body;

  try {
    const postRepo = getRepository(Post);
    const post = new Post();
    if (!body.is_temp && (!body.category_idx || !body.description || !body.thumbnail)) {
      logger.yellow("[POST] 글 생성 검증 오류.");
      return res.status(400).json({
        status: 400,
        message: "검증 오류."
      });
    }
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
    } else {
      if (!body.is_temp) {
        logger.yellow("[POST] 검증 오류.", "Not Temp But No Category");
        res.status(400).json({
          status: 400,
          message: "검증 오류."
        });
        return;
      }
    }

    post.title = body.title;
    post.content = body.content;
    post.thumbnail = body.thumbnail || "";
    post.description = body.description || "";
    post.is_temp = body.is_temp;

    await postRepo.save(post);

    if (!body.is_temp) {
      await Promise.all([sitemap(), rss()]);
    }

    logger.green("[POST] 글 생성 성공.");
    res.status(200).json({
      status: 200,
      message: "글 생성 성공.",
      data: {
        idx: post.idx
      }
    });
  } catch (err) {
    logger.red("POST] 글 생성 서버 오류.", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
