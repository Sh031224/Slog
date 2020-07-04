import { Request, Response } from "express";
import axios from "axios";
import { validateLogin } from "../../../../lib/validation/auth";
import logger from "../../../../lib/logger";
import User from "../../../../entity/User";

export default async (req: Request, res: Response) => {
  const { body } = req;

  if (!validateLogin(req, res)) return;

  type RequestBody = {
    access_token: string;
  };
  const { access_token }: RequestBody = body;

  try {
    const facebookApi = await axios.get(
      `https://graph.facebook.com/v7.0/me?access_token=${access_token}&fields=id,name&format=json&method=get&transport=cors`
    );

    if (facebookApi.data.error) {
      logger.red("[POST] 로그인 토큰 만료");
      res.status(410).json({
        message: "로그인 오류"
      });
      return;
    }

    const id = facebookApi.data.id;
    const name = facebookApi.data.name;

    const isExist: User = await User.findOrCreate(id, name);

    if (!isExist) {
      logger.yellow("인증 실패.");
      res.status(401).json({
        message: "인증 실패."
      });
      return;
    }

    logger.green("[POST] 로그인 성공.");
    return res.status(200).json({
      message: "로그인 성공.",
      data: {
        access_token: access_token
      }
    });
  } catch (err) {
    logger.red("[POST] 로그인 서버 오류.", err.message);
    return res.status(500).json({
      message: "서버 오류."
    });
  }
};
