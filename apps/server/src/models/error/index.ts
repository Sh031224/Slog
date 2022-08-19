import { ApiResponse } from "shared-types";

export default class CustomError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
