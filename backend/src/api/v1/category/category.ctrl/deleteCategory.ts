import { Request, Response } from "express";
import { getRepository } from "typeorm";
import logger from "../../../../lib/logger";
import Category from "../../../../entity/Category";

export default async (req: Request, res: Response) => {
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[DELETE] 카테고리 검증 오류.", "idx is NaN");
    res.status(400).json({
      message: "검증 오류."
    });
    return;
  }

  try {
    const categoryRepo = getRepository(Category);
    const category: Category = await categoryRepo.findOne({
      where: {
        idx
      }
    });

    if (!category) {
      logger.yellow("[DELETE] 카테고리 없음.");
      res.status(404).json({
        message: "카테고리 없음."
      });
      return;
    }

    const deletedOrderNumber = category.order_number;

    await categoryRepo.remove(category);

    const categories: Category[] = await categoryRepo.find();

    let additionalNumber = 0;
    const categoryUpdatePromise: Promise<Category>[] = [];
    for (let i = 0; i < categories.length; i += 1) {
      const category = categories[i];

      if (category.order_number > deletedOrderNumber) {
        category.order_number = deletedOrderNumber + additionalNumber;
        additionalNumber += 1;
        categoryUpdatePromise.push(categoryRepo.save(category));
      }
    }

    await Promise.all(categoryUpdatePromise);

    logger.green("[DELETE] 카테고리 삭제 성공.");
    return res.status(200).json({
      message: "카테고리 삭제 성공."
    });
  } catch (err) {
    logger.red("[DELETE] 카테고리 삭제 서버 오류.");
    return res.status(500).json({
      message: "서버 오류."
    });
  }
};
