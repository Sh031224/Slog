import logger from "../logger";
import * as Joi from "joi";
import { SchemaLike } from "joi";
import { Request, Response } from "express";

export default (req: Request, res: Response, schema: SchemaLike): boolean => {
  const { body } = req;
  const validation = Joi.validate(body, schema);

  if (validation.error) {
    logger.yellow("[JOI] 검증 오류", validation.error.message);

    res.status(400).json({
      status: 400,
      message: "검증 오류."
    });

    return false;
  }
  return true;
};
