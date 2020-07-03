/**
 * admin, user [
 *  401 인증 안됨
 *  410 토큰 만료
 * ]
 */
import { Response, NextFunction, Request } from "express";
import { getRepository } from "typeorm";
import axios from "axios";
import User from "../../entity/User";
import logger from "../logger";

const admin = async (req, res: Response, next: NextFunction) => {
  try {
    const user: User = await validateAuth(req);

    if (!user.is_admin) {
      return res.status(403).json({
        message: "권한 없음."
      });
    }
    req.user = user;
    next();
  } catch (err) {
    switch (err.message) {
      case "TOKEN_IS_ARRAY":
        res.status(403).json({
          message: "검증 오류"
        });
        return;
      case "EXPIRED_TOKEN":
        res.status(410).json({
          message: "토큰 만료"
        });
        return;
      default:
        logger.red("토큰 검증 서버 오류.", err.message);
        res.status(500).json({
          message: "서버 오류."
        });
    }
  }
};

const user = async (req, res: Response, next: NextFunction) => {
  try {
    const user: User = await validateAuth(req);
    req.user = user;
    next();
  } catch (err) {
    switch (err.message) {
      case "TOKEN_IS_ARRAY":
        res.status(401).json({
          message: "인증 오류"
        });
        return;
      case "EXPIRED_TOKEN":
        res.status(410).json({
          message: "토큰 만료"
        });
        return;
      default:
        logger.red("토큰 검증 서버 오류.", err.message);
        res.status(500).json({
          message: "서버 오류."
        });
    }
  }
};

const validateAuth = async (req: Request) => {
  const reqToken: string | string[] = req.headers.access_token;
  if (Array.isArray(reqToken)) {
    throw new Error("TOKEN_IS_ARRAY");
  }

  const token = reqToken;
  try {
    const facebookApi = await axios.get(
      `https://graph.facebook.com/v7.0/me?access_token=${token}&fields=id,name&format=json&method=get&transport=cors`
    );

    if (facebookApi.data.error) {
      throw new Error("EXPIRED_TOKEN");
    }

    const userRepo = getRepository(User);
    const user: User = await userRepo.findOne({
      where: {
        id: facebookApi.data.id,
        name: facebookApi.data.name
      }
    });

    if (!user) {
      throw new Error("NO_USER");
    }

    return user;
  } catch (err) {
    throw new Error("SERVER_ERROR");
  }
};

export default {
  admin,
  user
};
