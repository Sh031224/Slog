import httpStatus from "http-status";
import CustomError from ".";

export default class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message);

    this.statusCode = httpStatus.BAD_REQUEST;
  }
}
