import Joi from "joi";
import { Request } from "express";

import BadRequestError from "../models/error/bad-request-error";

export default class Validator {
  validate(req: Request, schema: Joi.ObjectSchema<any>) {
    const { body } = req;
    const validation = schema.validate(body);

    if (validation.error) {
      throw new BadRequestError(validation.error.message);
    }
  }
}
