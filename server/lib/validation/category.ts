import * as Joi from "joi";
import validate from "./validate";
import { Request, Response } from "express";

export const validateCreate = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    name: Joi.string().max(40).required()
  });

  return validate(req, res, schema);
};

export const validateModify = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    name: Joi.string().max(40).required()
  });

  return validate(req, res, schema);
};

export const validateModifyOrderNumber = (
  req: Request,
  res: Response
): boolean => {
  const schema = Joi.object().keys({
    order_number: Joi.number().required(),
    idx: Joi.number().required()
  });

  return validate(req, res, schema);
};
