import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validateCreate } from "../../../../lib/validation/category";
import logger from "../../../../lib/logger";
import Category from "../../../../entity/Category";

export default async (req: Request, res: Response) => {
  const { body } = req;
  if (!validateCreate(req, res)) return;

  type RequestBody = {
    name: string;
  };
  const { name }: RequestBody = req.body;

  try {
    const categoryRepo = getRepository(Category);
    const isExist: Category = await categoryRepo.findOne({
      where: {
        name
      }
    });

    if (isExist) {
      logger.yellow("[POST] 중복된 카테고리.");
      res.status(409).json({
        message: "중복된 카테고리."
      });
      return;
    }

    const category = new Category();
    category.name = name;
    category.order_number = (await categoryRepo.count()) + 1;

    await categoryRepo.save(category);
    logger.green("[POST] 카테고리 생성 성공.");
    return res.status(200).json({
      message: "카테고리 생성 성공."
    });
  } catch (err) {
    logger.red("[POST] 카테고리 생성 서버 오류.", err.message);
    return res.status(500).json({
      message: "서버 오류."
    });
  }
};
