import { Response } from "express";
import logger from "../../../../lib/logger";
import generateURL from "../../../../lib/util/generateURL";

export default async (req: any, res: Response) => {
  try {
    const reqFiles = req.files;
    const files: string[] = [];

    reqFiles.forEach((reqFile: any) => {
      files.push(generateURL(req, reqFile.filename));
    });

    logger.green("[POST] 파일 업로드 성공.");
    res.status(200).json({
      status: 200,
      message: "파일 업로드 성공.",
      data: {
        files
      }
    });
  } catch (err) {
    logger.red("[POST] 파일 업로드 서버 오류.", err.message);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
