import { Response, Request } from "express";
import { getRepository, FindManyOptions } from "typeorm";
import logger from "../../../../lib/logger";
import Category from "../../../../entity/Category";
import Post from "../../../../entity/Post";
import orderTypes from "../../../../enum/orderTypes";
import generateURL from "../../../../lib/util/generateURL";

export default async (req: Request, res: Response) => {
  type RequestQuery = {
    category?: number;
    order?: string;
    page?: number;
    limit?: number;
  };
  const query: RequestQuery = req.query;
  if (!query.page || !query.limit) {
    logger.yellow("[GET] 검증 오류", "page or limit is null");
    res.status(400).json({
      status: 400,
      message: "검증 오류."
    });
    return;
  }

  if (query.page < 1) {
    logger.yellow("[GET] 검증 오류", "page is not valid");
    res.status(400).json({
      status: 400,
      message: "검증 오류."
    });
    return;
  }

  const queryConditions: FindManyOptions = {
    select: [
      "idx",
      "title",
      "created_at",
      "fk_category_idx",
      "thumbnail",
      "view"
    ],
    where: {
      is_temp: false,
      category: null
    },
    order: null,
    skip: (query.page - 1) * query.limit,
    take: query.limit
  };

  try {
    if (query.category) {
      const categoryRepo = getRepository(Category);
      const category: Category = await categoryRepo.findOne({
        where: {
          idx: query.category
        }
      });

      if (!category) {
        logger.yellow("[GET] 카테고리 없음");
        res.status(404).json({
          status: 404,
          message: "카테고리 없음"
        });
        return;
      }

      queryConditions.where["category"] = category;
    } else {
      delete queryConditions.where["category"];
    }

    if (query.order) {
      if (!(query.order in orderTypes)) {
        logger.yellow("[GET] 검증 오류.", "bad query (order)");
        res.status(400).json({
          status: 400,
          message: "검증 오류."
        });
        return;
      }

      if (query.order === orderTypes.LATEST) {
        queryConditions.order = {
          created_at: "DESC"
        };
      } else if (query.order === orderTypes.HIT) {
        queryConditions.order = {
          view: "DESC",
          created_at: "DESC"
        };
      }
    } else {
      queryConditions.order = {
        created_at: "DESC"
      };
    }

    const postRepo = getRepository(Post);
    const [posts, total] = await postRepo.findAndCount(queryConditions);

    posts.forEach((post) => {
      if (!post.thumbnail) return;
      post.thumbnail = generateURL(req, post.idx, post.thumbnail);
    });

    logger.green("[GET] 글 전체 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "글 전체 조회 성공.",
      data: {
        total,
        posts
      }
    });
  } catch (err) {
    logger.red("[GET] 글 전체 조회 서버 오류.", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
