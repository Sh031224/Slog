import { Response } from "express";
import AuthRequest from "../../../../type/AuthRequest";
import { getRepository } from "typeorm";
import { validateFcm } from "../../../../lib/validation/auth";
import logger from "../../../../lib/logger";
import User from "../../../../entity/User";

export default async (req: AuthRequest, res: Response) => {
  if (!validateFcm(req, res)) return;

  const user: User = req.user;
  type RequestBody = {
    token: string;
  };

  const data: RequestBody = req.body;

  try {
    const userRepo = getRepository(User);

    user.fcm_allow = true;
    user.fcm = data.token;

    await userRepo.save(user);

    logger.green("[POST] FCM 토큰 저장 성공.");
    res.status(200).json({
      status: 200,
      message: "FCM 토큰 저장 성공."
    });
  } catch (err) {
    logger.red("[POST] FCM 토큰 저장 성공", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
