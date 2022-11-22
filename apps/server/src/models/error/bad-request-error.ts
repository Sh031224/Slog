import httpStatus from "http-status";

import CustomError from ".";

export default class BadRequestError extends CustomError {
  /* istanbul ignore next */
  constructor(message: string) {
    super(message);

    this.statusCode = httpStatus.BAD_REQUEST;
  }
}
