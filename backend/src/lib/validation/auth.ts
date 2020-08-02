import * as Joi from "joi";
import validate from "./validate";
import { Request, Response } from "express";

export const validateLogin = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    access_token: Joi.string().required()
  });

  return validate(req, res, schema);
};

export const validateFcm = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    token: Joi.string().required()
  });

  return validate(req, res, schema);
};
