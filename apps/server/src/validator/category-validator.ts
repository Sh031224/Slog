import type { Request } from "express";
import Joi from "joi";

import BadRequestError from "@/models/error/bad-request-error";

import Validator from ".";

export default class CategoryValidator extends Validator {
  constructor() {
    super();
  }

  create = (req: Request) => {
    const schema = Joi.object().keys({
      name: Joi.string().max(40).required()
    });

    this.validate(req, schema);
  };

  update = (req: Request) => {
    if (isNaN(Number(req.params.idx))) throw new BadRequestError("idx is required");

    const schema = Joi.object().keys({
      name: Joi.string().max(40).required()
    });

    this.validate(req, schema);
  };

  updateOrderNumber = (req: Request) => {
    if (isNaN(Number(req.params.idx))) throw new BadRequestError("idx is required");

    const schema = Joi.object().keys({
      orderNumber: Joi.number().min(1).required()
    });

    this.validate(req, schema);
  };

  delete = (req: Request) => {
    if (isNaN(Number(req.params.idx))) throw new BadRequestError("idx is required");
  };
}
