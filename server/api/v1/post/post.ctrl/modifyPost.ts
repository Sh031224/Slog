import { Response, Request } from "express";
import { getRepository } from "typeorm";
import { validateModify } from "../../../../lib/validation/post";
import logger from "../../../../lib/logger";
import Category from "../../../../entity/Category";
import Post from "../../../../entity/Post";
import sitemap from "../../../../sitemap/sitemap";
import rss from "../../../../rss/rss";

export default async (req: Request, res: Response) => {
  if (!validateModify(req, res)) return;

  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[PUT] 검증 오류.", "idx is NaN");
    res.status(400).json({
      status: 400,
      message: "검증 오류."
    });
    return;
  }

  type RequestBody = {
    title: string;
    content: string;
    category_idx?: number;
    thumbnail?: string;
    description?: string;
    is_temp: boolean;
  };

  const data: RequestBody = req.body;

  try {
    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        idx
      }
    });

    if (!post) {
      logger.yellow("[PUT] 글 없음.");
      res.status(404).json({
        status: 404,
        message: "글 없음."
      });
      return;
    }

    if (!data.is_temp && (!data.category_idx || !data.description || !data.thumbnail)) {
      logger.yellow("[PUT] 글 생성 검증 오류.");
      return res.status(400).json({
        status: 400,
        message: "검증 오류."
      });
    }

    if (data.category_idx) {
      const categoryRepo = getRepository(Category);
      const category: Category = await categoryRepo.findOne({
        where: {
          idx: data.category_idx
        }
      });

      if (!category) {
        logger.yellow("[PUT] 카테고리 없음.");
        res.status(404).json({
          status: 404,
          message: "카테고리 없음."
        });
        return;
      }

      post.category = category;
    } else {
      if (!data.is_temp) {
        logger.yellow("[PUT] 검증 오류.", "Not Temp But No Category");
        res.status(400).json({
          status: 400,
          message: "검증 오류."
        });
        return;
      }
    }

    if (!data.is_temp && post.is_temp) {
      post.created_at = new Date();
      await Promise.all([sitemap(), rss()]);
    }
    }

    post.updated_at = new Date();
    post.title = data.title;
    post.content = data.content;
    post.thumbnail = data.thumbnail || "";
    post.is_temp = data.is_temp;
    post.description = data.description || "";
    await postRepo.save(post);

    logger.green("[PUT] 글 수정 성공.");
    res.status(200).json({
      status: 200,
      message: "글 수정 성공"
    });
  } catch (err) {
    logger.red("[PUT] 글 수정 서버 오류.", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
