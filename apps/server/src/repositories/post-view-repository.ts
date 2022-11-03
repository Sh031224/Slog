import AppDataSource from "../data-source";
import Post from "../models/entity/post";
import PostView from "../models/entity/postView";

export default class PostViewRepository {
  private getRepository = () => {
    return AppDataSource.getRepository(PostView);
  };

  countByPostIdx = async (postIdx: number) => {
    return this.getRepository().count({ where: { postIdx } });
  };

  findByIpAndPostIdx = async (ip: string, postIdx: number) => {
    return this.getRepository().findOne({
      where: {
        ip,
        postIdx
      },
      order: {
        createdAt: "ASC"
      }
    });
  };

  save = (postView: PostView) => {
    return this.getRepository().save(postView);
  };

  create = async (ip: string, post: Post) => {
    const postView = new PostView();

    postView.ip = ip;
    postView.postIdx = post.idx;

    return this.getRepository().create(postView);
  };
}
