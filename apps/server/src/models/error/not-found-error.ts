import httpStatus from "http-status";

import CustomError from ".";

export default class NotFoundError extends CustomError {
  /* istanbul ignore next */
  constructor(message: string) {
    super(message);

    this.statusCode = httpStatus.NOT_FOUND;
  }
}
