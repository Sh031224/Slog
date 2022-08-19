import { Response } from "express";
import httpStatus from "http-status";

export default class ErrorHandler {
  handle(res: Response, err: any) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({ status: err.statusCode, message: err.message });
    }

    console.error(err.message);

    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: err.message });
  }
}
