import "dotenv/config";
import type { Request, Response } from "express";
import type { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

import { DAY } from "@/constants/time";
import { cookieName, cookieOptions, expiresIn } from "@/constants/token";
import BadRequestError from "@/models/error/bad-request-error";
import UnauthorizedError from "@/models/error/unauthorized-error";
import UserRepository from "@/repositories/user-repository";
import { Token } from "@/types";

const { JWT_SECRET } = process.env;

type JwtContent = {
  idx: number;
  facebookId: string;
  type: Token;
} & jwt.JwtPayload;

export default class TokenService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  private parseToken = (token: string) => {
    return token.replace("Bearer ", "");
  };

  private verifyToken = async (token: string): Promise<JwtContent> => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return jwt.verify(token, JWT_SECRET!) as JwtContent;
  };

  createToken = async (res: Response, idx: number, facebookId: string, type: Token) => {
    const payload = {
      idx,
      facebookId,
      type
    };

    const options: SignOptions = {
      expiresIn: expiresIn[type as keyof typeof Token]
    };

    res.cookie(
      cookieName[type as keyof typeof Token],
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jwt.sign(payload, JWT_SECRET!, options),
      cookieOptions[type as keyof typeof Token]
    );
  };

  private validate = async (reqToken: string, type: Token) => {
    const token = this.parseToken(reqToken);

    try {
      const decoded = await this.verifyToken(token);

      if (decoded.type !== type) throw new UnauthorizedError("token type is not match");

      const user = await this.userRepository.findOneByIdxAndFacebookId(
        decoded.idx,
        decoded.facebookId
      );

      return { user, decoded };
    } catch (error) {
      const err = error as Error;

      switch (err.message) {
        case "jwt must be provided":
          throw new BadRequestError("token is required");
        case "jwt malformed":
        case "invalid token":
        case "invalid signature":
        case "jwt expired":
          throw new UnauthorizedError("invalid token");
        default:
          throw err;
      }
    }
  };

  refreshOrValidate = async (req: Request, res: Response) => {
    try {
      const reqToken: string = req.headers.authorization ?? "";
      const { user } = await this.validate(reqToken, Token.ACCESS);

      return { user };
    } catch (err) {
      const refreshToken = req.cookies[cookieName[Token.REFRESH as keyof typeof Token]];

      if (refreshToken) {
        const { user, decoded } = await this.validate(refreshToken, Token.REFRESH);

        if (decoded.exp && decoded.exp < DAY * 7) {
          await Promise.all([
            this.createToken(res, user.idx, user.facebookId, Token.ACCESS),
            this.createToken(res, user.idx, user.facebookId, Token.REFRESH)
          ]);
        } else {
          await this.createToken(res, user.idx, user.facebookId, Token.ACCESS);
        }

        return { user };
      } else {
        throw err;
      }
    }
  };
}
