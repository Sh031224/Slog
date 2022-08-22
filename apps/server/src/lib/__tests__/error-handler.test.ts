import BadRequestError from "../../models/error/bad-request-error";
import ForbiddenError from "../../models/error/forbidden-error";
import UnauthorizedError from "../../models/error/unauthorized-error";
import NotFoundError from "../../models/error/not-found-error";
import { getMockResponse } from "../../test-utils";
import ErrorHandler from "../error-handler";

describe("error-handler.ts", () => {
  const errorHandler = new ErrorHandler();
  const res = getMockResponse() as any;

  describe("if custom error", () => {
    it("bad request error, status is 400", () => {
      const status = 400;
      const message = "error message";
      const error = new BadRequestError(message);

      errorHandler.handle(res, error);

      expect(error.message).toBe(message);
      expect(res.status).toBeCalledWith(status);
      expect(res.json).toBeCalledWith({ status, message });
    });

    it("forbidden error, status is 403", () => {
      const status = 403;
      const message = "error message";
      const error = new ForbiddenError(message);

      errorHandler.handle(res, error);

      expect(error.message).toBe(message);
      expect(res.status).toBeCalledWith(status);
      expect(res.json).toBeCalledWith({ status, message });
    });

    it("unauthorized error, status is 401", () => {
      const status = 401;
      const message = "error message";
      const error = new UnauthorizedError(message);

      errorHandler.handle(res, error);

      expect(error.message).toBe(message);
      expect(res.status).toBeCalledWith(status);
      expect(res.json).toBeCalledWith({ status, message });
    });

    it("not found error, status is 404", () => {
      const status = 404;
      const message = "error message";
      const error = new NotFoundError(message);

      errorHandler.handle(res, error);

      expect(error.message).toBe(message);
      expect(res.status).toBeCalledWith(status);
      expect(res.json).toBeCalledWith({ status, message });
    });
  });

  it("not custom error, status is 500", () => {
    const status = 500;
    const message = "error message";

    errorHandler.handle(res, new Error(message));

    expect(res.status).toBeCalledWith(status);
    expect(res.json).toBeCalledWith({ status, message });
  });
});
