import type { Request } from "express";
import type Joi from "joi";

import BadRequestError from "@/models/error/bad-request-error";

export default class Validator {
  validate = <T>(req: Request, schema: Joi.ObjectSchema<T>) => {
    const { body } = req;
    const validation = schema.validate(body);

    if (validation.error) {
      throw new BadRequestError(validation.error.message);
    }
  };
}
