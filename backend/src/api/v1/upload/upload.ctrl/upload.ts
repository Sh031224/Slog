import { Response } from "express";
import * as fs from "fs";
import logger from "../../../../lib/logger";
import { validateUpload } from "../../../../lib/validation/upload";

export default async (req: any, res: Response) => {
  if (!validateUpload(req, res)) return;

  const { post_idx } = req.body;

  try {
    const reqFiles = req.files;
    const files: string[] = [];

    reqFiles.forEach((reqFile: any) => {
      const oldPath = `public/tmp/${reqFile.filename}`;
      const newPath = `public/${post_idx}/${reqFile.filename}`;
      if (!fs.existsSync(`public/${post_idx}`)) {
        fs.mkdirSync(`public/${post_idx}`);
      }

      files.push(reqFile.filename);

      fs.rename(
        oldPath,
        newPath,
        (err: NodeJS.ErrnoException) =>
          void {
            if(err: NodeJS.ErrnoException) {
              logger.red("[POST] 파일 업로드 서버 오류.");
              res.status(500).json({
                message: "서버 오류."
              });
            }
          }
      );
    });

    logger.green("[POST] 파일 업로드 성공.");
    res.status(200).json({
      message: "파일 업로드 성공.",
      data: {
        files
      }
    });
  } catch (err) {
    logger.red("[POST] 파일 업로드 서버 오류.");
    res.status(500).json({
      message: "서버 오류."
    });
  }
};
