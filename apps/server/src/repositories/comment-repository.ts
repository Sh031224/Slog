import AppDataSource from "@/data-source";
import Comment from "@/models/entity/comment";

export default class CommentRepository {
  private getRepository = () => {
    return AppDataSource.getRepository(Comment);
  };

  countByPostIdx = async (postIdx: number) => {
    return this.getRepository().count({ where: { postIdx } });
  };

  findByIdx = async (idx: number) => {
    return this.getRepository().findOne({ where: { idx } });
  };

  findByPostIdx = async (postIdx: number) => {
    return this.getRepository()
      .createQueryBuilder("comment")
      .addSelect("IF(ISNULL(comment.parentIdx), comment.idx, comment.parentIdx) AS orderIdx")
      .where("comment.postIdx = :postIdx", { postIdx })
      .orderBy("orderIdx")
      .getMany();
  };

  findByParentIdx = async (parentIdx: number) => {
    return this.getRepository().find({ where: { parentIdx } });
  };

  save = (comment: Comment) => {
    return this.getRepository().save(comment);
  };

  deleteAll = (comments: Comment[]) => {
    return this.getRepository().delete(comments.map((comment) => comment.idx));
  };

  delete = async (comment: Comment) => {
    if (!comment.parentIdx) return this.getRepository().delete(comment.idx);

    const replies = await this.findByParentIdx(comment.parentIdx);

    return this.deleteAll(replies);
  };
}
