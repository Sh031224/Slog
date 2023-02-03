import type { Request } from "express";
import Joi from "joi";

import BadRequestError from "@/models/error/bad-request-error";

import Validator from ".";

export default class CommentValidator extends Validator {
  constructor() {
    super();
  }

  create = (req: Request) => {
    const schema = Joi.object().keys({
      content: Joi.string().disallow("").disallow(null).required(),
      postIdx: Joi.number().integer().required(),
      isPrivate: Joi.boolean()
    });

    return this.validate(req, schema);
  };

  update = (req: Request) => {
    if (isNaN(Number(req.params.idx))) throw new BadRequestError("idx is required");

    const schema = Joi.object().keys({
      content: Joi.string().disallow("").disallow(null).required()
    });

    return this.validate(req, schema);
  };
}
