import httpStatus from "http-status";
import CustomError from ".";

export default class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message);

    this.statusCode = httpStatus.NOT_FOUND;
  }
}
