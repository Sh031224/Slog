import { Response, Request } from "express";
import { getRepository } from "typeorm";
import { validateModify } from "../../../../lib/validation/post";
import logger from "../../../../lib/logger";
import Category from "../../../../entity/Category";
import Post from "../../../../entity/Post";

export default async (req: Request, res: Response) => {
  if (!validateModify(req, res)) return;

  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[PUT] 검증 오류.", "idx is NaN");
    res.status(400).json({
      message: "검증 오류."
    });
    return;
  }

  type RequestBody = {
    title: string;
    content: string;
    category_idx: number;
    thumbnail: string;
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
        message: "글 없음."
      });
      return;
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
          message: "카테고리 없음."
        });
        return;
      }

      post.category = category;
    } else {
      // 임시 저장 글이 아닌 경우 카테고리가 없다면 검증 오류
      logger.yellow("[PUT] 검증 오류.", "Not Temp But No Category");
      res.status(400).json({
        message: "검증 오류."
      });
      return;
    }

    post.title = data.title || post.title;
    post.content = data.content || post.content;
    post.thumbnail = data.thumbnail;
    await postRepo.save(post);

    logger.green("[PUT] 글 수정 성공.");
    res.status(200).json({
      message: "글 수정 성공"
    });
  } catch (err) {
    logger.red("[PUT] 글 수정 서버 오류.", err.message);
    res.status(500).json({
      message: "서버 오류."
    });
  }
};
