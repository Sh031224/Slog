import { Response, Request } from "express";
import { getRepository } from "typeorm";
import logger from "../../../../lib/logger";
import Reply from "../../../../entity/Reply";
import Comment from "../../../../entity/Comment";

export default async (req: Request, res: Response) => {
  const idx: number = Number(req.params.idx);

  if (isNaN(idx)) {
    logger.yellow("[GET] 검증 오류.", "idx is NaN");
    res.status(400).json({
      status: 400,
      message: "검증 오류."
    });
    return;
  }

  try {
    let total_count = 0;

    const commentRepo = getRepository(Comment);
    const [comments, comment_count] = await commentRepo.findAndCount({
      where: {
        fk_post_idx: idx
      }
    });

    total_count += comment_count;
    for (let i in comments) {
      const replyRepo = getRepository(Reply);
      const reply_count = await replyRepo.count({
        where: {
          comment: comments[i]
        }
      });
      total_count += reply_count;
    }

    logger.green("[GET] 댓글 개수 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "글 조회 성공.",
      data: {
        total_count
      }
    });
    return;
  } catch (err) {
    logger.red("[GET] 댓글 개수 조회 서버 오류.", err);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
