import type { Request } from "express";
import Joi from "joi";

import BadRequestError from "@/models/error/bad-request-error";

import Validator from ".";

export default class PostValidator extends Validator {
  constructor() {
    super();
  }

  getPost = (req: Request) => {
    if (isNaN(Number(req.params.idx))) throw new BadRequestError("idx is required");
  };

  getPosts = (req: Request) => {
    if (isNaN(Number(req.query.page))) throw new BadRequestError("page is required");
    if (isNaN(Number(req.query.limit))) throw new BadRequestError("limit is required");
  };

  create = (req: Request) => {
    const schema = Joi.object().keys({
      type: Joi.string().valid("DEFAULT", "EXTERNAL").required(),
      title: Joi.string().min(1).max(255).required(),
      content: Joi.string().allow("").allow(null),
      categoryIdx: Joi.number().integer().required(),
      thumbnail: Joi.string().max(800).allow("").allow(null),
      isTemp: Joi.boolean().default(false),
      description: Joi.string().max(255).required(),
      externalUrl: Joi.string().max(255).allow("").allow(null)
    });

    this.validate(req, schema);

    if (!req.body.isTemp && !req.body.thumbnail)
      throw new BadRequestError("if isTemp is false, thumbnail is required");

    if (req.body.type === "EXTERNAL" && !req.body.externalUrl)
      throw new BadRequestError("if type is EXTERNAL, externalUrl is required");
    else if (req.body.type === "DEFAULT" && !req.body.content)
      throw new BadRequestError("if type is DEFAULT, content is required");
  };

  update = (req: Request) => {
    if (isNaN(Number(req.params.idx))) throw new BadRequestError("idx is required");

    const schema = Joi.object().keys({
      title: Joi.string().min(1).max(255).required(),
      content: Joi.string().allow("").allow(null),
      categoryIdx: Joi.number().integer().required(),
      thumbnail: Joi.string().max(800).allow("").allow(null),
      isTemp: Joi.boolean().default(false),
      description: Joi.string().max(255).required(),
      externalUrl: Joi.string().max(255).allow("").allow(null)
    });

    this.validate(req, schema);

    if (req.body.isTemp && !req.body.thumbnail)
      throw new BadRequestError("if isTemp is false, thumbnail is required");
  };

  delete = (req: Request) => {
    if (isNaN(Number(req.params.idx))) throw new BadRequestError("idx is required");
  };
}
