import * as Joi from "joi";
import validate from "./validate";
import { Request, Response } from "express";

export const validateUpload = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    post_idx: Joi.number().integer().required()
  });

  return validate(req, res, schema);
};
