import { Request, Response } from "express";
import { getRepository } from "typeorm";
import logger from "../../../../lib/logger";
import Category from "../../../../entity/Category";

export default async (req: Request, res: Response) => {
  const idx: number = Number(req.params.idx);
  if (isNaN(idx)) {
    logger.yellow("검증 오류.", "idx is NaN");
    res.status(400).json({
      message: "검증 오류."
    });
    return;
  }

  try {
    const categoryRepo = getRepository(Category);
    const category: Category = await categoryRepo.findOne({
      idx
    });

    if (!category) {
      logger.yellow("카테고리 없음.");
      res.status(404).json({
        message: "카테고리 없음."
      });
      return;
    }

    logger.green("카테고리 조회 성공.");
    res.status(200).json({
      message: "카테고리 조회 성공.",
      data: {
        category
      }
    });
  } catch (err) {
    logger.red("카테고리 조회 서버 오류.", err.message);
    res.status(500).json({
      message: "서버 오류."
    });
  }
};
