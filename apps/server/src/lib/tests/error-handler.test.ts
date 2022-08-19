import BadRequestError from "../../models/error/bad-request-error";
import ForbiddenError from "../../models/error/forbidden-error";
import UnauthorizedError from "../../models/error/unauthorized-error";
import NotFoundError from "../../models/error/not-found-error";
import { getMockResponse } from "../../testing-utils";
import ErrorHandler from "../error-handler";

describe("error-handler.ts", () => {
  const errorHandler = new ErrorHandler();

  describe("if custom error", () => {
    it("bad request error, status is 400", () => {
      const res = getMockResponse();
      const status = 400;
      const message = "error message";

      errorHandler.handle(res as any, new BadRequestError(message));

      expect(res.status).toBeCalledWith(status);
      expect(res.json).toBeCalledWith({ status, message });
    });

    it("forbidden error, status is 403", () => {
      const res = getMockResponse();
      const status = 403;
      const message = "error message";

      errorHandler.handle(res as any, new ForbiddenError(message));

      expect(res.status).toBeCalledWith(status);
      expect(res.json).toBeCalledWith({ status, message });
    });

    it("unauthorized error, status is 401", () => {
      const res = getMockResponse();
      const status = 401;
      const message = "error message";

      errorHandler.handle(res as any, new UnauthorizedError(message));

      expect(res.status).toBeCalledWith(status);
      expect(res.json).toBeCalledWith({ status, message });
    });

    it("not found error, status is 404", () => {
      const res = getMockResponse();
      const status = 404;
      const message = "error message";

      errorHandler.handle(res as any, new NotFoundError(message));

      expect(res.status).toBeCalledWith(status);
      expect(res.json).toBeCalledWith({ status, message });
    });
  });

  it("not custom error, status is 500", () => {
    const res = getMockResponse();
    const status = 500;
    const message = "error message";

    errorHandler.handle(res as any, new Error(message));

    expect(res.status).toBeCalledWith(status);
    expect(res.json).toBeCalledWith({ status, message });
  });
});
