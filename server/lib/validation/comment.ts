import * as Joi from "joi";
import validate from "./validate";
import { Request, Response } from "express";

export const validateCreate = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    content: Joi.string().required(),
    post_idx: Joi.number().integer().required(),
    is_private: Joi.boolean()
  });

  return validate(req, res, schema);
};

export const validateModify = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    content: Joi.string().required()
  });

  return validate(req, res, schema);
};
