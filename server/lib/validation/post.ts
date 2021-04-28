import * as Joi from "joi";
import validate from "./validate";
import { Request, Response } from "express";

export const validateCreate = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    title: Joi.string().min(1).max(255).required(),
    content: Joi.string().required(),
    category_idx: Joi.number().integer().allow(null),
    thumbnail: Joi.string().max(800).allow(""),
    is_temp: Joi.boolean().required(),
    description: Joi.string().max(255).allow("")
  });

  return validate(req, res, schema);
};

export const validateModify = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    title: Joi.string().min(1).max(255).required(),
    content: Joi.string().required(),
    category_idx: Joi.number().integer().allow(null),
    thumbnail: Joi.string().max(800).allow(""),
    is_temp: Joi.boolean().required(),
    description: Joi.string().max(255).allow("")
  });

  return validate(req, res, schema);
};
