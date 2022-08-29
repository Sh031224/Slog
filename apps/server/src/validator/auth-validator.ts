import { Request } from "express";
import Joi from "joi";

import Validator from ".";

export default class AuthValidator extends Validator {
  constructor() {
    super();
  }

  login = (req: Request) => {
    const schema = Joi.object().keys({
      accessToken: Joi.string().required()
    });

    this.validate(req, schema);
  };

  updateFcmToken = (req: Request) => {
    const schema = Joi.object().keys({
      token: Joi.string().required()
    });

    this.validate(req, schema);
  };
}
