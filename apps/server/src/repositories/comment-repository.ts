import AppDataSource from "@/data-source";
import Comment from "@/models/entity/comment";

export default class CommentRepository {
  private getRepository = () => {
    return AppDataSource.getRepository(Comment);
  };

  count = async () => {
    return this.getRepository().count();
  };

  find = async () => {
    return this.getRepository().find({
      order: {
        orderNumber: "ASC"
      }
    });
  };

  findByIdx = async (idx: number) => {
    return this.getRepository().findOne({ where: { idx } });
  };

  save = (comment: Comment) => {
    return this.getRepository().save(comment);
  };

  saveAll = (categories: Category[]) => {
    return this.getRepository().save(categories);
  };

  delete = (category: Category) => {
    return this.getRepository().delete(category);
  };

  create = async (name: string) => {
    const category = new Category();

    category.name = name;
    category.orderNumber = (await this.count()) + 1;

    this.save(category);
  };
}
