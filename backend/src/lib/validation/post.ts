import * as Joi from "joi";
import validate from "./validate";
import { Request, Response } from "express";

export const validateCreate = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    title: Joi.string().min(1).max(255).required(),
    content: Joi.string().required(),
    category_idx: Joi.number().integer(),
    thumbnail: Joi.string().max(800).allow(null),
    description: Joi.string().max(255).required()
  });

  return validate(req, res, schema);
};

export const validateCreateTemp = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    title: Joi.string().min(1).max(50).required(),
    content: Joi.string().allow(null),
    category_idx: Joi.number().integer().allow(null),
    thumbnail: Joi.string().max(800).allow(null),
    description: Joi.string().max(255).allow(null)
  });

  return validate(req, res, schema);
};

export const validateModify = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    title: Joi.string().min(1).max(50),
    content: Joi.string(),
    category_idx: Joi.number().integer(),
    thumbnail: Joi.string().max(800).allow(null),
    is_temp: Joi.boolean(),
    description: Joi.string().max(255)
  });

  return validate(req, res, schema);
};
