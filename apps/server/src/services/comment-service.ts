import BadRequestError from "@/models/error/bad-request-error";
import NotFoundError from "@/models/error/not-found-error";
import CommentRepository from "@/repositories/comment-repository";

export default class CommentService {
  private commentRepository: CommentRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
  }

  create = (name: string) => {
    return this.commentRepository.create(name);
  };

  get = async () => {
    return this.commentRepository.find();
  };

  update = async (idx: number, name: string) => {
    const comment = await this.commentRepository.findByIdx(idx);

    if (!comment) throw new NotFoundError(`${idx} is not found.`);

    comment.name = name;

    return this.commentRepository.save(comment);
  };

  updateOrderNumber = async (idx: number, orderNumber: number) => {
    const count = await this.commentRepository.count();

    if (count < orderNumber)
      throw new BadRequestError("orderNumber must be less than categories.length");

    const categories = await this.commentRepository.find();
    const updateComment = categories.find((v) => v.idx === idx);

    if (!updateComment) throw new NotFoundError(`${idx} is not found.`);

    // swap
    categories[categories.findIndex((v) => v.orderNumber === orderNumber)].orderNumber =
      updateComment.orderNumber;
    categories[categories.findIndex((v) => v.idx === idx)].orderNumber = orderNumber;

    return this.commentRepository.saveAll(categories);
  };

  delete = async (idx: number) => {
    const comment = await this.commentRepository.findByIdx(idx);

    if (!comment) throw new NotFoundError(`${idx} is not found.`);

    return this.commentRepository.delete(comment);
  };
}
