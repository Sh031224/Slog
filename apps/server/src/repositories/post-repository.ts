import type { FindManyOptions } from "typeorm";

import AppDataSource from "@/data-source";
import Post from "@/models/entity/post";

export default class PostRepository {
  private getRepository = () => {
    return AppDataSource.getRepository(Post);
  };

  findAndCount = async (options: FindManyOptions<Post>) => {
    return this.getRepository().findAndCount(options);
  };

  findByIdx = async (idx: number) => {
    return this.getRepository().findOne({ where: { idx } });
  };

  save = (post: Post) => {
    return this.getRepository().save(post);
  };

  delete = (post: Post) => {
    return this.getRepository().delete(post.idx);
  };

  create = async (post: Post) => {
    return this.getRepository().create(post);
  };
}
