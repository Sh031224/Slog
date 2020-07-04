import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validateModifyOrderNumber } from "../../../../lib/validation/category";
import logger from "../../../../lib/logger";
import Category from "../../../../entity/Category";

export default async (req: Request, res: Response) => {
  if (!validateModifyOrderNumber(req, res)) return;

  type RequestBody = {
    order_number: number;
    idx: number;
  };

  const { order_number }: RequestBody = req.body;
  const { idx }: RequestBody = req.body;
  try {
    const categoryRepo = getRepository(Category);
    const categories: Category[] = await categoryRepo.find({
      order: {
        idx: "ASC"
      }
    });

    if (categories.length < order_number || order_number < 1) {
      logger.yellow(
        "[PUT] 카테고리 순서 검증 오류.",
        "order_number is not valid"
      );
      res.status(400).json({
        message: "검증 오류"
      });
      return;
    }

    const changeOrderCategory: Category = await categoryRepo.findOne({
      where: {
        idx: idx
      }
    });

    if (!changeOrderCategory) {
      logger.yellow("[PUT] 카테고리 없음", "idx is not valid");
      res.status(404).json({
        message: "카테고리 없음"
      });
      return;
    }

    const categoryUpdatePromise: Promise<Category>[] = [];

    for (let i = 0; i < categories.length; i += 1) {
      const category = categories[i];

      if (category.idx === idx - 0) {
        category.order_number = order_number;
      } else if (
        category.order_number <= order_number &&
        category.order_number > changeOrderCategory.order_number
      ) {
        category.order_number -= 1;
      } else {
        category.order_number = i + 1;
      }

      categoryUpdatePromise.push(categoryRepo.save(category));
    }

    await Promise.all(categoryUpdatePromise);

    logger.green("[PUT] 카테고리 순서 변경 성공.");
    res.status(200).json({
      message: "카테고리 순서 변경 성공."
    });
  } catch (err) {
    logger.red("[PUT] 서버 오류.", err.message);
    res.status(500).json({
      message: "서버 오류."
    });
  }
};
