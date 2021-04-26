import { Response } from "express";
import moment from "moment";
import { getRepository } from "typeorm";
import logger from "../../../../lib/logger";
import Post from "../../../../entity/Post";
import generateURL from "../../../../lib/util/generateURL";
import PostView from "../../../../entity/PostView";
import encrypt from "../../../../lib/encrypt";
import AuthRequest from "../../../../type/AuthRequest";
import User from "../../../../entity/User";
import Reply from "../../../../entity/Reply";
import Comment from "../../../../entity/Comment";

export default async (req: AuthRequest, res: Response) => {
  const user: User = req.user;
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
    interface PostCountType extends Post {
      comment_count?: number;
    }

    const postRepo = getRepository(Post);
    const post: PostCountType = await postRepo.findOne({
      where: {
        idx
      }
    });

    if (!post) {
      logger.yellow("[GET] 글 없음");
      res.status(404).json({
        status: 404,
        message: "글 없음."
      });
      return;
    }

    if (post.is_temp) {
      if (!user || !user.is_admin) {
        logger.yellow("[GET] 권한 없음.");
        res.status(403).json({
          status: 403,
          message: "권한 없음."
        });
        return;
      }
    } else {
      let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      if (Array.isArray(ip)) {
        ip = ip[0];
      }

      const encryptedIp = encrypt(ip);
      const postViewRepo = getRepository(PostView);

      const viewed = await postViewRepo.findOne({
        where: {
          ip: encryptedIp,
          fk_post_idx: post.idx
        },
        order: {
          created_at: "DESC"
        }
      });

      const currentTime = moment();

      if (!viewed || (viewed && currentTime.diff(moment(viewed.created_at), "minutes") > 90)) {
        post.view += 1;
        await postRepo.save(post);

        const postView = new PostView();
        postView.ip = encryptedIp;
        postView.post = post;
        postViewRepo.save(postView);
      }
    }

    let total_count = 0;

    const commentRepo = getRepository(Comment);
    const [comments, comment_count] = await commentRepo.findAndCount({
      where: {
        post: post
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

    post.comment_count = total_count;

    if (post.thumbnail) {
      post.thumbnail = generateURL(req, post.thumbnail);
    }

    logger.green("[GET] 글 조회 성공.");
    res.status(200).json({
      status: 200,
      message: "글 조회 성공.",
      data: {
        post
      }
    });
    return;
  } catch (err) {
    logger.red("[GET] 글 조회 서버 오류.", err);
    res.status(500).json({
      status: 500,
      message: "서버 오류."
    });
  }
};
