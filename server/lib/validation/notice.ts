import * as Joi from "joi";
import validate from "./validate";
import { Request, Response } from "express";

export const validateCreate = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    title: Joi.string().max(100).required(),
    content: Joi.string().required()
  });

  return validate(req, res, schema);
};

export const validateModify = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    title: Joi.string().max(100),
    content: Joi.string()
  });

  return validate(req, res, schema);
};
