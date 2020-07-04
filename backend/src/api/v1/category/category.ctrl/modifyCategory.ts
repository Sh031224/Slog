import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validateModify } from "../../../../lib/validation/category";
import logger from "../../../../lib/logger";
import Category from "../../../../entity/Category";

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
    name: string;
  };
  const { name }: RequestBody = req.body;

  try {
    const categoryRepo = getRepository(Category);
    const category: Category = await categoryRepo.findOne({
      where: {
        idx
      }
    });

    if (!category) {
      res.status(404).json({
        message: "카테고리 없음."
      });
      return;
    }

    category.name = name;
    categoryRepo.save(category);
    logger.green("[PUT] 카테고리 수정 성공.");
    return res.status(200).json({
      message: "카테고리 수정 성공."
    });
  } catch (err) {
    logger.red("[PUT] 카테고리 수정 서버 오류.");
    return res.status(500).json({
      message: "서버 오류."
    });
  }
};
