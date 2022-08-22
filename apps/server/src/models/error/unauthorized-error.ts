import httpStatus from "http-status";
import CustomError from ".";

export default class UnauthorizedError extends CustomError {
  /* istanbul ignore next */
  constructor(message: string) {
    super(message);

    this.statusCode = httpStatus.UNAUTHORIZED;
  }
}
