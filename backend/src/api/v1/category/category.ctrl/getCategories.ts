import { Request, Response } from "express";
import { getRepository } from "typeorm";
import logger from "../../../../lib/logger";
import Category from "../../../../entity/Category";

export default async (req: Request, res: Response) => {
  try {
    const categoryRepo = getRepository(Category);
    const categories: Category[] = await categoryRepo.find({
      order: {
        order_number: "ASC"
      }
    });

    logger.green("[GET] 카테고리 목록 조회 성공.");

    res.status(200).json({
      message: "카테고리 목록 조회 성공.",
      data: {
        categories
      }
    });
  } catch (err) {
    logger.red("[GET] 카테고리 목록 조회 서버 오류.", err.message);

    res.status(500).json({
      message: "서버 오류."
    });
  }
};
