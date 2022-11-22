import jwt, { sign } from "jsonwebtoken";

import { cookieName, cookieOptions, expiresIn } from "@/constants/token";
import User from "@/models/entity/user";
import BadRequestError from "@/models/error/bad-request-error";
import UnauthorizedError from "@/models/error/unauthorized-error";
import { getMockResponse } from "@/test-utils";
import { Token } from "@/types";

import TokenService from "../token-service";

const save = jest.fn();
const findOneByIdxAndFacebookId = jest.fn();

jest.mock("@/repositories/user-repository.ts", () => {
  return function () {
    return { save, findOneByIdxAndFacebookId };
  };
});

jest.spyOn(jwt, "sign").mockReturnValue(undefined);

describe("token-service.ts", () => {
  const tokenService = new TokenService();
  const res = getMockResponse() as any;

  const idx = 1;
  const facebookId = "123";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createToken", () => {
    it("create access token", async () => {
      const type = Token.ACCESS;

      await tokenService.createToken(res, idx, facebookId, type);

      expect(sign).toBeCalledWith({ idx, facebookId, type }, process.env.JWT_SECRET, {
        expiresIn: expiresIn[type]
      });
      expect(res.cookie).toBeCalledWith(cookieName[type], undefined, cookieOptions[type]);
    });

    it("create refresh token", async () => {
      const type = Token.REFRESH;

      await tokenService.createToken(res, idx, facebookId, type);

      expect(sign).toBeCalledWith({ idx, facebookId, type }, process.env.JWT_SECRET, {
        expiresIn: expiresIn[type]
      });
      expect(res.cookie).toBeCalledWith(cookieName[type], undefined, cookieOptions[type]);
    });
  });

  describe("refreshOrValidate", () => {
    const user = new User();
    user.facebookId = facebookId;
    user.idx = idx;

    it("if validate success", async () => {
      jest.spyOn(jwt, "verify").mockImplementation(() => ({ type: Token.ACCESS, idx, facebookId }));
      findOneByIdxAndFacebookId.mockReturnValue(user);
      const token = "token";
      const req = { headers: { authorization: `Bearer ${token}` } };
      const { user: result } = await tokenService.refreshOrValidate(req as any, res);

      expect(findOneByIdxAndFacebookId).toBeCalledWith(idx, facebookId);
      expect(result).toBe(user);
    });

    it("if validate failure, token type is not match", async () => {
      jest
        .spyOn(jwt, "verify")
        .mockImplementation(() => ({ type: Token.REFRESH, idx, facebookId }));
      const token = "token";
      const req = { headers: { authorization: `Bearer ${token}` }, cookies: {} };

      await expect(tokenService.refreshOrValidate(req as any, res)).rejects.toThrowError(
        new UnauthorizedError("token type is not match")
      );
    });

    it("if validate failure, have refresh token", async () => {
      const type = Token.ACCESS;
      jest
        .spyOn(jwt, "verify")
        .mockImplementationOnce(() => {
          throw new Error("");
        })
        .mockImplementationOnce(() => ({ type: Token.REFRESH, idx, facebookId }));
      findOneByIdxAndFacebookId.mockReturnValue(user);
      const token = "token";
      const req = { headers: { authorization: `Bearer ${token}` }, cookies: { refresh: token } };
      const { user: result } = await tokenService.refreshOrValidate(req as any, res);

      expect(findOneByIdxAndFacebookId).toBeCalledWith(idx, facebookId);
      expect(result).toBe(user);
      expect(sign).toBeCalledWith({ idx, facebookId, type }, process.env.JWT_SECRET, {
        expiresIn: expiresIn[type]
      });
      expect(res.cookie).toBeCalledWith(cookieName[type], undefined, cookieOptions[type]);
    });

    it("if validate failure, have refresh token, refresh token's exp < 7 day", async () => {
      const type = Token.ACCESS;
      jest
        .spyOn(jwt, "verify")
        .mockImplementationOnce(() => {
          throw new Error("");
        })
        .mockImplementationOnce(() => ({ type: Token.REFRESH, idx, facebookId, exp: 1 }));
      findOneByIdxAndFacebookId.mockReturnValue(user);
      const token = "token";
      const req = { headers: { authorization: `Bearer ${token}` }, cookies: { refresh: token } };
      const { user: result } = await tokenService.refreshOrValidate(req as any, res);

      expect(findOneByIdxAndFacebookId).toBeCalledWith(idx, facebookId);
      expect(result).toBe(user);
      expect(sign).toBeCalledWith({ idx, facebookId, type }, process.env.JWT_SECRET, {
        expiresIn: expiresIn[type]
      });
      expect(sign).toBeCalledWith(
        { idx, facebookId, type: Token.REFRESH },
        process.env.JWT_SECRET,
        {
          expiresIn: expiresIn[Token.REFRESH]
        }
      );
      expect(res.cookie).toBeCalledWith(cookieName[type], undefined, cookieOptions[type]);
      expect(res.cookie).toBeCalledWith(
        cookieName[Token.REFRESH],
        undefined,
        cookieOptions[Token.REFRESH]
      );
    });

    it("if validate failure, throw error", async () => {
      const req = { headers: { authorization: undefined }, cookies: {} };

      jest
        .spyOn(jwt, "verify")
        .mockImplementationOnce(() => {
          throw new Error("jwt malformed");
        })
        .mockImplementationOnce(() => {
          throw new Error("invalid token");
        })
        .mockImplementationOnce(() => {
          throw new Error("invalid signature");
        })
        .mockImplementationOnce(() => {
          throw new Error("jwt expired");
        })
        .mockImplementationOnce(() => {
          throw new Error("jwt must be provided");
        })
        .mockImplementationOnce(() => {
          throw new Error("default message");
        });

      await expect(tokenService.refreshOrValidate(req as any, res)).rejects.toThrowError(
        new UnauthorizedError("invalid token")
      );

      await expect(tokenService.refreshOrValidate(req as any, res)).rejects.toThrowError(
        new UnauthorizedError("invalid token")
      );

      await expect(tokenService.refreshOrValidate(req as any, res)).rejects.toThrowError(
        new UnauthorizedError("invalid token")
      );

      await expect(tokenService.refreshOrValidate(req as any, res)).rejects.toThrowError(
        new UnauthorizedError("invalid token")
      );

      await expect(tokenService.refreshOrValidate(req as any, res)).rejects.toThrowError(
        new BadRequestError("token is required")
      );

      await expect(tokenService.refreshOrValidate(req as any, res)).rejects.toThrowError(
        new Error("default message")
      );
    });
  });
});
