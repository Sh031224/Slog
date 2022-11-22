import dayjs from "dayjs";
import type { Request } from "express";

import type Post from "@/models/entity/post";
import PostViewRepository from "@/repositories/post-view-repository";

export default class PostViewService {
  private postViewRepository: PostViewRepository;

  constructor() {
    this.postViewRepository = new PostViewRepository();
  }

  update = async (req: Request, post: Post) => {
    const count = await this.postViewRepository.countByPostIdx(post.idx);
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (Array.isArray(ip)) {
      ip = ip[0];
    }

    if (!ip) return count;

    const viewed = await this.postViewRepository.findByIpAndPostIdx(ip, post.idx);

    if (!viewed || dayjs().diff(dayjs(viewed.createdAt), "minutes") > 90) {
      await this.postViewRepository.create(ip, post);

      return count + 1;
    }

    return count;
  };
}
