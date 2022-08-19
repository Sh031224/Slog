import httpStatus from "http-status";
import CustomError from ".";

export default class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message);

    this.statusCode = httpStatus.UNAUTHORIZED;
  }
}
